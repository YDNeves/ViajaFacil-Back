import { FastifyInstance } from "fastify";
import * as userController from "../controllers/user.controller";

export  async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users", userController.getUsers);
  fastify.get("/users/:id", userController.getUserById);
}
