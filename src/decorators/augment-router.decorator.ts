
export function augmentRouter() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
  };
}

// export function augmentRouter (constructor: Function) {
//   console.log(constructor);
// }
