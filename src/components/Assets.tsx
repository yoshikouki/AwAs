import Link from "next/link";
import { FaPen } from "react-icons/fa";
import useSWR from "swr";
import { apiClient, RouterOutputs } from "../utils/api";
import { mul, percent, sub } from "../utils/calculation";
import AssetsList from "./AssetsList";
import AssetsSummary from "./AssetsSummary";

const calculateValuationsOfAssets = (assets: RouterOutputs["assets"] | undefined, prices: RouterOutputs["getLatestPrices"] | undefined) => {
  return assets?.map((asset) => {
    const latestDailyPrice = prices && prices[asset.symbol];
    const close = latestDailyPrice?.close || 0;
    const averageTradedPrice = asset.averageTradedPrice || 0;
    const profitLossPerShare = averageTradedPrice
      ? sub(close, averageTradedPrice)
      : 0;
    return {
      id: asset.id,
      symbol: asset.symbol,
      name: asset.name,
      balance: asset.balance,
      averageTradedPrice,
      latestPrice: close,
      close,
      profitLossPerShare,
      profitLoss: mul(profitLossPerShare, asset.balance),
      profitLossPercentage: percent(profitLossPerShare, averageTradedPrice),
      acquisitionValue: mul(asset.balance, averageTradedPrice),
      marketValue: mul(asset.balance, close),
    };
  })
}

export type AssetsWithValuations = ReturnType<typeof calculateValuationsOfAssets>

const Assets = () => {
  const { data: assets } = useSWR("/assets", () => apiClient.assets.query());
  const symbols = assets ? assets.map((asset) => asset.symbol) : [];
  const { data: prices } = useSWR(
    symbols ? `/latestPrices/${symbols.join}` : null,
    () => apiClient.getLatestPrices.query({ symbols })
  );
  const assetsWithValuations = calculateValuationsOfAssets(assets, prices)

  return (
    <div className="prose w-full max-w-4xl">
      <h1 className="px-4">Assets</h1>

      <AssetsSummary assetsWithValuations={assetsWithValuations} />
      <AssetsList assets={assets} prices={prices} />

      <Link
        href="/assets/edit"
        prefetch={false}
        className="btn-primary btn-circle btn-lg btn fixed right-0 bottom-0 z-50 mb-20 mr-4 ml-4"
      >
        <FaPen className="text-2xl" />
      </Link>
    </div>
  );
};

export default Assets;
