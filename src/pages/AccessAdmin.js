import React from 'react';
import AccessReportList from "../components/access/reports/AccessReportList";
import AccessDatawhList from "../components/access/datawhs/AccessDatawhList";
import { ToastContainer } from 'react-toastify'


const  AccessAdmin = () => (

     <>
          <div className="App">
               <ToastContainer />

               <div style={{ maxWidth: '100%', margin: 'auto' }}>
                    <AccessReportList />
               </div>
               <br></br>
               <div style={{ maxWidth: '100%', margin: 'auto' }}>
                    <AccessDatawhList />
               </div>
          </div>
          <div className="App">
               <br></br>
          </div>

     </>

);

export default AccessAdmin;