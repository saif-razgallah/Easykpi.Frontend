import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { GetDashboard } from '../../services/dashboard';
import DashboardEmbed from './DashboardEmbed'
import { useSelector } from 'react-redux';
import * as dashboardService from "../../services/dashboard";
import { ToastContainer } from 'react-toastify'


const DashboardList = () => {


  const [limit, setLimit] = useState(10);
  const dashboards = useSelector(state => state.dashboardSlice.dashboards);
  const dispatch = useDispatch();

  useEffect(() => {
    GetDashboard(dispatch);
  }, []);


  const onDelete = dashboard => {
    dashboardService.DeleteDashboard(dispatch, dashboard)
  }


  return (
    <>

      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {dashboards.slice(0, limit).map((dashboard) => (
        <>
          <Card style={{ borderRadius: '20px' }} >
            <ToastContainer />
            <Box style={{ alignItems: 'center', display: 'flex' }}>
              <Typography
                style={{ paddingLeft: '1200px' }}
                color="textPrimary"
                variant="body1"
              >
                <button
                  onClick={() => { onDelete(dashboard) }}
                  class="MuiButtonBase-root MuiIconButton-root" tabindex="0" type="button"><span class="MuiIconButton-label"><span class="material-icons MuiIcon-root MuiIcon-colorError" aria-hidden="true">delete</span></span><span class="MuiTouchRipple-root"></span></button>

              </Typography>
            </Box>

            <DashboardEmbed dashboard={dashboard} />

          </Card>

          <div className="App">
            <br></br>
          </div>
        </>
      ))}
    </>
  )
}

export default DashboardList;
