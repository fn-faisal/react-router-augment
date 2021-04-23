import React, { useEffect, useState } from 'react'
import AugmentRouter, { asyncComponent, execute, redirect } from '@react-augment/react-router';
import { browserHistory } from 'react-router';

const Home = () => (<div>Home</div>);
const Login = () => (<div>Login</div>);


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
    { path: '/about', component: ({ history }) => (<div>About <span onClick={() => history.push('/')}>asd</span></div>) },
    { path: '/', component: () => (<div>Session: {session}</div>),
      middleware:
      [
        execute(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 3000)
          })
        }),
        asyncComponent(() => <div>Asd: {session}</div>),
        execute(async () => {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 3000)
          })
          return redirect('/about');
        }),
      ]
    },
  ]}

  />
}

export default App
