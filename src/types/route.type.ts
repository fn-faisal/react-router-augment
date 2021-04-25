import { FC } from "react";

export type AugmentComponentType = {
  history: any
};

export type AugmentRouteType = {
  path: string,
  component: FC<AugmentComponentType>,
  exact?: boolean,
  middleware?: Array<any>
};

export type AugmentComponentRouteType = Pick<AugmentRouteType, 'path' | 'exact' | 'middleware'>
