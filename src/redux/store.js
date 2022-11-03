import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice'
import userSlice from './userSlice'
import reportSlice from './reportSlice'
import datawhSlice from './datawhSlice'
import accessReportSlice from './accessReportSlice';
import accessDatawhSlice from './accessDatawhSlice';
import sessionSlice from './sessionSlice';
import dashboardSlice from './dashboardSlice';
import ToastMiddleware from '../middlewares/ToastMiddleware'

//import { composeWithDevTools } from 'redux-devtools-extension';
//import {applyMiddleware } from 'redux';

// export const store = configureStore({
//   reducer: {raccesReducer: RAccesReducer,},
//   }, composeWithDevTools(applyMiddleware(),
// ));


export const store = configureStore({
  reducer: 
  {
    authenticationSlice :authenticationSlice,
    userSlice: userSlice,
    reportSlice: reportSlice,
    datawhSlice: datawhSlice,
    accessReportSlice: accessReportSlice,
    accessDatawhSlice: accessDatawhSlice,
    sessionSlice: sessionSlice,
    dashboardSlice: dashboardSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});