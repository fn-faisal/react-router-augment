import React from 'react'
import { Redirect } from 'react-router-dom';
import AugmentRouter, { asyncComponent } from '@react-augment/react-router';

const Home = () => (<div>Home</div>);
const About = () => (<div>About</div>);


const session = false;

const timeOut = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('from promise');
      resolve(`Completed in ${t}`)
    }, t)
  });
}

const App = () => {
  return <AugmentRouter routes={[
    { path: '/', component: Home, middleware:
    [
      timeOut(1000),
      asyncComponent(() => <div>Asd</div>),
    ]},
    { path: '/about', component: About },
  ]}

  />
}

export default App
