import * as React from "react";
import Button from "@mui/material/Button";
import { Snackbar as MUISnackbar } from "@mui/material";
("@mui/material/Snackbar");
import Alert from "@mui/material/Alert";
import { useReactiveVar } from "@apollo/client";
import { snackVar } from "../../constants/snack";

const Snackbar = () => {
  const [open, setOpen] = React.useState(false);
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    snackVar(undefined);
  };

  return (
    <div>
      {snack && (
        <>
          {" "}
          <Button>Open Snackbar</Button>
          <MUISnackbar
            open={!!snack}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snack?.type}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snack.message}
            </Alert>
          </MUISnackbar>
        </>
      )}
    </div>
  );
};

export default Snackbar;
