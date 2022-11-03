import React from 'react'
import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';


const Page404 = () => {


  return (
    <div style={{ backgroundColor: '#FFFFFF', width: "100%", height: "720px" }}>
      <Helmet>
        <title>404 | Easy KPI</title>
      </Helmet>
      <Box
        style={{
          marginTop: '70px',
        }}
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h4"
          >
            404 : La page que vous recherchez n'est pas ici

          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Soit vous avez essayé un itinéraire ombragé, soit vous êtes venu ici par erreur.
            Quoi qu'il en soit, essayez d'utiliser la navigation
          </Typography>
          <Box style={{ textAlign: 'center' }}>
            <img
              alt="Easy KPI"
              src="/static/images/404/404.jpg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
        </Container>
      </Box>
      <Box></Box>
    </div>
  )
}

export default Page404
