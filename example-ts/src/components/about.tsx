import React from 'react';
import { execute } from '@react-augment/react-router';
import { augmentComponent } from '@react-augment/react-router';

const AboutComponent = ({ history }: any) => {
  return (
    <div>About <span onClick={() => history.push('/')}>To home</span></div>
  );
}

export default augmentComponent({
  path: '/about',
  middleware: [ execute(() => console.log('middleware about page')) ]
})(AboutComponent);
