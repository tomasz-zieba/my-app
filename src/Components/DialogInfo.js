import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {

let buttonCancel = null;
if(props.text.buttonCancel !== undefined) {
  buttonCancel = <Button onClick={props.handleCancel} color="primary" autoFocus>
                    {props.text.buttonCancel}
                  </Button>
}

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.text.label}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text.paragraph}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttonCancel}
          <Button onClick={props.handleClose} color="primary" autoFocus>
            {props.text.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}