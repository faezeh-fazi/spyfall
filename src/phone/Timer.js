import React, { useState, useEffect, useRef } from "react";
import "../style/timer.css";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};



export default function Timer({InitialCount}) {
  const [secondsRemaining, setSecondsRemaining] = useState(InitialCount);
  const [status, setStatus] = useState(STATUS.STARTED);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  // const handleStart = () => {
  //   setStatus(STATUS.STARTED);
  // };
  // const handleStop = () => {
  //   setStatus(STATUS.STOPPED);
  // };
  // const handleReset = () => {
  //   setStatus(STATUS.STOPPED);
  //   setSecondsRemaining(InitialCount);
  // };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );

  return (
    <>
      <div style={{ padding: 20 }}>
        {!(twoDigits(minutesToDisplay) && twoDigits(secondsToDisplay) == "00" )? (

           <>{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</>
          
        ) : 
        <h1 style={{fontSize: "55px", fontWeight:"bold"}}>Time is up</h1>
        }
      </div>
    </>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const twoDigits = (num) => String(num).padStart(2, "0");
