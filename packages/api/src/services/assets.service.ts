import { UserModel } from "../models/user.model";

export class AssetsService {
  readonly userModel: UserModel;

  constructor(props?: Partial<AssetsService>) {
    this.userModel = props?.userModel || new UserModel();
  }

  getAllByUser({ uid }: { uid: string }) {
    const user = this.userModel.findOrCreateByUid({ uid });
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
      {
        symbol: "SPYD",
        name: "SPDR ポートフォリオS&P 500 高配当株式ETF",
        balance: 212,
        averageTradedPrice: 27.71,
        marketPrice: 38.88,
        marketValue: 1208.359,
        return: 2368.04,
        yieldPercentage: 40.31,
      },
    ];
  }

  updateAllByUser({ uid }: { uid: string }) {
    const user = this.userModel.findOrCreateByUid({ uid });

    return;
  }
}
