import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { BookingService } from "../services/booking.service.js";

const createSchema = z.object({
  userId: z.string().uuid(),
  hotelId: z.string().uuid(),
  roomId: z.string().uuid(),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  guests: z.number().int().positive(),
  totalPrice: z.number().positive()
});
const idSchema = z.object({ id: z.string().uuid() });
const statusSchema = z.object({ status: z.enum(["CONFIRMED", "CANCELLED", "PENDING"]) });
const byUserSchema = z.object({ userId: z.string().uuid() });

export class BookingController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createSchema.parse(req.body);
    const booking = await BookingService.create(data);
    return reply.code(201).send(booking);
  }

  static async listByUser(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = byUserSchema.parse(req.params);
    const bookings = await BookingService.listByUser(userId);
    return reply.send(bookings);
  }

  static async updateStatus(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(req.params);
    const { status } = statusSchema.parse(req.body);
    const updated = await BookingService.updateStatus(id, status);
    return reply.send(updated);
  }

  static async cancel(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(req.params);
    const updated = await BookingService.cancel(id);
    return reply.send(updated);
  }

  static async findById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(req.params);
    const booking = await BookingService.findById(id);
    if (!booking) return reply.code(404).send({ message: "Booking not found" });
    return reply.send(booking);
  }
}
