"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const express_1 = __importDefault(require("express"));
const console_1 = require("./console");
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 8080;
const connectDb = () => {
    return mongoose_1.default.connect('mongodb://127.0.0.1:27017/whatver');
};
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
const studentSchema = new mongoose_1.default.Schema({
    name: String
});
const Student = mongoose_1.default.model('student', studentSchema);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDb().catch(e => console.log(e));
        const student = yield Student.create({ name: "Andrew" });
        console.log("student --->", student);
        app.listen(port, () => {
            (0, console_1.colorConsoleLog)(`Server started at http://localhost:${port}`);
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.start = start;
//# sourceMappingURL=server.js.map