import { percent, sub, sum } from "../utils/calculation";
import { FaPlus, FaMinus } from "react-icons/fa";

import AssetsSummaryProfitChart from "./nivo/AssetsSummaryProfitChart";
import { AssetsWithValuations } from "./Assets";
import classNames from "classnames";

interface Props {
  assetsWithValuations: AssetsWithValuations;
}

const AssetsSummary = ({ assetsWithValuations }: Props) => {
  const totalAcquisitionValue = assetsWithValuations
    ? sum(assetsWithValuations.map((asset) => asset.acquisitionValue))
    : 0;
  const portfolioValue = assetsWithValuations
    ? sum(assetsWithValuations.map((asset) => asset.marketValue))
    : 0;
  const totalPL = sub(portfolioValue, totalAcquisitionValue);
  const totalPLPercentage = percent(totalPL, totalAcquisitionValue);
  const numberOfAssetsWithoutValuations =
    assetsWithValuations?.filter((asset) => asset.averageTradedPrice === 0) ||
    [];

  return (
    <div className="prose w-full max-w-4xl">
      <div className="mb-8 text-8xl font-extrabold">
        <span
          className={classNames("inline-block text-6xl", {
            "text-success": totalPL > 0,
            "text-error": totalPL < 0,
          })}
        >
          {totalPL > 0 ? (
            <FaPlus />
            ) : (
            <FaMinus />
          )}
        </span>
        {Math.abs(Math.round(totalPLPercentage * 10) / 10)}
        <span className="text-4xl ">%</span>
      </div>

      <div className="mb-4">
        <AssetsSummaryProfitChart
          totalAcquisitionValue={totalAcquisitionValue}
          portfolioValue={portfolioValue}
          totalPL={totalPL}
          totalPLPercentage={totalPLPercentage}
        />
      </div>

      <div className="text-right text-sm">
        (利益計上されていない資産:{" "}
        <span className="font-normal">
          {numberOfAssetsWithoutValuations.length}
        </span>{" "}
        個)
      </div>
    </div>
  );
};

export default AssetsSummary;
