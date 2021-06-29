import { gql } from '@apollo/client';

export const QUIZZES_QUESTIONS = gql`
  query MyQuery {
    quizzes {
      id
      name
      questions {
        id
        answer
        text
        options
      }
    }
  }
`;

export const QUIZZES = gql`
  query MyQuery {
    quizzes {
      id
      name
    }
  }
`;
