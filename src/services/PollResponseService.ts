import { Prisma, PrismaClient } from "@prisma/client";
import {
  IPollReponseCreateDto,
  IPollReponseEditDto,
} from "../models/IPollResponse";
import { prisma } from "../index";

export default class PollResponsesService {
  constructor() {}

  async atributeVote(pollResponseId: number) {
    if (!pollResponseId) {
      return { message: "Id não informado da resposta da enquete" };
    }
    const pollResponseToUpdate = await prisma.pollResponse.findUnique({
      where: { id: pollResponseId },
    });
    if (!pollResponseToUpdate) {
      return { message: "Resposta de enquete não encontrada" };
    }
    const pollResponse = await prisma.pollResponse.update({
      where: {
        id: pollResponseToUpdate.id,
      },
      data: {
        vote: (pollResponseToUpdate.vote += 1),
      },
    });
    return { data: pollResponse };
  }
  async createResponse(body: {
    pollResponse: IPollReponseCreateDto[];
    pollId: number;
  }) {
    for (let i = 0; i < body.pollResponse.length; i++) {
      await prisma.pollResponse.createMany({
        data: {
          pollId: body.pollId,
          title: body.pollResponse[i].title,
          vote: 0,
        },
      });
    }
    const poll = await prisma.poll.findFirst({
      where: { id: body.pollId },
      include: {
        pollResponses: true,
      },
    });

    return poll;
  }
  async editResponse(pollResponseEdited: IPollReponseEditDto[]) {
    const pollResponses = new Array();
    for (let i = 0; i < pollResponseEdited.length; i++) {
      const pollResponse = await prisma.pollResponse.update({
        where: {
          id: pollResponseEdited[i].id,
        },
        data: pollResponseEdited[i],
      });
      pollResponses.push(pollResponse);
    }
    return pollResponses;
  }
  async deleteResponse(pollResponsesId: number[]) {
    await prisma.pollResponse.deleteMany({
      where: { id: { in: pollResponsesId } },
    });
  }
}
