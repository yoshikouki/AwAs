import { ResponsivePie } from "@nivo/pie";
import { sum } from "../../utils/calculation";

interface Props {
  assetsWithValuations: AssetsWithValuation[];
}

interface AssetsWithValuation {
  id: number;
  symbol: string;
  name: string | null;
  balance: number;
  averageTradedPrice: number;
  latestPrice: number;
  close: number;
  profitLossPerShare: number;
  profitLoss: number;
  profitLossPercentage: number;
  acquisitionValue: number;
  marketValue: number;
}

const AssetProfitBarChart = (props: AssetsWithValuation) => {
  return (
    <div className="h-full w-full">
      <div className="flex">
        <div className="grow bg-primary-focus py-2" />
        {props.profitLoss > 0 && (
          <div
            className="flex-none bg-success py-2"
            style={{
              width: `${
                100 - (100 / (100 + props.profitLossPercentage)) * 100
              }%`,
            }}
          />
        )}
      </div>

      <div className="flex">
        <div className="grow bg-primary py-2" />
        {props.profitLoss < 0 && (
          <div
            className="flex-none bg-error py-2"
            style={{ width: `${Math.abs(props.profitLossPercentage)}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default function AssetsPieChart({ assetsWithValuations }: Props) {
  const totalMarketValues = sum(
    assetsWithValuations.map((asset) => asset.marketValue)
  );
  const data = assetsWithValuations.map((asset) => ({
    ...asset,
    label: asset.symbol,
    totalPercentage:
      Math.round((1000 * asset.marketValue) / totalMarketValues) / 10,
  }));

  return (
    <ResponsivePie
      data={data}
      value="marketValue"
      margin={{ top: 24, bottom: 24 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={0}
      arcLinkLabel="label"
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabel={(datum) => `${datum.data.totalPercentage}%`}
      arcLabelsSkipAngle={16}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      tooltip={(e) => (
        <div
          className="min-w-20 card text-primary-content shadow-xl"
          style={{ backgroundColor: e.datum.color }}
        >
          <div className="card-body">
            <h2 className="card-title">
              {e.datum.data.symbol} ({e.datum.data.totalPercentage}%)
            </h2>
            <div className="w-full">
              <AssetProfitBarChart {...e.datum.data} />
            </div>
            <p>
              {e.datum.data.marketValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p>
              {e.datum.data.profitLoss >= 0 ? "+" : "-"}
              <span className="text-xl">
                {Math.abs(
                  Math.round(e.datum.data.profitLossPercentage * 10) / 10
                )}
              </span>
              % (
              {Math.round(e.datum.data.profitLoss).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
              )
            </p>
          </div>
        </div>
      )}
    />
  );
}
