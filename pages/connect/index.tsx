import { Button } from "@mui/material";
import { ConnectOverlay } from "components/Web3/ConnectOverlay";
import { useState } from "react";

function Connect() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConnectOverlay open={open} setOpen={setOpen} />
      <Button onClick={() => setOpen(!open)}>Open</Button>
    </>
  );
}

export default Connect;
