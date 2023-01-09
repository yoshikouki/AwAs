"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { FaChevronLeft, FaCircleNotch, FaPlus } from "react-icons/fa";
import { useRestApi } from "../hooks/rest-api";
import { Asset } from "../types/asset";
import AssetsEditListItem, { AssetEditProps } from "./AssetsEditListItem";

const assetDefaultValue = {
  symbol: "",
  balance: 0,
  averageTradedPrice: 0.0,
};

const AssetsEdit = ({ assets }: { assets: Asset[] }) => {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      assets: assets.map((asset) => ({
        symbol: asset.symbol,
        balance: asset.balance,
        averageTradedPrice: asset.averageTradedPrice,
      })),
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "assets",
  });
  const { fetchApi } = useRestApi();
  const router = useRouter();

  const appendAsset = () => append(assetDefaultValue);
  const removeAsset = (index: number) => remove(index);
  const onSubmit = async (data: { assets: AssetEditProps[] }) => {
    const result = await fetchApi("/v1/assets", true, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    router.push("/assets");
  };

  return (
    <div className="prose w-full max-w-4xl sm:px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((asset, i) => (
          <AssetsEditListItem
            register={register}
            removeAsset={removeAsset}
            asset={asset}
            index={i}
            key={i}
          />
        ))}

        <div className="my-20 px-4">
          <button onClick={appendAsset} className="btn btn-ghost btn-block">
            <FaPlus className="mr-2" />
            追加
          </button>
        </div>

        <div className="flex gap-4 mt-20 px-4">
          <Link href="/assets" prefetch={false} className="btn btn-outline flex-1">
            <FaChevronLeft className="mr-2" />
            キャンセル
          </Link>
          <button type="submit" className="btn btn-primary flex-1">
            <FaCircleNotch className="mr-2" />
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetsEdit;
