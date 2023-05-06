import { ResponsivePie } from "@nivo/pie";
import { sum } from "../../utils/calculation";

interface Props {
  assetsWithValuations: {
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
  }[];
}

export default function AssetsPieChart({ assetsWithValuations }: Props) {
  const totalMarketValues = sum(assetsWithValuations.map((asset) => asset.marketValue));
  const data = assetsWithValuations.map((asset) => ({
    id: asset.symbol,
    label: asset.symbol,
    marketValue: asset.marketValue,
    latestPrice: asset.latestPrice,
    acquisitionValue: asset.acquisitionValue,
    percentage: Math.round((1000 * asset.marketValue) / totalMarketValues) / 10,
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
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsThickness={1}
      arcLinkLabelsStraightLength={8}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabel={(datum) => `${datum.data.percentage}%`}
      arcLabelsSkipAngle={16}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      tooltip={(e) => (
        <div className="p-4" style={{ backgroundColor: e.datum.color, color: "black" }}>
          {e.datum.label}: {Math.round(100 * e.datum.data.percentage) / 100}%
        </div>
      )}
    />
  );
};
