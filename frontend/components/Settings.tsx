import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/future/image";

const Settings = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      Settings
      {user && (
        <div>
          <Image src={user.picture || ""} alt={user.name || ""} width={100} height={100} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </>
  );
}

export default Settings;
