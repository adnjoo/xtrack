import type { Subscription } from "@prisma/client";
import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

import prisma from "../db";

export const getSubscriptions = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<Subscription[] | void> => {
  if (!req.auth.userId) {
    res.status(401).send("Unauthorized: no user ID provided");
    return;
  }

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
