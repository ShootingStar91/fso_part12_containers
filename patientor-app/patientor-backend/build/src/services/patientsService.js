"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const patients = patients_1.default;
const getPatientById = (id) => {
    const patient = patients.find(patient => patient.id === id);
    return patient;
};
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id, name, dateOfBirth, gender, occupation
        };
    });
};
const addPatient = (newPatient) => {
    const id = (0, uuid_1.v1)();
    const newReadyPatient = Object.assign({ id: id }, newPatient);
    patients.push(newReadyPatient);
    return newReadyPatient;
};
const addHealthCheckEntry = (rawEntry, diagnosisCodes, patientId) => {
    const id = (0, uuid_1.v1)();
    const patient = patients.find(patient => patient.id === patientId);
    if (!patient) {
        throw new Error("Invalid patient ID in new entry post request");
    }
    const newEntry = Object.assign(Object.assign({}, rawEntry), { id });
    if (diagnosisCodes !== undefined) {
        newEntry.diagnosisCodes = diagnosisCodes;
    }
    patient.entries.push(newEntry);
    console.log("pushed new entry:");
    console.log(newEntry);
    return newEntry;
};
const addOccupationalHealthcareEntry = (rawEntry, diagnosisCodes, patientId) => {
    const id = (0, uuid_1.v1)();
    const patient = patients.find(patient => patient.id === patientId);
    if (!patient) {
        throw new Error("Invalid patient ID in new entry post request");
    }
    const newEntry = Object.assign(Object.assign({}, rawEntry), { id });
    if (diagnosisCodes !== undefined) {
        newEntry.diagnosisCodes = diagnosisCodes;
    }
    patient.entries.push(newEntry);
    return newEntry;
};
const addHospitalEntry = (rawEntry, diagnosisCodes, patientId) => {
    const id = (0, uuid_1.v1)();
    const patient = patients.find(patient => patient.id === patientId);
    if (!patient) {
        throw new Error("Invalid patient ID in new entry post request");
    }
    const newEntry = Object.assign(Object.assign({}, rawEntry), { id });
    if (diagnosisCodes !== undefined) {
        newEntry.diagnosisCodes = diagnosisCodes;
    }
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatientById,
    getPatients,
    addPatient,
    addHealthCheckEntry,
    addOccupationalHealthcareEntry,
    addHospitalEntry
};
