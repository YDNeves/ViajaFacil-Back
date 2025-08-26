import { prisma } from "../lib/prisma";
import type { Review } from "@prisma/client";

export interface CreateReviewDTO {
  rating: number;      // 0..5 (float)
  comment: string;
  userId: string;
  hotelId: string;
}

export class ReviewService {
  static async create(data: CreateReviewDTO): Promise<Review> {
    return prisma.review.create({ data });
  }

  static listByHotel(hotelId: string) {
    return prisma.review.findMany({
      where: { hotelId },
      include: { user: true },
      orderBy: { date: "desc" }
    });
  }

  static listByUser(userId: string) {
    return prisma.review.findMany({
      where: { userId },
      include: { hotel: true },
      orderBy: { date: "desc" }
    });
  }
}
