"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const console_1 = require("./console");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 8080;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.post("/", (req, res) => {
    // colorConsoleLog(req.body)
    console.log(req.body);
    res.send("hi");
});
app.listen(port, () => {
    (0, console_1.colorConsoleLog)(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map