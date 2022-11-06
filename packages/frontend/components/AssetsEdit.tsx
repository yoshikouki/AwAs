"use client"
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Link from 'next/link';
import { FaChevronLeft } from "react-icons/fa";
import AssetsEditListItem from './AssetsEditListItem';


const AssetsEdit = withAuthenticationRequired(() => {
  const submit = () => { console.log("submit") }
  const assets = [
    {
      symbol: "VTI",
      name: "バンガード・トータル・ストック・マーケットETF",
      balance: 34,
      averageTradedPrice: 210.2426,
      marketPrice: 188.93,
      marketValue: 6423.62,
      return: -724.62,
      yieldPercentage: -10.13,
    },
    {
      symbol: "XOM",
      name: "エクソンモービル",
      balance: 113,
      averageTradedPrice: 54.3089,
      marketPrice: 112.34,
      marketValue: 12694.42,
      return: 6557.51,
      yieldPercentage: 106.85,
    },
  ];


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
          保存
        </button>
      </div>
    </div>
  );
});

export default AssetsEdit;
