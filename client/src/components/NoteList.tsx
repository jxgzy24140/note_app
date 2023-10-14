import { NoteAddOutlined } from "@mui/icons-material";
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
import { useEffect } from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import moment from "moment";
interface Note {
  id: string;
  content: string;
}

interface Folder {
  id: string;
  notes: [Note];
}

const NoteList = () => {
  const { data }: { folder: Folder } = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();
  const { noteId, folderId } = useParams();

  useEffect(() => {
    if (data.folder.notes != 0) {
      return navigate(`note/${data.folder.notes[0].id}`);
    }
  }, [folderId]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId: folderId || "",
      },
      { method: "post", action: `/folders/${folderId}` }
    );
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
            {data &&
              data.folder?.notes?.map((note) => {
                return (
                  <Link key={note.id} to={`note/${note.id}`}>
                    <Card
                      sx={{
                        bgcolor: noteId == note.id ? "rgb(255 211 140)" : "",
                      }}
                    >
                      <CardContent
                        sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                      >
                        <div
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          dangerouslySetInnerHTML={{
                            __html: `${note.content.substring(0, 30)}`,
                          }}
                        />
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
