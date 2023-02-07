import { FaChevronLeft, FaCircleNotch, FaPlus } from "react-icons/fa";
import { useFieldArray, useForm } from "react-hook-form";

import AssetsEditListItem from "./AssetsEditListItem";
import Link from "next/link";
import { api } from "../utils/api";
import { upsertAssetsSchema } from "../schemas/assets.schema";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const assetDefaultValue = {
  symbol: "",
  balance: 0,
  averageTradedPrice: 0.0,
};

const AssetsEdit = () => {
  const { data: storedAssets } = api.assets.useQuery();
  const mutation = api.upsertAssets.useMutation();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(upsertAssetsSchema),
    defaultValues: {
      assets: storedAssets
        ? storedAssets.map((asset) => ({
            symbol: asset.symbol,
            balance: asset.balance,
            averageTradedPrice: asset.averageTradedPrice,
          }))
        : [assetDefaultValue],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
  });
  const appendAsset = () => append(assetDefaultValue);
  const removeAsset = (index: number) => remove(index);

  const router = useRouter();
  const onSubmit = handleSubmit(({ assets }) => {
    mutation.mutate({ assets });
    router.push("/assets");
  });

  return (
    <div className="prose w-full max-w-4xl sm:px-4">
      <form onSubmit={onSubmit}>
        {fields.map((asset, i) => (
          <AssetsEditListItem
            register={register}
            removeAsset={removeAsset}
            asset={asset}
            index={i}
            key={i}
            error={errors.assets ? errors.assets[i] : undefined}
          />
        ))}

        <div className="my-20 px-4">
          <button
            onClick={appendAsset}
            className="btn-ghost btn-block btn"
            type="button"
          >
            <FaPlus className="mr-2" />
            追加
          </button>
        </div>

        <div className="mt-20 flex gap-4 px-4">
          <Link
            href="/assets"
            prefetch={false}
            className="btn-outline btn flex-1"
          >
            <FaChevronLeft className="mr-2" />
            キャンセル
          </Link>
          <button type="submit" className="btn-primary btn flex-1">
            <FaCircleNotch className="mr-2" />
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetsEdit;
