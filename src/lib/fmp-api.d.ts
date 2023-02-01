export interface StockQuotesResponse {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: bigint;
  priceAvg50: number;
  priceAvg200: number;
  volume: bigint;
  avgVolume: bigint;
  exchange: string;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: bigint;
  timestamp: number;
}
