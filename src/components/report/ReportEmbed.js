import React from "react";
import  { useEffect } from 'react';
import * as axios from 'axios'
import * as pbi from 'powerbi-client';
let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/Embedding',
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
  return config;
});

const ReportEmbed = (props) => {
    
    const { recordForEdit } = props
    console.log(recordForEdit)
    useEffect(async () => {
      
      const { data } = await axiosInstance.get(`/${recordForEdit.id}`)
      const embedInfo = data
      console.log(embedInfo)
      let config = {
      type: 'report',
      accessToken: embedInfo.accessToken,
      embedUrl: embedInfo.embedUrl,
      id: embedInfo.reportId,
      tokenType: pbi.models.TokenType.Embed,
      
    };
    
    // Get a reference to the embedded report HTML element
    var embedContainer = document.getElementById('Embed-container');

    // Embed the report and display it within the div container.
    console.log(pbi);
    var report = powerbi.embed(embedContainer, config);

    
    });
    
    return (
        
        <div>
          
        <div id='Embed-container' style={{height: "550px",width: "800px"}}>
          Loading report ...
        </div>
      </div>
      )
    }
    
    export default ReportEmbed;