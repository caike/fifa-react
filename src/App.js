import React, { useEffect, useState } from "react";
import { login, logout, loadUser } from "./utils";
import AuthenticatedApp from "./authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app";

function App() {
  const [user, setUser] = useState(false);
  const [loginError, setLoginError] = useState();

  useEffect(() => {
    loadUser().then(isLoggedIn => setUser(isLoggedIn));
  }, []);

  function handleLogin(email, password, cb) {
    login(email, password)
      .then(() => {
        setUser(true);
      })
      .catch(({ message }) => {
        setLoginError(message);
      })
      .finally(() => cb());
  }

  function handleLogout() {
    logout().then(() => {
      setLoginError(null);
      setUser(false);
    });
  }

  return user ? (
    <AuthenticatedApp handleLogout={handleLogout} />
  ) : (
    <UnauthenticatedApp handleLogin={handleLogin} loginError={loginError} />
  );
}

export default App;
