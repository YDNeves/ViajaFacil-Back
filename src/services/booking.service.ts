import { prisma } from "../lib/prisma";
import type { Booking, BookingStatus } from "@prisma/client";

export interface CreateBookingDTO {
  userId: string;
  hotelId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
}

export class BookingService {
  static async create(data: CreateBookingDTO): Promise<Booking> {
    if (data.checkIn >= data.checkOut) {
      throw new Error("checkIn deve ser antes de checkOut");
    }
    // opcional: verificar overlaps do quarto
    return prisma.booking.create({ data });
  }

  static listByUser(userId: string) {
    return prisma.booking.findMany({
      where: { userId },
      include: { hotel: true, room: true },
      orderBy: { checkIn: "desc" }
    });
  }

  static updateStatus(id: string, status: BookingStatus) {
    return prisma.booking.update({ where: { id }, data: { status } });
  }

  static cancel(id: string) {
    return prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } });
  }

  static findById(id: string) {
    return prisma.booking.findUnique({ where: { id }, include: { hotel: true, room: true } });
  }
}
