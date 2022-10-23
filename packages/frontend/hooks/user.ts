import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

export const useUser = () => {
  const { user } = useAuth0();
  const requiredAuth = withAuthenticationRequired;

  return {
    user,
    requiredAuth,
  };
};
