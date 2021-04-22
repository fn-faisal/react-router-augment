import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import AugmentRouter, { asyncComponent, execute, redirect } from '@react-augment/react-router';

const Home = () => (<div>Home</div>);
const About = () => (<div>About</div>);


const startSession = ( setSession, password ) => {
  // return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if ( password === '123456' ) {
        console.log('123')
        setSession(true)
      } else {
        throw Error('401 unauthorized');
      }
    }, 3000)
}

const App = () => {
  const [ session, setSession ] = useState(321);
  const [ inSession, hasSession ] = useState(false);

  useEffect(() => {
    const timeout = startSession(hasSession, '123456');
    return () => clearTimeout(timeout);
  },[]);

  return <AugmentRouter routes={[
    { path: '/', component: () => (<div>Session: {session}</div>), middleware:
    [
      execute(() => {
        console.log(inSession);
        if ( inSession === true ) {
          return redirect('/about')
        }
      }),
      execute(async (val) => {
        console.log(session);
        throw {error: 'random error'};
      }, false),
      execute((value, exception) => {
        if ( exception ) {
          // alert(exception.error);
          throw Error;
        }
      }, false),
      asyncComponent(() => <div>Asd: {session}</div>),
      execute(() => {
        console.log('after');
      }),
    ]},
    { path: '/about', component: () => (<div>About</div>) },

  ]}

  />
}

export default App
