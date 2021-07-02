import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Quizz from '../../interfaces/Quizz.interface';
import classes from './Quizz.module.css';
import { useGlobalContext } from '../../context';

const QuizzPage = (): JSX.Element => {
  const { quizzId } = useParams<{ quizzId: string }>();
  const { isLoading, quizzes } = useGlobalContext();

  const history = useHistory();

  const [quizz, setQuizz] = useState<Quizz>({
    id: '',
    name: '',
    score: 0,
    isStarted: false,
    questions: [],
  });

  const [questionId, setQuestionId] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      const quizz = quizzes.find((quizz) => quizz.id === quizzId);
      if (quizz) setQuizz(quizz);
    }
  }, [isLoading]);

  const startQuizz = () => {
    history.push(`${quizzId}/question/${quizz.questions[0].id}`);
    setQuestionId(1);
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={classes.wrapper}>
          <a href={`/quizz/${quizzId}`}>
            <h1 className={classes.title}>{quizz?.name}</h1>
          </a>

          <button className={classes.link} onClick={startQuizz}>
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizzPage;
