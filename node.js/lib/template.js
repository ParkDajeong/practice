module.exports = {
  descTemplate: createDescTemplate,
  formTemplate: createFormTemplate,
};

function createDescTemplate(list, title, body) {
  const create = "<a href='/create'>create</a>";
  const update = `<a href='/update?id=${title}'>update</a>`;
  const del = `
    <form action="/process_delete" method="post" onsubmit="alert('정말 삭제하시겠습니까?')">
      <input type="hidden" name="id" value="${title}">
      <input type="submit" value="delete">
    </form>
  `;
  return `
    <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          ${list}
        </ol>
        ${title === "create" ? "" : create}
        ${title === "Welcome" || title === "create" ? "" : update}
        ${del}
        ${body}
      </body>
      </html>
  `;
}

function createFormTemplate(type, title = "", desc = "") {
  return `
    <form action="/process_${type}" method="post">
      <p><input type="hidden" name="id" value="${title}"></p>
      <p><input type="text" name="title" placeholder="title" value="${title}"></p>
      <p>
        <textarea name="description" placeholder="description">${desc}</textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `;
}
