import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../utils/useForm';
import * as userService from "../../services/user";


const genderItems = [
    { id: 'homme', title: 'Homme' },
    { id: 'femme', title: 'Femme' },
]

const initialFValues = {
    id: 0,
    lastName: '',
    firstName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    gender: 'homme',
    occupation: '',
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('username' in fieldValues)
            temp.username = fieldValues.username.length > 3 ? "" : "Minimum 4 caracteres."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('phoneNumber' in fieldValues)
        {
            temp.phoneNumber = fieldValues.phoneNumber ? "" : "This field is required."
            if (fieldValues.phoneNumber){temp.phoneNumber = fieldValues.phoneNumber.length > 7 ? "" : "Minimum 8 numbers required."}
        }
            
        if ('password' in fieldValues)
        {
            temp.password = fieldValues.password ? "" : "This field is required."
            if(fieldValues.password){temp.password = fieldValues.password.length > 7 ? "" : "Minimum 8 caracteres."}
        }
            
        if ('occupation' in fieldValues)
        {
            temp.password = fieldValues.occupation ? "" : "This field is required."
            if(fieldValues.occupation){temp.occupation = fieldValues.occupation.length != 0 ? "" : "This field is required."}
        }
            
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
                    <br></br>
                    <Controls.Input
                        label="Nom de la famille"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                    <Controls.Input
                        label="Prénom"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Téléphone"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleInputChange}
                        error={errors.phoneNumber}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Genre"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="occupation"
                        label="Occupation"
                        value={values.occupation}
                        onChange={handleInputChange}
                        options={userService.getRoleCollection()}
                        error={errors.occupation}
                    />
                    <Controls.Input
                        label="Nom d'utilisateur"
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.Input
                        label="Mot de passe"
                        name="password"
                        value={values.password}
                        type="password"
                        onChange={handleInputChange}
                        error={errors.password}
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
