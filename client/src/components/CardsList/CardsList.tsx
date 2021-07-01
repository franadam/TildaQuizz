import React from 'react';
import Quizz from '../../interfaces/Quizz.interface';

import Card from './Card/Card';
import classes from './CardsList.module.css';

interface Props {
  list: Quizz[];
}
const CardsList = ({ list }: Props): JSX.Element => {
  return (
    <div className={classes.container}>
      {list.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          score={card.score}
          isStarted={card.isStarted}
        />
      ))}
    </div>
  );
};

export default CardsList;
