import bodyParser from "body-parser";
import express from "express";
import { config } from './config';
import KnexWrapper from "./core/dal/KnexWrapper";
import Repository from "./core/dal/Repository";
import Account from "./core/models/account";

KnexWrapper.getInstance();

const app = express();

// Parsing all request bodies into json.
app.use(bodyParser.json());
app.set('view engine', 'pug');

const PORT = config.port;

app.get('/', async (req, res) => {
  const repo = new Repository<Account>(Account.tableName);
  const result = await repo.find(1)
  res.render('index');
});

app.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Server is listening on port ${PORT}`);
});