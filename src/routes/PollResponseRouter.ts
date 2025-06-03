import express from "express";
import PollResponsesController from "../controllers/PollResponseController";

const router = express.Router();
const pollResponseController = new PollResponsesController();

router.get("/poll/vote/:id", pollResponseController.atributeVote);
export default router;
