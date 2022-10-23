import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const Settings = () => {
  const { user, error, isLoading } = useAuth0();

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
