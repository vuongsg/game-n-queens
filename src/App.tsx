import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { NavBar } from './components/NavBar';
import { Nqueens } from './components/nQueens';
import { About } from './components/About';
import './App.scss';

function App() {
  const history = createBrowserHistory();
  history.push('/');

  return (
    <Router history={history}>
      <div className='App'>
        <NavBar />

        <Switch>
          <Route path='/about' component={About} />
          <Route path='/' component={Nqueens} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
