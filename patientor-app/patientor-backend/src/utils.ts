import { NewPatient, Gender, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (str: string): string => {
  if (!str || !isString(str)) {
    throw new Error('Some input string was not valid');
  }
  return str;
};

const parseDateOfBirth = (dateOfBirth: string): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Date of birth is not a valid date string');
  }
  return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: string): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Gender was not valid');
  }
  return gender;
};

type Fields = { name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string, entries: Entry[] };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: entries
  };
  return newPatient;
};

export default toNewPatient;