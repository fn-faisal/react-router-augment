import React from "react";
import { AugmentRouterType } from "../types";
import AugmentRouterComponent from '../index';

export function augmentRouter( routerProps: Pick<AugmentRouterType, 'routes' | 'browserRouterRef' | 'browserRouterProp'> ) {
  return function ({ children }: any) {
    return () => <AugmentRouterComponent {...routerProps} preLoadRoutesComponent={children} />
  };
}

