import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CheckDialog({question, onClose, onApprove}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  const handleApprove = () => {
    onApprove(true);
    handleClose();
  };

  return (
    <div style={{ position: "absolute"}}>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {question}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApprove}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
};

export default CheckDialog;