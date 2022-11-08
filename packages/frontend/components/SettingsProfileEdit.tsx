"use client";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useApi } from "../hooks/api";
import { requiredAuth } from "../hooks/auth";
import { SettingsResponse } from "../types/api";

type Inputs = {
  name: string;
  email: string;
};

interface Props {
  settings: SettingsResponse;
  setSettings: Dispatch<SetStateAction<SettingsResponse | null>>;
  setProfileEdit: Dispatch<SetStateAction<boolean>>;
}

const SettingsProfileEdit = requiredAuth(
  ({ settings, setProfileEdit, setSettings }: Props) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();
    const { fetchApi } = useApi();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const updatedSettings = await fetchApi<SettingsResponse>(
        "/v1/settings/profile",
        true,
        {
          method: "PATCH",
        }
      );
      setProfileEdit(false);
      setSettings(updatedSettings);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-actions justify-end">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setProfileEdit(false)}
          >
            <FaTimes />
          </button>
        </div>

        <div className="form-control mb-8">
          <label className="input-group">
            <span>Name</span>
            <input
              {...register("name", { value: settings.name })}
              className="input input-bordered"
            />
          </label>
        </div>

        <div className="form-control mb-8">
          <label className="input-group">
            <span>Email</span>
            <input
              {...register("email", {
                required: true,
                value: settings.email,
              })}
              className="input input-bordered"
            />
          </label>
          {errors.email && (
            <label className="label">
              <span className="label-text text-error">
                メールアドレスを入力してください
              </span>
            </label>
          )}
        </div>

        <div className="card-actions justify-end">
          <input
            className="btn btn-block btn-primary"
            type="submit"
            value="保存"
          />
        </div>
      </form>
    );
  }
);

export default SettingsProfileEdit;
