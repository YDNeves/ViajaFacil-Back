import { number } from "zod";
import { prisma } from "../lib/prisma";

export interface CreateCityParams {
  name: string;
  province: string;
  description?: string | null;
}

export const CityService = {
  async create(data: CreateCityParams) {
    return prisma.city.create({
      data: {
        name: data.name,
        description: data.description ?? null,
      },
    });
  },

  async findAll() {
    return prisma.city.findMany();
  },

  async findById(id: string) {
    return prisma.city.findUnique({ where: { id } });
  },

  async update(id: string, data: CreateCityParams) {
    return prisma.city.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description ?? null,
      },
    });
  },

  async delete(id: string) {
    return prisma.city.delete({ where: { id } });
  },
};
