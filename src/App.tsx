import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { NavBar } from './components/NavBar';
import { Nqueens } from './components/nQueens';
import { About } from './components/About';
import './App.scss';

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <div className='App'>
        <NavBar />

        <Switch>
          <Route exact path='/' component={Nqueens} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
