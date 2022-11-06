interface Props {
  user?: {
    name: string;
    email: string;
  };
}

const Settings = ({ user }: Props) => {
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
};

export default Settings;
