import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import Controls from "../controls/Controls";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Notification from "../utils/Notification";
import ConfirmDialog from "../utils/ConfirmDialog";
import CloseIcon from '@material-ui/icons/Close';
import * as datawhService from "../../services/datawh";
import { useDispatch } from 'react-redux';
import DwhForm from "./DwhForm";
import Popup from "../utils/Popup";


const DwhListResults = ({ datawhs }) => {


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const dispatch = useDispatch();


  const openInPopup = datawh => {
    setRecordForEdit(datawh)
    setOpenPopup(true)
  }
  const onDelete = datawh => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    datawhService.DeleteDataWH(dispatch, datawh)
    setNotify({
      isOpen: true,
      message: 'Supprimé avec succès',
      type: 'error'
    })
  }

  const addOrEdit = (datawh, resetForm) => {
    if (datawh.id == 0)
      datawhService.NewDataWH(dispatch, datawh)
    else
      datawhService.EditDataWH(dispatch, datawh)
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
                  Intitule
                </TableCell>
                <TableCell>
                  ConnectionType
                </TableCell>
                <TableCell>
                  DataWHName
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datawhs.slice(0, limit).map((datawh) => (
                <TableRow
                  hover
                  key={datawh.id}
                >

                  <TableCell>
                    <Box
                      style={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        style={{ paddingLeft: '10px' }}
                        color="textPrimary"
                        variant="body1"
                      >
                        {datawh.intitule}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {datawh.connectionType}
                  </TableCell>
                  <TableCell>
                    {datawh.dataWHName}
                  </TableCell>
                  <TableCell>
                    <Box height="35px" width="120px" justifyContent="center" alignItems="center"

                      style=
                      {{
                        display: "flex",
                        borderRadius: "12px",
                        backgroundColor:
                          `${datawh.status}` === "Initié"
                            ? "#00BFFF"
                            : (`${datawh.status}` === "En cours"
                              ? "#20B2AA"
                              : (`${datawh.status}` === "Fermé"
                                ? "#F08080"
                                : (`${datawh.status}` === "Nil")
                              )
                            )
                      }}>
                      <div style={{ color: "#FFFFFF", fontfamily: "verdana" }}>
                        {datawh.status}
                      </div>

                    </Box>
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => { openInPopup(datawh) }}>
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Etes-vous sûr de vouloir supprimer cet DataWharehouse?',
                          subTitle: "Vous ne pouvez pas annuler cette opération",
                          onConfirm: () => { onDelete(datawh) }
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
        title="Changer les informations d'une DataWahrehouse"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <DwhForm
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
        count={datawhs.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};


export default DwhListResults;
