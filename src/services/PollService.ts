import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { IPollCreateDto, IPollEditDto } from "../models/IPoll";
import {
  IPollReponseCreateDto,
  IPollReponseEditDto,
} from "../models/IPollResponse";
import PollResponses from "./PollResponseService";
import { prisma } from "../index";

export default class PollService {
  pollResponseService: PollResponses;

  constructor() {
    this.pollResponseService = new PollResponses();
  }

  async list(page: number) {
    const polls = await prisma.poll.findMany({
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
  }

  async listById(id: number) {
    const poll = await prisma.poll.findUnique({
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
    if (body.pollResponse.length < 3) {
      return { message: "Minímo de respostas não foi criado!" };
    }

    const editUrlToken = randomUUID();
    const poll = await prisma.poll.create({
      data: {
        dateToEnd: body.pollBody.dateToEnd,
        dateToInit: body.pollBody.dateToInit,
        title: body.pollBody.title,
        urlToEdit: editUrlToken,
      },
    });

    if (!poll) {
      return { message: "Não foi possível criar a enquete" };
    }

    const pollResponses = await this.pollResponseService.createResponse({
      pollResponse: body.pollResponse,
      pollId: poll.id,
    });

    return { data: pollResponses };
  }

  async editPollAndResponse(
    pollUrlToEdit: string,
    body: {
      pollEditedBody: IPollEditDto;
      pollResponsesEdited: IPollReponseEditDto[];
    }
  ) {
    if (pollUrlToEdit) {
      const poll = await prisma.poll.update({
        where: {
          urlToEdit: pollUrlToEdit,
        },
        data: body.pollEditedBody,
      });
      if (body.pollResponsesEdited) {
        const pollResponses = await this.pollResponseService.editResponse(
          body.pollResponsesEdited
        );
        return { data: { poll, pollResponses } };
      }
      return { data: poll };
    }
  }

  async deletePollAndResponse(body: {
    pollId: number;
    pollResponsesId: number[];
  }) {
    if (body.pollId) {
      await prisma.pollResponse.deleteMany({ where: { pollId: body.pollId } });
      await prisma.poll.delete({ where: { id: body.pollId } });
      return;
    }
    if (body.pollResponsesId) {
      this.pollResponseService.deleteResponse(body.pollResponsesId);
      return;
    }
  }
}
