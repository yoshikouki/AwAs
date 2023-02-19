import AssetsEdit from "../../../components/AssetsEdit";
import type { NextPage } from "next";
import useSWR from "swr";
import { apiClient } from "../../../utils/api";

const AssetsEditPage: NextPage = () => {
  const { data: storedAssets } = useSWR("/assets", () =>
    apiClient.assets.query()
  );
  return (
    <>
      {storedAssets ? <AssetsEdit storedAssets={storedAssets} /> : "loading..."}
    </>
  );
};

export default AssetsEditPage;
