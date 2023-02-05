import { FaAt, FaDollarSign, FaTimes } from "react-icons/fa";
import { FocusEventHandler, KeyboardEventHandler } from "react";

import { RouterInputs } from "../utils/api";
import { UseFormRegister } from "react-hook-form";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

interface Props {
  asset: ArrayElement<RouterInputs["upsertAssets"]>;
  index: number;
  register: UseFormRegister<{
    assets: RouterInputs["upsertAssets"] | undefined;
  }>;
  removeAsset: (index: number) => void;
}

const AssetsEditListItem = ({ asset, index, register, removeAsset }: Props) => {
  const averageTradedPrice = asset.averageTradedPrice || 0;
  const balanceValue = (asset.balance * averageTradedPrice)
    .toFixed(2)
    .toLocaleString();
  const handleEnterKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    let nextInput: HTMLInputElement | null;
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      const [prefix, assetIndex, formIndex] = e.target.id.split("-");
      if (!(assetIndex && formIndex)) return;

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
    <div className="card mb-8 w-full bg-base-100 shadow-md">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            onClick={() => removeAsset(index)}
            className="btn-ghost btn-sm btn"
            type="button"
          >
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div
            className="form-control tooltip tooltip-primary col-span-2 sm:col-span-1"
            data-tip="ティッカーシンボル・証券コード（必須）"
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-primary">
                <FaAt />
              </div>

              <input
                {...register(`assets.${index}.symbol`)}
                id={`asset-${index}-0`}
                className="input-bordered input w-full pl-10"
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

          <div
            className="tooltip tooltip-primary flex-1"
            data-tip="保有数（必須）"
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-primary">
                数
              </div>
              <input
                {...register(`assets.${index}.balance`)}
                id={`asset-${index}-1`}
                className="input-bordered input w-full pl-10"
                onKeyDown={handleEnterKeyDown}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
            </div>
          </div>

          <div
            className="tooltip tooltip-primary flex-1"
            data-tip="平均取得価格"
          >
            <div className="form-control">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-primary">
                  <FaDollarSign />
                </div>
                <input
                  {...register(`assets.${index}.averageTradedPrice`)}
                  id={`asset-${index}-2`}
                  className="input-bordered input w-full pl-10"
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
