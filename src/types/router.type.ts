import { FC, MutableRefObject } from "react"
import { AugmentRouteType } from "./route.type"

export type AugmentRouterType = {
  routes: Array<AugmentRouteType>,
  preLoadRoutesComponent: FC<any>,
  browserRouterProp?: any,
  browserRouterRef?: MutableRefObject<any>,
}
