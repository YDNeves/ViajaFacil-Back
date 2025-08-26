import { FastifyInstance } from "fastify";
import { hotelRoutes } from "./hotel.routes";
import { roomRoutes } from "./room.routes";
import { reviewRoutes } from "./review.routes";
import { bookingRoutes } from "./booking.routes";
import { searchHistoryRoutes } from "./searchHistory.routes";
import { userRoutes } from "./user.routes";

export async function registerRoutes(app: FastifyInstance) {
  await hotelRoutes(app);
  await roomRoutes(app);
  await reviewRoutes(app);
  await bookingRoutes(app);
  await searchHistoryRoutes(app);
  await userRoutes(app);
}
