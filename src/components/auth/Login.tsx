import React from "react";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login: React.FC = () => {
  const { login, error } = useLogin();

  return (
    <Auth
      submitLabel="Login"
      onSubmit={async (request) => login(request)}
      error={error ? "Credentials are not valid!" : ""}
    >
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>Signup</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
