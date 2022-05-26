/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v1 as uuid} from 'uuid';
import patientData from '../../data/patients';
import { Diagnosis, Patient, NewPatient, CensoredPatient, RawHealthCheckEntry, RawOccupationalHealthcareEntry, RawHospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from '../types';
const patients: Array<Patient> = patientData;

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const getPatients = (): Array<CensoredPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => {
    return {
      id, name, dateOfBirth, gender, occupation
    };
  });
};

const addPatient = (newPatient: NewPatient) : Patient => {
  const id: string = uuid();
    const newReadyPatient = {
      id: id,
      ...newPatient
    };
    patients.push(newReadyPatient);
    return newReadyPatient;
};

const addHealthCheckEntry = (rawEntry: RawHealthCheckEntry, diagnosisCodes: Array<Diagnosis['code']> | undefined, patientId: string) : RawHealthCheckEntry => {
  const id: string = uuid();
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) {
    throw new Error("Invalid patient ID in new entry post request");
  }
  const newEntry: HealthCheckEntry = { ...rawEntry, id};
  if (diagnosisCodes !== undefined) {
    newEntry.diagnosisCodes = diagnosisCodes;
  }
  patient.entries.push(newEntry);
  console.log("pushed new entry:");
  console.log(newEntry);
  return newEntry;
};

const addOccupationalHealthcareEntry = (rawEntry: RawOccupationalHealthcareEntry, diagnosisCodes: Array<Diagnosis['code']> | undefined, patientId: string) : RawOccupationalHealthcareEntry => {
  const id: string = uuid();
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) {
    throw new Error("Invalid patient ID in new entry post request");
  }
  
  const newEntry: OccupationalHealthcareEntry = { ...rawEntry, id};
  if (diagnosisCodes !== undefined) {
    newEntry.diagnosisCodes = diagnosisCodes;
  }
  patient.entries.push(newEntry);
  return newEntry;
};

const addHospitalEntry = (rawEntry: RawHospitalEntry, diagnosisCodes: Array<Diagnosis['code']> | undefined, patientId: string) : HospitalEntry => {
  const id: string = uuid();
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) {
    throw new Error("Invalid patient ID in new entry post request");
  }
  const newEntry = { ...rawEntry, id};
  if (diagnosisCodes !== undefined) {
    newEntry.diagnosisCodes = diagnosisCodes;
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientById,
  getPatients,
  addPatient,
  addHealthCheckEntry,
  addOccupationalHealthcareEntry,
  addHospitalEntry
};
