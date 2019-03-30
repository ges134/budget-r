import bodyParser from "body-parser";
import express from "express";
import { config } from './config';
import KnexWrapper from "./core/dal/KnexWrapper";
import Repository from "./core/dal/Repository";
import Account from "./core/models/account";
import { apiRouter } from "./routes";

KnexWrapper.getInstance();

const app = express();

// Parsing all request bodies into json.
app.use(bodyParser.json());
app.set('view engine', 'pug');

const PORT = config.port;

app.use('/api', apiRouter());

app.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Server is listening on port ${PORT}`);
});