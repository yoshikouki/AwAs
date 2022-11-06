import { UserModel } from "../models/user.model";

export class AssetsService {
  readonly userModel: UserModel;

  constructor(props?: Partial<AssetsService>) {
    this.userModel = props?.userModel || new UserModel();
  }

  getAllAssetsByUser({ uid }: { uid: string }) {
    const user = this.userModel.findOneUserByUid({ uid });
    return [
      {
        symbol: "VTI",
        name: "バンガード・トータル・ストック・マーケットETF",
        balance: 34,
        averageTradedPrice: 210.2426,
        marketPrice: 188.93,
        marketValue: 6423.62,
        return: -724.62,
        yieldPercentage: -10.13,
      },
      {
        symbol: "XOM",
        name: "エクソンモービル",
        balance: 113,
        averageTradedPrice: 54.3089,
        marketPrice: 112.34,
        marketValue: 12694.42,
        return: 6557.51,
        yieldPercentage: 106.85,
      },
    ];
  };
}
