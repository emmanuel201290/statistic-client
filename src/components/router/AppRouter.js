import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login } from '../login/Login';
import { CoviScreen } from '../covi/CoviScreen';
import { PrivateRoutes } from './PrivateRoutes';
import '../../App';

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoutes exact path="/" component={CoviScreen} isAuthenticated={user.logged} />
      </Switch>
    </Router>
  );
};
