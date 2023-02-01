import Alpaca from "@alpacahq/alpaca-trade-api";
import { AlpacaBar } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";
import { env } from "../env/server.mjs";
import { subBusinessDays } from "date-fns";

export interface AlpacaApi {
  client: Alpaca;
  getMultiBars: (symbols: string[], startDate?: Date) => Promise<Record<string, AlpacaBar[]>>;
}

const client = new Alpaca({
  keyId: env.ALPACA_API_KEY,
  secretKey: env.ALPACA_SECRET_KEY,
  paper: true,
});

const getMultiBars = async (
  symbols: string[],
  startDate = subBusinessDays(new Date(), 4)
): Promise<Record<string, AlpacaBar[]>> => {
  const response = client.getMultiBarsAsyncV2(symbols, {
    timeframe: "1Day",
    start: startDate.toISOString(),
  });
  const got: Record<string, AlpacaBar[]> = Object.fromEntries(
    symbols.map((symbol) => [symbol.toUpperCase(), []])
  );
  for await (const bar of response) {
    got[bar.Symbol]?.push(bar);
  }
  return got;
};

export const alpacaApi: AlpacaApi = {
  client,
  getMultiBars,
};
