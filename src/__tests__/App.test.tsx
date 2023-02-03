import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import configureStore from 'redux-mock-store';

describe('With React Testing Library', () => {
    const initialState =   
    { employee: {
      members: [],
      absences: []
     }
    };
    const mockStore = configureStore();
    let store;
    test('renders title', () => {
      store = mockStore(initialState);
      const { getByText } = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(/Absences Management/i)).toBeInTheDocument();
    });

    test('renders table', () => {
      store = mockStore(initialState);
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      const tableItem = screen.getAllByRole("table")
      expect(tableItem).toHaveLength(1)
    });
})

