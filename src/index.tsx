import React, { FC, MutableRefObject, useEffect, useState } from 'react';
import { BrowserRouter,  Switch } from "react-router-dom";
import Route from './components/route';
import PropTypes from 'prop-types';
import { AugmentRouterType } from './types/router.type';

function AugmentRouter({ routes, preLoadRoutesComponent, browserRouterProp, browserRouterRef }: AugmentRouterType) {

  const [ redirectComponent, setRedirectComponent ] = useState<FC<any> | undefined>(undefined);

  useEffect(() => {
    if ( redirectComponent ) {
      setRedirectComponent(undefined);
    }
  },[redirectComponent]);

  const switchComp =
    redirectComponent ?
    <Switch>
      {redirectComponent}
      { routes.map( ( r: any, i: any ) => <Route key={r.path} setRedirectComponent={setRedirectComponent} exact={ i === 0 } path={r.path} component={r.component} middleware={r.middleware} /> ) }
    </Switch>:
  (
    <Switch>
      { routes.map( ( r: any, i: any ) => <Route key={r.path} setRedirectComponent={setRedirectComponent} exact={ i === 0 } path={r.path} component={r.component} middleware={r.middleware} /> ) }
    </Switch>
  );

  if ( typeof preLoadRoutesComponent === 'object' ) {
    const PreLoadRoutesComponent: FC<any> = preLoadRoutesComponent;
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
  routes: PropTypes.arrayOf(PropTypes.any),
  preLoadRoutesComponent: PropTypes.elementType,
  browserRouterProp: PropTypes.object
};

const WrappedComponent = React.forwardRef(
  function (props: any, browserRouterRef: MutableRefObject<any>) {
    return <AugmentRouter {...props} browserRouterRef={browserRouterRef} />;
  }
);

export default WrappedComponent;

export { default as asyncComponent } from './actions/asyncComponent';
export { default as execute } from './actions/execute';
export { default as redirect } from './actions/redirect';
export * from './hof/augment-router.hof';
