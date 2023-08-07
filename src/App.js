import "./App.css";
import { API } from "aws-amplify";
import React, { useState } from "react";

const teeTimeApi = "teeTimes";
const path = "/teeTime";

function App() {
  const [input, setInput] = useState("");
  const [teeTimes, setTeeTime] = useState([
    { teeTimeId: "1", time: "10:00" },
    { teeTimeId: "2", time: "10:15" },
    { teeTimeId: "3", time: "10:30" },
  ]);
  const [teeSheet, setTeeSheet] = useState([]);

  console.log(teeSheet);

  const getTeeTime = (e) => {
    let teeTimeId = e.input;
    API.get(teeTimeApi, path + "/" + teeTimeId)
      .then((response) => {
        let newTeeTimes = [...teeTimes];
        newTeeTimes.push(response);
        setTeeTime(newTeeTimes);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const addTeeTimeToTeeSheet = (e) => {
    let newTeeTime = e.teeTime;
    API.get(teeTimeApi, path + "/" + newTeeTime.teeTimeId)
      .then((response) => {
        let newTeeSheet = [...teeSheet];
        let id = response.teeTimeId;
        newTeeSheet.push({ id, time: newTeeTime.time });
        setTeeSheet(newTeeSheet);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div className="App">
      <h1>Create Tee Sheet</h1>

      <h2 style={{ visibility: teeTimes.length > 0 ? "visible" : "hidden" }}>
        Time Slots
      </h2>
      {teeTimes.map((teeTime, index) => {
        return (
          <div key={teeTime.customerId}>
            <button onClick={() => addTeeTimeToTeeSheet({ teeTime })}>
              <span>
                <b>{teeTime.time}</b>
              </span>
            </button>
          </div>
        );
      })}
      <h2 style={{ visibility: teeTimes.length > 0 ? "visible" : "hidden" }}>
        Response
      </h2>
      {teeSheet.map((teeTime, index) => {
        return (
          <div key={teeTime.teeTimeId}>
            <span>
              <b>TeeTimeId:</b> {teeTime.id} - <b>@</b>: {teeTime.time}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
