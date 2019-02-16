"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const app = express_1.default();
// Parsing all request bodies into json.
app.use(body_parser_1.default.json());
app.set('view engine', 'pug');
const PORT = config_1.config.port;
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map