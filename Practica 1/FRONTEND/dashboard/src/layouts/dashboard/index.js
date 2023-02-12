import socketio from "socket.io-client";
import React, { useState, useEffect } from "react";
// llamamos al socket de la APi
// /get-all-temperature-data
// /get-all-humidity-data
// /get-all-wind-speed-data
// /get-all-wind-direction-data
// /get-all-barometric-pressure-data
// /get-latest-data
function Dashboard() {
  const [data, setData] = useState("");
  const socket = socketio("http://localhost:5000");
  useEffect(() => {
    socket.on("otrafuncion", (newData) => {
      setData(newData);
      console.log(newData);
    });
  }, []);

  return (
    <div>
      <h1>Data from the server:</h1>
      <p>{data}</p>
    </div>
  );
}

export default Dashboard;
