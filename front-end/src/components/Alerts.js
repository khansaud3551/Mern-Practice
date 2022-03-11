import React from "react";
import Alert from "@mui/material/Alert";

function Alerts({ severity, message }) {
  return (
    <div>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
}

export default Alerts;
