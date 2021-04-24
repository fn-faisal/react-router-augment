import React, { useRef, useState } from 'react'
import AugmentRouter, { asyncComponent, execute, redirect } from '@react-augment/react-router';
import { AugmentComponentType } from '@react-augment/react-router/dist/types';

const App = () => {
  const [ session ] = useState(321);

  const ref = useRef(null);

  return <AugmentRouter ref={ref}
  routes={[
    { path: '/about', component: ({ history }: AugmentComponentType) => (<div>About <span onClick={() => history.push('/')}>asd</span></div>) },
    { path: '/', component: () => (<div>Session: {session}</div>),
      middleware:
      [
        execute(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(null);
            }, 3000)
          })
        }),
        asyncComponent(() => <div>Asd: {session}</div>),
        execute(async () => {
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(null);
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
