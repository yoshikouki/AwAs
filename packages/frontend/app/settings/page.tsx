"use client";
import type { NextPage } from "next";
import Settings from "../../components/Settings";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const SettingsPage: NextPage = withAuthenticationRequired(() => {
  const { user } = useAuth0();

  return (
    <>
      <Settings user={user} />
    </>
  );
});

export default SettingsPage;
