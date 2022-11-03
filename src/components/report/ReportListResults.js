import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import Notification from "../utils/Notification";
import ConfirmDialog from "../utils/ConfirmDialog";
import * as reportService from "../../services/report";
import { useDispatch } from 'react-redux';
import ReportForm from "./ReportForm";
import ReportEmbed from "./ReportEmbed";
import Popup from "../utils/Popup";
import PopupEmbed from "../utils/PopupEmbed";



const ReportListResults = ({ reports }) => {


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0)
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [openPopupEmbed, setOpenPopupEmbed] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const dispatch = useDispatch();

  const openInPopup = report => {
    setRecordForEdit(report)
    setOpenPopup(true)
  }

  const openInPopupEmbed = report => {
    setRecordForEdit(report)
    setOpenPopupEmbed(true)
  }

  const onDelete = report => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    reportService.DeleteReport(dispatch, report)

  }

  const addOrEdit = (report, resetForm) => {
    if (report.id == 0)
      reportService.NewReport(dispatch, report)
    else
      reportService.EditReport(dispatch, report)
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
                  ReportId_BI
                </TableCell>
                <TableCell>
                  WorkspaceId_BI
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
              {reports.slice(0, limit).map((report) => (
                <TableRow
                  hover
                  key={report.id}
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
                        {report.intitule}
                      </Typography>

                    </Box>
                  </TableCell>
                  <TableCell>
                    {report.reportId_BI}
                  </TableCell>
                  <TableCell>
                    {report.workspaceId_BI}
                  </TableCell>
                  <TableCell>
                    <Box height="35px" width="120px" justifyContent="center" alignItems="center"

                      style=
                      {{
                        display: "flex",
                        borderRadius: "12px",
                        backgroundColor:
                          `${report.status}` === "Initié"
                            ? "#00BFFF"
                            : (`${report.status}` === "En cours"
                              ? "#20B2AA"
                              : (`${report.status}` === "Fermé"
                                ? "#F08080"
                                : (`${report.status}` === "ok")
                              )
                            )
                      }}>
                      <div style={{ color: "#FFFFFF", fontfamily: "verdana" }}>
                        {report.status}
                      </div>

                    </Box>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => { openInPopupEmbed(report) }} class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorPrimary MuiIconButton-sizeMedium css-169jfao-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button"><span class="MuiIconButton-label css-4jkopv-MuiIconButton-label"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-wt4i4k-MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="VisibilityTwoToneIcon"><path d="M12 6c-3.79 0-7.17 2.13-8.82 5.5C4.83 14.87 8.21 17 12 17s7.17-2.13 8.82-5.5C19.17 8.13 15.79 6 12 6zm0 10c-2.48 0-4.5-2.02-4.5-4.5S9.52 7 12 7s4.5 2.02 4.5 4.5S14.48 16 12 16z" opacity=".3"></path><path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 13c-3.79 0-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6s7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17zm0-10c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7zm0 7c-1.38 0-2.5-1.12-2.5-2.5S10.62 9 12 9s2.5 1.12 2.5 2.5S13.38 14 12 14z"></path></svg></span><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
                    <button onClick={() => { openInPopup(report) }} class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorPrimary MuiIconButton-sizeMedium css-1s1s850-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button"><span class="MuiIconButton-label css-4jkopv-MuiIconButton-label"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-wt4i4k-MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="EditTwoToneIcon"><path d="M5 18.08V19h.92l9.06-9.06-.92-.92z" opacity=".3"></path><path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path></svg></span><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
                    <button onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Etes-vous sûr de vouloir supprimer cet rapport?',
                        subTitle: "Vous ne pouvez pas annuler cette opération",
                        onConfirm: () => { onDelete(report) }
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
        <ReportForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit} />
      </Popup>
      <PopupEmbed
        title="Consulter les informations d'un rapport"
        openPopupEmbed={openPopupEmbed}
        setOpenPopupEmbed={setOpenPopupEmbed}
        recordForEdit={recordForEdit}
      >
        <ReportEmbed
          recordForEdit={recordForEdit}
        />
      </PopupEmbed>
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
        count={reports.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};


export default ReportListResults;
