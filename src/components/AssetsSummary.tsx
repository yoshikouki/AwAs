import { mul, percent, sub, sum } from "../utils/calculation";
import { AssetsWithValuations } from "./Assets";

interface Props {
  assetsWithValuations: AssetsWithValuations;
}

const AssetsSummary = ({
  assetsWithValuations: assetsWithLatestPrices,
}: Props) => {
  const totalAcquisitionValue = assetsWithLatestPrices
    ? sum(assetsWithLatestPrices.map((asset) => asset.acquisitionValue))
    : 0;
  const portfolioValue = assetsWithLatestPrices
    ? sum(assetsWithLatestPrices.map((asset) => asset.marketValue))
    : 0;
  const totalPL = sub(portfolioValue, totalAcquisitionValue);
  const totalPLPercentage = percent(totalPL, totalAcquisitionValue);
  const numberOfAssetsWithoutValuations =
    assetsWithLatestPrices?.filter((asset) => asset.averageTradedPrice === 0) || [];

  return (
    <div className="prose w-full max-w-4xl">
      <h2 className="px-4">Summary</h2>
      取得合計額: {totalAcquisitionValue}
      評価合計額: {portfolioValue}
      利益: {totalPL}
      利益率: {totalPLPercentage}
      利益計上されていない資産: {numberOfAssetsWithoutValuations.length} 個
    </div>
  );
};

export default AssetsSummary;
