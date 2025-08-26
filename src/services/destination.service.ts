import { prisma } from "../lib/prisma";
import type { Destination } from "@prisma/client";

export interface CreateDestinationDTO {
  name: string;
  image: string;
  description: string;
}

export class DestinationService {
  static create(data: CreateDestinationDTO): Promise<Destination> {
    return prisma.destination.create({ data });
  }

  static list(): Promise<Destination[]> {
    return prisma.destination.findMany({ orderBy: { name: "asc" } });
  }

  static findById(id: string): Promise<Destination | null> {
    return prisma.destination.findUnique({ where: { id } });
  }

  static update(id: string, data: Partial<CreateDestinationDTO>): Promise<Destination> {
    return prisma.destination.update({ where: { id }, data });
  }

  static remove(id: string): Promise<Destination> {
    return prisma.destination.delete({ where: { id } });
  }
}
