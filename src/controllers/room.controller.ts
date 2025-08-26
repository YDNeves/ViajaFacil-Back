import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RoomService } from "../services/room.service.js";

const createSchema = z.object({
  name: z.string(),
  price: z.number().positive(),
  originalPrice: z.number().positive().nullable().optional(),
  capacity: z.number().int().positive(),
  amenities: z.array(z.string()),
  image: z.string().url(),
  hotelId: z.string().uuid()
});
const idSchema = z.object({ id: z.string().uuid() });
const byHotelSchema = z.object({ hotelId: z.string().uuid() });

export class RoomController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createSchema.parse(req.body);
    const room = await RoomService.create(data);
    return reply.code(201).send(room);
  }

  static async listByHotel(req: FastifyRequest, reply: FastifyReply) {
    const { hotelId } = byHotelSchema.parse(req.params);
    const rooms = await RoomService.listByHotel(hotelId);
    return reply.send(rooms);
  }

  static async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(req.params);
    const data = createSchema.partial().parse(req.body);
    const room = await RoomService.update(id, data);
    return reply.send(room);
  }

  static async remove(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(req.params);
    await RoomService.remove(id);
    return reply.code(204).send();
  }
}
