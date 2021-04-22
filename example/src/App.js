import React from 'react'

import AugmentRouter from '@react-augment/react-router'

const Home = () => (<div>Home</div>);
const About = () => (<div>About</div>);

const App = () => {
  return <AugmentRouter routes={[
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]}/>
}

export default App
