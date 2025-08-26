import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { SearchHistoryService } from "../services/searchHistory.service.js";

const createSchema = z.object({
  destination: z.string().min(1),
  filtersUsed: z.any(),
  userId: z.string().uuid()
});
const byUserSchema = z.object({ userId: z.string().uuid() });

export class SearchHistoryController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createSchema.parse(req.body);
    const item = await SearchHistoryService.create(data);
    return reply.code(201).send(item);
  }

  static async listByUser(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = byUserSchema.parse(req.params);
    const items = await SearchHistoryService.listByUser(userId);
    return reply.send(items);
  }

  static async clear(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = byUserSchema.parse(req.params);
    await SearchHistoryService.clearForUser(userId);
    return reply.code(204).send();
  }
}
