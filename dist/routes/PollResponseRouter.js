"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PollResponseController_1 = __importDefault(require("../controllers/PollResponseController"));
const router = express_1.default.Router();
const pollResponseController = new PollResponseController_1.default();
router.get("/poll/vote/:id", pollResponseController.atributeVote);
exports.default = router;
