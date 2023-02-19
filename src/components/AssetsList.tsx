import AssetsListItem from "./AssetsListItem";
import { apiClient } from "../utils/api";
import useSWR from "swr";

const AssetsList = () => {
  const { data: assets } = useSWR("/assets", () => apiClient.assets.query());
  const symbols = assets ? assets.map((asset) => asset.symbol) : [];
  const { data: prices } = useSWR(
    assets ? `/latestPrices/${symbols.join}` : null,
    () => apiClient.getLatestPrices.query({ symbols })
  );
  return (
    <div className="overflow-x-auto sm:px-4">
      <table className="table">
        <thead>
          <tr>
            <th>銘柄</th>
            <th className="text-end">保有数量</th>
            <th className="text-end">
              <div>現在価格</div>
              <div>取得価格</div>
            </th>
            <th className="text-end">
              <div>現在評価額</div>
              <div>取得評価額</div>
            </th>
            <th className="text-end">
              <div>利益率</div>
              <div>利益</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {assets?.map((asset) => {
            const latestDailyPrice = prices && prices[asset.symbol];
            return (
              <AssetsListItem
                asset={asset}
                latestDailyPrice={latestDailyPrice}
                key={asset.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsList;
