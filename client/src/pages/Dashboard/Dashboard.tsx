import React from 'react';

import CardsList from '../../components/CardsList/CardsList';

import classes from './Dashboard.module.css';
import { useGlobalContext } from '../../context';

const Dashboard = (): JSX.Element => {
  const { isLoading, quizzes } = useGlobalContext();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Tilda Quizz</h1>
      {isLoading ? <p>Loading...</p> : <CardsList list={quizzes} />}
    </div>
  );
};

export default Dashboard;
