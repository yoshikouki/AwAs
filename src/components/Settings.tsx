"use client";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import useSWR from "swr";
import { useApi } from "../hooks/api";
import SettingsProfileEdit from "./SettingsProfileEdit";

const Settings = () => {
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const { authedClient } = useApi();
  const { data: settings, mutate } = useSWR("/settings", () => authedClient.settings.query());

  return (
    <div className="prose w-full max-w-4xl">
      <h1>Settings</h1>
      {settings && (
        <div className="card w-full sm:w-auto glass">
          <div className="card-body">
            {profileEdit ? (
              <SettingsProfileEdit
                settings={settings}
                mutateSettings={mutate}
                setProfileEdit={setProfileEdit}
              />
            ) : (
              <>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setProfileEdit(true)}
                    type="button"
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
