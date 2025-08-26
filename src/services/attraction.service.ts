import { prisma } from '../lib/prisma';

export class AttractionService {
   async create(data: any) {
    return prisma.attraction.create({ data });
  }

   async list() {
    return prisma.attraction.findMany({ include: { city: true } });
  }

   async getById(id: number) {
    return prisma.attraction.findUnique({ where: { id }, include: { city: true } });
  }
}
