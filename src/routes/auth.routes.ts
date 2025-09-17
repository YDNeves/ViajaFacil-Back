import { FastifyInstance } from "fastify";
import * as authController from "../controllers/auth.controller";
import { authenticate } from "../lib/middlewares/authenticate";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/auth/register", authController.register);
  fastify.post("/auth/login", authController.login);
  fastify.get("/auth/me",{ preHandler: [authenticate] }, authController.me);
}
