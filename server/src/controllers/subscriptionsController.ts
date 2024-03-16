import type { Subscription } from "@prisma/client";
import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

import prisma from "../db";
import { checkOrCreateUser, checkUserId } from "../utils";

export const getSubscriptions = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<Subscription[] | void> => {
  checkUserId(req.auth.userId, res);

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        clerkUserId: req.auth.userId,
      },
    });

    res.send(subscriptions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const upsertSubscription = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<void> => {
  checkUserId(req.auth.userId, res);

  try {
    const { title, amount, category, description, dateStarted, dateEnded } =
      req.body;

    checkOrCreateUser(req.auth.userId as string);

    if (req?.body?.id) {
      const existingSubscription = await prisma.subscription.update({
        where: {
          id: Number(req.body.id),
        },
        data: {
          title,
          amount,
          category,
          description,
          dateStarted,
          dateEnded,
        },
      });

      res.send(existingSubscription);
    } else {
      const newSubscription = await prisma.subscription.create({
        data: {
          title,
          amount,
          category,
          description,
          dateAdded: new Date().toISOString(),
          dateStarted: dateStarted ? new Date(dateStarted).toISOString() : null,
          dateEnded: dateEnded ? new Date(dateEnded).toISOString() : null,
          clerkUserId: req.auth.userId as string,
        },
      });
      res.send(newSubscription);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteSubscription = async (
  req: Request,
  res: Response
): Promise<Subscription | void> => {
  checkUserId(req.auth.userId, res);

  try {
    const { id } = req.params;

    const deletedSubscription = await prisma.subscription.delete({
      where: {
        id: Number(id),
      },
    });

    res.send(deletedSubscription);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
