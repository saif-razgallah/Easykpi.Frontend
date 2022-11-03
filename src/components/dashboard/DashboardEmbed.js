import React from "react";
import { useEffect } from 'react';
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

const DashboardEmbed = (props) => {

  const { dashboard } = props
  useEffect(async () => {

    const { data } = await axiosInstance.get(`/${dashboard.reportId}`)
    const embedInfo = data
    let config = {
      type: 'report',
      accessToken: embedInfo.accessToken,
      embedUrl: embedInfo.embedUrl,
      id: embedInfo.reportId,
      tokenType: pbi.models.TokenType.Embed,

    };

    // Get a reference to the embedded report HTML element
    var embedContainer = document.getElementById(`Embed-container${dashboard.id}`);

    // Embed the report and display it within the div container.
    var report = powerbi.embed(embedContainer, config);

  });

  return (

    <div>
      <div id={`Embed-container${dashboard.id}`} style={{ height: "650px", width: "1250px" }}>
        Chargement du rapport...
      </div>
    </div>

  )
}

export default DashboardEmbed;