import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import UserListResults from './UserListResults';
import UserListToolbar from './UserListToolbar';
import { useSelector, useDispatch } from 'react-redux';
import { GetUsers } from '../../services/user';


const UserList = () => {

  const users = useSelector(state => state.userSlice.users);
  const dispatch = useDispatch();

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    GetUsers(dispatch);
  }, []);

  const [isFiltering, setFiltering] = useState(false)
  const [Filtered, setFiltered] = useState(false)

  // fct pour filter
  const filterResults = (input) => {
    let results = users.filter(x => {
      const name = x.lastName.toLowerCase()
      const term = input.toLowerCase()
      return name.indexOf(term) > -1
    })
    console.log(results)
    setFiltered(results)
  }


  return (
    <div>

      <Helmet>
        <title>Administration</title>
      </Helmet>

      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >

        <Container maxWidth={false}>
          <UserListToolbar filter={filterResults} setFiltering={setFiltering} /><br></br>
          <Box style={{ pt: 3 }}>
            <UserListResults users={isFiltering ? Filtered : users} />
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default UserList;
