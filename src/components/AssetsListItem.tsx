import { ProfitOrLossText } from "./ProfitOrLossText";
import { RouterOutputs } from "../utils/api";

interface Props {
  asset: RouterOutputs["assets"][number];
  latestDailyPrice: RouterOutputs["getLatestPrices"][string] | undefined;
}

const AssetsListItem = ({ asset, latestDailyPrice }: Props) => {
  const close = latestDailyPrice?.close || 0;
  const averageTradedPrice = asset.averageTradedPrice || 0;
  const profitLossPerShare = averageTradedPrice
    ? close - averageTradedPrice
    : 0;
  const profitLoss = profitLossPerShare * asset.balance;
  const profitLossPercentage = averageTradedPrice
    ? (profitLossPerShare / averageTradedPrice) * 100
    : 0;

  return (
    <tr className="hover">
      {/* 銘柄 */}
      <th className="md:pr-auto pr-0">
        <div>{asset.symbol}</div>
        {asset.name && (
          <div className="w-20 overflow-hidden text-ellipsis md:w-auto">
            {asset.name}
          </div>
        )}
      </th>
      {/* 保有数量 */}
      <td className="text-end">{asset.balance}</td>
      {/* 価格 */}
      <td className="text-end">
        <div className="font-bold">
          <ProfitOrLossText value={close} referenceValue={averageTradedPrice} />
        </div>
        <div>{averageTradedPrice}</div>
      </td>
      {/* 評価額 */}
      <td className="text-end">
        <div className="font-bold">
          <ProfitOrLossText
            value={close * asset.balance}
            referenceValue={averageTradedPrice * asset.balance}
          />
        </div>
        <div>{averageTradedPrice * asset.balance}</div>
      </td>
      {/* 利益 */}
      <td className="text-end">
        <div className="font-bold">
          <ProfitOrLossText
            text={`${profitLossPercentage.toFixed(2)} %`}
            value={profitLossPercentage}
            referenceValue={0}
          />
        </div>
        <div className="font-bold">
          <ProfitOrLossText value={profitLoss} referenceValue={0} />
        </div>
      </td>
    </tr>
  );
};

export default AssetsListItem;
