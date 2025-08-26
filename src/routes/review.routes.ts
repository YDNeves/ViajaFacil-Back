import { FastifyInstance } from "fastify";
import { ReviewController } from "../controllers/review.controller.js";
import { authenticate } from "../lib/middlewares/authenticate.js";

export async function reviewRoutes(app: FastifyInstance) {
  app.get("/hotels/:hotelId/reviews", ReviewController.listByHotel);
  app.get("/users/:userId/reviews", ReviewController.listByUser);
  app.post("/reviews", { preHandler: [authenticate] }, ReviewController.create);
}
