import { FC, MutableRefObject } from "react"
import { Route } from "react-router"

export type AugmentRouterType = {
  routes: Array<Route>,
  preLoadRoutesComponent: FC<any>,
  browserRouterProp: any,
  browserRouterRef?: MutableRefObject<any>,
}
