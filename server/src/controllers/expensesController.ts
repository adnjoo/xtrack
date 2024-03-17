import type { Expense } from "@prisma/client";
import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

import prisma from "../db";
import { checkOrCreateUser } from "../utils";

export const getExpenses = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<Expense[] | void> => {
  try {
    const { startDate, endDate } = req.query;

    const startDateValue = startDate
      ? new Date(startDate as string)
      : new Date(0);

    const endDateValue = endDate
      ? endDate === startDate
        ? new Date(endDate as string).setHours(23, 59, 59) as any
        : new Date(endDate as string)
      : new Date();

    // console.log(startDateValue, endDateValue);

    const expenses = await prisma.expense.findMany({
      where: {
        clerkUserId: req.auth.userId,
        date: {
          gte: startDateValue,
          lte: endDateValue,
        },
      },
    });

    res.send(expenses);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const upsertExpense = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<Expense | void> => {
  try {
    const { title, amount, category, description, date } = req.body;

    checkOrCreateUser(req.auth.userId as string);

    if (req?.body?.id) {
      const existingExpense = await prisma.expense.update({
        where: {
          id: Number(req.body.id),
        },
        data: {
          title,
          amount,
          category,
          description,
          date,
          clerkUserId: req.auth.userId,
        },
      });

      res.send(existingExpense);
    } else {
      const newExpense: Expense = await prisma.expense.create({
        data: {
          title,
          amount,
          category,
          description,
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

export const deleteExpense = async (
  req: Request,
  res: Response
): Promise<Expense | void> => {
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
