import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { HotelService } from "../services/hotel.service.js";

const idSchema = z.object({ id: z.string().uuid() });
const createSchema = z.object({
  name: z.string().min(2),
  image: z.string().url(),
  location: z.string(),
  rating: z.number().min(0).max(5),
  reviewsCount: z.number().int().nonnegative(),
  price: z.number().positive(),
  originalPrice: z.number().positive().nullable().optional(),
  amenities: z.array(z.string()),
  distance: z.string(),
  deal: z.string().nullable().optional(),
  description: z.string(),
  images: z.array(z.string().url()).nonempty(),
  destinationId: z.string().uuid()
});

export class HotelController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createSchema.parse(req.body);
    const hotel = await HotelService.create(data);
    return reply.code(201).send(hotel);
  }

  static async list(_: FastifyRequest, reply: FastifyReply) {
    const hotels = await HotelService.list();
    return reply.send(hotels);
  }

  static async findById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(req.params);
    const hotel = await HotelService.findById(id);
    if (!hotel) return reply.code(404).send({ message: "Hotel not found" });
    return reply.send(hotel);
  }

  static async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(req.params);
    const data = createSchema.partial().parse(req.body);
    const hotel = await HotelService.update(id, data);
    return reply.send(hotel);
  }

  static async remove(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(req.params);
    await HotelService.remove(id);
    return reply.code(204).send();
  }

  static async listByDestination(req: FastifyRequest, reply: FastifyReply) {
    const params = z.object({ destinationId: z.string().uuid() }).parse(req.params);
    const hotels = await HotelService.listByDestination(params.destinationId);
    return reply.send(hotels);
  }

  static async favorite(req: FastifyRequest, reply: FastifyReply) {
    const params = z.object({ id: z.string().uuid() }).parse(req.params);
    const userId = (req.user as any).sub as string; // vindo do authenticate
    const result = await HotelService.toggleFavorite(userId, params.id);
    return reply.send({ favorites: result.favorites });
  }

  static async unfavorite(req: FastifyRequest, reply: FastifyReply) {
    const params = z.object({ id: z.string().uuid() }).parse(req.params);
    const userId = (req.user as any).sub as string;
    const result = await HotelService.removeFavorite(userId, params.id);
    return reply.send({ favorites: result.favorites });
  }
}
