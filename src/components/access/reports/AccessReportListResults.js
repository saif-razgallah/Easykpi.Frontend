import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import ConfirmDialog from "../../utils/ConfirmDialog";
import * as accessService from "../../../services/accessreport";
import { useDispatch } from 'react-redux';
import AccessReportForm from "./AccessReportForm";
import Popup from "../../utils/Popup";


const AccessReportListResults = (props) => {

  const { accessreports, users, reports } = props
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

  const openInPopup = accessreport => {
    setRecordForEdit(accessreport)
    setOpenPopup(true)
  }
  const onDelete = accessreport => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    accessService.DeleteAccessReport(dispatch, accessreport)
    setNotify({
      isOpen: true,
      message: 'Supprimé avec succès',
      type: 'error'
    })
  }

  const addOrEdit = (accessreport, resetForm) => {
    if (accessreport.id == 0)
      accessService.NewAccessReport(dispatch, accessreport)
    else
      accessService.EditAccessReport(dispatch, accessreport)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
  }


  return (
    <Card style={{ borderRadius: '0px' }}>
      <PerfectScrollbar>
        <Box style={{ minWidth: 1150 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nom d'ultilisateur
                </TableCell>
                <TableCell>
                  Nom du rapport
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accessreports.slice(0, limit).map((accessreport) => (
                <TableRow
                  hover
                  key={accessreport.id}
                >

                  <TableCell>
                    <Box
                      style={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >

                      {users.filter(user => user.id == accessreport.userAccess).map(filteredPerson => (
                        <Typography
                          style={{ paddingLeft: '10px' }}
                          color="textPrimary"
                          variant="body1"
                        >
                          {filteredPerson.lastName} {filteredPerson.firstName}
                        </Typography>
                      ))}

                    </Box>
                  </TableCell>
                  <TableCell>
                    {reports.filter(report => report.id == accessreport.reportId).map(filteredReport => (
                      <Typography
                        style={{ paddingLeft: '10px' }}
                        color="textPrimary"
                        variant="body1"
                      >
                        {filteredReport.intitule}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => { openInPopup(accessreport) }} class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorPrimary MuiIconButton-sizeMedium css-1s1s850-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button"><span class="MuiIconButton-label css-4jkopv-MuiIconButton-label"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-wt4i4k-MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="EditTwoToneIcon"><path d="M5 18.08V19h.92l9.06-9.06-.92-.92z" opacity=".3"></path><path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path></svg></span><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
                    <button onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Etes-vous sûr de vouloir supprimer cet rapport?',
                        subTitle: "Vous ne pouvez pas annuler cette opération",
                        onConfirm: () => { onDelete(accessreport) }
                      })
                    }} class="MuiButtonBase-root MuiIconButton-root" tabindex="0" type="button"><span class="MuiIconButton-label"><span class="material-icons MuiIcon-root MuiIcon-colorError" aria-hidden="true">delete</span></span><span class="MuiTouchRipple-root"></span></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Popup
        title="Changer les informations d'un rapport"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AccessReportForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit} />
      </Popup>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <TablePagination
        component="div"
        count={accessreports.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};


export default AccessReportListResults;
