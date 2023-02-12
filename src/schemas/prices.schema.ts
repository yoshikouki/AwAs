import { z } from "zod";

export const getLatestPricesSchema = z.object({
  symbols: z.array(z.string().min(1).max(5)),
});
