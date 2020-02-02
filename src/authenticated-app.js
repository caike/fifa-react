import React, { useEffect, useState } from "react";
import "./App.sass";

const LIST_URL = `${process.env.REACT_APP_API_URL}/winners`;

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

export default AuthenticatedApp;
