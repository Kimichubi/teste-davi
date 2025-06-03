import PollService from "../services/PollService";
import { Request, Response } from "express";
import PollResponsesService from "../services/PollResponseService";

export default class PollResponsesController {
  pollService: PollService;
  pollResponsesService: PollResponsesService;
  constructor() {
    this.pollService = new PollService();
    this.pollResponsesService = new PollResponsesService();
    this.atributeVote = this.atributeVote.bind(this);
  }

  async atributeVote(req: Request, res: Response) {
    const { id } = req.params;
    this.pollResponsesService
      .atributeVote(Number(id))
      .then((data) => {
        if (data?.message) {
          return res.status(400).json(data);
        }
        return res.status(201).json(data.data);
      })
      .catch((error) => {
        res.status(401).json({ error: `Error : ${error}` });
      });
  }
}
