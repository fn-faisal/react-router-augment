import React from 'react';
import { Redirect, Route as BrowserRoute } from 'react-router-dom';
import PropTypes from 'prop-types';

function Route({ path, check, component, redirect, exact }) {
    if ( check === true )
        return ( <BrowserRoute exact={exact} path={path} component={component} /> );
    return <Redirect to={ redirect || '/' } />
}

Route.propTypes = {
    path: PropTypes.string.isRequired,
    check: PropTypes.bool,
    component: PropTypes.object.isRequired,
    redirect: PropTypes.string,
    exact: PropTypes.bool
};

export default Route;