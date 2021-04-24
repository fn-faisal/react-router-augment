import React, { ReactNode } from "react";
import { AugmentComponent } from "../classes/component.class";
import { AugmentComponentRouteType } from "../types";

type PropsWithChildren<P> = P & { children?: ReactNode };

export function augmentComponent( route: AugmentComponentRouteType ){
  // singleton to register routes.
  return function<T>(component: React.FC<PropsWithChildren<T>>){
    const augCmp = AugmentComponent.instance();
    // @ts-ignore
    augCmp.addRoute(route, component.children);
    return component;
  }
}
