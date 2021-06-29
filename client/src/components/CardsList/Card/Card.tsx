import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Card.module.css';

interface Props {
  id: string;
  name: string;
  score: number;
  isStarted: boolean;
}

const Card = ({ id, name, score, isStarted }: Props): JSX.Element => {
  const history = useHistory();

  const takeQuiz = () => {
    history.push(`/quiz/${id}`);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{name}</h2>
      <div className={classes.bottom}>
        {isStarted ? (
          <h5 className={classes.subtitle}>Score: {score}</h5>
        ) : (
          <h6 className={classes.subtitle}>Not started</h6>
        )}
        <button className={classes.button} onClick={takeQuiz}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Card;
