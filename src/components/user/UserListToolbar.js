import {Box,Button,Card,CardContent,TextField,InputAdornment,SvgIcon} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from 'react-feather';
import Popup from "../utils/Popup";
import React, { useState } from 'react'
import UserForm from "./UserForm";
import * as userService from "../../services/user";
import { useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => ({

  newButton: {
    
      marginLeft:theme.spacing(45),
      display:"flex-end",
      height: 40,
      top: 15,
  }
}))

const UserListToolbar = ({filter,setFiltering}) => {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const dispatch = useDispatch();

    const addOrEdit = (user, resetForm) => {
      if (user.id == 0)
             userService.NewUser(dispatch,user)
      else
            userService.EditUser(user)
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
  }

  return(

      <Card style={{borderRadius: '20px'}}>
        <CardContent>
          <Box style={{ maxWidth: 1200 ,display:"flex" }} >
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
                      placeholder="recherche de client"
                      variant="outlined"
                      style = {{width: 600 }}
                      onChange={(e)=>{
                        setFiltering(e.target.value.length > 0)
                        filter(e.target.value)}} 
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
                title="Ajouter un nouvel utilisateur "
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserForm
                  recordForEdit={recordForEdit}
                  addOrEdit={addOrEdit} />
            </Popup>
      </Card>
      
  )
}

export default UserListToolbar;
