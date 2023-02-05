import { z } from "zod";

export const upsertAssetsSchema = z.object({
  assets: z.array(
    z.object({
      symbol: z.string().min(1).max(5),
      balance: z.preprocess((v) => Number(v), z.number().nonnegative()),
      averageTradedPrice: z.preprocess(
        (v) => Number(v),
        z.number().nonnegative().nullable()
      ),
    })
  ),
});
