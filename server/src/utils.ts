import prisma from "./db";

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
