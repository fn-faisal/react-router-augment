import React from "react";
import { RouteOverrideError } from "../errors";
import { AugmentComponentType, AugmentComponentRouteType, AugmentRouteType } from "../types";

export class AugmentComponent {

  private static selfRef: AugmentComponent;

  private routes: Array<AugmentRouteType> = [];
  private registeredPaths: Array<string> = [];

  private constructor(){}

  public addRoute( route: AugmentComponentRouteType, component: React.FC<AugmentComponentType> ) {
    const existingRoute = this.registeredPaths.find( (r: string) => r === route.path );
    if ( existingRoute ) {
      // TODO test out exception
      throw new RouteOverrideError(`Can not override existing route ${route.path} for component ${component.displayName}`);
    }
    this.registeredPaths.push(route.path);
    this.routes.push({ ...route, component: component });
  }

  public getRoutes() {
    return this.routes;
  }

  public static instance() {
    if ( !AugmentComponent.selfRef ) {
      this.selfRef = new AugmentComponent();
    }
    return this.selfRef;
  }

}
