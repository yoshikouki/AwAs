"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaCircleNotch } from "react-icons/fa";
import { useApi } from "../hooks/api";
import { requiredAuth } from "../hooks/auth";
import AssetsEditListItem from "./AssetsEditListItem";

const AssetsEdit = requiredAuth(() => {
  const [assets, setAssets] = useState([]);
  const { getWithAuth } = useApi();

  const submit = () => {
    console.log("submit");
  };

  useEffect(() => {
    (async () => {
      const res = await getWithAuth("/v1/assets");
      setAssets(res);
    })();
  }, []);

  return (
    <div className="prose w-full max-w-4xl sm:px-4">
      {assets.map((asset, i) => (
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
