import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import transactionSchema from "../schemas/transactionSchema.js";
import { createTransaction } from "../controllers/transactionController.js";
import { listTransactions, editTransaction, deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/transactions", authMiddleware, validateSchema(transactionSchema), createTransaction);
router.get("/transactions", authMiddleware, listTransactions);
router.put("/transactions/:id", authMiddleware, validateSchema(transactionSchema), editTransaction);
router.delete("/transactions/:id", authMiddleware, deleteTransaction);

export default router;
