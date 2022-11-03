import React from 'react';
import Account from "../components/account/Account";
import { ToastContainer } from 'react-toastify'


const Profile = () => (

  <div className="App">
    <div style={{ maxWidth: '95%', margin: 'auto' }}>
      <ToastContainer />

      <Account />
    </div>
  </div>

)
export default Profile;