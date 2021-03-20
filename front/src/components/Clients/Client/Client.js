import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { deleteClient } from "../../../actions/clients";

export const Client = ({ client, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const todaysDate = new Date();
  const numberOfTodaysDate = todaysDate.getDate();
  const numberOfCreatedDate = moment(client.createdAt).get("date");
  const todaysDebtors = (numberOfCreatedDate-numberOfTodaysDate)*(-1)
  
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };
 

  return (
    <Card className={ todaysDebtors || classes.borderRed }>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={client.selectedFile}
          title={client.fullName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {client.fullName}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h4">
            Phone: {client.phone}
          </Typography>
          <Typography variant="body2" component="p">
            ExtraInfo: {client.extraInfo}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            Time: {moment(client.createdAt).format("lll")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {(user?.result?.googleId === client?.creator ||
          user?.result?._id === client?.creator) && (
          <>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => {
                setCurrentId(client._id);
                handleClick();
              }}
            >
              EDIT
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => dispatch(deleteClient(client._id))}
            >
              DELETE
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};
