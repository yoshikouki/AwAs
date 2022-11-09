import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

export class AssetModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<AssetModel>) {
    this.prisma = props?.prisma || prisma;
  }

  upsertAll({
    uid,
    assets,
  }: {
    uid: string;
    assets: { symbol: string; balance: number; averageTradedPrice: number }[];
  }) {
    // return this.prisma.asset.upsert({
    //   where: { uid },
    //   update: { symbol, balance, averageTradedPrice },
    //   create: { uid, name, email },
    // });
  }
}
