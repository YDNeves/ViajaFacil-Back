import { prisma } from "../lib/prisma";
import type { SearchHistory } from "@prisma/client";

export interface CreateSearchHistoryDTO {
  destination: string;
  filtersUsed: unknown; // JSON
  userId: string;
}

export class SearchHistoryService {
  static create(data: CreateSearchHistoryDTO): Promise<SearchHistory> {
    return prisma.searchHistory.create({ data });
  }

  static listByUser(userId: string): Promise<SearchHistory[]> {
    return prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { date: "desc" }
    });
  }

  static clearForUser(userId: string) {
    return prisma.searchHistory.deleteMany({ where: { userId } });
  }
}
