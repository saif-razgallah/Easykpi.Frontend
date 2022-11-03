import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as profileService from "../../services/profile";
import Notification from "../utils/Notification";


const states = [
  {
    value: 'homme',
    label: 'Homme'
  },
  {
    value: 'femme',
    label: 'Femme'
  }
];


const AccountProfileDetails = ({ CurrentUser }) => {

  const dispatch = useDispatch();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  const [values, setValues] = useState({
    id: CurrentUser.id,
    firstName: CurrentUser.firstName,
    lastName: CurrentUser.lastName,
    email: CurrentUser.email,
    username: CurrentUser.username,
    phoneNumber: CurrentUser.phoneNumber,
    gender: CurrentUser.gender,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const refreshPage = ()=>{
    window.location.reload();
 }

  const handleSubmit = e => {
    e.preventDefault()
    profileService.EditProfile(dispatch, values)
    setTimeout(refreshPage, 1500);

  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card style={{ borderRadius: '20px' }}>
        <CardHeader
          subheader="Les informations peuvent être modifiées"
          title="Profil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Prénom"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nom"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Username"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Téléphone"
                name="phoneNumber"
                onChange={handleChange}
                type="number"
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Genre"
                name="gender"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.gender}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
            alignItems: "center",
            height: "60px"
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            style={{ marginRight: "20px" }}
          >
            Editer
          </Button>
        </Box>
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
