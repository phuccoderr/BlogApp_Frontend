import { useEffect } from "react";
import { excludedRoutes } from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import {
  UNKNOWN_ERROR_MESSAGE,
  UNKNOWN_ERROR_SNAKE_MESSAGE,
} from "../../constants/errors";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      snackVar(UNKNOWN_ERROR_SNAKE_MESSAGE);
    }
  }, []);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
