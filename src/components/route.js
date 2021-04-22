import React, { useEffect, useState } from 'react';
import { Redirect, Route as BrowserRoute } from 'react-router-dom';
import PropTypes from 'prop-types';

function Route({ path, component, exact, middleware }) {
  const [defaultComponent, setDefaultComponent] = useState(() => component);
  if ( middleware !== undefined ) {
    Promise.all(middleware)
      .then((values) => {
        values.map( (v) => {
          if ( typeof v === 'object' && v?.augId === 'asyncComponent' ) {
            setDefaultComponent(() => v.component);
          }
        });
      });
  }
  return ( <BrowserRoute exact={exact} path={path} component={defaultComponent} /> );
}

Route.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired,
    exact: PropTypes.bool,
    middleware: PropTypes.arrayOf(PropTypes.func)
};

export default Route;
