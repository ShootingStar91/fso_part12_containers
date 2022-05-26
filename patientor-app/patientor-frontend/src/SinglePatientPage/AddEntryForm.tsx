import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
export type EntryValues = Omit<HealthCheckEntry, 'id'>;


interface Props {
  onSubmit: (values: EntryValues, { resetForm }: { resetForm: () => void}) => void;
}

export const AddEntryForm = ({ onSubmit }: Props) => {
  const [ { diagnoses } ] = useStateValue();
  return (
    <>
      <Formik
        initialValues={{
          description: "",
          date: "",
          specialist: "",
          healthCheckRating: 0,
          diagnosisCodes: [],
          type: "HealthCheck"
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field required!";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          return errors;
        } }>
        
      {({ isValid, dirty, setFieldValue, setFieldTouched, handleReset }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField} />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField} />
            <Field
              label="HealthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={handleReset} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    
    </>
    
  );
};