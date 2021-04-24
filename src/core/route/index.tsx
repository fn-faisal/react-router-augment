import React, { Dispatch, FC, useState } from 'react';
import { Route as BrowserRoute, useHistory } from 'react-router-dom';
import PropType from 'prop-types';
import { AugmentRouteType } from '../../types/route.type';
import useMiddleware from './middleware.hook';

function Route({ path, component, exact, middleware, setRedirectComponent }: AugmentRouteType & { setRedirectComponent?: Dispatch<any> }) {
  const Component: FC<any> = component;
  const history = useHistory();

  const [defaultComponent, setDefaultComponent] = useState(<BrowserRoute exact={exact} path={path} render={() => <Component history={history} />}/>);
  const [exceptionComponent, setExceptionComponent] = useState<FC<any> | undefined>(undefined);

  useMiddleware(Component, middleware, exact || false, path, setDefaultComponent, setRedirectComponent, exceptionComponent, setExceptionComponent);

  return defaultComponent;
}

Route.prototype = {
  path: PropType.string.isRequired,
  component: PropType.elementType.isRequired,
  exact: PropType.bool,
  middleware: PropType.arrayOf(PropType.func),
  setRedirectComponent: PropType.func
}

export default Route;
