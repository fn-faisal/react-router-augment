import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Switch, Route as BrowserRoute, useHistory } from "react-router-dom";
import Route from './components/route';
import PropTypes from 'prop-types';

function AugmentRouter({ routes, preLoadRoutesComponent, browserRouterProp }) {

  const [ redirectComponent, setRedirectComponent ] = useState(undefined);

  useEffect(() => {
    console.log('render router');
  },[routes]);

  useEffect(() => {
    if ( redirectComponent ) {
      setRedirectComponent(undefined);
    }
  },[redirectComponent]);

  const switchComp =
    redirectComponent ?
    <Switch>
      {redirectComponent}
      { routes.map( ( r, i ) => <Route key={r.path} setRedirectComponent={setRedirectComponent} exact={ i === 0 } path={r.path} component={r.component} middleware={r.middleware} /> ) }
    </Switch>:
  (
    <Switch>
      { routes.map( ( r, i ) => <Route key={r.path} setRedirectComponent={setRedirectComponent} exact={ i === 0 } path={r.path} component={r.component} middleware={r.middleware} /> ) }
    </Switch>
  );

  if ( typeof preLoadRoutesComponent === 'object' ) {
    const PreLoadRoutesComponent = preLoadRoutesComponent;
    return (
      <BrowserRouter {...browserRouterProp} >
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
  routes: PropTypes.arrayOf(Route.propTypes),
  preLoadRoutesComponent: PropTypes.elementType,
  browserRouterProp: PropTypes.object
};

export default AugmentRouter;

export { default as asyncComponent } from './actions/asyncComponent';
export { default as execute } from './actions/execute';
export { default as redirect } from './actions/redirect';
