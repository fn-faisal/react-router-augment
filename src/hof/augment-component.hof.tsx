import { AugmentComponent } from "../classes/component.class";
import { AugmentComponentRouteType } from "../types";

export function augmentComponent( route: AugmentComponentRouteType ){
  // singleton to register routes.
  return function({ children }: any){
    const augCmp = AugmentComponent.instance();
    augCmp.addRoute(route, children);
  }
}
