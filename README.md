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
    { exact: true, path: '/', component: Home },
    { path: '/about', component: About }
  ]}/>
}
```
### Basic Middleware
You can add middleware to your routes and use react-augment's builtin middleware functions
#### Using middleware array.
```jsx
middleware: [...]
```
#### Redirect middleware function
You can redirect users from your middleware when their login status changes using the ```jsx**redirect**``` middleware function.

```jsx
  { exact: true, path: '/home', component: () => (<div>Session: {session}</div>),
   middleware: [
      execute(() => {
        if ( inSession === true ) {
          return redirect('/login')
        }
      }),
    ]},
    { path: '/login', component: () => (<div>Login</div>) },
  ]}
```

#### Async middleware component.
A component can be updated, on a given path, using async components.
##### Eg.
```jsx
<AugmentRouter routes={[
    { path: '/', component: () => (<div>Session: {session}</div>), middleware:
    [
      execute(() => {
        return new Promise((resolve, reject) => {
          // maybe dispatch some action here.
          setTimeout(() => {
            resolve();
          }, 3000)
        })
      }),
      asyncComponent(() => <div>Logged in as: {session}</div>),
    ]},
    { path: '/about', component: () => (<div>About</div>) },
  ]}
```
### Middleware execution order.
Middleware will execute sequentially.
eg.
```jsx
  middleware: [ m1, m2, m3 ]
```

the first middleware function to execute would be m1, the m2 and vice versa.
By default middlware functions will keep executing even when one of the encounters an excetion or a redirect middleware function is returned.

To optionally break the execution chain on exception, pass **true** to **execute** middleware function as a second argument.

Eg.
```jsx
execute(() => {}, true);
```

### Middleware pipeline variables.

#### Return values of execute function.
Whenever a middleware execute function returns a value, it's passed to the middleware function that's sitting ahead of it in the execution order. In the next middleware function that receives this value, if it's the **execute** function, it's accessable via it's first parameter of the async function passed to execute.

```jsx
  execute((previousMiddlewareReturnValue) => {...})
```

#### Handling middleware exceptions.
Whenever a middleware execute function encounters an exception, to handle it, another execute middleware can be passed to the execution chain. This function will have any **exception** values thrown by the previous execute middleware function.


```jsx
  execute((previousMiddlewareReturnValue, previousMiddlewareException) => {...})
```
Such a functionality can be used to display an error message or log something incase of an exception and optionally continue the execution chain.

### Linking components.
By default, the components passed to react router have browser history object passed in their props. The history object can be used to perform navigation.

```jsx
component: ({ history }) => (<.../>)
```

### Browser Router Ref.
You can get a hold of a reference to browser router by passing a **ref** object to **AugmentRouter** ref prop.

```jsx
<AugmentRouter ref={ref} ... />
```

### Browser Router props.
Browser router props can be supplied to the augment router using **browserRouterProp** prop.

### Typescript
Typescript support added.

#### Types
import types via ```jsx import {...} from '@react-augment/react-router/dist/types'```

* AugmentRouterType
* AugmentComponentType
* AugmentRouteType

### Higher Order Functions (HOF)
> `###### Clean code and decorator alternative`

You can use higher order functions as a clean alternative to decorators and use them across both javascript and typescript with ease.

##### *hof* -`augmentRouter`
This acts as a wrapper around your main router component and will wrap your main app component with the augment router. The router *hof* accepts the same props that the Augment component does except the preload component prop. So whichever component you supply

eg.
```jsx
import React from 'react';
import { augmentRouter } from '@react-augment/react-router';
// import { AugmentComponentType } from '@react-augment/react-router/dist/types';

const WrapperComponent = () => (<></>);
// routes are now optional but either require atleast one hof route or an empty array in the router hof.
const App = augmentRouter({
    routes: [...],
    // other props
    ....
})(WrapperComponent);

// if you dont want to wrap augment's main navigator, you can simply call the augment router hof without a wrapper
//const App = augmentRouter({
//    routes: [...],
//    // other props
//    ....
//})();
```

##### *hof* -`augmentComponent`
Wanna use something similar to anular decorators but don't want to go through the headache of setting up decorators and avoid pitfalls of using experimental decorators.
You can wrap your components up in `augmentComponent` *hof* and export all your wrapped component in an index file in your component root directory and simply import this directory where you're setting up the router.

eg.
*components/home.tsx*
```tsx
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
```

*components/about.tsx*
```tsx
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
```
*main router file eg. App.tsx*
```tsx
import { augmentRouter } from '@react-augment/react-router';
// import { AugmentComponentType } from '@react-augment/react-router/dist/types';

// you can use wrapper components to update app states etc from the main nav.
// const WrapperComponent = () => (<></>);

const App = augmentRouter({})();
```

And Voilà...
That's it. You're good to go.

##### Adding soon
True MVC suppport by introducing controller logic.

## License

MIT © [https://github.com/fn-faisal/react-router-augment](https://github.com/fn-faisal/react-router-augment)
