import React from "react";

function Navbar(props) {
  const lists = [];
  const data = props.data;

  for (let i = 0; i < data.length; i++) {
    lists.push(
      <li key={data[i].id}>
        <a href={"/content/" + data[i].id}>{data[i].title}</a>
      </li>
    );
  }

  return (
    <nav>
      <ul>{lists}</ul>
    </nav>
  );
}

export default Navbar;
