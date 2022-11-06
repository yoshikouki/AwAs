import { PrismaClient } from "@prisma/client";

export class UserModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<UserModel>) {
    this.prisma = props?.prisma || new PrismaClient();
  }

  findOneUserByUid({ uid }: { uid: string }) {
    return this.prisma.user.findUnique({ where: { uid } });
  }
}
