"use client";
import type { NextPage } from "next";
import Settings from "../../components/Settings";
import { requiredAuth, useAuth } from "../../hooks/auth";

const SettingsPage: NextPage = requiredAuth(() => {
  const { user } = useAuth();

  return (
    <>
      <Settings user={user} />
    </>
  );
});

export default SettingsPage;
