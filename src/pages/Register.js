import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Controls from "../components/controls/Controls";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';
import { useForm, Form } from '../components/utils/useForm';
import { SignUp } from '../services/authentication';


const initialFValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}


const Register = () => {

  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? "" : "Ce champ est requis."
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "Ce champ est requis."
    if ('confirmPassword' in fieldValues)
      temp.confirmPassword = fieldValues.confirmPassword ? "" : "Ce champ est requis."

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
    if (validate()) {
      let Username = values.username
      let Email = values.email
      let Password = values.password
      if (values.password === values.confirmPassword) {
        SignUp(dispatch, { Username, Email, Password });
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>Inscrit | Easy KPI</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          paddingTop: '60px',
        }}
      >
        <Container maxWidth="sm" >
          <Form
            onSubmit={handleSubmit}>
            <Box style={{ mb: 3 }}>
              <Typography
                color="textPrimary"
                variant="h3"
                align="center"
              >
                Inscription
              </Typography><br></br>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                align="center"
              >
                Créez votre compte
              </Typography><br></br>
            </Box>
            <Controls.Input
              label="Nom d'utilisateur"
              name="username"
              value={values.username}
              onChange={handleInputChange}
              error={errors.username}
              style={{
                width: '100%',
                height: '20px',
                paddingBottom: '50px'
              }}
            />
            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
              style={{
                width: '100%',
                height: '20px',
                paddingBottom: '50px'
              }}
            />
            <Controls.Input
              label="Mot de passe"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
              type="password"
              style={{
                width: '100%',
                height: '20px',
                paddingBottom: '50px'
              }}
            />
            <Controls.Input
              label="Repeat password"
              name="confirmPassword"
              value={values.confirmPassword}
              type="password"
              onChange={handleInputChange}
              error={errors.confirmPassword}

              style={{
                width: '100%',
                height: '10px',
                paddingBottom: '80px',
              }}


            />
            <Controls.Button
              color="primary"
              type="submit"
              text="Valider"
              style={{
                width: '100%',
                verticalalign: "middle",
                marginLeft: "8px",
                backgroundColor: "rgb(0, 214, 143)"


              }}
            />
            <Typography
              color="textSecondary"
              variant="body2"
              style={{
                paddingTop: '30px'

              }}
            >
              Vous avez un compte ?
              {' '}
              <Link
                to="/login"
                variant="h7"
                style={{
                  color: 'rgb(51, 102, 255)',
                  paddingLeft: "320px"
                }}
              >
                S'identifier
              </Link>
            </Typography>
          </Form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
