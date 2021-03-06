import bodyParser from 'body-parser';
import express from 'express';
import { serverConfig } from './config';
import { apiRouter } from './routes';
import cors from 'cors';

const app = express();

// Parsing all request bodies into json.
app.use(bodyParser.json());
app.use(cors());

const PORT = serverConfig.port;

app.use('/api', apiRouter());

app.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Server is listening on port ${PORT}`);
});
