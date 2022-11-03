import { Box, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import React  from 'react'


const DwhListToolbar = ({ filter, setFiltering }) => {

  return (

    <Card style={{ borderRadius: '20px' }}>
      <CardContent>
        <Box style={{ maxWidth: 1200, display: "flex" }} >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                  >
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            placeholder="recherche d'entrepôt de données"
            variant="outlined"
            style={{ width: 1100 }}
            onChange={(e) => {
              setFiltering(e.target.value.length > 0)
              filter(e.target.value)
            }}
          />

        </Box>
      </CardContent>
      
    </Card>

  )
}

export default DwhListToolbar;
