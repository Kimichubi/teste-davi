import express from "express";
import PollController from "../controllers/PollController";

const router = express.Router();
const pollController = new PollController();

router.get("/poll", pollController.list);
router.get("/poll/:id", pollController.listById);
router.post("/poll", pollController.createPollAndResponses);
router.put("/poll/:id", pollController.editPollAndResponse);
router.delete("/poll/:id", pollController.deletePollAndResponse);
