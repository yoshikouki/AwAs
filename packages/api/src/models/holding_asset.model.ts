import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";

export class HoldingAssetModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<HoldingAssetModel>) {
    this.prisma = props?.prisma || prisma;
  }

  upsertAll({
    uid,
    assets,
  }: {
    uid: string;
    assets: { symbol: string; balance: number; averageTradedPrice: number }[];
  }) {
    // return this.prisma.holdingAsset.upsert({
    //   where: { uid },
    //   update: { symbol, balance, averageTradedPrice },
    //   create: { uid, name, email },
    // });
  }
}
