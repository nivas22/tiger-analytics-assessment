import React, { Suspense } from 'react';
import { Switch, Route, withRouter, Redirect  } from 'react-router-dom';
import Aux from "./hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import AdminLayout from "./layout/AdminLayout";

function App() {
  return (
    <Aux>
      <ScrollToTop>
        <Suspense>
          <Switch>
            <Route path="/home" component={AdminLayout} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Suspense>
      </ScrollToTop>
    </Aux>
  );
}

export default withRouter(App);
