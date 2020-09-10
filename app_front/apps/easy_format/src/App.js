import './assets/less/common/index.less';

import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ChunkLoader from './components/ChunkLoader';
import NotFound from './components/Error/NotFound';
import ErrorBoundary from './components/Error/ErrorBoundary';

const PageIndex = lazy(() => import(/* webpackChunkName: "index" */ './pages/Index'));
const PagePugAndHtml = lazy(() => import(/* webpackChunkName: "pugandhtml" */ './pages/PugAndHtml'));
const CryptoJS = lazy(() => import(/* webpackChunkName: "cryptojs" */ './pages/CryptoJS'));
const PageTinyImage = lazy(() => import(/* webpackChunkName: "tinyimage" */ './pages/TinyImage'));

const { BASE_URL } = process.env;

function App() {
  return (
    <div className="App">
      <Router
        basename={BASE_URL}
      >
        <ErrorBoundary>
          <Suspense fallback={<ChunkLoader />}>
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
                path={`/cryptojs`}
                component={CryptoJS}
              />
              <Route
                exact
                path={`/tinyimage`}
                component={PageTinyImage}
              />
              <Route
                component={NotFound}
              />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
