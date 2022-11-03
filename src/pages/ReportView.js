import React from 'react';
import ReportList from "../components/reportview/ReportList";
import { ToastContainer } from 'react-toastify'

const ReportView = () => (

  <div className="App">
    <div style={{ maxWidth: '100%', margin: 'auto' }}>
      <ToastContainer />

      <ReportList />
    </div>
  </div>

);

export default ReportView;