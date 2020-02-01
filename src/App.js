import React, { useEffect, useState } from "react";
import "./App.sass";
import { login, logout, loadUser } from "./utils";

const LIST_URL = `${process.env.REACT_APP_API_URL}/winners`;

function App() {
  const [user, setUser] = useState(false);
  const [loginError, setLoginError] = useState();

  useEffect(() => {
    loadUser().then(isLoggedIn => setUser(isLoggedIn));
  }, []);

  function handleLogin(event) {
    login(event)
      .then(() => {
        setUser(true);
      })
      .catch(({ message }) => {
        setLoginError(message);
      });
  }

  function handleLogout() {
    logout().then(setUser(false));
  }

  return user ? (
    <AuthenticatedApp handleLogout={handleLogout} />
  ) : (
    <UnauthenticatedApp handleLogin={handleLogin} loginError={loginError} />
  );
}

function UnauthenticatedApp({ handleLogin, loginError }) {
  return (
    <div>
      <form method="POST" onSubmit={handleLogin}>
        <p>
          <label>Email:</label>
          <input type="text" id="email"></input>
        </p>
        <p>
          <label>Password:</label>
          <input type="password" id="password"></input>
        </p>
        <p>
          <small>(use foo@bar.com / secret)</small>
        </p>
        <input type="submit" value="Login"></input>
      </form>
      {loginError && <div className="loginError">Invalid credentials</div>}
    </div>
  );
}

function AuthenticatedApp({ handleLogout }) {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    console.log("fetching");
    fetch(LIST_URL)
      .then(data => data.json())
      .then(data => setWinners(data.winners));
  }, []);

  return (
    <div className="container">
      <div className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">FIFA World Cup Winners</h1>
            <h3 className="subtitle">
              List of countries who are bad ass in soccer
            </h3>
          </div>
          <div>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </div>
      <WinnerList winners={winners} sortByYear={sortByYear}></WinnerList>
    </div>
  );

  function sortByYear() {
    setWinners(winners.slice(0).reverse());
  }
}

function WinnerList({ winners, sortByYear }) {
  const list = winners.map((w, i) => {
    return (
      <tr key={i}>
        <td>{w.country}</td>
        <td>{w.year}</td>
      </tr>
    );
  });
  const table = (
    <table className="table is-bordered is-striped">
      <thead>
        <tr>
          <th>Team</th>
          <th>
            <a href="#" onClick={sortByYear}>
              Year
            </a>
          </th>
        </tr>
      </thead>
      <tbody>{list}</tbody>
    </table>
  );
  return <div className="winner-list">{table}</div>;
}

export default App;
