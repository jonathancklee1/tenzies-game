import React from "react";

export default function Die(props) {
  const selected = props.isHeld ? "die isHeld" : "die shake";
  let face;
  function setDiceFace() {
    // Renders dots on dice
    switch (props.value) {
      case 1:
        face = (
          <div className="dots-wrapper">
            <div className="dot a1 none"></div>
            <div className="dot a2 none"></div>
            <div className="dot a3 none"></div>
            <div className="dot a4"></div>
            <div className="dot a5 none"></div>
            <div className="dot a6 none"></div>
            <div className="dot a7 none"></div>
          </div>
        );
        break;
      case 2:
        face = (
          <div className="dots-wrapper">
            <div className="dot a1 "></div>
            <div className="dot a2 none"></div>
            <div className="dot a3 none"></div>
            <div className="dot a4 none"></div>
            <div className="dot a5 none"></div>
            <div className="dot a6 none"></div>
            <div className="dot a7 "></div>
          </div>
        );
        break;
      case 3:
        face = (
          <div className="dots-wrapper">
            <div className="dot a1 "></div>
            <div className="dot a2 none"></div>
            <div className="dot a3 none"></div>
            <div className="dot a4"></div>
            <div className="dot a5 none"></div>
            <div className="dot a6 none"></div>
            <div className="dot a7 "></div>
          </div>
        );
        break;
      case 4:
        face = (
          <div className="dots-wrapper">
            <div className="dot a1"></div>
            <div className="dot a2 none"></div>
            <div className="dot a3"></div>
            <div className="dot a4 none"></div>
            <div className="dot a5"></div>
            <div className="dot a6 none"></div>
            <div className="dot a7 "></div>
          </div>
        );
        break;
      case 5:
        face = (
          <div className="dots-wrapper">
            <div className="dot a1 "></div>
            <div className="dot a2 none"></div>
            <div className="dot a3 "></div>
            <div className="dot a4 "></div>
            <div className="dot a5 "></div>
            <div className="dot a6 none"></div>
            <div className="dot a7 "></div>
          </div>
        );
        break;
      case 6:
        face = (
          <div className="dots-wrapper">
            <div className="dot a1 "></div>
            <div className="dot a2 "></div>
            <div className="dot a3 "></div>
            <div className="dot a4 none"></div>
            <div className="dot a5 "></div>
            <div className="dot a6 "></div>
            <div className="dot a7 "></div>
          </div>
        );
        break;
      default:
        face = (
          <div className="dots-wrapper">
            <div className="dot a1 "></div>
            <div className="dot a2 "></div>
            <div className="dot a3 "></div>
            <div className="dot a4 none"></div>
            <div className="dot a5 "></div>
            <div className="dot a6 "></div>
            <div className="dot a7 "></div>
          </div>
        );
    }
    return face;
  }
  return (
    <div
      className={selected}
      onClick={() => {
        props.holdDice(props.id);
      }}
    >
      {setDiceFace()}
    </div>
  );
}
