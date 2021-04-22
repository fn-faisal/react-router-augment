import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import Route from './components/route';
import PropTypes from 'prop-types';

function AugmentRouter({ routes, preLoadRoutesComponent }) {

  const findInRoutes = ( component ) => {
    // return routes.
  }
  const switchComp = (
    <Switch>
        { routes.map( ( r, i ) => <Route exact={ i === 0 } path={r.path} component={r.component} middleware={r.middleware} /> ) }
    </Switch>
  );

  if ( typeof preLoadRoutesComponent === 'object' ) {
    const PreLoadRoutesComponent = preLoadRoutesComponent;
    return (
      <BrowserRouter>
        <PreLoadRoutesComponent>
          {switchComp}
        </PreLoadRoutesComponent>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      {switchComp}
    </BrowserRouter>
  );
}

AugmentRouter.propTypes = {
  routes: PropTypes.arrayOf(Route.propTypes)
};

export default AugmentRouter;

export { default as asyncComponent } from './components/asyncComponent';
export { default as execute } from './components/execute';
export { default as redirect } from './components/redirect';
