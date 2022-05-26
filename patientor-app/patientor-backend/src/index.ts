/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cors = require('cors');
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.static('build'));

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/diagnoses', diagnosesRouter);
app.use('/patients', patientsRouter);

const PORT = 3001;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

