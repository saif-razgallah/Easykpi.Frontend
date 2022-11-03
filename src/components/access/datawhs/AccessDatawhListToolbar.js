import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import Popup from "../../utils/Popup";
import React, { useState } from 'react'
import AccessDatawhForm from "./AccessDatawhForm";
import * as accessService from "../../../services/accessdatawh";
import { useDispatch } from 'react-redux';



const useStyles = makeStyles(theme => ({

  newButton: {
    marginLeft: theme.spacing(45),
    display: "flex-end",
    height: 40,
    top: 15,
  }
}))


const AccessDatawhListToolbar = () => {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const dispatch = useDispatch();

  const addOrEdit = (accessdatawh, resetForm) => {

    if (accessdatawh.id == 0)
      accessService.NewAccessDatawh(dispatch, accessdatawh)
    else
      accessService.EditAccessDatawh(accessdatawh)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
  }

  return (

    <Card style={{ borderRadius: "5% 5% 0% 0%" }}>
      <CardContent>
        <Box style={{ maxWidth: 1200, display: "flex" }} >
          <h3 style={{ width: 600 }} >Entrepot de données</h3>


          <Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
          >
            Ajouter
          </Button>

        </Box>
      </CardContent>
      <Popup
        title="Ajouter un nouvel accés "
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AccessDatawhForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit} />
      </Popup>
    </Card>

  )
}

export default AccessDatawhListToolbar;
