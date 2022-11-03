import { React, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userAuthenticated } from './redux/authenticationSlice';
import DefaultLayout from './layouts/DefaultLayout';
import Page404 from './pages/Page404';
import Login from './pages/Login';
import Register from './pages/Register';


const App = () => {

  const { isLoggedIn } = useSelector(state => state.authenticationSlice);
  const dispatch = useDispatch();	

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');
    //const usersession = JSON.parse(sessionStorage.getItem('usersession'));
    if (token !== undefined && token !== null &&  username !== undefined && userId !== null) {
      dispatch(userAuthenticated({ token: token,username: username ,userId:userId}))
    }
  }, []);

  return <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => (isLoggedIn ? <DefaultLayout /> : <Login />)} />
      <Route path="/inscrit" render={() => (isLoggedIn ? <Redirect to='/' /> : <Register />)} />
      <Route path="/login" render={() => (isLoggedIn ? <Redirect to='/' /> : <Login />)} />
      <Route path="/Administration" render={() => (  <DefaultLayout /> )} />
      <Route path="/Dashboard" render={() => (isLoggedIn && <DefaultLayout /> )} />
      <Route path="/Rapport" render={() => (isLoggedIn && <DefaultLayout /> )} />
      <Route path="/Base" render={() => (isLoggedIn && <DefaultLayout /> )} />
      <Route path="/Acces" render={() => (isLoggedIn && <DefaultLayout /> )} />
      <Route path="/Parametres" render={() => (isLoggedIn && <DefaultLayout /> )} />
      <Route component={() => <Page404 />} />
    </Switch>
  </BrowserRouter>
};

export default App;
