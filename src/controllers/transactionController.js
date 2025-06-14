import { ObjectId } from "mongodb";
import db from "../database.js";

export async function createTransaction(req, res) {
  const { value, description, type } = req.body;
  const userId = res.locals.userId;

  try {
    const transaction = {
      userId,
      value: parseFloat(value),
      description,
      type,
      createdAt: new Date()
    };

    await db.collection("transactions").insertOne(transaction);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function listTransactions(req, res) {
  const userId = res.locals.userId;
  const page = parseInt(req.query.page) || 1;

  if (page <= 0) return res.status(400).send("Número de página inválido");

  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ userId })
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .toArray();

    res.send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function editTransaction(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;
  const { value, description, type } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("ID inválido");
  }

  try {
    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id), userId });

    if (!transaction) {
      return res.status(401).send("Transação não encontrada ou não pertence ao usuário");
    }

    await db.collection("transactions").updateOne(
      { _id: new ObjectId(id) },
      { $set: { value, description, type } }
    );

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;
  const userId = res.locals.user._id.toString();

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("ID inválido");
  }

  try {
    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
    if (!transaction) {
      return res.status(404).send("Transação não encontrada");
    }

    if (transaction.userId.toString() !== userId) {
      return res.status(401).send("Não autorizado");
    }

    await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
