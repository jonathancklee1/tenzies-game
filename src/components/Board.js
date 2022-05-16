import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Board() {
  const [diceArray, setDiceArray] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [timerActive, setTimerActive] = React.useState(false);
  const [bestTime, setBestTime] = React.useState(
    localStorage.getItem("bestTime") || 0
  );

  React.useEffect(() => {
    // Timer
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  React.useEffect(() => {
    let allHeld = false;
    let allEqual = false;

    // Check if all dice are selected and all have the same number
    allHeld = diceArray.every((die) => die.isHeld === true);
    allEqual = diceArray.every((die) => die.value === diceArray[0].value);
    console.log(allEqual);
    if (allHeld && allEqual) {
      setTenzies(true);
      setTimerActive(false);
    }
  }, [diceArray]);

  React.useEffect(() => {
    localStorage.setItem("bestTime", bestTime);
  }, [bestTime]);

  const diceComponents = diceArray.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={holdDice}
        id={die.id}
      />
    );
  });
  function generateNewDie() {
    // Create a new die
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
    };
  }
  function holdDice(id) {
    // Hold the selected die
    setDiceArray(
      diceArray.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  function rollDice() {
    if (!timerActive) {
      setTimerActive(true);
    }
    // Roll new dice
    if (!tenzies) {
      setDiceArray(
        diceArray.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    } else {
      // Reset game
      if (time < bestTime || bestTime === 0) {
        setBestTime(time);
      }
      setDiceArray(allNewDice());
      setTenzies(false);
      setTime(0);
      setTimerActive(false);
    }
  }

  function allNewDice() {
    // Set random dice
    const randNumArr = [];
    for (let i = 0; i < 10; i++) {
      randNumArr.push(generateNewDie());
    }
    return randNumArr;
  }

  return (
    <div className="board">
      {tenzies && <Confetti width={window.innerWidth} />}
      <h1 className="game-title">Tenzies</h1>
      <h3 className="game-desc">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div className="time-div">
        <p className="time">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </p>
      </div>
      <div className="best-time-div">
        <p>
          Your Best Time:
          {bestTime === 0 ? (
            " No Best Time Yet"
          ) : (
            <span>
              {" "}
              <span>
                {("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:
              </span>
              <span>
                {("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:
              </span>
              <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span>
            </span>
          )}
        </p>
      </div>
      <div className="die-container">{diceComponents}</div>
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}
