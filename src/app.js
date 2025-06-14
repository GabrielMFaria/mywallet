import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import transactionRouter from "./routers/transactionRouter.js";
import "./database.js"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(transactionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));