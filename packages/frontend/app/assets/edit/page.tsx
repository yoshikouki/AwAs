"use client"
import type { NextPage } from "next";
import AssetsEdit from "../../../components/AssetsEdit";
import { requiredAuth } from "../../../hooks/auth";
import { useRestGet } from "../../../hooks/rest-api";
import { Asset } from "../../../types/asset";

const AssetsEditPage: NextPage = requiredAuth(() => {
  const { data: assets } = useRestGet<Asset[]>("/v1/assets", true);
  return <>{assets &&(<AssetsEdit assets={assets} />)}</>;
});

export default AssetsEditPage;
