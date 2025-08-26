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
        province: data.province,
        description: data.description ?? null,
      },
    });
  },

  async findAll() {
    return prisma.city.findMany();
  },

  async findById(id: number) {
    return prisma.city.findUnique({ where: { id } });
  },

  async update(id: number, data: CreateCityParams) {
    return prisma.city.update({
      where: { id },
      data: {
        name: data.name,
        province: data.province,
        description: data.description ?? null,
      },
    });
  },

  async delete(id: number) {
    return prisma.city.delete({ where: { id } });
  },
};
