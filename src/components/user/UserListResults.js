import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Avatar, Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import Controls from "../controls/Controls";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Notification from "../utils/Notification";
import ConfirmDialog from "../utils/ConfirmDialog";
import CloseIcon from '@material-ui/icons/Close';
import * as userService from "../../services/user";
import { useDispatch } from 'react-redux';
import UserForm from "./UserForm";
import Popup from "../utils/Popup";


const UserListResults = ({ users }) => {

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const dispatch = useDispatch();


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const openInPopup = user => {
    setRecordForEdit(user)
    setOpenPopup(true)
  }
  const onDelete = user => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    userService.DeleteUser(dispatch, user)
    
  }

  const addOrEdit = (user, resetForm) => {
    if (user.id == 0)
      userService.NewUser(dispatch, user)
    else
      userService.EditUser(dispatch, user)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
  }

  return (
    <Card style={{ borderRadius: '20px' }}>
      <PerfectScrollbar>
        <Box style={{ minWidth: 1150 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nom
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Télephone
                </TableCell>
                <TableCell>
                  Rôle
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                >

                  <TableCell>
                    <Box
                      style={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={user.imageSrc}
                      />
                      <Typography
                        style={{ paddingLeft: '10px' }}
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.lastName}
                      </Typography>
                      <Typography
                        style={{ paddingLeft: '10px' }}
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.firstName}
                      </Typography>

                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell>

                    <Box height="35px" width="120px" justifyContent="center" alignItems="center"

                      style=
                      {{
                        display: "flex",
                        borderRadius: "12px",
                        backgroundColor:
                          `${user.occupation}` === "Concepteur"
                            ? "#00BFFF"
                            : (`${user.occupation}` === "Administrateur"
                              ? "#F08080"
                              : (`${user.occupation}` === "Gestionnaire"
                                ? "#9370DB"
                                : (`${user.occupation}` === "Invite"
                                  ? "#20B2AA"
                                  : (`${user.occupation}` === "Invite"
                                  )
                                )
                              )
                            )
                      }}>
                      <div style={{ color: "#FFFFFF", fontfamily: "verdana" }}>
                        {user.occupation}
                      </div>

                    </Box>


                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => { openInPopup(user) }}>
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Etes-vous sûr de vouloir supprimer cet utilisateur?',
                          subTitle: "Vous ne pouvez pas annuler cette opération",
                          onConfirm: () => { onDelete(user) }
                        })
                      }}>
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Popup
        title="Changer les informations d'un utilisateur"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit} />
      </Popup>

      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <TablePagination
        component="div"
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};


export default UserListResults;
