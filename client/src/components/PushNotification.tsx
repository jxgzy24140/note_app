import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import client from "../utils/wsConfig";
import { Badge, Menu, MenuItem } from "@mui/material";

const query = `
subscription Subscription {
  notification {
    message
  }
}`;

const PushNotification = () => {
  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    (async () => {
      const onNext = ({ data }) => {
        const message = data.notification.message;
        if (message) {
          setNotification(message);
          setInvisible(false);
        }
      };

      await new Promise((resolve, reject) => {
        client.subscribe(
          {
            query: query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);

  const handleClearMessage = () => {
    setNotification("");
    setInvisible(true);
  };

  return (
    <>
      <Badge
        color="secondary"
        variant="dot"
        invisible={invisible}
        sx={{ marginRight: "5px" }}
      >
        <NotificationsIcon
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        />
      </Badge>
      <Menu
        open={anchorEl != null && true}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        {notification && (
          <MenuItem onClick={handleClearMessage}>{notification}</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PushNotification;
