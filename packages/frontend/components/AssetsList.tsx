"use client";
import { requiredAuth } from "../hooks/auth";
import { ProfitOrLossText } from "./ProfitOrLossText";

const assets = [
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

const AssetsList = requiredAuth(() => {
  return (
    <div className="sm:px-4 overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>銘柄</th>
            <th className="text-end">保有数量</th>
            <th className="text-end">
              <div>現在価格</div>
              <div>取得価格</div>
            </th>
            <th className="text-end">評価額</th>
            <th className="text-end">利益率</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, i) => (
            <tr className="hover" key={i}>
              {/* 銘柄 */}
              <th className="pr-0 md:pr-auto">
                <div>{asset.symbol}</div>
                <div className="text-ellipsis overflow-hidden w-20 md:w-auto">
                  {asset.name}
                </div>
              </th>
              {/* 保有数量 */}
              <td className="text-end">{asset.balance}</td>
              {/* 価格 */}
              <td className="text-end">
                <div className="font-bold">
                  <ProfitOrLossText
                    text={asset.marketPrice}
                    referenceValue={asset.averageTradedPrice}
                  />
                </div>
                <div>{asset.averageTradedPrice}</div>
              </td>
              {/* 評価額 */}
              <td className="text-end">
                <div className="font-bold">{asset.marketValue}</div>
                <div>
                  <ProfitOrLossText text={asset.return} referenceValue={0} />
                </div>
              </td>
              <td className="text-end">
                <ProfitOrLossText
                  text={`${asset.yieldPercentage} %`}
                  value={asset.yieldPercentage}
                  referenceValue={0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default AssetsList;
