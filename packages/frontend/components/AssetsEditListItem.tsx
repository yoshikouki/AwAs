"use client";
import { FocusEventHandler, KeyboardEventHandler, useState } from "react";
import { FaAt, FaDollarSign, FaTimes } from "react-icons/fa";

interface Props {
  preAsset?: {
    symbol: string;
    balance: number;
    averageTradedPrice: number;
  };
  index: number;
}

const AssetsEditListItem = ({ preAsset, index }: Props) => {
  const [asset, setAsset] = useState({
    symbol: preAsset?.symbol || "",
    balance: preAsset?.balance.toString() || "0",
    averageTradedPrice: preAsset?.averageTradedPrice.toString() || "0",
  });
  const balanceValue = (
    parseInt(asset.balance, 10) * parseFloat(asset.averageTradedPrice)
  )
    .toFixed(2)
    .toLocaleString();
  const handleEnterKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    let nextInput: HTMLInputElement | null;
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      const [prefix, assetIndex, formIndex] = e.target.id.split("-");
      if (formIndex !== "2") {
        nextInput = document.querySelector(
          `#${prefix}-${assetIndex}-${parseInt(formIndex, 10) + 1}`
        );
      } else {
        nextInput = document.querySelector(
          `#${prefix}-${parseInt(assetIndex, 10) + 1}-0`
        );
      }
      if (nextInput) nextInput.focus();
    }
  };
  const handleOnFocusInput: FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.closest(".tooltip")?.classList.add("tooltip-open");
  };
  const handleOnBlurInput: FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.closest(".tooltip")?.classList.remove("tooltip-open");
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button className="btn btn-ghost btn-sm">
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div
            className="tooltip tooltip-primary form-control col-span-2 sm:col-span-1"
            data-tip="ティッカーシンボル・証券コード"
          >
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center px-4 pointer-events-none text-primary">
                <FaAt />
              </div>

              <input
                type="text"
                placeholder="シンボル"
                id={`asset-${index}-0`}
                className="input input-bordered w-full pl-10"
                value={asset.symbol}
                onChange={(e) => setAsset({ ...asset, symbol: e.target.value })}
                onKeyDown={handleEnterKeyDown}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
            </div>

            {asset.symbol && (
              <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt">銘柄</span>
              </label>
            )}
          </div>

          <div className="flex-1 tooltip tooltip-primary" data-tip="保有数">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center px-4 pointer-events-none text-primary">
                数
              </div>
              <input
                type="text"
                placeholder="保有数"
                id={`asset-${index}-1`}
                className="input input-bordered w-full pl-10"
                value={asset.balance}
                onChange={(e) =>
                  setAsset({ ...asset, balance: e.target.value })
                }
                onKeyDown={handleEnterKeyDown}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
            </div>
          </div>

          <div className="flex-1 tooltip tooltip-primary" data-tip="平均取得価格">
            <div className="form-control">
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center px-4 pointer-events-none text-primary">
                  <FaDollarSign />
                </div>
                <input
                  type="text"
                  placeholder="平均取得価格"
                  id={`asset-${index}-2`}
                  className="input input-bordered w-full pl-10"
                  value={asset.averageTradedPrice}
                  onChange={(e) =>
                    setAsset({ ...asset, averageTradedPrice: e.target.value })
                  }
                  onKeyDown={handleEnterKeyDown}
                  onFocus={handleOnFocusInput}
                  onBlur={handleOnBlurInput}
                />
              </div>
              {asset.balance && asset.averageTradedPrice && (
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt">{balanceValue}</span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsEditListItem;
