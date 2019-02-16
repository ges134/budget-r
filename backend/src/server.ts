import express from "express";
import bodyParser from "body-parser";
import { config } from './config';

const app = express();

// Parsing all request bodies into json.
app.use(bodyParser.json());
app.set('view engine', 'pug')

const PORT = config.port;

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});