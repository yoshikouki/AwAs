import prisma from "../prisma/client";
import { UserModel } from "./user.model";

const userModel = new UserModel();

describe("UserModel", () => {
  describe("#findOrCreateByUid", () => {
    test("should create new user ", async () => {
      expect(await prisma.user.count()).toBe(0);
      const user = await userModel.findOrCreateByUid({
        uid: "test_uid",
      });
      expect(user).toHaveProperty("uid", "test_uid");
      expect(await prisma.user.count()).toBe(1);
    });
  });
})
