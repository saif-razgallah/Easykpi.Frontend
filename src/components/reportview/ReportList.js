import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ReportListResults from './ReportListResults';
import ReportListToolbar from './ReportListToolbar';
import { useSelector, useDispatch } from 'react-redux';
import {GetReport} from '../../services/report';


const ReportList = () => {

  const reports = useSelector(state => state.reportSlice.reports);
  const dispatch = useDispatch();
  
  // Similaire à componentDidMount et componentDidUpdate :
    useEffect(() => {
           GetReport(dispatch);
      },[]);
  
  const [isFiltering,setFiltering] = useState(false)
  const [Filtered,setFiltered] = useState(false)
  // fct pour filter
  const filterResults = (input) =>  {
      let results = reports.filter(x => {
        const name = x.intitule.toLowerCase()
        const term = input.toLowerCase()
        return name.indexOf(term)> -1
      })
      console.log(results)  
      setFiltered(results)
  }  
  
  
  return (
    <div>

    <Helmet>
      <title>Rapport</title>
    </Helmet>

    <Box
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3 
      }}
    >

      <Container maxWidth={false}>
        <ReportListToolbar filter={filterResults} setFiltering={setFiltering} /><br></br>
        <Box style={{ pt: 3 }}>
          <ReportListResults reports={ isFiltering ? Filtered : reports} />
        </Box>
      </Container>
    </Box>
  </div>
  )
}

export default ReportList;
