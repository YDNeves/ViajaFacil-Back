import { FastifyInstance } from 'fastify'
import { AttractionController } from '../controllers/attraction.controller'

export async function attractionRoutes(app: FastifyInstance) {
  const controller = new AttractionController()

  app.post('/attractions', controller.create.bind(controller))
  app.get('/attractions', controller.list.bind(controller))
  app.get('/attractions/:id', controller.findById.bind(controller))
}
