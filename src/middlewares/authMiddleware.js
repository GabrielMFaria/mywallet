import jwt from "jsonwebtoken";
import db from "../database.js";
import { ObjectId } from "mongodb";

export default async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send("Token não fornecido");
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return res.status(401).send("Usuário não autorizado");
    }

    res.locals.user = user; 
    next();
  } catch (err) {
    return res.status(401).send("Token inválido");
  }
}
