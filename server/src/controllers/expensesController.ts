import type { Expense } from "@prisma/client";
import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

import prisma from "../db";

export const getExpenses = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<Expense[] | void> => {
  if (!req.auth.userId) {
    res.json(req.auth);
    return;
  }

  try {
    const { startDate, endDate } = req.query;

    const startDateValue = startDate
      ? new Date(startDate as string)
      : new Date(0);
    const endDateValue = endDate ? new Date(endDate as string) : new Date();

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
  if (!req.auth.userId) {
    res.status(401).send("Unauthorized: no user ID provided");
    return;
  }

  try {
    const { title, amount, category, description, date } = req.body;

    // Check if the user exists
    const existingUser = await prisma.clerkUser.findUnique({
      where: { id: req.auth.userId },
    });

    if (!existingUser) {
      // If the user doesn't exist, create a new user
      const newUser = await prisma.clerkUser.create({
        data: { id: req.auth.userId },
      });
    }

    if (req?.body?.id) {
      const existingExpense = await prisma.expense.findUnique({
        where: {
          id: Number(req.body.id),
          clerkUserId: req.auth.userId as string,
        },
      });

      const updatedExpense = await prisma.expense.update({
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

      res.send(updatedExpense);
      return;
    } else {
      const newExpense = await prisma.expense.create({
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
      return;
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
