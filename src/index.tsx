import AugmentRouter from './core';

export default AugmentRouter;

export { default as asyncComponent } from './actions/asyncComponent';
export { default as execute } from './actions/execute';
export { default as redirect } from './actions/redirect';
export * from './hof/augment-router.hof';
