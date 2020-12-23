import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { About, Home, Game, Rules, NotFound } from './views';
import Layout from './components/Layout';

import './assets/tailwind.css';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/game/:id?" component={Game} />
          <Route exact path="/rules" component={Rules} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  );
}
