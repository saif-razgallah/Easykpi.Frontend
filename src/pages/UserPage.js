import React from 'react';
import UserList from "../components/user/UserList";
import { ToastContainer } from 'react-toastify'


const UsersPage = () => (

  <div className="App">
    <div style={{ maxWidth: '100%', margin: 'auto' }}>
      <ToastContainer />

      <UserList />
    </div>
  </div>

);

export default UsersPage;