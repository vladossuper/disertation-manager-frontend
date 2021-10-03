import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { RootState } from "src/app/store";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={props => {
        if (!token) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/tasks",
                state: {
                  from: location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}