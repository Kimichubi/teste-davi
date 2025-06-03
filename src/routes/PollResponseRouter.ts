import express from "express";
import PollController from "../controllers/PollController";
import PollResponsesController from "../controllers/PollResponseController";

const router = express.Router();
const pollResponseController = new PollResponsesController();

router.get("/poll/vote/:id", pollResponseController.atributeVote);
