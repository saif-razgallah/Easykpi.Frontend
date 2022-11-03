import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Avatar, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { GetUserSession } from '../services/session';


const drawerWidth = 240
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      top: 20,
      bottom: 20,
      paddingTop: '40px',
      paddingBottom: '40px',
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: "transparent",
    },
    title: {
      flexGrow: 1,
      textAlign: "end"
    },
    avatar: {
      marginLeft: theme.spacing(2),
      verticalalign: "middle"
    }
  })
);


export default function Header() {

  const [limit, setLimit] = useState(10);
  const classes = useStyles();
  const user = useSelector(state => state.sessionSlice.usersession);
  const dispatch = useDispatch();

  useEffect(() => {
    GetUserSession(dispatch);
  }, []);



  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appbar}
        elevation={0}
        position="absolute"
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title} />
          {user.slice(0, limit).map((currentUser) => (
            <Box height="48px" width="140px" justifyContent="center" alignItems="center"
              style={{ display: "flex", borderRadius: "12px" }}>
              {/* backgroundColor: "#EBEBEC" */}

              <Typography color="textSecondary" variant="subtitle1">
                {currentUser.lastName !== null ? currentUser.lastName : ''}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                .{currentUser.firstName !== null ? currentUser.firstName : ''}
              </Typography>
              <Avatar arrow src={currentUser.imageSrc} className={classes.avatar} />
            </Box>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
}
