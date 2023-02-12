import { StockQuotesResponse } from "./fmp-api.d";
import { env } from "../env/server.mjs";

export class FmpApi {
  readonly fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
  readonly apiUrl: string;
  readonly apiKey: string;

  constructor(props?: Partial<FmpApi>) {
    this.fetch = props?.fetch || fetch;
    this.apiUrl = props?.apiUrl || "https://financialmodelingprep.com";
    this.apiKey = props?.apiKey || env.FMP_API_KEY;
  }

  async fetchStockQuotes(symbols: string[]) {
    return await this.get<StockQuotesResponse>(`/api/v3/quote/${symbols.join(",")}`);
  }

  async get<T>(path: string): Promise<T> {
    const url = `${this.apiUrl + path}?apikey=${this.apiKey}`;
    const response = await this.fetch(url);
    if (!response.ok) {
      throw new Error(`[status: ${response.status}] ${await response.text()}`);
    }
    return (await response.json()) as T;
  }
}
