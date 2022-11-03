import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../utils/useForm';
import { useSelector, useDispatch } from 'react-redux';
import { GetUsers } from '../../../services/user';
import { GetReport } from '../../../services/report';


const initialFValues = {
    id: 0,
    userAccess: '',
    reportId: '',
}

export default function ReportForm(props) {

    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        console.log(validate())
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }


    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const users = useSelector(state => state.userSlice.users);
    const reports = useSelector(state => state.reportSlice.reports);
    const dispatch = useDispatch();

    useEffect(() => {
        GetUsers(dispatch);
    }, []);

    useEffect(() => {
        GetReport(dispatch);
    }, []);


    var userList = [];
    users.forEach(function (element) {
        if (element.occupation == "Invite") {
            userList.push({ id: element.id, title: element.username })
        }
    });


    var reportList = [];
    reports.forEach(function (element) {
        reportList.push({ id: element.id, title: element.intitule })
        //console.log(element.id)
    });

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        name="userAccess"
                        label="User"
                        value={values.userAccess}
                        onChange={handleInputChange}
                        options={userList}
                        error={errors.userAccess}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Select
                        name="reportId"
                        label="Rapport"
                        value={values.reportId}
                        onChange={handleInputChange}
                        options={reportList}
                        error={errors.reportId}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
