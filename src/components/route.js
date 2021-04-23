import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route as BrowserRoute, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Route({ path, component, exact, middleware, setRedirectComponent }) {
  const Component = component;

  const history = useHistory();

  const [defaultComponent, setDefaultComponent] = useState(<BrowserRoute exact={exact} path={path} render={() => <Component history={history} />}/>);
  const [exceptionComponent, setExceptionComponent] = useState(null);

  const handleMiddleware =  async () => {
    if ( middleware !== undefined ) {
      let payload = null, exception = null;
      for ( m of middleware ) {
        if ( m ) {
          const rs = await Promise.resolve(m);
          if ( typeof rs === 'object' && rs?.augId === 'asyncComponent' ) {
            setDefaultComponent(<BrowserRoute exact={exact} path={path} component={rs.component} />);
          }
          else if ( typeof rs === 'object' && rs?.augId === 'execute' ) {
            try {
              payload = await Promise.resolve(rs.func(payload, exception));
              if ( typeof payload === 'object' && payload.augId === 'redirect' ) {
                // window.location.href = payload.path;
                setRedirectComponent(<BrowserRoute render={() => <Redirect exact from={path} to={payload.path}/>} />);
                return;
              }
            } catch ( e ) {
              exception = e;
              if ( exceptionComponent !== null )
                setDefaultComponent(<BrowserRoute exact={exact} path={path} component={exceptionComponent} />);
              if ( rs.breakPipeOnException === true )
                return;
            }
          }
          else if ( typeof rs === 'object' && rs?.augId === 'exceptionComponent' ) {
            setExceptionComponent(rs.component);
          }
        }
      }
    }
  }

  // useEffect(() => {
  //   setDefaultComponent(<BrowserRoute exact={exact} path={path} component={component} />);
  // },[]);

  useEffect(() => {
    handleMiddleware();
  }, [Component]);

  return defaultComponent;
}

Route.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired,
    exact: PropTypes.bool,
    middleware: PropTypes.arrayOf(PropTypes.object)
};

export default Route;
