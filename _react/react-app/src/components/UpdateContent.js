import React, { useState } from "react";

function UpdateContent(props) {
  const [state, setState] = useState({
    title: props.data.title,
    desc: props.data.desc,
  });

  const inputDatahandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(state.title, state.desc);
        }}
      >
        <p>
          <input
            type="text"
            name="title" //
            value={state.title}
            placeholder="title"
            onChange={inputDatahandler}
          ></input>
        </p>
        <p>
          <textarea
            name="desc" //
            value={state.desc}
            placeholder="description"
            onChange={inputDatahandler}
          ></textarea>
        </p>
        <p>
          <button type="submit" name="save">
            save
          </button>
        </p>
      </form>
    </article>
  );
}

export default UpdateContent;
