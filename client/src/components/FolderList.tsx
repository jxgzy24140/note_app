import { Card, CardContent, List, Typography, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";

export default function FolderList(props) {
  const { folderId } = useParams();

  return (
    <>
      <List
        sx={{ backgroundColor: "#7D9D9C", padding: "10px", overflowY: "auto" }}
        subheader={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              color: "white",
              padding: "10px 0",
            }}
          >
            <Typography>Folders</Typography>
            <NewFolder />
          </Box>
        }
      >
        {props.folders?.map((folder) => {
          return (
            <Link
              key={folder.id}
              to={`folders/${folder.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Card
                sx={{
                  mb: "5px",
                  backgroundColor:
                    folderId == folder.id ? "rgb(255 211 140)" : "",
                }}
              >
                <CardContent sx={{ "&:last-child": { pb: "10px" } }}>
                  <Typography>{folder.name}</Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </List>
    </>
  );
}
