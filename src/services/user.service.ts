import { prisma } from "../lib/prisma";

export const getUsers = async () => prisma.user.findMany();
export const getUserById = async (id: string) =>
  prisma.user.findUnique({ where: { id } });
