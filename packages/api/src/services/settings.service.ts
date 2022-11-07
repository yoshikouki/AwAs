import { UserModel } from "../models/user.model";

export class SettingsService {
  readonly userModel: UserModel;

  constructor(props?: Partial<SettingsService>) {
    this.userModel = props?.userModel || new UserModel();
  }

  getByUser({ uid }: { uid: string }) {
    const user = this.userModel.findOneUserByUid({ uid });
    return {
      name: "test name",
      email: "test@example.com",
    };
  }

  updateOnUser({ uid }: { uid: string }) {
    const user = this.userModel.findOneUserByUid({ uid });
    return;
  }
}
