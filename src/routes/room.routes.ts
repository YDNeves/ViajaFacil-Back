import { FastifyInstance } from "fastify";
import { RoomController } from "../controllers/room.controller.js";
import { authenticate } from "../lib/middlewares/authenticate.js";

export async function roomRoutes(app: FastifyInstance) {
  app.get("/hotels/:hotelId/rooms", RoomController.listByHotel);
  app.post("/rooms", { preHandler: [authenticate] }, RoomController.create);
  app.put("/rooms/:id", { preHandler: [authenticate] }, RoomController.update);
  app.delete("/rooms/:id", { preHandler: [authenticate] }, RoomController.remove);
}
