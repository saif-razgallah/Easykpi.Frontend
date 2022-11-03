import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStyles } from "../styles";
import Header from "./Header";
import { useSelector, useDispatch } from 'react-redux';
import { GetUserSession } from '../services/session';
import AdminRoute from "../routes/AdminRoute";
import InviteRoute from "../routes/InviteRoute";
import GestionnaireRoute from "../routes/GestionnaireRoute";
import ConcepteurRoute from "../routes/ConcepteurRoute";

const DefaultLayout = () => {

  const classes = useStyles();
  const user = useSelector(state => state.sessionSlice.usersession);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(1);


  useEffect(() => {
    GetUserSession(dispatch);
  }, []);

  console.log('defaullayout')
  console.log(user)
  
  return (
    

    <div className={classes.appRoot}>
      {user.slice(0, limit).map((currentUser) => (
      <Router>
        <Navigation/>
        <div>
        <Header/>
          <div className={classes.appBarSpacer}></div>
          
            {`${currentUser.occupation}` === "Concepteur"
                            ? 
                            <Switch>
                              {currentUser.occupation}
                            {ConcepteurRoute.map((route, index) => {
                              return (
                                <Route exact key={index} path={route.path}>
                                  {route.component}
                                </Route>
                              );
                            })}
                            </Switch>
                            : (`${currentUser.occupation}` === "Administrateur"
                              ? 
                                <Switch>
                                  {currentUser.occupation}
                                  {AdminRoute.map((route, index) => {
                                    return (
                                      <Route exact key={index} path={route.path}>
                                        {route.component}
                                      </Route>
                                    );
                                  })}
                                </Switch>
                              : (`${currentUser.occupation}` === "Gestionnaire"
                                ? 
                                  <Switch>
                                    {GestionnaireRoute.map((route, index) => {
                                      return (
                                        <Route exact key={index} path={route.path}>
                                          {route.component}
                                        </Route>
                                      );
                                    })}
                                  </Switch>
                                : 
                                  <Switch>
                                    {InviteRoute.map((route, index) => {
                                      return (
                                        <Route exact key={index} path={route.path}>
                                          {route.component}
                                        </Route>
                                      );
                                    })}
                                  </Switch>
                              )
                            )
            }
          
        </div>
      </Router>
      ))}
    </div>
    
  );
};

export default DefaultLayout;
