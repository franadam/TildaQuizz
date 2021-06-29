import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import CardsList from '../../components/CardsList/CardsList';

import { QUIZZES } from '../../queries/quizz';

import classes from './Dashboard.module.css';

const Dashboard = (): JSX.Element => {
  const [quizzes, setQuizzes] = useState([]);
  const { loading, data } = useQuery(QUIZZES);

  useEffect(() => {
    if (!loading) setQuizzes(data.quizzes);
  }, [loading]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Tilda Quizz</h1>
      <CardsList list={quizzes} />
    </div>
  );
};

export default Dashboard;
