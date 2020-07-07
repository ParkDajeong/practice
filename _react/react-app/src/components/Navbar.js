import React from "react";

function Navbar(props) {
  const lists = [];
  const datas = props.data;

  datas.forEach((data) => {
    const id = data.id;

    lists.push(
      <li key={id}>
        <a
          href={`/content/${id}`}
          onClick={(e) => {
            e.preventDefault();
            props.onChangePage(id);
          }}
        >
          {data.title}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ul>{lists}</ul>
    </nav>
  );
}

export default Navbar;
