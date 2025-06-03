import express from "express";
import PollController from "../controllers/PollController";

const router = express.Router();
const pollController = new PollController();

router.get("/poll", pollController.list);
router.get("/poll/:id", pollController.listById);
router.post("/poll", pollController.createPollAndResponses);
router.put("/poll/:id", pollController.editPollAndResponse);
router.post("/delete/poll", pollController.deletePollAndResponse);

export default router;
