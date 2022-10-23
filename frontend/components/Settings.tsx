import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/future/image";

const Settings = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="prose w-full max-w-4xl">
      <h1>Settings</h1>
      {user && (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
}

export default Settings;
