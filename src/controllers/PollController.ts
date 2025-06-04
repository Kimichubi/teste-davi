import PollService from "../services/PollService";
import { Request, Response } from "express";

export default class PollController {
  pollService: PollService;
  constructor() {
    this.pollService = new PollService();
    this.list = this.list.bind(this);
    this.listById = this.listById.bind(this);
    this.listByUrl = this.listByUrl.bind(this);
    this.createPollAndResponses = this.createPollAndResponses.bind(this);
    this.editPollAndResponse = this.editPollAndResponse.bind(this);
    this.deletePollAndResponse = this.deletePollAndResponse.bind(this);
  }

  async list(req: Request, res: Response) {
    const { page } = req.query;

    await this.pollService
      .list(Number(page))
      .then((data) => {
        if (data.message) {
          return res.status(404).json(data);
        }
        return res.status(200).json(data.data);
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({ error: `Error : ${error}` });
      });
  }
  async listById(req: Request, res: Response) {
    const { id } = req.params;
    await this.pollService
      .listById(Number(id))
      .then((data) => {
        if (data.message) {
          return res.status(404).json(data);
        }
        return res.status(201).json(data);
      })
      .catch((error) => {
        res.status(401).json({ error: `Error : ${error}` });
      });
  }
  async listByUrl(req: Request, res: Response) {
    const { pollUrlToEdit } = req.params;
    await this.pollService
      .listByUrl(pollUrlToEdit)
      .then((data) => {
        if (data.message) {
          return res.status(404).json(data);
        }
        return res.status(201).json(data);
      })
      .catch((error) => {
        res.status(401).json({ error: `Error : ${error}` });
      });
  }
  async createPollAndResponses(req: Request, res: Response) {
    const body = req.body;
    await this.pollService
      .createPollAndResponses(body)
      .then((data) => {
        if (data.message) {
          return res.status(400).json(data.message);
        }
        res.status(201).json(data.data);
      })
      .catch((error) => {
        res.status(400).json({ error: `Error : ${error}` });
      });
  }
  async editPollAndResponse(req: Request, res: Response) {
    const { pollUrlToEdit } = req.params;
    const body = req.body;
    await this.pollService
      .editPollAndResponse(pollUrlToEdit, body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: `Error : ${error}` });
      });
  }
  async deletePollAndResponse(req: Request, res: Response) {
    const body = req.body;
    await this.pollService
      .deletePollAndResponse(body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: `Error : ${error}` });
      });
  }
}
