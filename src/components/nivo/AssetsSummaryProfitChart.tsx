import { ResponsiveBar } from "@nivo/bar";

interface Props {
  totalAcquisitionValue: number;
  portfolioValue: number;
  totalPL: number;
  totalPLPercentage: number;
}

export default function AssetsSummaryProfitChart({
  totalAcquisitionValue,
  portfolioValue,
  totalPL,
  totalPLPercentage,
}: Props) {
  const data = {
    acquisition: {
      value: totalAcquisitionValue,
      pl: totalPL > 0 ? totalPL : 0,
      plParentage: totalPL > 0 ? totalPLPercentage : 0,
    },
    market: {
      value: portfolioValue,
      pl: totalPL > 0 ? 0 : totalPL,
      plParentage: totalPL > 0 ? 0 : totalPLPercentage,
    },
  };

  return (
    <>
      <div className="h-full w-full space-y-1">
        <div className="flex space-x-1">
          <div className="grow rounded-lg bg-primary-focus py-8 text-4xl hover:ring-4">
            <span className="px-8">
              {Math.round(data.acquisition.value).toLocaleString("en-US")}
            </span>
          </div>
          {data.acquisition.pl > 0 && (
            <div
              className="flex-none rounded-lg bg-success py-8 text-4xl hover:ring-4"
              style={{
                width: `${
                  100 - (100 / (100 + data.acquisition.plParentage)) * 100
                }%`,
              }}
            >
              <span className="px-8">
                {Math.round(data.acquisition.pl).toLocaleString("en-US")}
              </span>
            </div>
          )}
        </div>

        <div className="flex space-x-1">
          <div className="grow rounded-lg bg-primary py-8 text-4xl hover:ring-4">
            <span className="px-8">
              {Math.round(data.market.value).toLocaleString("en-US")}
            </span>
          </div>
          {data.market.pl > 0 && (
            <div
              className="flex-none rounded-lg bg-success py-8 text-4xl hover:ring-4"
              style={{ width: `${data.market.plParentage}%` }}
            >
              <span className="px-8">
                {Math.round(data.market.pl).toLocaleString("en-US")}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
