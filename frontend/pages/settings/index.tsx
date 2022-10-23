import type { NextPage } from "next";
import Settings from "../../components/Settings";
import DefaultLayout from "../../layouts/default";

const SettingsPage: NextPage = () => {
  return (
    <>
      <DefaultLayout>
        <Settings />
      </DefaultLayout>
    </>
  );
};

export default SettingsPage;
