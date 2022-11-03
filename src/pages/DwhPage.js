import React from 'react';
import DwhList from "../components/dwh/DwhList";
import { ToastContainer } from 'react-toastify'


const DwhPage = () => (

  <div className="App">
    <div style={{ maxWidth: '100%', margin: 'auto' }}>
      <ToastContainer />

      <DwhList />
    </div>
  </div>

);

export default DwhPage;