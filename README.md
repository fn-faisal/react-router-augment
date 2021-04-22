# @react-augment/react-router

> Sugarcoating for react router

[![NPM](https://img.shields.io/npm/v/@react-augment/react-router.svg)](https://www.npmjs.com/package/@react-augment/react-router) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @react-augment/react-router
```

## Usage

### Basic routing
```jsx
import AugmentRouter from '@react-augment/react-router'

const Home = () => (<div>Home</div>);
const About = () => (<div>About</div>);

const App = () => {
  return <AugmentRouter routes={[
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]}/>
}
```

## License

MIT © [https://github.com/fn-faisal/react-router-augment](https://github.com/https://github.com/fn-faisal/react-router-augment)
