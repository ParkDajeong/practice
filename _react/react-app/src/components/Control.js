import React from "react";

function Control(props) {
  const changeMode = (e) => {
    e.preventDefault();
    props.onChangeMode(e.target.textContent);
  };

  return (
    <ul>
      <li>
        <a href="/create" onClick={changeMode}>
          create
        </a>
      </li>
      <li>
        <a href="/update" onClick={changeMode}>
          update
        </a>
      </li>
      <li>
        <button type="button" value="delete" onClick={changeMode}>
          delete
        </button>
      </li>
    </ul>
  );
}

export default Control;
