import { FC } from "react";

export type RouteType = {
  path: string,
  component: FC<any>,
  exact?: boolean,
  middleware?: Array<Function>
};
