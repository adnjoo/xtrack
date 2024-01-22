import type { Expense } from "@prisma/client";
import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

import prisma from "../db";

export const getExpenses = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<Expense[] | void> => {

  // console.log(req.auth)
  if (!req.auth.userId) {
    res.json(req.auth);
    return;
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        clerkUserId: req.auth.userId,
      },
    });
    
    res.send(expenses);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const upsertExpense = async (req: WithAuthProp<Request>, res: Response): Promise<Expense | void> => {

    if (!req.auth.userId) {
      res.json(req.auth);
      return;
    }
  try {
    const { description, amount, date, id } = req.body;

    const existingExpense = await prisma.expense.findUnique({
      where: {
        id: Number(id),
        clerkUserId: req.auth.userId,
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
          clerkUserId: req.auth.userId,
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
          clerkUserId: req.auth.userId,
        },
      });

      res.send(newExpense);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteExpense = async (req: Request, res: Response): Promise<Expense | void> => {
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
