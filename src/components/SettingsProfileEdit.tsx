"use client";

import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { FaTimes } from "react-icons/fa";
import { KeyedMutator } from "swr";
import { SettingsResponse } from "../types/api";
import { useApi } from "../hooks/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  name: string;
  email: string;
};

interface Props {
  settings: SettingsResponse;
  mutateSettings: KeyedMutator<SettingsResponse>;
  setProfileEdit: Dispatch<SetStateAction<boolean>>;
}

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SettingsProfileEdit = ({ settings, setProfileEdit, mutateSettings }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(
      z.object({
        name: z.string().min(2).max(15).nullable(),
        email: z.string().email().nullable(),
      })
    ),
  });
  const { authedClient } = useApi();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await authedClient.updateProfile.mutate(data);
    mutateSettings();
    setProfileEdit(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-actions justify-end">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setProfileEdit(false)}
          type="button"
        >
          <FaTimes />
        </button>
      </div>

      <div className="form-control mb-8">
        <label className="input-group">
          <span>Name</span>
          <input
            {...register("name", {
              minLength: { value: 2, message: "2〜15文字で入力してください" },
              maxLength: {
                value: 15,
                message: "2〜15文字で入力してください",
              },
              value: settings.name,
            })}
            className="input input-bordered"
          />
        </label>
        {errors.name && (
          <label className="label">
            <span className="label-text text-error">{errors.name.message}</span>
          </label>
        )}
      </div>

      <div className="form-control mb-8">
        <label className="input-group">
          <span>Email</span>
          <input
            {...register("email", {
              required: "入力してください",
              pattern: {
                value: emailPattern,
                message: "不正な形式です",
              },
              value: settings.email,
            })}
            className="input input-bordered"
          />
        </label>
        {errors.email && (
          <label className="label">
            <span className="label-text text-error">{errors.email.message}</span>
          </label>
        )}
      </div>

      <div className="card-actions justify-end">
        <input className="btn btn-block btn-primary" type="submit" value="保存" />
      </div>
    </form>
  );
};

export default SettingsProfileEdit;
