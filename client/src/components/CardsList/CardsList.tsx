import React from 'react';
import Quiz from '../../interfaces/Quiz.interface';

import Card from './Card/Card';
import classes from './CardsList.module.css';

interface Props {
  list: Quiz[];
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
          isStarted={false}
        />
      ))}
    </div>
  );
};

export default CardsList;
