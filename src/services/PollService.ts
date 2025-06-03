import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
import IPoll, { IPollCreateDto, IPollEditDto } from "../models/IPoll";
import {
  IPollReponseCreateDto,
  IPollReponseEditDto,
} from "../models/IPollResponse";
import PollResponses from "./PollResponseService";

export default class PollService {
  prisma: PrismaClient;
  pollResponseService: PollResponses;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.pollResponseService = new PollResponses(this.prisma);
  }

  async list(page: number) {
    const polls = await this.prisma.poll.findMany({
      take: 10,
      skip: (page ? page : 1) * 10,
      include: {
        _count: true,
        pollResponses: true,
      },
    });
    if (!polls) {
      return { message: "Nenhuma Enquete foi encontrada!" };
    }
    return { data: polls };
  }

  async listById(id: number) {
    const poll = await this.prisma.poll.findUnique({
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
  }

  async createPollAndResponses(body: {
    pollBody: IPollCreateDto;
    pollResponse: IPollReponseCreateDto[];
  }) {
    const poll = await this.prisma.poll.create({
      data: body.pollBody,
    });

    if (!poll) {
      return { message: "Não foi possível criar a enquete" };
    }

    const pollResponses = this.pollResponseService.createResponse({
      pollResponse: body.pollResponse,
      pollId: poll.id,
    });

    return { data: { poll, pollResponses } };
  }

  async editPollAndResponse(body: {
    pollEditedBody: IPollEditDto;
    pollResponsesEdited: IPollReponseEditDto[];
    pollId: number;
    pollResponsesId: number[];
  }) {
    if (body.pollId) {
      const poll = await this.prisma.poll.update({
        where: {
          id: body.pollId,
        },
        data: body.pollEditedBody,
      });
      if (body.pollResponsesId) {
        const pollResponses = await this.pollResponseService.editResponse(
          body.pollResponsesId,
          {
            pollResponseEdited: body.pollResponsesEdited,
          }
        );
        return { data: { poll, pollResponses } };
      }
      return { data: poll };
    }

    if (body.pollResponsesId) {
      const pollResponses = await this.pollResponseService.editResponse(
        body.pollResponsesId,
        {
          pollResponseEdited: body.pollResponsesEdited,
        }
      );
      return { data: pollResponses };
    }
  }

  async deletePollAndResponse(body: {
    pollId: number;
    pollResponsesId: number[];
  }) {
    this.pollResponseService.deleteResponse(body.pollResponsesId);
    await this.prisma.poll.delete({ where: { id: body.pollId } });
  }
}
