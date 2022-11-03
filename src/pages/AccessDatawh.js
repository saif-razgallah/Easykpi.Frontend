import React from 'react';
import AccessDatawhList from "../components/access/datawhs/AccessDatawhList";
import { ToastContainer } from 'react-toastify'


const AccessDatawh = () => (

     <>
          <div className="App">
               <ToastContainer />
               
               <div style={{ maxWidth: '100%', margin: 'auto' }}>
                    <AccessDatawhList />
               </div>
          </div>
          <div className="App">
               <br></br>
          </div>

     </>

);

export default AccessDatawh;