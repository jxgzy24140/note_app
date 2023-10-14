import { useState } from "react";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { addNewFolder } from "../utils";
export default function NewFolder() {
  const [isOpen, setIsOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const handleOnchangeNewFolderName = (e) => {
    setNewFolderName(e.target.value);
  };
  const handleOnClose = () => {
    setIsOpen(false);
  };
  const handleAddNewFolder = async () => {
    await addNewFolder(newFolderName);
    setIsOpen(false);
  };
  return (
    <>
      <Tooltip title="Add Folder" onClick={() => setIsOpen(true)}>
        <IconButton>
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={handleOnClose}>
        <DialogTitle>Add New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            value={newFolderName}
            onChange={handleOnchangeNewFolderName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose}>Cancle</Button>
          <Button onClick={handleAddNewFolder}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
