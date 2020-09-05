import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// import PageIndex from './pages/index';
// import PagePugAndHtml from './pages/pugandhtml';
// import PageTextAndBase64 from './pages/textandbase64';
// import PageTinyImage from './pages/tinyimage';

const PageIndex = React.lazy(() => import(/* webpackChunkName: "index" */ './pages/index'));
const PagePugAndHtml = React.lazy(() => import(/* webpackChunkName: "pugandhtml" */ './pages/pugandhtml'));
const PageTextAndBase64 = React.lazy(() => import(/* webpackChunkName: "textandbase64" */ './pages/textandbase64'));
const PageTinyImage = React.lazy(() => import(/* webpackChunkName: "tinyimage" */ './pages/tinyimage'));

const { BASE_URL } = process.env;

function App() {
  return (
    <div className="App">
      <Router
        basename={BASE_URL}
      >
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
