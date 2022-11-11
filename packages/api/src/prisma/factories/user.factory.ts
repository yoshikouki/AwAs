import { faker } from '@faker-js/faker';
import { createUserFactory } from "prisma-factory/generated";

interface UserAttributes {
  uid?: string
  email?: string
  name?: string
  createdAt?: Date
}

export const UserFactory = createUserFactory({
  uid: () => faker.datatype.uuid(),
  email: () => faker.internet.email(),
  name: () => faker.name.fullName(),
  createdAt: () => faker.date.past(),
});
