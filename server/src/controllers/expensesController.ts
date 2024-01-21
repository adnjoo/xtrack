import { Request, Response } from "express";
import prisma from "../db";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.send(expenses);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const upsertExpense = async (req: Request, res: Response) => {
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
};

export const deleteExpense = async (req: Request, res: Response) => {
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
};
