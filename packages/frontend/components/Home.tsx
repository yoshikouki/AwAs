import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const response = await fetch(`http://localhost:8889/`);
      const responseData = await response.json();
      setMessage(responseData);
    } catch (error) {
      setMessage(String(error));
    }
  };

  return (
    <>
      Home
      <button onClick={callApi}>call API</button>
      {message && (
        <p>Message: {message}</p>
      )}
    </>
  )
}

export default Home
