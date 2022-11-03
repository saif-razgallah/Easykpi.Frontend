import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import * as profileService from "../../services/profile";
import { useDispatch } from 'react-redux';


const initialFValues = {
  oldpassword: '',
  password: '',
  confirm: ''
}

const SettingsPassword = ({ CurrentUser }) => {

  const dispatch = useDispatch();
  const [values, setValues] = useState({
    oldpassword: '',
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const resetForm = () => {
    setValues(initialFValues);
}

  const handleSubmit = e => {
    e.preventDefault()
    let oldpassword = values.oldpassword
    let password = values.password
    let id = CurrentUser.id

    if (values.password === values.confirm) {
      profileService.EditPassword(dispatch, { id, password, oldpassword });
      resetForm()
    }
  }


  return (
    <form onSubmit={handleSubmit} >
      <Card style={{ borderRadius: '20px' }}>
        <CardHeader
          subheader="Changer votre mot de passe"
          title="Mot de passe"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            //  style={{
            //   width: '70%', 
            // }}
            label="Votre mot de passe actuel"
            margin="normal"
            name="oldpassword"
            onChange={handleChange}
            type="password"
            value={values.oldpassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Votre nouveau mot de passe"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmer le nouveau mot de passe"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
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
      </Card>
    </form>
  );
};

export default SettingsPassword;
