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
    res.send(expenses);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/expenses/upsert", async (req, res) => {
  try {
    const { description, amount, date, id } = req.body;

    const existingExpense = await prisma.expense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (existingExpense) {
      const updatedExpense = await prisma.expense.update({
        where: {
          id: Number(id),
        },
        data: {
          description,
          amount,
          date,
        },
      });
      res.send(updatedExpense);
      return;
    } else {
      const newExpense = await prisma.expense.create({
        data: {
          description,
          amount,
          date,
        },
      });
      res.send(newExpense);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/expenses/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await prisma.expense.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(deletedExpense);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
