import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import Quizz from '../../../interfaces/Quizz.interface';

import classes from './Question.module.css';

const QuestionPage = (): JSX.Element => {
  const [inputChoice, setInputChoice] = useState('');
  const { setQuizzes } = useGlobalContext();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputChoice(value);
  };

  const [quizz, setQuizz] = useState<Quizz>({
    id: '',
    name: '',
    score: 0,
    isStarted: false,
    questions: [],
  });

  const [index, setIndex] = useState(0);

  const { quizzId } = useParams<{ quizzId: string }>();
  const { isLoading, quizzes } = useGlobalContext();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading) {
      const quizz = quizzes.find((quizz) => quizz.id === quizzId);
      if (quizz) {
        setQuizz(quizz);
      }
    }
  }, [isLoading]);

  const navigate = (type: string) => {
    if (type === 'next') {
      if (index === quizz.questions.length - 1) {
        if (quizz.questions[index].answer === inputChoice) calculateScore();
        history.push(`/dashboard`);
      } else {
        setIndex((index) => index + 1);
        history.push(`${quizzId}/question/${quizz.questions[index].id}`);
      }
    } else {
      setIndex((index) => index - 1);
      history.push(`${quizzId}/question/${quizz.questions[index].id}`);
    }
  };

  const calculateScore = () => {
    setQuizzes((quizzes) => {
      const quizz = quizzes.find((q: Quizz) => q.id === quizzId);
      if (!quizz) return quizzes;
      const filterdQuizzes = quizzes.filter((q: Quizz) => q.id !== quizzId);
      return [
        ...filterdQuizzes,
        {
          ...quizz,
          score: quizz.score + 1,
        },
      ];
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (quizz.questions[index - 1].answer === inputChoice) calculateScore();
    setInputChoice('');
  };

  const displayOptions = () => {
    const optionsArray = quizz.questions[index].options.split(',');
    return optionsArray.map((opt) => (
      <div key={opt} className={classes.container}>
        <input
          type="radio"
          value={opt}
          id={opt}
          name="answers"
          onChange={inputHandler}
        />
        <label htmlFor={opt}>{opt}</label>
      </div>
    ));
  };

  return (
    <div className={classes.container}>
      <a href={`/quizz/${quizzId}`}>
        <h1 className={classes.title}>{quizz.name}</h1>
      </a>
      {isLoading ? (
        <p>Loading...</p>
      ) : quizz.questions.length ? (
        <div className={classes.wrapper}>
          <h3 className={classes.subtitle}>{quizz.questions[index].text}</h3>
          <form className={classes.container} onSubmit={submitHandler}>
            {displayOptions()}
            {index ? (
              <button
                className={classes.link}
                onClick={() => navigate('previous')}
              >
                Back
              </button>
            ) : null}

            <button
              type="submit"
              className={classes.link}
              onClick={() => navigate('next')}
            >
              Next
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionPage;
