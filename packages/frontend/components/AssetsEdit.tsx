"use client";
import Link from "next/link";
import { FaChevronLeft, FaCircleNotch } from "react-icons/fa";
import { useGet } from "../hooks/api";
import { requiredAuth } from "../hooks/auth";
import { Asset } from "../types/asset";
import AssetsEditListItem from "./AssetsEditListItem";

const AssetsEdit = requiredAuth(() => {
  const assets = useGet<Asset[]>("/v1/assets", { withAuth: true });

  const submit = () => {
    console.log("submit");
  };

  return (
    <div className="prose w-full max-w-4xl sm:px-4">
      {assets?.map((asset, i) => (
        <AssetsEditListItem preAsset={asset} index={i} key={i} />
      ))}

      <div className="flex gap-4 mt-20 px-4">
        <Link
          href="/assets"
          prefetch={false}
          className="btn btn-outline flex-1"
        >
          <FaChevronLeft className="mr-2" />
          キャンセル
        </Link>
        <button onClick={submit} className="btn btn-primary flex-1">
          <FaCircleNotch className="mr-2" />
          保存
        </button>
      </div>
    </div>
  );
});

export default AssetsEdit;
