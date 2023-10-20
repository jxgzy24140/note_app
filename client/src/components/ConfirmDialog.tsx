import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate, useSubmit } from "react-router-dom";

interface IProps {
  noteId?: string;
  title: string;
  content: string;
  isOpen: boolean;
  handleClose: () => void;
}

const ConfirmDialog = (props: IProps) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const handleConfirm = () => {
    submit(
      {
        noteId: props.noteId || "",
        type: "delete",
      },
      {
        method: "post",
        action: `note/${props.noteId}`,
      }
    );
    props.handleClose();
    navigate(-1);
  };
  return (
    <Dialog open={props.isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm {props.title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={props.handleClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{props.content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
