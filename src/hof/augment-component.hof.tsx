import React from "react";
import { AugmentComponent } from "../classes/component.class";
import { AugmentComponentRouteType, AugmentComponentType } from "../types";

export function augmentComponent( route: AugmentComponentRouteType ){
  // singleton to register routes.
  return function(component: React.FC<AugmentComponentType>){
    const augCmp = AugmentComponent.instance();
    augCmp.addRoute(route, component);
    return component;
  }
}
