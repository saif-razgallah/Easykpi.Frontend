import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "../controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Form } from '../utils/useForm';
import { useDispatch } from 'react-redux';
import * as dashboardService from '../../services/dashboard';
import { ToastContainer } from 'react-toastify'


const dashboard = {
    id: 0,
    reportId: '',
}

const useStyles = makeStyles(theme => ({
    fab: {
        width: "40px",
        height: "10px",
        margin: theme.spacing(0.5)
    },
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function PopupEmbed(props) {

    const { title, children, openPopupEmbed, setOpenPopupEmbed, recordForEdit } = props;
    const classes = useStyles();
    function refreshParent() { window.opener.location.reload(); }
    const dispatch = useDispatch();

    const handleSubmit = e => {

        if (recordForEdit != null) {
            dashboard.reportId = recordForEdit.id
        }
        e.preventDefault()
        dashboardService.NewDashboard(dispatch, dashboard)
    }

    return (
        <Dialog open={openPopupEmbed} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <ToastContainer />
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Form onSubmit={handleSubmit}>
                        <Fab color="primary" aria-label="Add" className={classes.fab} type="submit">
                            <AddIcon />
                        </Fab>
                    </Form>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                            setOpenPopupEmbed(false)
                            window.location.reload();
                        }}>
                        <CloseIcon />
                    </Controls.ActionButton>

                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
