import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import DwhListResults from './DwhListResults';
import DwhListToolbar from './DwhListToolbar';
import { useSelector, useDispatch } from 'react-redux';
import { GetDataWH } from '../../services/datawh';


const DwhList = () => {

  const datawhs = useSelector(state => state.datawhSlice.datawhs);
  const dispatch = useDispatch();

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    GetDataWH(dispatch);
  }, []);

  const [isFiltering, setFiltering] = useState(false)
  const [Filtered, setFiltered] = useState(false)

  // fct pour filter
  const filterResults = (input) => {
    let results = datawhs.filter(x => {
      const name = x.intitule.toLowerCase()
      const term = input.toLowerCase()
      return name.indexOf(term) > -1
    })
    console.log(results)
    setFiltered(results)
  }


  return (
    <div>

      <Helmet>
        <title>DataWharehouse</title>
      </Helmet>

      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >

        <Container maxWidth={false}>
          <DwhListToolbar filter={filterResults} setFiltering={setFiltering} /><br></br>
          <Box style={{ pt: 3 }}>
            <DwhListResults datawhs={isFiltering ? Filtered : datawhs} />
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default DwhList;
