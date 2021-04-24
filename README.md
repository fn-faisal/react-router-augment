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


## License

MIT © [https://github.com/fn-faisal/react-router-augment](https://github.com/fn-faisal/react-router-augment)
