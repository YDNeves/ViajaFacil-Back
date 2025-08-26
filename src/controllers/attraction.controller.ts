import { FastifyRequest, FastifyReply } from 'fastify'
import { AttractionService } from '../services/attraction.service'

const service = new AttractionService()

export class AttractionController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, description, cityId, imageUrl } = req.body as {
        name: string
        description: string
        cityId: number
        imageUrl?: string
      }

      const attraction = await service.create({ name, description, cityId, imageUrl })

      return reply.code(201).send(attraction)
    } catch (err:any) {
      return reply.code(400).send({ error: err.message })
    }
  }

  async list(_: FastifyRequest, reply: FastifyReply) {
    try {
      const attractions = await service.list()
      return reply.send(attractions)
    } catch (err) {
      return reply.code(500).send({ error: 'Erro ao listar atrações.' })
    }
  }

   async findById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number((req.params as { id: string }).id)
      const attraction = await service.getById(id)

      if (!attraction) {
        return reply.code(404).send({ error: 'Atração não encontrada.' })
      }

      return reply.send(attraction)
    } catch (err:any) {
      return reply.code(400).send({ error: err.message })
    }
  } 

}
