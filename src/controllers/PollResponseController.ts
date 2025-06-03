import { PrismaClient } from "@prisma/client";
import PollService from "../services/PollService";
import { Request, Response } from "express";
import PollResponsesService from "../services/PollResponseService";
import { prisma } from "../index";

export default class PollResponsesController {
  pollService: PollService;
  pollResponsesService: PollResponsesService;
  constructor() {
    this.pollService = new PollService(prisma);
    this.pollResponsesService = new PollResponsesService(prisma);
  }

  async atributeVote(req: Request, res: Response) {
    const { pollResponseId } = req.params;
    this.pollResponsesService
      .atributeVote(Number(pollResponseId))
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((error) => {
        res.status(401).json({ error: `Error : ${error}` });
      });
  }
}
