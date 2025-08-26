import { FastifyInstance } from "fastify";
import { HotelController } from "../controllers/hotel.controller";
import { authenticate } from "../lib/middlewares/authenticate";

export async function hotelRoutes(app: FastifyInstance) {
  app.get("/hotels", HotelController.list);
  app.get("/hotels/:id", HotelController.findById);
  app.get("/destinations/:destinationId/hotels", HotelController.listByDestination);

  app.post("/hotels", { preHandler: [authenticate] }, HotelController.create);
  app.put("/hotels/:id", { preHandler: [authenticate] }, HotelController.update);
  app.delete("/hotels/:id", { preHandler: [authenticate] }, HotelController.remove);

  app.post("/hotels/:id/favorite", { preHandler: [authenticate] }, HotelController.favorite);
  app.delete("/hotels/:id/favorite", { preHandler: [authenticate] }, HotelController.unfavorite);
}
