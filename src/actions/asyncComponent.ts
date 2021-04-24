import { FC } from 'react';

function asyncComponent( component: FC<any> ) {
  return {
    augId: 'asyncComponent',
    component
  };
}

export default asyncComponent;
