import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../utils/useForm';
import * as datawhService from "../../services/datawh";

const initialFValues = {
    id: 0,
    intitule: '',
    connectionType: '',
    dataWHName: '',
    dataWHServer: '',
    dataWHUser: '',
    dataWHPassword: '',
    authWindows: '',
    status: '',
}

export default function DwhForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('intitule' in fieldValues)
            temp.intitule = fieldValues.intitule ? "" : "This field is required."
        if ('connectionType' in fieldValues)
            temp.connectionType = fieldValues.connectionType ? "" : "This field is required."
        if ('dataWHName' in fieldValues)
            temp.dataWHName = fieldValues.dataWHName ? "" : "This field is required."
        if ('dataWHServer' in fieldValues)
            temp.dataWHServer = fieldValues.dataWHServer ? "" : "This field is required."
        if ('dataWHUser' in fieldValues)
            temp.dataWHUser = fieldValues.dataWHUser ? "" : "This field is required."
        if ('dataWHName' in fieldValues)
            temp.dataWHName = fieldValues.dataWHName ? "" : "This field is required."
        if ('dataWHPassword' in fieldValues)
            temp.dataWHPassword = fieldValues.dataWHPassword ? "" : "This field is required."
        if ('authWindows' in fieldValues)
            temp.authWindows = fieldValues.authWindows ? "" : "This field is required."
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


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Intitule"
                        name="intitule"
                        value={values.intitule}
                        onChange={handleInputChange}
                        error={errors.intitule}
                    />
                    <Controls.Input
                        label="ConnectionType"
                        name="connectionType"
                        value={values.connectionType}
                        onChange={handleInputChange}
                        error={errors.connectionType}
                    />
                    <Controls.Input
                        label="DataWHName"
                        name="dataWHName"
                        value={values.dataWHName}
                        onChange={handleInputChange}
                        error={errors.dataWHName}
                    />
                    <Controls.Input
                        label="DataWHServer"
                        name="dataWHServer"
                        value={values.dataWHServer}
                        onChange={handleInputChange}
                        error={errors.dataWHServer}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="status"
                        label="Status"
                        value={values.status}
                        onChange={handleInputChange}
                        options={datawhService.getStatusCollection()}
                        error={errors.status}
                    />
                    <Controls.Input
                        label="DataWHUser"
                        name="dataWHUser"
                        value={values.dataWHUser}
                        onChange={handleInputChange}
                        error={errors.dataWHUser}
                    />
                    <Controls.Input
                        label="DataWHPassword"
                        name="dataWHPassword"
                        value={values.dataWHPassword}
                        onChange={handleInputChange}
                        error={errors.dataWHPassword}
                    />
                    <Controls.Input
                        label="AuthWindows"
                        name="authWindows"
                        value={values.authWindows}
                        onChange={handleInputChange}
                        error={errors.authWindows}
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
