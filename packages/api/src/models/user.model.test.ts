import prisma from "../prisma/client";
import { UserFactory } from "../prisma/factories/user.factory";
import { UserModel } from "./user.model";

const userModel = new UserModel();

describe("UserModel", () => {
  describe("#findOrCreateByUid", () => {
    test("should create new user", async () => {
      expect(await prisma.user.count()).toBe(0);
      const user = await userModel.findOrCreateByUid({
        uid: "test_uid",
      });
      expect(user).toHaveProperty("uid", "test_uid");
      expect(await prisma.user.count()).toBe(1);
    });

    test("should return existed user", async () => {
      await UserFactory.create({ uid: "test_uid" });
      expect(await prisma.user.count()).toBe(1);
      const user = await userModel.findOrCreateByUid({
        uid: "test_uid",
      });
      expect(user).toHaveProperty("uid", "test_uid");
      expect(await prisma.user.count()).toBe(1);
    });
  });
})
