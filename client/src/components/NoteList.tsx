import { DeleteOutlineOutlined, NoteAddOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  List,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import moment from "moment";
import ConfirmDialog from "./ConfirmDialog";
import { INoteListProps } from "../types";

const NoteList = () => {
  console.log("note list component");

  const { folder } = useLoaderData() as INoteListProps;

  const [isOpenConfirmDialog, setIsOpenCofirmDialog] = useState<boolean>(false);

  const navigate = useNavigate();
  const submit = useSubmit();

  const { noteId, folderId } = useParams();

  useEffect(() => {
    if (folder.notes.length !== 0) {
      return navigate(`note/${folder.notes[0].id}`);
    }
  }, [folderId]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "Writing something...",
        folderId: folderId || "",
        type: "add",
      },
      { method: "post", action: `/folders/${folderId}` }
    );
  };

  const handleClose = () => {
    setIsOpenCofirmDialog(false);
  };

  const handleOpen = () => {
    setIsOpenCofirmDialog(true);
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={4}
          sx={{
            width: "100%",
            maxWidth: "360",
            bgcolor: "#F0EBE3",
            height: "100%",
            overflowY: "auto",
            padding: "10px",
            textAlign: "left",
          }}
        >
          <List
            subheader={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
                <Tooltip title="Add Note" onClick={handleAddNewNote}>
                  <IconButton size="small">
                    <NoteAddOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            {folder.notes &&
              folder?.notes?.map((note) => {
                return (
                  <>
                    <Link key={note.id} to={`note/${note.id}`}>
                      <Card
                        sx={{
                          marginBottom: "5px",
                          bgcolor: noteId == note.id ? "rgb(255 211 140)" : "",
                        }}
                      >
                        <CardContent
                          sx={{
                            "&:last-child": { pb: "10px" },
                            padding: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{ fontSize: "14px", fontWeight: "bold" }}
                              dangerouslySetInnerHTML={{
                                __html: `${note.content.substring(0, 30)}`,
                              }}
                            />
                            <DeleteOutlineOutlined onClick={handleOpen} />
                          </Box>
                        </CardContent>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            marginLeft: "10px",
                            textDecoration: "none",
                          }}
                        >
                          {moment(note.updatedAt).format(
                            "MMM Do YYYY, h:mm:ss a"
                          )}
                        </Typography>
                      </Card>
                    </Link>

                    <ConfirmDialog
                      noteId={note.id}
                      title="Delete"
                      isOpen={isOpenConfirmDialog}
                      content="Do you want delete this note?"
                      handleClose={handleClose}
                    />
                  </>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default NoteList;
