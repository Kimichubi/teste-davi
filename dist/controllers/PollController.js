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
const PollService_1 = __importDefault(require("../services/PollService"));
class PollController {
    constructor() {
        this.pollService = new PollService_1.default();
        this.list = this.list.bind(this);
        this.listById = this.listById.bind(this);
        this.createPollAndResponses = this.createPollAndResponses.bind(this);
        this.editPollAndResponse = this.editPollAndResponse.bind(this);
        this.deletePollAndResponse = this.deletePollAndResponse.bind(this);
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page } = req.query;
            yield this.pollService
                .list(Number(page))
                .then((data) => {
                if (data.message) {
                    return res.status(404).json(data);
                }
                return res.status(200).json(data.data);
            })
                .catch((error) => {
                console.log(error);
                res.status(401).json({ error: `Error : ${error}` });
            });
        });
    }
    listById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            this.pollService
                .listById(Number(id))
                .then((data) => {
                if (data.message) {
                    return res.status(404).json(data);
                }
                return res.status(201).json(data);
            })
                .catch((error) => {
                res.status(401).json({ error: `Error : ${error}` });
            });
        });
    }
    createPollAndResponses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            this.pollService
                .createPollAndResponses(body)
                .then((data) => {
                if (data.message) {
                    return res.status(400).json(data.message);
                }
                res.status(201).json(data.data);
            })
                .catch((error) => {
                res.status(400).json({ error: `Error : ${error}` });
            });
        });
    }
    editPollAndResponse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = req.body;
            this.pollService
                .editPollAndResponse(Number(id), body)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                res.status(400).json({ error: `Error : ${error}` });
            });
        });
    }
    deletePollAndResponse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            this.pollService
                .deletePollAndResponse(body)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                res.status(400).json({ error: `Error : ${error}` });
            });
        });
    }
}
exports.default = PollController;
