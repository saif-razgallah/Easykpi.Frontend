import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from 'react-feather';
import Popup from "../utils/Popup";
import React, { useState } from 'react'
import ReportForm from "./ReportForm";
import * as reportService from "../../services/report";
import { useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => ({

  newButton: {

    marginLeft: theme.spacing(45),
    display: "flex-end",
    height: 40,
    top: 15,
  }
}))


const ReportListToolbar = ({ filter, setFiltering }) => {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const dispatch = useDispatch();

  const addOrEdit = (report, resetForm) => {
    if (report.id == 0)
      reportService.NewReport(dispatch, report)
    else
      reportService.EditReport(report)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
  }

  return (

    <Card style={{ borderRadius: '20px' }}>
      <CardContent>
        <Box style={{ maxWidth: 1200, display: "flex" }} >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                  >
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            placeholder="Search report"
            variant="outlined"
            style={{ width: 600 }}
            onChange={(e) => {
              setFiltering(e.target.value.length > 0)
              filter(e.target.value)
            }}
          />

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
        title="Ajouter un nouvel rapport "
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ReportForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit} />
      </Popup>
    </Card>

  )
}

export default ReportListToolbar;
