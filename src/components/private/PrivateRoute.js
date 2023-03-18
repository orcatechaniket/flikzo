import React from 'react'
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const [login, setLogin] = useState(false); // set the default login status to false
    // check if user is logged in
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }, []);
    // render the specified element if user is logged in, redirect to login page if not
    return (
      <Route
        {...rest}
        render={() => {
          return login ? (
            <Component />
          ) : (
            <Navigate to="/login" replace />
          );
        }}
      />
    );
  };
  

export default PrivateRoute