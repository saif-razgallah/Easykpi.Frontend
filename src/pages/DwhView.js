import React from 'react';
import DwhList from "../components/dwhview/DwhList";
import { ToastContainer } from 'react-toastify'


const DwhView = () => (

  <div className="App">
    <div style={{ maxWidth: '100%', margin: 'auto' }}>
      <ToastContainer />

      <DwhList />
    </div>
  </div>

);

export default DwhView;