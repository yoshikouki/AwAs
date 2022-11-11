import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import prisma from "../client";

type CreateInputType = Prisma.UserCreateInput;
const model = prisma.user;
const defaultAttributes = {
  uid: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  createdAt: faker.date.past(),
};

export const UserFactory = {
  create: async (attrs?: Partial<CreateInputType>) => {
    return await model.create({
      data: {
        ...defaultAttributes,
        ...attrs,
      },
    });
  },
};
