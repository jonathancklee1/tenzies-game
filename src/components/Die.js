import React from "react";

export default function Die(props) {
  const selected = props.isHeld ? "die isHeld" : "die";
  return (
    <div
      className={selected}
      onClick={() => {
        props.holdDice(props.id);
      }}
    >
      <p className="value">{props.value}</p>
    </div>
  );
}
