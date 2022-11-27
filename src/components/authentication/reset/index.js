import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useContext, useEffect } from "react";
import { auth, sendPasswordReset } from "../../../firebase";

function ResetModal(props) {
  const context = props.context;
  
  useEffect(() => {
    if (context.user) {props.setIndex(0)};
    //also go back to login
  }, [context.user, props]);

  return (
    <div className="reset">
      <Dialog open={(props.index === 3)} onClose={() => props.setIndex(0)}>
      <DialogTitle>ResetPassword</DialogTitle>
      <DialogContent>
        <TextField
          value={context.email}
          onChange={(e) => context.setEmail(e.target.value)}
          label="E-mail"
        />
        
        <DialogActions>
        <Button
          className="reset__btn"
          onClick={() => sendPasswordReset(context.email)}
        >
          Send password reset email
        </Button>
        </DialogActions>
        </DialogContent>
        </Dialog>
    </div>
  );
}

export default ResetModal;