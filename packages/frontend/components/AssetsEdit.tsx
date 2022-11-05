"use client"
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Link from 'next/link';

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
    <div className="prose w-full max-w-4xl">
      <div className="sm:px-4 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>銘柄</th>
              <th>保有数量</th>
              <th>取得価格</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, i) => (
              <tr className="hover" key={i}>
                <th className="pr-0 md:pr-auto">
                  <div>{asset.symbol}</div>
                </th>
                <td className="text-end">{asset.balance}</td>
                <td className="text-end">
                  <div>{asset.averageTradedPrice}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 mt-4 px-4">
        <Link
          href="/assets"
          prefetch={false}
          className="btn btn-outline flex-1"
        >
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
