import moment from 'moment';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core';
import * as profileService from "../../services/profile";
import { useDispatch } from 'react-redux';
import { useState } from 'react';


const user = { timezone: 'GTM-7' };


const AccountProfile = ({ CurrentUser }) => {

  const defaultImageSrc = CurrentUser.photo ? CurrentUser.imageSrc : '/img/defaultavatar.png';

  const [values, setValues] = useState({
    id: CurrentUser.id,
    photo: '',
    imageSrc: defaultImageSrc,
    imageFile: null
  })

  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();

  const showPreview = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader();
      reader.onload = x => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result

        })
      }
      reader.readAsDataURL(imageFile)
    }
    else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc

      })
    }
  }

  const validate = () => {
    let temp = {}
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp)
    return Object.values(temp).every(x => x == true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      const formData = new FormData()
      formData.append('photo', values.photo)
      formData.append('id', values.id)
      formData.append('imageFile', values.imageFile)
      profileService.EditImage(dispatch, formData)
    }
  }


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card style={{ borderRadius: '20px' }}>
        <CardContent>
          <Box
            //border={1}
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: '306px',
              borderRadius: '20px'
            }}
          >
            <br></br>
            <Avatar
              src={values.imageSrc}
              style={{
                height: 100,
                width: 100
              }}

            />
            <br></br>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              {CurrentUser.lastName} {CurrentUser.firstName}
            </Typography>


            <Typography
              color="textSecondary"
              variant="body1"
            >
              {CurrentUser.occupation}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {`${moment().format('hh:mm A')} ${user.timezone}`}
            </Typography><br></br>
            <input
              //label="Image"
              //name="image"
              type="file"
              accept="image/*"
              onChange={showPreview}
            />
          </Box>
        </CardContent>

        <Divider />
        <CardActions style={{ height: "43px" }}>

          <Button
            color="primary"
            fullWidth
            variant="text"
            type="submit"
          >
            Enregistrer
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
export default AccountProfile;
