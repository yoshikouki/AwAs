-- AlterTable
ALTER TABLE "daily_stock_prices" ALTER COLUMN "open" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "close" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "high" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "low" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "adj_close" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "change" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "change_percent" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "vwap" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "change_overTime" SET DATA TYPE DOUBLE PRECISION;