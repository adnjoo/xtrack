import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.get("/expenses", async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.send({
      message: "List of Expenses",
      data: expenses,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/expenses/new", async (req, res) => {
  try {
    const { description, amount, date } = req.body;

    const newExpense = await prisma.expense.create({
      data: {
        description,
        amount,
        date,
      },
    });

    res.status(201).send({
      message: "Expense created successfully",
      data: newExpense,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
