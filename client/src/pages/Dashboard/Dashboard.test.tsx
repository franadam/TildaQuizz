import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';

import Dashboard from './Dashboard';
import { AppProvider } from '../../context';
import { QUIZZES_QUESTIONS } from '../../queries/quizz';

const mocks = [
  {
    request: {
      query: QUIZZES_QUESTIONS,
    },
    result: {
      data: {
        quizzes: [
          {
            id: '03daf064-0b47-40c5-9b39-0d81a5f58397',
            name: 'Geography',
            questions: [
              {
                answer: 'Tokyo',
                id: '558f8dd7-fc74-43ce-a13a-e0f88003dc30',
                options: 'Delhi,Tokyo,Paris,Sao Paulo',
                text: 'What is the largest city in the world?',
              },
              {
                answer: 'Peru',
                id: 'ff25a48d-589f-4708-96fb-2542f893bcb2',
                options: 'Peru,Bolivia,Columbia,Chile',
                text: 'In what country can you visit Machu Picchu?',
              },
              {
                answer: '54',
                id: '419bd976-3ce1-4d71-b3ec-17f1f2ee3bd3',
                options: '35,48,54,25',
                text: 'How many countries are there in Africa?',
              },
            ],
          },
          {
            id: '84a4fd17-4f81-489f-bb96-84dfd71b93a6',
            name: 'General knowledge',
            questions: [
              {
                answer: '20000',
                id: '2d567936-ece0-43c3-abc8-d51d29a24233',
                options: '500,60000,1300,20000',
                text: 'How many breaths does the human body take daily?',
              },
              {
                answer: '1972',
                id: '7996abe0-6a48-47d7-9da2-c4e817387d1a',
                options: '1968,1972,1989,2001',
                text: 'In which year was The Godfather first released?',
              },
              {
                answer: 'Father McKenzie',
                id: '1a843652-d1ee-4ef6-995e-901a9af7a148',
                options:
                  'Father McKenzie,Father McDonald,Father McCarthy,Father McCauley',
                text: 'In "Eleanor Rigby" by The Beatles, what was the name of the priest?',
              },
            ],
          },
        ],
      },
    },
  },
];

beforeEach(async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AppProvider>
            <Dashboard />
          </AppProvider>
        </MockedProvider>
      </MemoryRouter>,
    );
  });
});

describe('Dashboard', () => {
  it('should render Loading', () => {
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render Quizzes', async () => {
    await waitFor(() => screen.getByText('Geography'));
    const geographyElement = screen.getByText(/Geography/i);
    expect(geographyElement).toBeInTheDocument();
    const generalKnowledgeElement = screen.getByText(/General knowledge/i);
    expect(generalKnowledgeElement).toBeInTheDocument();
  });
});
