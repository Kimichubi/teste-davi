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
const PollResponseService_1 = __importDefault(require("./PollResponseService"));
const index_1 = require("../index");
class PollService {
    constructor() {
        this.pollResponseService = new PollResponseService_1.default();
    }
    list(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const polls = yield index_1.prisma.poll.findMany({
                take: 10,
                skip: (page - 1) * 10,
                include: {
                    _count: true,
                    pollResponses: true,
                },
            });
            if (polls.length < 1) {
                return { message: "Nenhuma Enquete foi encontrada!" };
            }
            return { data: polls };
        });
    }
    listById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const poll = yield index_1.prisma.poll.findUnique({
                where: {
                    id,
                },
                include: {
                    pollResponses: true,
                },
            });
            if (!poll) {
                return { message: "Esta enquete não existe!" };
            }
            return { data: poll };
        });
    }
    createPollAndResponses(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.pollResponse.length < 3) {
                return { message: "Minímo de respostas não foi criado!" };
            }
            const poll = yield index_1.prisma.poll.create({
                data: body.pollBody,
            });
            if (!poll) {
                return { message: "Não foi possível criar a enquete" };
            }
            const pollResponses = yield this.pollResponseService.createResponse({
                pollResponse: body.pollResponse,
                pollId: poll.id,
            });
            return { data: pollResponses };
        });
    }
    editPollAndResponse(pollId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pollId) {
                const poll = yield index_1.prisma.poll.update({
                    where: {
                        id: pollId,
                    },
                    data: body.pollEditedBody,
                });
                if (body.pollResponsesEdited) {
                    const pollResponses = yield this.pollResponseService.editResponse(body.pollResponsesEdited);
                    return { data: { poll, pollResponses } };
                }
                return { data: poll };
            }
            if (body.pollResponsesEdited) {
                const pollResponses = yield this.pollResponseService.editResponse(body.pollResponsesEdited);
                return { data: pollResponses };
            }
        });
    }
    deletePollAndResponse(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.pollId) {
                yield index_1.prisma.pollResponse.deleteMany({ where: { pollId: body.pollId } });
                yield index_1.prisma.poll.delete({ where: { id: body.pollId } });
                return;
            }
            if (body.pollResponsesId) {
                this.pollResponseService.deleteResponse(body.pollResponsesId);
                return;
            }
        });
    }
}
exports.default = PollService;
