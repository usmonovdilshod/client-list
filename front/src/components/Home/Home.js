import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getClients } from "../../actions/clients";
import { Clients } from "../Clients/Clients";
import { Form } from "../Form/Form";
//import useStyles from "./styles";

export const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  //const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Clients setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
