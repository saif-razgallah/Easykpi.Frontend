import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../utils/useForm';
import { useSelector, useDispatch } from 'react-redux';
import {GetUsers} from '../../../services/user';
import {GetDataWH} from '../../../services/datawh';

const initialFValues = {
    id: 0,
    userAccess: '',
    dataWHId: '',
}

export default function DatawhForm(props) {

    const { addOrEdit,recordForEdit } = props
    console.log(recordForEdit)
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


    //

    const users = useSelector(state => state.userSlice.users);
    const datawhs = useSelector(state => state.datawhSlice.datawhs);
    console.log(datawhs)
    const dispatch = useDispatch();
    // Similaire à componentDidMount et componentDidUpdate :
      useEffect(() => {
            GetUsers(dispatch);
        },[]);
        useEffect(() => {
            GetDataWH(dispatch);
        },[]);
    //

    var userList = [];
    users.forEach(function(element) {
        if (element.occupation == "Concepteur") {
            userList.push({id: element.id , title:element.username })
        }
        
    });


    var datawhList = [];
    datawhs.forEach(function(element) {
        datawhList.push({id: element.id , title:element.intitule })
        //console.log(element.id)
    });

    console.log(datawhList)
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
                        name="dataWHId"
                        label="Datawarehouse"
                        value={values.dataWHId}
                        onChange={handleInputChange}
                        options={datawhList}
                        error={errors.dataWHId}
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
