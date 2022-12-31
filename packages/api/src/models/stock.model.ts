import { Stock } from "@awas/types/src/stock";
import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";

interface StockWithDailyStockPrice {
  id: number;
  symbol: string;
  dailyStockPrices: {
    date: Date;
    close: number;
  }[];
}

export class StockModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<StockModel>) {
    this.prisma = props?.prisma || prisma;
  }

  async findAll({ stockIds }: { stockIds: number[] }): Promise<Stock[]> {
    return await this.prisma.stock.findMany({
      where: {
        id: {
          in: stockIds,
        },
      },
    });
  }

  async findAllBySymbolsWithLatestDailyPrice(symbols: string[]): Promise<StockWithDailyStockPrice[]> {
    return await this.prisma.stock.findMany({
      where: {
        symbol: {
          in: symbols,
        },
      },
      select: {
        id: true,
        symbol: true,
        dailyStockPrices: {
          select: {
            date: true,
            close: true,
          },
          orderBy: { date: "desc" },
          take: 1,
        },
      },
    });
  }

  async findOrCreateAll({ symbols }: { symbols: string[] }): Promise<Stock[]> {
    await this.prisma.stock.createMany({
      data: symbols.map((symbol) => ({ symbol })),
      skipDuplicates: true,
    });
    return await this.prisma.stock.findMany({
      where: {
        symbol: {
          in: symbols,
        },
      },
    });
  }
}
