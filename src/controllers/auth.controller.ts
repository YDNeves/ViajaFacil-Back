import { FastifyReply, FastifyRequest } from "fastify";
import * as authService from "../services/auth.service";
import { prisma } from "../lib/prisma";

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const user = await authService.register(req.body as any);
  reply.send(user);
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = await authService.login(req.body as any);
  reply.send(token);
};

export const me = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // O JWT plugin já decodificou o token → req.user
    const userId = (req.user as any).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return reply.code(404).send({ error: "Usuário não encontrado" });
    }

    return reply.send(user);
  } catch (error) {
    return reply.code(401).send({ error: "Token inválido ou expirado" });
  }
}
