"use client"

import AssetsEdit from "../../../components/AssetsEdit";
import type { NextPage } from "next";
import { useRestGet } from "../../../hooks/rest-api";

const AssetsEditPage: NextPage = () => {
  const { data: assets } = useRestGet<unknown[]>("/v1/assets", true);
  return <>{assets &&(<AssetsEdit assets={assets} />)}</>;
};

export default AssetsEditPage;
