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
const PollResponseService_1 = __importDefault(require("../services/PollResponseService"));
class PollResponsesController {
    constructor() {
        this.pollService = new PollService_1.default();
        this.pollResponsesService = new PollResponseService_1.default();
        this.atributeVote = this.atributeVote.bind(this);
    }
    atributeVote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            this.pollResponsesService
                .atributeVote(Number(id))
                .then((data) => {
                if (data === null || data === void 0 ? void 0 : data.message) {
                    return res.status(400).json(data);
                }
                return res.status(201).json(data.data);
            })
                .catch((error) => {
                res.status(401).json({ error: `Error : ${error}` });
            });
        });
    }
}
exports.default = PollResponsesController;
