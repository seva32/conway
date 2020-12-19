import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { About, Home, Game, NotFound } from './views';
import Layout from './components/Layout';

import './assets/tailwind.css';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/game/:id?" component={Game} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}
