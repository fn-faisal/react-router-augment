import React, { useEffect, useState } from 'react';
import { Redirect, Route as BrowserRoute, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Route({ path, component, exact, middleware, setSession }) {
  const [defaultComponent, setDefaultComponent] = useState(<BrowserRoute exact={exact} path={path} component={component} />);
  const [exceptionComponent, setExceptionComponent] = useState(null);

  const history = useHistory();

  const handleMiddleware =  async () => {
    if ( middleware !== undefined ) {
      let payload = null, exception = null;
      for ( m of middleware ) {
        const rs = await Promise.resolve(m);
        if ( typeof rs === 'object' && rs?.augId === 'asyncComponent' ) {
          setDefaultComponent(<BrowserRoute exact={exact} path={path} component={rs.component} />);
        }
        else if ( typeof rs === 'object' && rs?.augId === 'execute' ) {
          try {
            payload = await Promise.resolve(rs.func(payload, exception));
            console.log(payload);
            if ( typeof payload === 'object' && payload.augId === 'redirect' ) {
              window.location.href = payload.path;
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

  useEffect(() => {
    handleMiddleware();
  }, []);

  return defaultComponent;
}

Route.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired,
    exact: PropTypes.bool,
    middleware: PropTypes.arrayOf(PropTypes.object)
};

export default Route;
