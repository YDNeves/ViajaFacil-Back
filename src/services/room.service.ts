import { prisma } from "../lib/prisma";
import type { Room } from "@prisma/client";

export interface CreateRoomDTO {
  name: string;
  price: number;
  originalPrice?: number | null;
  capacity: number;
  amenities: string[];
  image: string;
  hotelId: string;
}

export class RoomService {
  static create(data: CreateRoomDTO): Promise<Room> {
    return prisma.room.create({ data });
  }

  static listByHotel(hotelId: string): Promise<Room[]> {
    return prisma.room.findMany({ where: { hotelId }, orderBy: { name: "asc" } });
  }

  static update(id: string, data: Partial<CreateRoomDTO>): Promise<Room> {
    return prisma.room.update({ where: { id }, data });
  }

  static remove(id: string): Promise<Room> {
    return prisma.room.delete({ where: { id } });
  }

  static findById(id: string) {
    return prisma.room.findUnique({ where: { id } });
  }
}
