import { Stock } from "@awas/types/src/stock";
import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";

export class StockModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<StockModel>) {
    this.prisma = props?.prisma || prisma;
  }

  async findMany({ stockIds }: { stockIds: number[] }): Promise<Stock[]> {
    return await this.prisma.stock.findMany({
      where: {
        id: {
          in: stockIds,
        },
      },
    });
  }

  async findOrCreateMany({ symbols }: { symbols: string[] }): Promise<Stock[]> {
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
