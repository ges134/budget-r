import express from "express";
import bodyParser from "body-parser";
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

app.get('/', (req, res) => {
  const repo = new Repository<Account>(Account.tableName);
  const result = repo.find(1).then(result => {
    console.log(result);
    res.render('index');
 });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});