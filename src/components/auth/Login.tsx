import React from "react";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <Auth submitLabel="Login" onSubmit={async () => {}}>
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>Signup</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
