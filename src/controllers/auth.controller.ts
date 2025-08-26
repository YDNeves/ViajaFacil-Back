import { FastifyReply, FastifyRequest } from "fastify";
import * as authService from "../services/auth.service";

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const user = await authService.register(req.body as any);
  reply.send(user);
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = await authService.login(req.body as any);
  reply.send(token);
};
