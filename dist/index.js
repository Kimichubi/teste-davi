"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const PollRouter_1 = __importDefault(require("./routes/PollRouter"));
const PollResponseRouter_1 = __importDefault(require("./routes/PollResponseRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", PollRouter_1.default, PollResponseRouter_1.default);
const server = app.listen(port, () => {
    console.log(`Incializando aplicação na porta: ${port}`);
});
process.on("beforeExit", () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    server.close(() => {
        console.log("Servidor encerrado.");
        process.exit(0);
    });
}));
