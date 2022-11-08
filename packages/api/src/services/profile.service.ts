import { UserModel } from "../models/user.model";

export class ProfileService {
  readonly userModel: UserModel;

  constructor(props?: Partial<ProfileService>) {
    this.userModel = props?.userModel || new UserModel();
  }

  async get({ uid }: { uid: string }) {
    await this.userModel.findOrCreateByUid({ uid });
    return true;
  }
}
