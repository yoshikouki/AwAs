import type { NextPage } from "next";
import Settings from "../../components/Settings";
import DefaultLayout from "../../layouts/default";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const SettingsPage: NextPage = withAuthenticationRequired(() => {
    const { user } = useAuth0();

    return (
    <>
      <DefaultLayout>
        <Settings user={user} />
      </DefaultLayout>
    </>
  );
});

export default SettingsPage;
