import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PageIndex from './pages/index';
import PagePugAndHtml from './pages/pugandhtml';
import PageTextAndBase64 from './pages/textandbase64';
import PageTinyImage from './pages/tinyimage';

const { BASE_URL } = process.env;

function App() {
  return (
    <div className="App">
      <Router
        basename={BASE_URL}
      >
        <Switch>
          <Route
            exact
            path="/"
            component={PageIndex}
          />
          <Route
            exact
            path={`/pugandhtml`}
            component={PagePugAndHtml}
          />
          <Route
            exact
            path={`/textandbase64`}
            component={PageTextAndBase64}
          />
          <Route
            exact
            path={`/tinyimage`}
            component={PageTinyImage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
