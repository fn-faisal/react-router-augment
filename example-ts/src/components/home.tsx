import React from 'react';
// import { execute } from '@react-augment/react-router';
import { augmentComponent } from '@react-augment/react-router';
import { AugmentComponentType } from '../../../dist/types';

const HomeComponent = ({ history }:AugmentComponentType) => {
  return (
    <div>Home <i onClick={() => history.push('/about')}>To about</i></div>
  );
}

export default augmentComponent({
  exact: true,
  path: '/',
  middleware: []
})(HomeComponent);
