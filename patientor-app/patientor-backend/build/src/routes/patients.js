"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.post('/:id/entries', (req, res) => {
    console.log("processing request with body");
    console.log(req.body);
    const patient_id = req.params.id;
    if (req.body.date && req.body.specialist && req.body.description) {
        const date = req.body.date;
        const specialist = req.body.specialist;
        const description = req.body.description;
        let diagnosisCodes;
        if (req.body.diagnosisCodes !== undefined) {
            diagnosisCodes = req.body.diagnosisCodes;
        }
        else {
            diagnosisCodes = undefined;
        }
        if (req.body.healthCheckRating !== undefined) {
            const healthCheckRating = req.body.healthCheckRating;
            console.log("healthcheckrating");
            const addedEntry = patientsService_1.default.addHealthCheckEntry({ date, specialist, description, healthCheckRating, type: "HealthCheck" }, diagnosisCodes, patient_id);
            console.log("added, sending response");
            res.send(addedEntry);
            console.log("sent");
        }
        else if (req.body.employerName) {
            const employerName = req.body.employerName;
            if (req.body.sickLeave) {
                const sickLeave = req.body.sickLeave;
                const addedEntry = patientsService_1.default.addOccupationalHealthcareEntry({ date, specialist, description, sickLeave, employerName, type: "OccupationalHealthcare" }, diagnosisCodes, patient_id);
                res.send(addedEntry);
            }
            else {
                const addedEntry = patientsService_1.default.addOccupationalHealthcareEntry({ date, specialist, description, employerName, type: "OccupationalHealthcare" }, diagnosisCodes, patient_id);
                res.send(addedEntry);
            }
        }
        else if (req.body.discharge) {
            const discharge = req.body.discharge;
            const addedEntry = patientsService_1.default.addHospitalEntry({ date, specialist, description, discharge, type: "Hospital" }, diagnosisCodes, patient_id);
            res.send(addedEntry);
        }
    }
    else {
        res.send("ERROR");
    }
});
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    console.log("getting patient with id", req.params.id);
    res.send(patientsService_1.default.getPatientById(req.params.id));
});
router.post('/', (req, res) => {
    try {
        const { name, dateOfBirth, ssn, gender, occupation } = (0, utils_1.default)(req.body);
        const newPatient = patientsService_1.default.addPatient({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation,
            entries: [],
        });
        res.json(newPatient);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
exports.default = router;
