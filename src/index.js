import 'core-js/stable';

import React from 'react';
import ReactDOM from '@hot-loader/react-dom';

import AppRoot from './App';

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById('root'));
}

render(AppRoot);

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NewAppRoot = require('./App.js').default;
    render(NewAppRoot);
  });
}
