import { FastifyInstance } from "fastify";
import { CityController } from "../controllers/city.controller";

export async function cityRoutes(app: FastifyInstance) {
  app.post("/cities", CityController.create);
  app.get("/cities", CityController.findAll);
  app.get("/cities/:id", CityController.findById);
}
