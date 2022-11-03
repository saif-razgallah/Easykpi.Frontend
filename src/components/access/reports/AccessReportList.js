import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Divider } from '@material-ui/core';
import AccessReportListResults from './AccessReportListResults';
import AccessReportListToolbar from './AccessReportListToolbar';
import { useSelector, useDispatch } from 'react-redux';
import { GetAccessReport } from '../../../services/accessreport';
import { GetUsers } from '../../../services/user';
import { GetReport } from '../../../services/report';



const AccessReportList = () => {

  const accessreports = useSelector(state => state.accessReportSlice.accessreports);
  const users = useSelector(state => state.userSlice.users);
  const reports = useSelector(state => state.reportSlice.reports);
  const dispatch = useDispatch();

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    GetAccessReport(dispatch);
  }, []);

  useEffect(() => {
    GetUsers(dispatch);
  }, []);

  useEffect(() => {
    GetReport(dispatch);
  }, []);

  //

  return (
    <div>

      <Helmet>
        <title>Access | Report</title>
      </Helmet>

      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >

        <Container maxWidth={false}>
          <AccessReportListToolbar />
          <Divider />

          <Box style={{ pt: 3 }}>
            <AccessReportListResults accessreports={accessreports} users={users} reports={reports} />
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default AccessReportList;
