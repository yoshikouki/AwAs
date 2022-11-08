import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

export class UserModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<UserModel>) {
    this.prisma = props?.prisma || prisma;
  }

  findOneUserByUid({ uid }: { uid: string }) {
    return this.prisma.user.findUnique({ where: { uid } });
  }
}
