import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  function handleCreateNewList() {
    store.createNewList();
  }

  function handleDeleteList() {
    store.deleteMarkedList();
  }

  function handleCloseModal() {
    store.unmarkListForDeletion();
  }

  let listCard = "";
  if (store) {
    listCard = (
      <List sx={{ width: "90%", left: "5%", bgcolor: "background.paper" }}>
        {store.idNamePairs.map((pair) => (
          <ListCard key={pair._id} idNamePair={pair} selected={false} />
        ))}
      </List>
    );
  }

  if (store.listMarkedForDeletion) {
    return (
      <div id="top5-list-selector">
        <div>
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete the " + store.listMarkedForDeletion.name + " list?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseModal}>No</Button>
              <Button onClick={handleDeleteList}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div id="list-selector-heading">
          <Fab
            color="primary"
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
          >
            <AddIcon />
          </Fab>
          <Typography variant="h2">Your Lists</Typography>
        </div>
        <div id="list-selector-list">{listCard}</div>
      </div>
    );
  } else {
    return (
      <div id="top5-list-selector">
        <div id="list-selector-heading">
          <Fab
            color="primary"
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
          >
            <AddIcon />
          </Fab>
          <Typography variant="h2">Your Lists</Typography>
        </div>
        <div id="list-selector-list">{listCard}</div>
      </div>
    );
  }
};

export default HomeScreen;
