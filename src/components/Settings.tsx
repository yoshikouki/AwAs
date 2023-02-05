import { FaPen } from "react-icons/fa";
import SettingsProfileEdit from "./SettingsProfileEdit";
import { api } from "../utils/api";
import { useState } from "react";

const Settings = () => {
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const { data: settings } = api.settings.useQuery();

  return (
    <div className="prose w-full max-w-4xl">
      <h1>Settings</h1>
      {settings && (
        <div className="card glass w-full sm:w-auto">
          <div className="card-body">
            {profileEdit ? (
              <SettingsProfileEdit
                settings={settings}
                setProfileEdit={setProfileEdit}
              />
            ) : (
              <>
                <div className="card-actions justify-end">
                  <button
                    className="btn-ghost btn-sm btn"
                    onClick={() => setProfileEdit(true)}
                    type="button"
                  >
                    <FaPen />
                  </button>
                </div>

                <ul className="my-0 list-none pl-0">
                  <li className="mt-0 mb-8 pl-0">
                    <span>Name</span>
                    <div className="text-lg font-bold">{settings.name}</div>
                  </li>
                  <li className="mt-0 mb-8 pl-0">
                    <span>Email</span>
                    <div className="text-lg font-bold">{settings.email}</div>
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
