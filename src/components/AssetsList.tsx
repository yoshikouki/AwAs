import { RouterOutputs } from "../utils/api";
import AssetsListItem from "./AssetsListItem";

interface Props {
  assets: RouterOutputs["assets"] | undefined;
  prices: RouterOutputs["getLatestPrices"] | undefined;
}

const AssetsList = ({ assets, prices }: Props) => {
  return (
    <>
      <h2 className="px-4">All</h2>

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
    </>
  );
};

export default AssetsList;
