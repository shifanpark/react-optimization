import React, { Component, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// import Home from './modules/Home';
const HomeComponent = React.lazy(() => import('./modules/Home'));
const TablesComponent = React.lazy(() => import('./modules/Tables'));
const WorkerComponent = React.lazy(() => import('./modules/Worker'));
// import Tables from './modules/Tables';

class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/table" element={<TablesComponent />} />
          <Route path="/worker" element={<WorkerComponent />} />
          {/* <Route
            path="/table"
            element={React.lazy(() => import('./modules/Tables'))}
          ></Route> */}
        </Routes>
      </Suspense>
    );
  }
}

export default App;
