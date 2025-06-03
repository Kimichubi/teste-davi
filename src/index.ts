import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

const route = express.Router();

app.use(express.json());

const server = app.listen(port, () => {
  console.log(`Incializando aplicação na porta: ${port}`);
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

process.on("SIGINT", async () => {
  server.close(() => {
    console.log("Servidor encerrado.");
    process.exit(0);
  });
});
