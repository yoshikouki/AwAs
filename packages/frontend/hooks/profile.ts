import useSWR from "swr";
import { useApi } from "../hooks/api";

export const useProfile = () => {
  const { authedClient } = useApi();
  const { data: profile, error, isLoading } = useSWR("/profile", () => authedClient.profile.query());

  return {
    profile,
    error,
    isLoading,
  };
};
