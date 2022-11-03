import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../utils/useForm';
import * as reportService from "../../services/report";


const initialFValues = {
    id: 0,
    intitule: '',
    description: '',
    reportId_BI: '',
    workspaceId_BI: '',
    status: '',
}

export default function ReportForm(props) {
    const { addOrEdit,recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('intitule' in fieldValues)
            temp.intitule = fieldValues.intitule ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        if ('reportId_BI' in fieldValues)
            temp.reportId_BI = fieldValues.reportId_BI ? "" : "This field is required."            
        if ('workspaceId_BI' in fieldValues)
            temp.workspaceId_BI = fieldValues.workspaceId_BI ? "" : "This field is required."
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
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />
                    <Controls.Input
                        label="ReportId_BI"
                        name="reportId_BI"
                        value={values.reportId_BI}
                        onChange={handleInputChange}
                        error={errors.reportId_BI}
                    />
                    
                </Grid>
                <Grid item xs={6}>

                    <Controls.Input
                        label="WorkspaceId_BI"
                        name="workspaceId_BI"
                        value={values.workspaceId_BI}
                        onChange={handleInputChange}
                        error={errors.workspaceId_BI}
                    />
                    <Controls.Select
                       name="status"
                       label="Status"
                       value={values.status}
                       onChange={handleInputChange}
                       options={reportService.getStatusCollection()}
                       error={errors.status}
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
