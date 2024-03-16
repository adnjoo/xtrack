import { Response } from "express";

import prisma from "./db";

/**
 * Check if a user ID is provided and send an unauthorized status if not.
 *
 * @param {string | null} userId - the user ID to check
 * @param {Response} res - the response object
 * @returns {void}
 */
export const checkUserId = (userId: string | null, res: Response): void => {
  if (!userId) {
    res.status(401).send("Unauthorized: no user ID provided");
  }
};

/**
 * Checks if a user exists, and if not, creates a new user with the specified userId.
 *
 * @param {string} userId - The unique identifier of the user
 */
export const checkOrCreateUser = async (userId: string) => {
  const existingUser = await prisma.clerkUser.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    await prisma.clerkUser.create({
      data: { id: userId },
    });
  }
};
