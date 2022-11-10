import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";

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

  updateByUid({ uid, name, email }: { uid: string; name: string; email: string }) {
    return this.prisma.user.upsert({
      where: { uid },
      update: { name, email },
      create: { uid, name, email },
    });
  }
}
