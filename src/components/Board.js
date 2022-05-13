import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function Board() {
  const [diceArray, setDiceArray] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    let allHeld = true;
    for (let i in diceArray)
      if (diceArray[i].isHeld === false) {
        allHeld = false;
      }
    if (allHeld === true) {
      setTenzies(true);
    }
    if (tenzies === true) {
      console.log("Won!");
    }
  }, [diceArray]);

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
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
    };
  }
  function holdDice(id) {
    setDiceArray(
      diceArray.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  function rollDice() {
    setDiceArray(diceArray.map((die) => (die.isHeld ? die : generateNewDie())));
  }

  function allNewDice() {
    const randNumArr = [];
    for (let i = 0; i < 10; i++) {
      randNumArr.push(generateNewDie());
    }
    return randNumArr;
  }

  console.log(allNewDice());
  return (
    <div className="board">
      <h1 className="game-title">Tenzies</h1>
      <h3 className="game-desc">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div className="die-container">{diceComponents}</div>
      <button className="roll-btn" onClick={rollDice}>
        Roll
      </button>
    </div>
  );
}
