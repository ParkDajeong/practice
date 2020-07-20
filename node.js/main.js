//node.js 로 웹서버 실행
const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");
const dataFolder = "./data";

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

const app = http.createServer(function (request, response) {
  let _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;

  const list = fs
    .readdirSync(dataFolder)
    .map((file) => {
      return `<li><a href="/?id=${file}">${file}</a></li>`;
    })
    .join("");

  // default
  if (pathname === "/") {
    let title = queryData.id;
    if (title === undefined) {
      title = "Welcome";
    }
    fs.readFile(`data/${title}`, "utf8", (err, desc) => {
      const body = `
        <h2>${title}</h2>
        <p>${desc === undefined ? "Hello, node.js" : desc}</p>
      `;
      const template = createDescTemplate(list, title, body);
      response.writeHead(200);
      response.end(template);
    });
  }
  // create
  else if (pathname === "/create") {
    title = "create";
    const body = createFormTemplate("create");
    const template = createDescTemplate(list, title, body);
    response.writeHead(200);
    response.end(template);
  }
  // create 처리
  else if (pathname === "/process_create") {
    let body = "";
    // post 방식으로 form 데이터 받을 때..
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      const post = qs.parse(body); // querystring을 객체화
      const title = post.title;
      const desc = post.description;
      fs.writeFile(`data/${title}`, desc, "utf8", (err) => {
        if (err) throw err;
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  }
  // update
  else if (pathname === "/update") {
    let title = queryData.id;
    fs.readFile(`data/${title}`, "utf8", (err, desc) => {
      const body = createFormTemplate("update", title, desc);
      const template = createDescTemplate(list, title, body);
      response.writeHead(200);
      response.end(template);
    });
  }
  // update 처리
  else if (pathname === "/process_update") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });

    request.on("end", () => {
      const post = qs.parse(body);
      const title = post.title;
      const id = post.id;
      const desc = post.description;
      fs.rename(`data/${id}`, `data/${title}`, () => {
        fs.writeFile(`data/${title}`, desc, "utf8", (err) => {
          if (err) throw err;
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  }
  // delete
  else if (pathname === "/process_delete") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });

    request.on("end", () => {
      const post = qs.parse(body);
      const id = post.id;
      fs.unlink(`data/${id}`, (err) => {
        if (err) throw err;
        response.writeHead(302, { Location: "/" });
        response.end();
      });
    });
  }
  // ERROR 404
  else {
    response.writeHead(404);
    response.end("404 : Not Found");
  }

  //response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3000);
