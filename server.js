const http = require("http");
const fs = require("fs");
const url = require("url");
const net = require("net");
const querystring = require("querystring");

// http.get({
//   hostname: "localhost",
//   port: 8080,
//   pathy: "/",
//   agent: false
// }, (res) => {

// });
const server = http.createServer((req, res) => {
  console.log("Someone tried to connect!");

  // res.write(req.url);
  switch (true) {
    case req.url === "/css/styles.css":
      fs.readFile("./css/styles.css", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/css" }); //to client
        res.write(fd);
        res.end();
      });
      break;
    case req.url === "/hydrogen.html":
      fs.readFile("./public/hydrogen.html", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" }); //to client
        res.write(fd);
        res.end();
      });
      break;
    case req.url === "/helium.html":
      fs.readFile("./public/helium.html", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" }); //to client
        res.write(fd);
        res.end();
      });
      break;
    case req.url === "/":
      fs.readFile("./public/index.html", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" }); //to client
        res.write(fd);
        res.end();
      });
      break;
    case req.url === "/index.html":
      fs.readFile("./public/index.html", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" }); //to client
        res.write(fd);
        res.end();
      });
      break;
    case req.url === "/Boron.html":
      fs.readFile("./public/Boron.html", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(fd);
        res.end();
      });
    case req.url === "/elements":
      let body = "";
      req.on("data", data => {
        body += data;
        let elementObj = querystring.parse(body);

        const elementString = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ${
          elementObj.elementName
        }</title><link rel="stylesheet" href="/css/styles.css"></head><body><h1>${
          elementObj.elementName
        }</h1><h2>${elementObj.elementSymbol}</h2><h3>Atomic number ${
          elementObj.elementAtomicNumber
        }</h3>
            <p>${
              elementObj.elementDescription
            }</p><p><a href="/">back</a></p></body> </html>`;

        fs.writeFile(
          `./public/${elementObj.elementName}.html`,
          elementString,
          err => {
            if (err) throw err;

            console.log(`${elementObj.elementName}.html has been saved!`);
          }
        );
        fs.readFile("./public/index.html", (err, data) => {
          if (err) throw err;
          console.log(data);
        });
        fs.appendFile(
          "./public/index.html",
          `<ol><li><a href=./${elementObj.elementName}.html>${
            elementObj.elementName
          }</a>
          </li></ol>`,
          err => {
            if (err) throw err;
            console.log("index.html has been updated");
          }
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("success : true");
        res.end();
      });

      break;

    default:
      fs.readFile("./public/404.html", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" }); //to client
        res.write(fd);
        res.end();
      });
      break;
  }
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
