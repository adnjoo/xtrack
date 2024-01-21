import express, { Application } from "express";
import dotenv from "dotenv";
import "dotenv/config";
import cors from "cors";
import { ClerkExpressWithAuth, LooseAuthProp } from "@clerk/clerk-sdk-node";

import {
  getExpenses,
  upsertExpense,
  deleteExpense,
} from "./controllers/expensesController";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});


app.get("/expenses", ClerkExpressWithAuth({}), getExpenses);
app.post("/expenses/upsert", upsertExpense);
app.delete("/expenses/delete/:id", deleteExpense);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
