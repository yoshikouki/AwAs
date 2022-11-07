"use client";

import { useGet } from "../hooks/api";
import { requiredAuth } from "../hooks/auth";
import { SettingsResponse } from "../types/api";

const SettingsProfile = requiredAuth(() => {
  const settings = useGet<SettingsResponse>("/v1/settings", { withAuth: true });
  return (
    <>
      {settings && (
        <>
          <ul>
            <li>{settings.name}</li>
            <li>{settings.email}</li>
          </ul>
        </>
      )}
    </>
  );
});

export default SettingsProfile;
