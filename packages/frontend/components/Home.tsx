"use client"

import { useState } from "react";
import { useApi } from "../hooks/api";

const Home = () => {
  const [message, setMessage] = useState("");
  const { fetchApi } = useApi();

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

  return (
    <>
      Home
      <div>
        <button onClick={callApi}>call API</button>
      </div>
      <div>
        <button onClick={callSecureApi}>call Secure API</button>
      </div>
      {message && (
        <p>Message: {message}</p>
      )}
    </>
  )
}

export default Home
