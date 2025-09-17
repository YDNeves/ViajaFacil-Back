import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { BookingService } from "../services/booking.service.js";

const createSchema = z.object({
  hotelId: z.string().uuid(),
  // roomId foi removido
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  guests: z.number().int().positive(),
  totalPrice: z.number().positive(),
});

// O restante dos schemas e métodos do controller permanecem os mesmos
const idSchema = z.object({ id: z.string().uuid() });
const statusSchema = z.object({ status: z.enum(["CONFIRMED", "CANCELLED", "PENDING"]) });
const byUserSchema = z.object({ userId: z.string().uuid() });

export class BookingController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    // Agora parseamos os dados simplificados
    const { hotelId, checkIn, checkOut, guests, totalPrice } = createSchema.parse(req.body);
    const userId = (req.user as any).id;

    // Chamamos o serviço com os dados simplificados
    const booking = await BookingService.create({
      hotelId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      userId,
    });
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
