import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Redirect, Switch, Route as BrowserRoute, useHistory } from "react-router-dom";
import Route from './components/route';
import PropTypes from 'prop-types';

function AugmentRouter({ routes, preLoadRoutesComponent, browserRouterProp, browserRouterRef }) {

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
      <BrowserRouter {...browserRouterProp} ref={browserRouterRef}>
        <PreLoadRoutesComponent>
          {switchComp}
        </PreLoadRoutesComponent>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter {...browserRouterProp} ref={browserRouterRef}>
      {switchComp}
    </BrowserRouter>
  );
}

AugmentRouter.propTypes = {
  routes: PropTypes.arrayOf(Route.propTypes),
  preLoadRoutesComponent: PropTypes.elementType,
  browserRouterProp: PropTypes.object
};

const WrappedComponent = React.forwardRef(
  function (props, browserRouterRef) {
    return <AugmentRouter {...props} browserRouterRef={browserRouterRef} />;
  }
);

export default WrappedComponent;

export { default as asyncComponent } from './actions/asyncComponent';
export { default as execute } from './actions/execute';
export { default as redirect } from './actions/redirect';
