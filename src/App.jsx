// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Optional for custom styles

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      audioRef.current.play();
      setIsSession(!isSession);
      setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60);
    }
  }, [isActive, timeLeft, breakLength, sessionLength, isSession]);

  const resetTimer = () => {
    setIsActive(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsSession(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="app d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card text-center" style={{ width: '300px' }}>
        <div className="card-header">
          <h1>25 + 5 Clock</h1>
        </div>
        <div className="card-body">
          <div>
            <div id="break-label">Break Length</div>
            <div id="break-length">{breakLength}</div>
            <button
              id="break-decrement"
              className="btn btn-primary mx-1"
              onClick={() => breakLength > 1 && setBreakLength(breakLength - 1)}
            >
              Decrement
            </button>
            <button
              id="break-increment"
              className="btn btn-primary mx-1"
              onClick={() => breakLength < 60 && setBreakLength(breakLength + 1)}
            >
              Increment
            </button>
          </div>
          <div>
            <div id="session-label">Session Length</div>
            <div id="session-length">{sessionLength}</div>
            <button
              id="session-decrement"
              className="btn btn-primary mx-1"
              onClick={() => sessionLength > 1 && setSessionLength(sessionLength - 1)}
            >
              Decrement
            </button>
            <button
              id="session-increment"
              className="btn btn-primary mx-1"
              onClick={() => sessionLength < 60 && setSessionLength(sessionLength + 1)}
            >
              Increment
            </button>
          </div>
          <div className="my-4">
            <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
            <div id="time-left">{formatTime(timeLeft)}</div>
          </div>
          <button id="start_stop" className="btn btn-success mx-2" onClick={() => setIsActive((prev) => !prev)}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button id="reset" className="btn btn-danger mx-2" onClick={resetTimer}>
            Reset
          </button>
        </div>
        <audio id="beep" ref={audioRef} src="https://www.soundjay.com/button/sounds/beep-07.mp3" />
      </div>
    </div>
  );
};

export default App;
