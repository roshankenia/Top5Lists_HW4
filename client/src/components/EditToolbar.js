import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }


    let closeClass = 'top5-button-disabled';
    let undoClass = 'top5-button-disabled';
    let redoClass = 'top5-button-disabled';
    let redoStatus = true;
    let undoStatus = true;

    if(store.currentList){
        closeClass = 'top5-button';
    }
    if(store.canUndo()){
        undoClass = 'top5-button';
        undoStatus = false;
    }
    if(store.canRedo()){
        redoClass = 'top5-button';
        redoStatus = false;
    }


    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }  
    return (
        <div id="edit-toolbar">
            <Button 
                id='undo-button'
                disabled={undoStatus}
                onClick={handleUndo}
                className={undoClass}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                id='redo-button'
                disabled={redoStatus}
                onClick={handleRedo}
                className={redoClass}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={editStatus}
                className={closeClass}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;