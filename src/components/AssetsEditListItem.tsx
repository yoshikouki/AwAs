"use client";
import { FocusEventHandler, KeyboardEventHandler } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaAt, FaDollarSign, FaTimes } from "react-icons/fa";

interface Props {
  asset: AssetEditProps;
  index: number;
  register: UseFormRegister<{ assets: AssetEditProps[] }>;
  removeAsset: (index: number) => void;
}

export interface AssetEditProps {
  symbol: string;
  balance: number;
  averageTradedPrice: number;
}

const AssetsEditListItem = ({ asset, index, register, removeAsset }: Props) => {
  const balanceValue = (asset.balance * asset.averageTradedPrice).toFixed(2).toLocaleString();
  const handleEnterKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    let nextInput: HTMLInputElement | null;
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      const [prefix, assetIndex, formIndex] = e.target.id.split("-");
      if (formIndex !== "2") {
        nextInput = document.querySelector(
          `#${prefix}-${assetIndex}-${parseInt(formIndex, 10) + 1}`
        );
      } else {
        nextInput = document.querySelector(`#${prefix}-${parseInt(assetIndex, 10) + 1}-0`);
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
    <div className="card w-full bg-base-100 shadow-md mb-8">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button onClick={() => removeAsset(index)} className="btn btn-ghost btn-sm" type="button">
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div
            className="tooltip tooltip-primary form-control col-span-2 sm:col-span-1"
            data-tip="ティッカーシンボル・証券コード（必須）"
          >
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center px-4 pointer-events-none text-primary">
                <FaAt />
              </div>

              <input
                {...register(`assets.${index}.symbol`, {
                  required: true,
                  maxLength: {
                    value: 5,
                    message: "5文字以下で入力してください",
                  },
                  value: asset.symbol,
                })}
                id={`asset-${index}-0`}
                className="input input-bordered w-full pl-10"
                onKeyDown={handleEnterKeyDown}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
            </div>

            {/* TODO: 編集時に銘柄名を表示させたい  */}
            {/* {asset.symbol && (
              <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt">銘柄</span>
              </label>
            )} */}
          </div>

          <div className="flex-1 tooltip tooltip-primary" data-tip="保有数（必須）">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center px-4 pointer-events-none text-primary">
                数
              </div>
              <input
                {...register(`assets.${index}.balance`, {
                  required: true,
                  valueAsNumber: true,
                  min: { value: 0, message: "0以上を入力してください" },
                  value: asset.balance,
                })}
                id={`asset-${index}-1`}
                className="input input-bordered w-full pl-10"
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
                  {...register(`assets.${index}.averageTradedPrice`, {
                    valueAsNumber: true,
                    min: { value: 0, message: "0以上を入力してください" },
                    value: asset.balance,
                  })}
                  id={`asset-${index}-2`}
                  className="input input-bordered w-full pl-10"
                  onKeyDown={handleEnterKeyDown}
                  onFocus={handleOnFocusInput}
                  onBlur={handleOnBlurInput}
                />
              </div>
              <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt">{balanceValue}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsEditListItem;
