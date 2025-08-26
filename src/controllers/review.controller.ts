import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ReviewService } from "../services/review.service.js";

const createSchema = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string().min(1),
  userId: z.string().uuid(),
  hotelId: z.string().uuid()
});
const byHotelSchema = z.object({ hotelId: z.string().uuid() });
const byUserSchema = z.object({ userId: z.string().uuid() });

export class ReviewController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createSchema.parse(req.body);
    const review = await ReviewService.create(data);
    return reply.code(201).send(review);
  }

  static async listByHotel(req: FastifyRequest, reply: FastifyReply) {
    const { hotelId } = byHotelSchema.parse(req.params);
    const reviews = await ReviewService.listByHotel(hotelId);
    return reply.send(reviews);
  }

  static async listByUser(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = byUserSchema.parse(req.params);
    const reviews = await ReviewService.listByUser(userId);
    return reply.send(reviews);
  }
}
