import React from "react";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  return (
    <Auth submitLabel="Sign Up" onSubmit={async () => {}}>
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
