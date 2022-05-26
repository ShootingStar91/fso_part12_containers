"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseString = (str) => {
    if (!str || !isString(str)) {
        throw new Error('Some input string was not valid');
    }
    return str;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Date of birth is not a valid date string');
    }
    return dateOfBirth;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Gender was not valid');
    }
    return gender;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }) => {
    const newPatient = {
        name: parseString(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: entries
    };
    return newPatient;
};
exports.default = toNewPatient;
