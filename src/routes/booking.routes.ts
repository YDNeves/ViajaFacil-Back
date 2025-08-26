import { FastifyInstance } from "fastify";
import { BookingController } from "../controllers/booking.controller";
import { authenticate } from "../lib/middlewares/authenticate";

export async function bookingRoutes(app: FastifyInstance) {
  app.get("/users/:userId/bookings", { preHandler: [authenticate] }, BookingController.listByUser);
  app.get("/bookings/:id", { preHandler: [authenticate] }, BookingController.findById);
  app.post("/bookings", { preHandler: [authenticate] }, BookingController.create);
  app.patch("/bookings/:id/status", { preHandler: [authenticate] }, BookingController.updateStatus);
  app.post("/bookings/:id/cancel", { preHandler: [authenticate] }, BookingController.cancel);
}
