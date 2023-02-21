import { mul, sum } from "../utils/calculation";
import { AssetsWithValuations } from "./Assets";

interface Props {
  assetsWithValuations: AssetsWithValuations;
}

const AssetsSummary = ({
  assetsWithValuations: assetsWithLatestPrices,
}: Props) => {
  const totalTradedPrice = assetsWithLatestPrices
    ? sum(
        assetsWithLatestPrices.map((asset) =>
          mul(asset.balance, asset.averageTradedPrice)
        )
      )
    : 0;

  return (
    <div className="prose w-full max-w-4xl">
      <h2 className="px-4">Summary</h2>
      {totalTradedPrice}
    </div>
  );
};

export default AssetsSummary;
