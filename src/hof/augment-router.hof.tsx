import React from "react";
import { AugmentRouterType, AugmentRouteType } from "../types";
import AugmentRouterComponent from '../core';
import { AugmentComponent } from "../classes/component.class";
import { RouteMappingError } from "../errors";

export function augmentRouter( routerProps: Pick<AugmentRouterType, 'routes' | 'browserRouterRef' | 'browserRouterProp'> ) {
  let routes: Array<AugmentRouteType> | undefined = routerProps.routes;
  // routes not specified.
  if ( !routes || routes.length === 0 ){
    // load routes from singleton.
    const augCmp = AugmentComponent.instance();
    const registeredRoutes = augCmp.getRoutes();
    if ( !registeredRoutes && !routes )
      throw new RouteMappingError('No route mapping was provided');
    routes = registeredRoutes;
  }
  return function (component?: any) {
    return () => <AugmentRouterComponent {...routerProps} routes={routes} preLoadRoutesComponent={component?.children} />
  };
}

