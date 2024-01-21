import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getExpenses, upsertExpense, deleteExpense } from "./controllers/expensesController";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.get("/expenses", getExpenses);
app.post("/expenses/upsert", upsertExpense);
app.delete("/expenses/delete/:id", deleteExpense);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
