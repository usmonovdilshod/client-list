import React from "react";
import { useSelector } from "react-redux";
import { Grid, LinearProgress } from "@material-ui/core";
import { Client } from "./Client/Client";
import useStyles from "./styles";
import moment from "moment";

export const Clients = ({ setCurrentId }) => {
  const clients = useSelector((state) => state.clients);
  const classes = useStyles();

  return !clients.length ? (
    <LinearProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {clients.map((client) => (
        <Grid key={client._id} item xs={12} sm={6} md={3}>
          <Client client={client} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
