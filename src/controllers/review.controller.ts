import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ReviewService } from "../services/review.service.js";

const createSchema = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string().min(1),
  hotelId: z.string().uuid()
});
const byHotelSchema = z.object({ hotelId: z.string().uuid() });
const byUserSchema = z.object({ userId: z.string().uuid() });

export class ReviewController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createSchema.parse(req.body);
    const userId = (req.user as any).id;
    const review = await ReviewService.create({
      ...data,
      userId
          });
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
