import React from 'react';
import AccessReportList from "../components/access/reports/AccessReportList";
import { ToastContainer } from 'react-toastify'


const AccessReport = () => (

     <>
          <div className="App">
               <ToastContainer />

               <div style={{ maxWidth: '100%', margin: 'auto' }}>
                    <AccessReportList />
               </div>
               
          </div>
          <div className="App">
               <br></br>
          </div>

     </>

);

export default AccessReport;