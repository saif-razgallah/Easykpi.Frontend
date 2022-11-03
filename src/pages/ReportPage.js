import React from 'react';
import ReportList from "../components/report/ReportList";
import { ToastContainer } from 'react-toastify'

const ReportPage = () => (

  <div className="App">
    <div style={{ maxWidth: '100%', margin: 'auto' }}>
      <ToastContainer />

      <ReportList />
    </div>
  </div>

);

export default ReportPage;