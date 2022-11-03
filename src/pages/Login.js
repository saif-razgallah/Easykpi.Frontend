import React from 'react'
import { useDispatch } from 'react-redux';
import { SignIn } from '../services/authentication';
import Controls from "../components/controls/Controls";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';
import { useForm, Form } from '../components/utils/useForm';
import { ToastContainer } from 'react-toastify'

const initialFValues = {
  username: '',
  password: '',
}

const Login = () => {

  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? "" : "Ce champ est requis."
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "Ce champ est requis."

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
    //console.log(validate())
    if (validate()) {
      let Username = values.username
      let Password = values.password
      SignIn(dispatch, { Username, Password });
    }
  }


  return (
    <>
      <Helmet>
        <title>Login | Easy KPI</title>
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
        <ToastContainer />
        <Container maxWidth="sm" >
          <Form
            onSubmit={handleSubmit}>
            <Box style={{ mb: 3 }}>
              <Typography
                color="textPrimary"
                variant="h3"
                align="center"
              >
                Login
              </Typography><br></br>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                align="center"
              >
                Connectez-vous à votre compte
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
                paddingBottom: '60px'
              }}
            />

            <Controls.Input
              label="Mot de passe"
              name="password"
              value={values.password}
              type="password"
              onChange={handleInputChange}
              error={errors.password}
              style={{
                width: '100%',
                height: '10px',
                paddingBottom: '80px',

              }}


            />
            <Controls.Button
              color="primary"
              type="submit"
              text="Connecter"
              style={{
                width: '100%',
                verticalalign: "middle",
                marginLeft: "8px",
                backgroundColor: "rgb(0, 214, 143)",
                borderRadius: '8px'
              }}
            />
            <Typography
              color="textSecondary"
              variant="body2"
              style={{
                paddingTop: '30px'

              }}
            >
              Vous n'avez pas de compte ?
              {' '}
              <Link
                to="/inscrit"
                variant="h7"
                style={{
                  color: 'rgb(51, 102, 255)',
                  paddingLeft: "300px"
                }}
              >
                S'inscrire
              </Link>
            </Typography>
          </Form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
