import { FastifyRequest, FastifyReply } from "fastify";
import { CityService, CreateCityParams } from "../services/city.service";

export const CityController = {
  async create(
    request: FastifyRequest<{ Body: CreateCityParams }>,
    reply: FastifyReply
  ) {
    try {
      const city = await CityService.create(request.body);
      return reply.code(201).send(city);
    } catch (error) {
      return reply.code(500).send({ error: "Erro ao criar cidade" });
    }
  },

  async findAll(_: FastifyRequest, reply: FastifyReply) {
    try {
      const cities = await CityService.findAll();
      return reply.send(cities);
    } catch {
      return reply.code(500).send({ error: "Erro ao listar cidades" });
    }
  },

  async findById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const city = await CityService.findById(request.params.id);

      if (!city) {
        return reply.code(404).send({ error: "Cidade não encontrada" });
      }

      return reply.send(city);
    } catch {
      return reply.code(500).send({ error: "Erro ao buscar cidade" });
    }
  },

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: CreateCityParams }>,
    reply: FastifyReply
  ) {
    try {
      const updated = await CityService.update(request.params.id, request.body);
      return reply.send(updated);
    } catch {
      return reply.code(500).send({ error: "Erro ao atualizar cidade" });
    }
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      await CityService.delete(request.params.id);
      return reply.code(204).send();
    } catch {
      return reply.code(500).send({ error: "Erro ao excluir cidade" });
    }
  },
};
