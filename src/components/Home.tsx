import { api } from "../utils/api";

const Home = () => {
  const { data: health } = api.health.useQuery()
  const { data: profile } = api.profile.useQuery()

  return (
    <>
      Home
      <div>
        health: {health}
      </div>
      <div>
        email: {profile?.email}
        name: {profile?.name}
      </div>
    </>
  );
};

export default Home;
