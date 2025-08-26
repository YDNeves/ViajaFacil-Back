import { FastifyInstance } from "fastify";
import { SearchHistoryController } from "../controllers/searchHistory.controller.js";
import { authenticate } from "../lib/middlewares/authenticate.js";

export async function searchHistoryRoutes(app: FastifyInstance) {
  app.get("/users/:userId/search-history", { preHandler: [authenticate] }, SearchHistoryController.listByUser);
  app.post("/search-history", { preHandler: [authenticate] }, SearchHistoryController.create);
  app.delete("/users/:userId/search-history", { preHandler: [authenticate] }, SearchHistoryController.clear);
}
