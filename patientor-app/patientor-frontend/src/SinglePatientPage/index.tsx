import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Icon, SemanticICONS } from "semantic-ui-react";

import { Patient, Diagnosis, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { DisplayEntries } from "./DisplayEntries";
import { AddEntryForm, EntryValues } from "./AddEntryForm";


const SinglePatientPage = () => {

  const [patient, setPatient] = useState<Patient | null>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: newPatient } = await axios.get<Patient>(
          `${apiBaseUrl as string}/patients/${id}`
        );
        const { data: newDiagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl as string}/diagnoses/`
        );
        setPatient(newPatient);
        setDiagnoses(newDiagnoses);
      } catch (e) {
        if (e) {
          if (e instanceof Error) {
            console.error(e || 'Unknown error when fetching patient');
          }
        }
      }
    };
    void fetchPatient();
    
  }, []);

  const onSubmit = async (values: EntryValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl as string}/patients/${id}/entries`,
        values
      );
      const newEntry = data;
      patient?.entries.push(newEntry);
      if (patient !== null && patient !== undefined) {
        setPatient({ ...patient });
      }
      resetForm();
      console.log("submitted");
      console.log(values);  
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.name || 'Unknown Error');
      }
    }
  };


  if (patient === null || patient === undefined) {
    return null;
  }

  let iconName: SemanticICONS;
  if (patient.gender === 'male') {
    iconName = 'mars';
  } else if (patient.gender === 'female') {
    iconName = 'venus';
  } else {
    iconName = 'venus mars';
  }
 
  return (
    <div className="App">
      <Container textAlign="left">
        <h2>{patient.name}</h2>
        <Icon fitted name={iconName} />
      </Container>
      <Container textAlign="left">
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
      </Container>
      <br />
      <Container>
        <AddEntryForm onSubmit={onSubmit} />
      </Container>
      <br />
      <Container textAlign="left">
        <DisplayEntries patient={patient} diagnoses={diagnoses} />
      </Container>
    </div>
  );
};




export default SinglePatientPage;