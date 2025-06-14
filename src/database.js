import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

let db;

try {
  await mongoClient.connect();
  db = mongoClient.db(); 
  console.log("Conectado ao MongoDB com sucesso!");
} catch (err) {
  console.error("Erro ao conectar ao MongoDB:", err.message);
  process.exit(1); 
}

export default db;
