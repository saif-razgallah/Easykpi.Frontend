import { Helmet } from 'react-helmet';
import { Box, Container, Grid, } from '@material-ui/core';
import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';
import SettingsPassword from './SettingsPassword';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { GetUserSession } from '../../services/session';

const Account = () => {

  const CurrentUser = useSelector(state => state.sessionSlice.usersession);
  const dispatch = useDispatch();
  useEffect(() => {
    GetUserSession(dispatch);
  }, []);

  
  return (

    <div >
      <Helmet>
        <title>Paramètre</title>
      </Helmet>

      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        {CurrentUser.slice(0).map((user) => (
          <Container>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                <AccountProfile CurrentUser={user} />
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
              >
                <AccountProfileDetails CurrentUser={user} />
              </Grid>
            </Grid>
            <Grid
              style={{
                paddingTop: '40px'
              }}
            >
              <SettingsPassword CurrentUser={user} />
            </Grid>
          </Container>
        ))}
      </Box>
      <div className="App">
        <br></br>
      </div>
    </div>


  )

}
export default Account;