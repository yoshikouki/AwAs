import Link from "next/link";
import { FaPen } from "react-icons/fa";
import useSWR from "swr";
import { apiClient, RouterOutputs } from "../utils/api";
import AssetsList from "./AssetsList";

const Assets = () => {
  const { data: assets } = useSWR("/assets", () => apiClient.assets.query());
  const symbols = assets ? assets.map((asset) => asset.symbol) : [];
  const { data: prices } = useSWR(
    symbols ? `/latestPrices/${symbols.join}` : null,
    () => apiClient.getLatestPrices.query({ symbols })
  );
  return (
    <div className="prose w-full max-w-4xl">
      <h1 className="px-4">Assets</h1>

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
