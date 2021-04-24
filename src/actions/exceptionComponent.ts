import { FC } from 'react';

function exceptionComponent( component: FC<any> ) {
  return {
    augId: 'exceptionComponent',
    component
  };
}

export default exceptionComponent;
