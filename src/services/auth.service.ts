import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (data: { name: string; email: string; password: string }) => {
  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { ...data, password: hashed },
  });
};

export const login = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(data.password, user.password || "");
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return { token, user };
};
