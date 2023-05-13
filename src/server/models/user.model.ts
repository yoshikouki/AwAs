import type { PrismaClient } from "@prisma/client";
import { prisma } from "../db";

export class UserModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<UserModel>) {
    this.prisma = props?.prisma || prisma;
  }

  async findOrCreateByUid({ uid }: { uid: string }) {
    const storedUser = await this.prisma.user.findUnique({
      where: { uid },
    });
    if (storedUser) return storedUser;

    return await this.prisma.user.create({
      data: { uid },
    });
  }

  updateByUid({
    uid,
    name,
    email,
  }: {
    uid: string;
    name: string | null;
    email: string | null;
  }) {
    return this.prisma.user.upsert({
      where: { uid },
      update: { name, email },
      create: { uid, name, email },
    });
  }
}
