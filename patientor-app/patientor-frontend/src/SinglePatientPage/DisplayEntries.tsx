import React from "react";
import { Segment, Icon, SemanticICONS, SemanticCOLORS } from "semantic-ui-react";
import { Patient, Entry, Diagnosis, HealthCheckRating } from "../types";

export const DisplayEntries = ({ patient, diagnoses }: { patient: Patient, diagnoses: Diagnosis[] }) => {
  return (
    <div>
    <h3>Entries</h3>
        {patient.entries.map(entry => 
          <DisplayEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
        )}
      </div>
  );
};

export const DisplayEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
      const getIcon = (type: string): SemanticICONS => {
        switch (type) {
          case 'Hospital':
            return 'hospital';
          case 'OccupationalHealthcare':
            return 'address card outline';
          case 'HealthCheck':
            return 'user doctor';
          default:
            return 'question circle outline';
        }
      };
      const getRatingColor = (rating: HealthCheckRating): SemanticCOLORS => {
        switch (rating) {
          case 0:
            return 'green';
          case 1:
              return 'yellow';
          case 2:
              return 'orange';          
          case 3:
              return 'red';
          default:
              return 'black';
        }
      };
      return (
        <Segment>
          <p>{entry.date} <Icon name={getIcon(entry.type)}/></p>
          <p><i>{entry.description}</i></p>
          <div>{entry.diagnosisCodes && <ul>{entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}</ul>}</div>
          <p>{entry.type === 'HealthCheck' && <Icon name="heart" color={getRatingColor(entry.healthCheckRating)} />  }</p>
        </Segment>
      );
};