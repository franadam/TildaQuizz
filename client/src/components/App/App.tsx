import React from 'react';
import classes from './App.module.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/Dashboard';

const App = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard" />
      </Switch>
    </div>
  );
};

export default App;
