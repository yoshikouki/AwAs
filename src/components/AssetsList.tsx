"use client";

import { ProfitOrLossText } from "./ProfitOrLossText";
import { useApi } from "../hooks/api";
import useSWR from "swr";

const AssetsList = () => {
  const { authedClient } = useApi();
  const { data: assets } = useSWR("/assets", () => authedClient.assets.query());

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
          {assets?.map((asset, i) => (
            <tr className="hover" key={i}>
              {/* 銘柄 */}
              <th className="pr-0 md:pr-auto">
                <div>{asset.symbol}</div>
                {asset.name && (
                  <div className="text-ellipsis overflow-hidden w-20 md:w-auto">{asset.name}</div>
                )}
              </th>
              {/* 保有数量 */}
              <td className="text-end">{asset.balance}</td>
              {/* 価格 */}
              <td className="text-end">
                <div className="font-bold">
                  <ProfitOrLossText
                    text={asset.marketPrice || 0}
                    referenceValue={asset.averageTradedPrice || 0}
                  />
                </div>
                <div>{asset.averageTradedPrice}</div>
              </td>
              {/* 評価額 */}
              <td className="text-end">
                <div className="font-bold">{asset.marketValue}</div>
                <div>
                  <ProfitOrLossText text={asset.profitLoss || 0} referenceValue={0} />
                </div>
              </td>
              <td className="text-end">
                <ProfitOrLossText
                  text={`${asset.profitLossPercentage || 0} %`}
                  value={asset.profitLossPercentage}
                  referenceValue={0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsList;
