import { prisma } from "../lib/prisma";
import type { Hotel } from "@prisma/client";

export interface CreateHotelDTO {
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice?: number | null;
  amenities: string[];
  distance: string;
  deal?: string | null;
  description: string;
  images: string[];
  destinationId: string;
}

export class HotelService {
  static create(data: CreateHotelDTO): Promise<Hotel> {
    return prisma.hotel.create({ data });
  }

  static list(): Promise<Hotel[]> {
    return prisma.hotel.findMany();
  }

  static findById(id: string) {
    return prisma.hotel.findUnique({
      where: { id },
      include: { rooms: true, reviews: true }
    });
  }

  static update(id: string, data: Partial<CreateHotelDTO>) {
    return prisma.hotel.update({ where: { id }, data });
  }

  static remove(id: string) {
    return prisma.hotel.delete({ where: { id } });
  }

 /*  static listByDestination(destinationId: string) {
    return prisma.hotel.findMany({
      where: { destinationId },
      include: { rooms: true },
      orderBy: { name: "asc" }
    });
  } */

  /* static toggleFavorite(userId: string, hotelId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        favorites: { connect: { id: hotelId } }
      },
      include: { favorites: true }
    });
  } */

  /* static removeFavorite(userId: string, hotelId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        favorites: { disconnect: { id: hotelId } }
      },
      include: { favorites: true }
    });
  } */
}
