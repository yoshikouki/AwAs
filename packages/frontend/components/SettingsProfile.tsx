"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPen, FaTimes } from "react-icons/fa";
import { useGet } from "../hooks/api";
import { requiredAuth } from "../hooks/auth";
import { SettingsResponse } from "../types/api";

type Inputs = {
  name: string;
  email: string;
};

const SettingsProfile = requiredAuth(() => {
  const [profileEdit, setProfileEdit] = useState(false);
  const settings = useGet<SettingsResponse>("/v1/settings", { withAuth: true });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);


  return (
    <>
      {settings && (
        <div className="card w-full sm:w-auto glass">
          <div className="card-body">
            {profileEdit ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setProfileEdit(!profileEdit)}
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="form-control mb-8">
                  <label className="input-group">
                    <span>Name</span>
                    <input
                      {...register("name")}
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className="form-control mb-8">
                  <label className="input-group">
                    <span>Email</span>
                    <input
                      {...register("email", { required: true })}
                      className="input input-bordered"
                    />
                  </label>
                  {errors.email && (
                    <label className="label">
                      <span className="label-text">
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
            ) : (
              <>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setProfileEdit(!profileEdit)}
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
    </>
  );
});

export default SettingsProfile;
