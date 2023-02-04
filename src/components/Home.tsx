"use client";

import { useApi } from "../hooks/api";
import { useRestApi } from "../hooks/rest-api";
import { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const { fetchApi } = useRestApi();
  const { client } = useApi({ withAuth: true });

  const callApi = async () => {
    try {
      const res = await fetchApi("/health");
      setMessage(JSON.stringify(res));
    } catch (error) {
      setMessage(String(error));
    }
  };

  const callSecureApi = async () => {
    try {
      const res = await fetchApi("/v1/assets", true);
      setMessage(JSON.stringify(res));
    } catch (error) {
      setMessage(String(error));
    }
  };

  const callTrpc = async () => {
    try {
      const res = await client.health.useQuery();
      console.log(res);
      setMessage(res.data || "");
    } catch (error) {
      setMessage(String(error));
    }
  };
  const callSecureTrpc = async () => {
    try {
      const res = await client.profile.useQuery();
      console.log(res);
      setMessage(JSON.stringify(res));
    } catch (error) {
      setMessage(String(error));
    }
  };

  return (
    <>
      Home
      <div>
        <button onClick={callApi} type="button">call API</button>
      </div>
      <div>
        <button onClick={callSecureApi} type="button">call Secure API</button>
      </div>
      <div>
        <button onClick={callTrpc} type="button">call tRPC API</button>
      </div>
      <div>
        <button onClick={callSecureTrpc} type="button">call Secure tRPC API</button>
      </div>
      {message && <p>Message: {message}</p>}
    </>
  );
};

export default Home;
