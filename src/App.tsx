import React from 'react';
import { Provider } from 'react-redux';

import Routes from './routes/Routes';
import store from './store/store';

import './App.scss';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="app-wrapper">
          <Routes />
        </div>
      </div>
    </Provider>
  );
};

export default App;