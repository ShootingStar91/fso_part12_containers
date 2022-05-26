import { State } from "./state";
import { Patient, Entry, Diagnosis } from "../types";



export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    patientId: string;
  } |
  {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return (
    { type: "SET_PATIENT_LIST", payload: patientListFromApi }
  );
};

export const setDiagnoses = (diagnosesFromApi: Diagnosis[]): Action => {
  return (
    { type: "SET_DIAGNOSES", payload: diagnosesFromApi }
  );
};

export const addEntry = (newEntry: Entry, patientId: string): Action => {
  return { type: "ADD_ENTRY", payload: newEntry, patientId };
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.patientId];
      patient.entries.push(action.payload);
      return {
        ...state
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.patients
        }
      };
    default:
      return state;
  }
};
