import React, { useState, createRef } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import "./unauthenticated-app.sass";

function UnauthenticatedApp({ handleLogin, loginError }) {
  const [isLoading, setIsLoading] = useState(false);
  const email = createRef();
  const password = createRef();

  function submitForm(event) {
    event.preventDefault();
    setIsLoading(true);
    handleLogin(email.current.value, password.current.value, () =>
      setIsLoading(false)
    );
  }

  return (
    <div className="login">
      <form onSubmit={submitForm}>
        <p>
          {/* <label>Email:</label>
          <input ref={email} type="text" id="email"></input> */}
          <InputGroup inputRef={email} type="email" placeholder="Email" />
        </p>
        <p>
          {/* <label>Password:</label>
          <input ref={password} type="password" id="password"></input> */}
          <InputGroup
            inputRef={password}
            type="password"
            placeholder="Password"
          />
        </p>
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
