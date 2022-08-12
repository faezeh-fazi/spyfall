import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const STATUS = {
    STARTED: "Started",
    STOPPED: "Stopped",
  };
export default function GameTimer({ InitialCount }) {
    const [secondsRemaining, setSecondsRemaining] = useState(InitialCount);
    const [status, setStatus] = useState(STATUS.STARTED);
    const navigate = useNavigate();
    const secondsToDisplay = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
    const minutesToDisplay = minutesRemaining % 60;
  
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
            <div className="timer-group">
              <div className="face">
                <h2>Ask questions</h2>
                <p > {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</p>
              </div>
            </div>

    </>
  );
};
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
  