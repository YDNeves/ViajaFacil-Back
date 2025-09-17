import { FastifyInstance } from "fastify";
import { hotelRoutes } from "./hotel.routes";
import { roomRoutes } from "./room.routes";
import { reviewRoutes } from "./review.routes";
import { bookingRoutes } from "./booking.routes";
import { userRoutes } from "./user.routes";
import authRoutes from "./auth.routes";
import { cityRoutes } from "./city.routes";

export async function registerRoutes(app: FastifyInstance) {
  await hotelRoutes(app);
  await cityRoutes(app)
  await roomRoutes(app);
  await reviewRoutes(app);
  await bookingRoutes(app);
  await userRoutes(app);
  await authRoutes(app);
}
