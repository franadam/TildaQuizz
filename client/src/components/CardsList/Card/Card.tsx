import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import Quizz from '../../../interfaces/Quizz.interface';

import classes from './Card.module.css';

interface Props {
  id: string;
  name: string;
  score: number;
  length: number;
  isStarted: boolean;
}

const Card = ({ id, name, score, length, isStarted }: Props): JSX.Element => {
  const history = useHistory();
  const { setQuizzes } = useGlobalContext();

  const takeQuiz = () => {
    setQuizzes((quizzes) => {
      const quizz = quizzes.find((q: Quizz) => q.id === id);
      if (!quizz) return quizzes;
      const filterdQuizzes = quizzes.filter((q: Quizz) => q.id !== id);
      return [
        ...filterdQuizzes,
        {
          ...quizz,
          isStarted: true,
          score: 0,
        },
      ];
    });
    history.push(`/quizz/${id}`);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{name}</h2>
      <div className={classes.bottom}>
        {isStarted ? (
          <h5 className={classes.subtitle}>
            Score: {score}/{length}
          </h5>
        ) : (
          <h6 className={classes.subtitle}>Not started</h6>
        )}
        <button className={classes.button} onClick={takeQuiz}>
          {isStarted ? 'Redo' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default Card;
