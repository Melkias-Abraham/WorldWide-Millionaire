import * as React from "react";
import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function Game(props) {
  const { onStart, continent, state } = props;

  useEffect(() => {
    onStart(continent.id);
}, [continent]);


if(!state.questions) return (<span>loading...</span>);
  console.log(state);


  const questionsList = state.questions.map((eachQuestion) => (
    <>
    <ListItem key={eachQuestion.id} alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </ListItemAvatar>
    <ListItemText
      primary="Brunch this weekend?"
      secondary={
        <React.Fragment>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Ali Connors
          </Typography>
          {eachQuestion.question}
        </React.Fragment>
      }
    />
  </ListItem>
    <Divider variant="inset" component="li" />
  </>
  ));

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {questionsList}
      
    </List>
  );
}
