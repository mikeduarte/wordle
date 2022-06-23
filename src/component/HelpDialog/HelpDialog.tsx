
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';

interface HelpDialogProps {
  open: boolean
  close: () => void
}

export default function HelpDialog({open, close} : HelpDialogProps ) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >&#x2715;</IconButton>
        <DialogContent>
            <DialogContentText id="alert-dialog-description" color="black" marginBottom={'.8rem'}>
                Guess the <b>WORDLE</b> in six tries.
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" color="black" marginBottom={'.8rem'}>
                Each guess must be a valid five-letter word. Hit the enter button to submit.
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" color="black" marginBottom={'.8rem'}>
                After each guess, the color of the tiles will change to show how close your guess was to the word.
            </DialogContentText>
            <hr></hr>
            <img src="/imgs/wordle.png" srcSet="/imgs/wordle.png 2x" alt="instructions" style={{maxWidth: '100%'}} />
        </DialogContent>
      </Dialog>
    </div>
  );
}