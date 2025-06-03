import { Prisma, PrismaClient } from "@prisma/client";
import {
  IPollReponseCreateDto,
  IPollReponseEditDto,
} from "../models/IPollResponse";

export default class PollResponses {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createResponse(body: {
    pollResponse: IPollReponseCreateDto[];
    pollId: number;
  }) {
    const pollResponses = new Array();
    for (let i = 0; i < body.pollResponse.length; i++) {
      const pollResponse = await this.prisma.pollResponse.createMany({
        data: body.pollResponse[i],
      });
      pollResponses.push(pollResponse);
    }

    return pollResponses;
  }
  async editResponse(
    pollResponseId: number[],
    body: {
      pollResponseEdited: IPollReponseEditDto[];
    }
  ) {
    const pollResponses = new Array();
    for (let i = 0; i < pollResponseId.length; i++) {
      const pollResponse = await this.prisma.pollResponse.update({
        where: {
          id: pollResponseId[i],
        },
        data: body.pollResponseEdited[i],
      });
      pollResponses.push(pollResponse);
    }
    return pollResponses;
  }
  async deleteResponse(pollResponsesId: number[]) {
    await this.prisma.pollResponse.deleteMany({
      where: { id: { in: pollResponsesId } },
    });
  }
}
