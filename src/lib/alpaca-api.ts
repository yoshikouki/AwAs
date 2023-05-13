import Alpaca from "@alpacahq/alpaca-trade-api";
import { AlpacaBar } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";
import { env } from "../env/server.mjs";
import { subBusinessDays } from "date-fns";

const client: Alpaca = new Alpaca({
  keyId: env.ALPACA_API_KEY,
  secretKey: env.ALPACA_SECRET_KEY,
  paper: true,
});

const getMultiBars = async ({
  symbols,
  startDate = subBusinessDays(new Date(), 4),
  timeframe = "1Day",
}: {
  symbols: string[];
  startDate?: Date;
  timeframe?: "1Day";
}): Promise<Record<string, AlpacaBar[]>> => {
  const response = client.getMultiBarsAsyncV2(symbols, {
    timeframe,
    start: startDate.toISOString(),
  });
  const got: Record<string, { [K in keyof AlpacaBar]: AlpacaBar[K] }[]> =
    Object.fromEntries(symbols.map((symbol) => [symbol.toUpperCase(), []]));
  for await (const bar of response) {
    got[bar.Symbol]?.push(bar);
  }
  return got;
};

export const alpacaApi = {
  client,
  getMultiBars,
};
