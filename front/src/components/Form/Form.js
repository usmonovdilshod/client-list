import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createClient, updateClient } from "../../actions/clients";

export const Form = ({ currentId, setCurrentId }) => {
  const [clientData, setClientData] = useState({
    fullName: "",
    phone: "",
    extraInfo: "",
    selectedFile: "",
  });

  const client = useSelector((state) =>
    currentId ? state.clients.find((c) => c._id === currentId) : null
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (client) setClientData(client);
  }, [client]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateClient(currentId, clientData));
    } else {
      dispatch(createClient(clientData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setClientData({
      fullName: "",
      phone: "",
      extraInfo: "",
      selectedFile: "",
    });
  };

  if (!user?.result) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Please Sign In To Use Functionality
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Adding"} a client
        </Typography>
        <TextField
          name="fullName"
          variant="outlined"
          label="FullName"
          fullWidth
          value={clientData.fullName}
          onChange={(e) =>
            setClientData({ ...clientData, fullName: e.target.value })
          }
        />
        <TextField
          name="phone"
          variant="outlined"
          label="Phone"
          fullWidth
          value={clientData.phone}
          onChange={(e) =>
            setClientData({ ...clientData, phone: e.target.value })
          }
        />
        <TextField
          name="extraInfo"
          variant="outlined"
          label="Extra Info"
          fullWidth
          value={clientData.extraInfo}
          onChange={(e) =>
            setClientData({ ...clientData, extraInfo: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setClientData({ ...clientData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {currentId ? "Edit" : "Add"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
