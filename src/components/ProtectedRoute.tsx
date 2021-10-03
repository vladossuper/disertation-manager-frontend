import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { RootState } from 'src/app/store';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation()

  return (
    <Route {...rest} render={
      props => {
        if (token) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: location
              }
            }
          } />
        }
      }
    } />
  )
};
