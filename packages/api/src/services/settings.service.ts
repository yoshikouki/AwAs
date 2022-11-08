import { UserModel } from "../models/user.model";

export class SettingsService {
  readonly userModel: UserModel;

  constructor(props?: Partial<SettingsService>) {
    this.userModel = props?.userModel || new UserModel();
  }

  async getByUser({ uid }: { uid: string }) {
    const { name, email } = await this.userModel.findOrCreateByUid({ uid });
    return { name, email };
  }

  async updateOnUser({
    uid,
    name,
    email,
  }: {
    uid: string;
    name: string;
    email: string;
  }) {
    let error: Error | null = null;
    const user = await this.userModel.updateByUid({
      uid,
      name,
      email,
    });
    return { profile: { name: user.name, email: user.email }, error };
  }
}
