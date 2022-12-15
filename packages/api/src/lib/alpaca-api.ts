import Alpaca from "@alpacahq/alpaca-trade-api";
import { AlpacaBar } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";
import { subBusinessDays } from "date-fns";
import configs from "../configs";

export class AlpacaApi {
  readonly client: Alpaca;

  constructor(props?: Partial<AlpacaApi>) {
    this.client =
      props?.client ||
      new Alpaca({
        keyId: configs.alpaca.apiKey,
        secretKey: configs.alpaca.SecretKey,
        paper: true,
      });
  }

  async getMultiBars(
    symbols: string[],
    startDate = subBusinessDays(new Date(), 4)
  ): Promise<Record<string, AlpacaBar[]>> {
    const response = this.client.getMultiBarsAsyncV2(symbols, {
      timeframe: "1Day",
      start: startDate.toISOString(),
    });
    let got: Record<string, AlpacaBar[]> = Object.fromEntries(
      symbols.map((symbol) => [symbol.toUpperCase(), []])
    );
    for await (const bar of response) {
        got[bar.Symbol]?.push(bar);
    }
    return got;
  }
}
