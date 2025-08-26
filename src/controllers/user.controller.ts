import { FastifyReply, FastifyRequest } from "fastify";
import * as userService from "../services/user.service";

export const getUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  reply.send(await userService.getUsers());
};

export const getUserById = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  reply.send(await userService.getUserById(id));
};
