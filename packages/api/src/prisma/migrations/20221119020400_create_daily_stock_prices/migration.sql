-- CreateTable
CREATE TABLE "daily_stock_prices" (
    "id" SERIAL NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "open" INTEGER,
    "close" INTEGER NOT NULL,
    "high" INTEGER,
    "low" INTEGER,
    "adj_close" INTEGER,
    "volume" BIGINT,
    "unadjusted_volume" BIGINT,
    "change" INTEGER,
    "change_percent" INTEGER,
    "vwap" INTEGER,
    "change_overTime" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_stock_prices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "daily_stock_prices" ADD CONSTRAINT "daily_stock_prices_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
