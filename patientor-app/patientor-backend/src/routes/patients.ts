/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientsService from '../services/patientsService';
import { Discharge, HealthCheckRating, SickLeave, Diagnosis } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  console.log("processing request with body");
  console.log(req.body);
  const patient_id = req.params.id;
  if (req.body.date && req.body.specialist && req.body.description) {
    const date = req.body.date as string;
    const specialist = req.body.specialist as string;
    const description = req.body.description as string;
    let diagnosisCodes: Array<Diagnosis['code']> | undefined;
    if (req.body.diagnosisCodes !== undefined) {
      diagnosisCodes = req.body.diagnosisCodes as Array<Diagnosis['code']>;
    } else {
      diagnosisCodes = undefined;
    }
    if (req.body.healthCheckRating !== undefined) {
      const healthCheckRating = req.body.healthCheckRating as HealthCheckRating;
      console.log("healthcheckrating");
      const addedEntry = patientsService.addHealthCheckEntry({ date, specialist, description, healthCheckRating, type: "HealthCheck" }, diagnosisCodes, patient_id);
      console.log("added, sending response");
      res.send(addedEntry);
      console.log("sent");
    } else if (req.body.employerName) {

      const employerName = req.body.employerName as string;
      if (req.body.sickLeave) {
        const sickLeave = req.body.sickLeave as SickLeave;
        const addedEntry = patientsService.addOccupationalHealthcareEntry(
          { date, specialist, description, sickLeave, employerName, type: "OccupationalHealthcare" }, diagnosisCodes
          , patient_id);
        res.send(addedEntry);
      } else {
        const addedEntry = patientsService.addOccupationalHealthcareEntry(
          { date, specialist, description, employerName, type: "OccupationalHealthcare" }, diagnosisCodes
          , patient_id);
        res.send(addedEntry);
      }
      
    } else if (req.body.discharge) {
      const discharge: Discharge = req.body.discharge as Discharge;
      const addedEntry = patientsService.addHospitalEntry(
        { date, specialist, description, discharge, type: "Hospital" },  diagnosisCodes, patient_id);
      res.send(addedEntry);    }
  } else {
    res.send("ERROR");
  }

});

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  console.log("getting patient with id", req.params.id);
  res.send(patientsService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = toNewPatient(req.body);
    const newPatient = patientsService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries: [],
    });
    res.json(newPatient);
  } catch (e) {
    res.status(400).send({ error: (e as Error).message } );
  }
});

export default router;

