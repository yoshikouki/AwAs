"use client";

import { useState } from "react";
import { useApi } from "../hooks/api";
import { useRestApi } from "../hooks/rest-api";

const Home = () => {
  const [message, setMessage] = useState("");
  const { fetchApi } = useRestApi();
  const { publicClient, authedClient } = useApi({ withAuth: true });

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
      const res = await publicClient.health.query();
      console.log(res);
      setMessage(res);
    } catch (error) {
      setMessage(String(error));
    }
  };
  const callSecureTrpc = async () => {
    try {
      const res = await authedClient.profile.query();
      console.log(res);
      setMessage(res);
    } catch (error) {
      setMessage(String(error));
    }
  };

  return (
    <>
      Home
      <div>
        <button onClick={callApi}>call API</button>
      </div>
      <div>
        <button onClick={callSecureApi}>call Secure API</button>
      </div>
      <div>
        <button onClick={callTrpc}>call tRPC API</button>
      </div>
      <div>
        <button onClick={callSecureTrpc}>call Secure tRPC API</button>
      </div>
      {message && <p>Message: {message}</p>}
    </>
  );
};

export default Home;
