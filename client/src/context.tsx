import React, {
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  Context,
} from 'react';
import { useQuery } from '@apollo/client';

import { QUIZZES_QUESTIONS } from './queries/quizz';
import Quizz from './interfaces/Quizz.interface';

interface AppContextInterface {
  isLoading: boolean;
  quizzes: Quizz[];
  setQuizzes: Dispatch<React.SetStateAction<Quizz[]>>;
}

const AppContext = React.createContext<AppContextInterface | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props): JSX.Element => {
  const [quizzes, setQuizzes] = useState<Quizz[]>([]);

  const { loading, data } = useQuery(QUIZZES_QUESTIONS);

  useEffect(() => {
    if (!loading)
      setQuizzes(
        data.quizzes.map((quizz: Quizz) => ({
          ...quizz,
          score: 0,
          isStarted: false,
        })),
      );
  }, [loading]);

  return (
    <AppContext.Provider value={{ isLoading: loading, quizzes, setQuizzes }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextInterface => {
  const MyContext = AppContext as Context<AppContextInterface>;
  return useContext<AppContextInterface>(MyContext);
};

export { AppContext, AppProvider };
