import { PrismaClient } from "@prisma/client";
import PollService from "../services/PollService";
import { Request, Response } from "express";
import { prisma } from "../index";

export default class PollController {
  pollService: PollService;
  constructor() {
    this.pollService = new PollService(prisma);
  }

  async list(req: Request, res: Response) {
    const { page } = req.query;
    this.pollService
      .list(Number(page))
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((error) => {
        res.status(401).json({ error: `Error : ${error}` });
      });
  }
  async listById(req: Request, res: Response) {
    const { id } = req.params;
    this.pollService
      .listById(Number(id))
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((error) => {
        res.status(401).json({ error: `Error : ${error}` });
      });
  }
  async createPollAndResponses(req: Request, res: Response) {
    const body = req.body;
    this.pollService
      .createPollAndResponses(body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: `Error : ${error}` });
      });
  }
  async editPollAndResponse(req: Request, res: Response) {
    const body = req.body;
    this.pollService
      .editPollAndResponse(body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: `Error : ${error}` });
      });
  }
  async deletePollAndResponse(req: Request, res: Response) {
    const body = req.body;
    this.pollService
      .deletePollAndResponse(body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: `Error : ${error}` });
      });
  }
}
