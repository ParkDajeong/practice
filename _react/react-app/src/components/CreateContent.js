import React, { useState } from "react";

function CreateContent(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(e) => {
          const _this = e.target;
          e.preventDefault();
          props.onSubmit(_this.title.value, _this.desc.value);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="desc" placeholder="description"></textarea>
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

export default CreateContent;
