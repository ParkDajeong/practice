//node.js 로 웹서버 실행
const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");
const dataFolder = "./data";
const template = require("./lib/template.js");
const path = require("path");
const sanitizeHtml = require("sanitize-html");

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
    } else {
      title = path.parse(queryData.id).base;
    }
    fs.readFile(`data/${title}`, "utf8", (err, desc) => {
      const sanitizedDesc = sanitizeHtml(desc);
      const body = `
        <h2>${title}</h2>
        <p>${sanitizedDesc === undefined ? "Hello, node.js" : sanitizedDesc}</p>
      `;
      const tmpl = template.descTemplate(list, title, body);
      response.writeHead(200);
      response.end(tmpl);
    });
  }
  // create
  else if (pathname === "/create") {
    title = "create";
    const body = template.formTemplate("create");
    const tmpl = template.descTemplate(list, title, body);
    response.writeHead(200);
    response.end(tmpl);
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
    let title = path.parse(queryData.id).base;
    fs.readFile(`data/${title}`, "utf8", (err, desc) => {
      const body = template.formTemplate("update", title, desc);
      const tmpl = template.descTemplate(list, title, body);
      response.writeHead(200);
      response.end(tmpl);
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
      const id = path.parse(post.id).base;
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
