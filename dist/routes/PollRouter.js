"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PollController_1 = __importDefault(require("../controllers/PollController"));
const router = express_1.default.Router();
const pollController = new PollController_1.default();
router.get("/poll", pollController.list);
router.get("/poll/:id", pollController.listById);
router.post("/poll", pollController.createPollAndResponses);
router.put("/poll/:id", pollController.editPollAndResponse);
router.post("/delete/poll", pollController.deletePollAndResponse);
exports.default = router;
