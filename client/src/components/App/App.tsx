import React from 'react';
import classes from './App.module.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Quizz from '../../pages/Quizz/Quizz';
import Question from '../../pages/Quizz/Question/Question';

const App = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/quizz/:quizzId" exact component={Quizz} />
        <Route
          path="/quizz/:quizzId/question/:questionId"
          component={Question}
        />
        <Redirect to="/dashboard" />
      </Switch>
    </div>
  );
};

export default App;
