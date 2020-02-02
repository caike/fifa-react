import React, { useState, createRef, useRef, useEffect } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import "./unauthenticated-app.sass";

function UnauthenticatedApp({ handleLogin, loginError }) {
  const [isLoading, setIsLoading] = useState(false);
  const email = createRef();
  const password = createRef();

  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  function submitForm(event) {
    event.preventDefault();

    setIsLoading(true);
    handleLogin(
      email.current.value,
      password.current.value,
      () => componentIsMounted.current && setIsLoading(false)
    );
  }

  return (
    <div className="login">
      <form onSubmit={submitForm}>
        <InputGroup inputRef={email} type="email" placeholder="Email" />
        <InputGroup
          inputRef={password}
          type="password"
          placeholder="Password"
        />
        <p>
          <small>(use foo@bar.com / secret)</small>
        </p>
        <Button text="Login" type="submit" loading={isLoading}></Button>
        {loginError && <div className="loginError">Invalid credentials</div>}
      </form>
    </div>
  );
}

export default UnauthenticatedApp;
