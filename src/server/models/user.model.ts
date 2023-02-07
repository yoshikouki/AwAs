import type { PrismaClient } from "@prisma/client";
import { prisma } from "../db";

export class UserModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<UserModel>) {
    this.prisma = props?.prisma || prisma;
  }

  findOrCreateByUid({ uid }: { uid: string }) {
    return this.prisma.user.upsert({
      where: { uid },
      update: {},
      create: { uid },
    });
  }

  updateByUid({ uid, name, email }: { uid: string; name: string | null; email: string | null }) {
    return this.prisma.user.upsert({
      where: { uid },
      update: { name, email },
      create: { uid, name, email },
    });
  }
}