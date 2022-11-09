"use client"
import type { NextPage } from "next";
import AssetsEdit from "../../../components/AssetsEdit";
import { useGet } from "../../../hooks/api";
import { requiredAuth } from "../../../hooks/auth";
import { Asset } from "../../../types/asset";

const AssetsEditPage: NextPage = requiredAuth(() => {
  const { data: assets } = useGet<Asset[]>("/v1/assets", true);
  return <>{assets &&(<AssetsEdit assets={assets} />)}</>;
});

export default AssetsEditPage;
