import React, { useState, useEffect } from "react";

export default function Question(props) {
  function setParentValue(e) {
    props.setValue(e.target.value, props.id);
  }

  return (
    <div className="question--container">
      {props.question}
      <div className="question--buttons">
        <button
          style={{ background: `${props.colorfalse}` }}
          onClick={setParentValue}
          value={"False"}
        >
          False
        </button>
        <button
          style={{ background: `${props.colortrue}` }}
          onClick={setParentValue}
          value={"True"}
        >
          True
        </button>
      </div>
    </div>
  );
}
