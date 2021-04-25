import React, { Dispatch, FC, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';


export default function useMiddleware( Component: FC<any>, middleware: Array<() => any> | undefined, exact: boolean, path: string
    , setDefaultComponent: Dispatch<any>, setRedirectComponent: Dispatch<any> | undefined, exceptionComponent: FC<any> | undefined
    , setExceptionComponent: Dispatch<any> | undefined ) {
  const handleMiddleware: any =  async () => {
    if ( middleware !== undefined ) {
      let payload: any = null, exception: any = null;
      for ( const m of middleware ) {
        if ( m ) {
          const rs: any = await Promise.resolve(m);
          if ( typeof rs === 'object' && rs?.augId === 'asyncComponent' ) {
            setDefaultComponent(<Route exact={exact} path={path} component={rs.component} />);
          }
          else if ( typeof rs === 'object' && rs?.augId === 'execute' ) {
            try {
              payload = await Promise.resolve(rs.func(payload, exception));
              if ( typeof payload === 'object' && payload.augId === 'redirect' && setRedirectComponent ) {
                  setRedirectComponent(<Route render={() => <Redirect exact from={path} to={payload.path}/>} />);
                return;
              }
            } catch ( e ) {
              exception = e;
              if ( exceptionComponent !== null )
                setDefaultComponent(<Route exact={exact} path={path} component={exceptionComponent} />);
              if ( rs.breakPipeOnException === true )
                return;
            }
          }
          else if ( typeof rs === 'object' && rs?.augId === 'exceptionComponent' && setExceptionComponent ) {
            setExceptionComponent(rs.component);
          }
        }
      }
    }
  }

  useEffect(() => {
    handleMiddleware();
  },[Component]);
}
