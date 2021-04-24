import React, { Dispatch, FC, useState } from 'react';
import { Route as BrowserRoute, useHistory } from 'react-router-dom';
import PropType from 'prop-types';
import { RouteType } from '../../types/route.type';
import useMiddleware from './middleware.hook';

function Route({ path, component, exact, middleware, setRedirectComponent }: RouteType & { setRedirectComponent: Dispatch<any> }) {
  const Component = component;
  const history = useHistory();

  const [defaultComponent, setDefaultComponent] = useState(<BrowserRoute exact={exact} path={path} render={() => <Component history={history} />}/>);
  const [exceptionComponent, setExceptionComponent] = useState<FC<any> | undefined>(undefined);

  useMiddleware(Component, middleware, exact || false, path, setDefaultComponent, setRedirectComponent, exceptionComponent, setExceptionComponent);

  // const handleMiddleware =  async () => {
  //   if ( middleware !== undefined ) {
  //     let payload: any = null, exception: any = null;
  //     for ( const m of middleware ) {
  //       if ( m ) {
  //         const rs: any = await Promise.resolve(m);
  //         if ( typeof rs === 'object' && rs?.augId === 'asyncComponent' ) {
  //           setDefaultComponent(<BrowserRoute exact={exact} path={path} component={rs.component} />);
  //         }
  //         else if ( typeof rs === 'object' && rs?.augId === 'execute' ) {
  //           try {
  //             payload = await Promise.resolve(rs.func(payload, exception));
  //             if ( typeof payload === 'object' && payload.augId === 'redirect' ) {
  //               // window.location.href = payload.path;
  //               setRedirectComponent(<BrowserRoute render={() => <Redirect exact from={path} to={payload.path}/>} />);
  //               return;
  //             }
  //           } catch ( e ) {
  //             exception = e;
  //             if ( exceptionComponent !== null )
  //               setDefaultComponent(<BrowserRoute exact={exact} path={path} component={exceptionComponent} />);
  //             if ( rs.breakPipeOnException === true )
  //               return;
  //           }
  //         }
  //         else if ( typeof rs === 'object' && rs?.augId === 'exceptionComponent' ) {
  //           setExceptionComponent(rs.component);
  //         }
  //       }
  //     }
  //   }
  // }

  // useEffect(() => {
  //   handleMiddleware();
  // }, [Component]);

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
