import { faker } from '@faker-js/faker';
import prisma from '../client';

interface UserAttributes {
  uid?: string
  email?: string
  name?: string
  createdAt?: Date
}

export const UserFactory = {
  create: async (attrs?: UserAttributes) => {
    return await prisma.user.create({
      data: {
        uid: faker.datatype.uuid(),
        email: faker.internet.email(),
        name: faker.name.fullName(),
        createdAt: faker.date.past(),
        ...attrs,
      },
    });
  },
};
