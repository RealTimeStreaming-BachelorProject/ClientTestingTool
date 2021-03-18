import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import { format } from "date-fns";
import React from "react";

interface Props {
  events: HistoryEvent[];
}

export default function EventList({ events }: Props) {
  return (
    <List>
      {events.map((event) => (
        <ListItem>
          <ListItemAvatar>{getIcon(event.text)}</ListItemAvatar>
          <ListItemText
            primary={event.text}
            secondary={format(new Date(event.timeStamp), "dd/MM-yyyy - HH:mm")}
          />
        </ListItem>
      ))}
    </List>
  );
}

const getIcon = (text: string) => {
  switch (text) {
    default:
      return <LocalShippingOutlinedIcon opacity={0.5} />;
  }
};
