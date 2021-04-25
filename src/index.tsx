import AugmentRouter from './core';

import { default as asyncComponent } from './actions/asyncComponent';
import { default as execute } from './actions/execute';
import { default as redirect } from './actions/redirect';
import { default as exceptionComponent } from './actions/exceptionComponent';

import {
  augmentComponent,
  augmentRouter
} from './hof';

module.exports = {
  default: AugmentRouter,
  asyncComponent,
  execute,
  redirect,
  exceptionComponent,
  augmentRouter,
  augmentComponent
}
