import React, { useState } from "react";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateUser } from "../../hooks/useCreateUser";
import extractErrorMessage from "../../utils/error";
import useLogin from "../../hooks/useLogin";

const Signup: React.FC = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState("");
  const { login } = useLogin();

  return (
    <Auth
      submitLabel="Sign Up"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          const user = await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          await login({ email, password });
          setError("");
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
          }
        }
      }}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
