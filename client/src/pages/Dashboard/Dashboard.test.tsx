import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';

import Dashboard from './Dashboard';
import { QUIZZES } from '../../queries/quizz';

const mocks = [
  {
    request: {
      query: QUIZZES,
    },
    result: {
      data: {
        quizzes: [
          {
            id: '03daf064-0b47-40c5-9b39-0d81a5f58397',
            name: 'Geography',
          },
          {
            id: '84a4fd17-4f81-489f-bb96-84dfd71b93a6',
            name: 'General knowledge',
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
          <Dashboard />
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
