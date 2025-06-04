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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class PollResponsesService {
    constructor() { }
    atributeVote(pollResponseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pollResponseId) {
                return { message: "Id não informado da resposta da enquete" };
            }
            const pollResponseToUpdate = yield index_1.prisma.pollResponse.findUnique({
                where: { id: pollResponseId },
            });
            if (!pollResponseToUpdate) {
                return { message: "Resposta de enquete não encontrada" };
            }
            const pollResponse = yield index_1.prisma.pollResponse.update({
                where: {
                    id: pollResponseToUpdate.id,
                },
                data: {
                    vote: (pollResponseToUpdate.vote += 1),
                },
            });
            return { data: pollResponse };
        });
    }
    createResponse(body) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < body.pollResponse.length; i++) {
                yield index_1.prisma.pollResponse.createMany({
                    data: {
                        pollId: body.pollId,
                        title: body.pollResponse[i].title,
                        vote: 0,
                    },
                });
            }
            const poll = yield index_1.prisma.poll.findFirst({
                where: { id: body.pollId },
                include: {
                    pollResponses: true,
                },
            });
            return poll;
        });
    }
    editResponse(pollResponseEdited) {
        return __awaiter(this, void 0, void 0, function* () {
            const pollResponses = new Array();
            for (let i = 0; i < pollResponseEdited.length; i++) {
                const pollResponse = yield index_1.prisma.pollResponse.update({
                    where: {
                        id: pollResponseEdited[i].id,
                    },
                    data: pollResponseEdited[i],
                });
                pollResponses.push(pollResponse);
            }
            return pollResponses;
        });
    }
    deleteResponse(pollResponsesId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.prisma.pollResponse.deleteMany({
                where: { id: { in: pollResponsesId } },
            });
        });
    }
}
exports.default = PollResponsesService;
