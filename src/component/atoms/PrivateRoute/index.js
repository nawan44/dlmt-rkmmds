import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
