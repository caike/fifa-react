import React, { useEffect, useState } from "react";
import "./App.css";

const URL = "https://frozen-peak-68797.herokuapp.com/winners"; // "http://localhost:8080/winners"

function App() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(data => data.json())
      .then(data => setWinners(data.winners));
  });

  return (
    <div>
      <p>FIFA Winners</p>
      <WinnerList winners={winners}></WinnerList>
    </div>
  );
}

function WinnerList({ winners }) {
  const list = winners.map((w, i) => <li key={i}>{w.country}</li>);
  return (
    <div className="winner-list">
      <ul>{list}</ul>
    </div>
  );
}

export default App;
