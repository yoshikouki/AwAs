"use client";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { useGet } from "../hooks/api";
import { SettingsResponse } from "../types/api";
import SettingsProfileEdit from "./SettingsProfileEdit";

const Settings = () => {
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsResponse | null>(null);

  const { data: fetchedSettings } = useGet<SettingsResponse>("/v1/settings", true);

  useEffect(() => setSettings(fetchedSettings), [fetchedSettings])

  return (
    <div className="prose w-full max-w-4xl">
      <h1>Settings</h1>
      {settings && (
        <div className="card w-full sm:w-auto glass">
          <div className="card-body">
            {profileEdit ? (
              <SettingsProfileEdit
                settings={settings}
                setSettings={setSettings}
                setProfileEdit={setProfileEdit}
              />
            ) : (
              <>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setProfileEdit(true)}
                  >
                    <FaPen />
                  </button>
                </div>

                <ul className="list-none my-0 pl-0">
                  <li className="mt-0 mb-8 pl-0">
                    <span>Name</span>
                    <div className="font-bold text-lg">{settings.name}</div>
                  </li>
                  <li className="mt-0 mb-8 pl-0">
                    <span>Email</span>
                    <div className="font-bold text-lg">{settings.email}</div>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
