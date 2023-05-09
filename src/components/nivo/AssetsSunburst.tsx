import { ResponsiveSunburst } from "@nivo/sunburst";

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

export default function AssetsSunburst({ assetsWithValuations }: Props) {
  const assetsForSunburst = {
    name: "test-sunburst",
    children: assetsWithValuations.map((asset) => ({
      name: asset.symbol,
      marketValue: asset.marketValue,
      latestPrice: asset.latestPrice,
      acquisitionValue: asset.acquisitionValue,
    })),
  };

  return (
    <ResponsiveSunburst
      data={assetsForSunburst}
      id="assets-sunburst"
      value="marketValue"
      cornerRadius={4}
      enableArcLabels={true}
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.4]] }}
      arcLabelsSkipAngle={10}
      borderWidth={2}
      tooltip={(e) => (
        <div style={{ backgroundColor: e.color, color: "black" }}>
          {e.data.name}: {Math.round(100 * e.percentage) / 100}%
        </div>
      )}
    />
  );
}
