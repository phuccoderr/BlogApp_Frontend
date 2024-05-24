import React from "react";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateUser } from "../../hooks/useCreateUser";

const Signup: React.FC = () => {
  const [createUser] = useCreateUser();

  return (
    <Auth
      submitLabel="Sign Up"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
