import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container,Divider } from '@material-ui/core';
import AccessDatawhListResults from './AccessDatawhListResults';
import AccessDatawhListToolbar from './AccessDatawhListToolbar';
import { useSelector, useDispatch } from 'react-redux';
import {GetAccessDatawh} from '../../../services/accessdatawh';
import {GetUsers} from '../../../services/user';
import {GetDataWH} from '../../../services/datawh';




const AccessDatawhList = () => {

  const accessdatawhs = useSelector(state => state.accessDatawhSlice.accessdatawhs);
  const users = useSelector(state => state.userSlice.users);
  const datawhs = useSelector(state => state.datawhSlice.datawhs);
  const dispatch = useDispatch();

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    GetAccessDatawh(dispatch);
  },[]);

  useEffect(() => {
          GetUsers(dispatch);
  },[]);

  useEffect(() => {
          GetDataWH(dispatch);
  },[]);
       
  //
  
  return (
    <div>

    <Helmet>
      <title>Access | Entrepot de données</title>
    </Helmet>

    <Box
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3 
      }}
    >

      <Container maxWidth={false}>
        <AccessDatawhListToolbar />
        <Divider />

        <Box style={{ pt: 3 }}>
        <AccessDatawhListResults accessdatawhs={ accessdatawhs } users = {users} datawhs={datawhs}/>
        </Box>
      </Container>
    </Box>
  </div>
  )
}

export default AccessDatawhList;
