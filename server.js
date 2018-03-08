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
    case req.url === "/elements":
      let body = "";
      req.on("data", data => {
        body += data;
        let elementObj = querystring.parse(body);

        // let elementString = querystring.stringify(elementObj); //can be saved with elemental data
        // console.log(elementString);
        fs.writeFile(
          `./public/${elementObj.elementName}.html`,
          JSON.stringify({ elementObj }, null, "\t"),
          err => {
            if (err) throw err;

            console.log(`${elementObj.elementName}.html has been saved!`);
          }
        );
        // let toHTML = (function() {
        //   let head = window.document.createElement("head");
        //   let myCSSHref = "./css/styles.css";
        //   let cssLink = window.document.createElement("link");
        //   cssLink.id = cssId;
        //   cssLink.rel = "stylesheet";
        //   cssLink.type = "text/css";
        //   cssLink.href = myCSSHref;
        //   cssLink.media = "all";
        //   head.appendChild(cssLink);
        //   let docBody = window.document.createElement("body");
        //   let docH1 = window.document.createElement("h1");
        //   let docH2 = window.document.createElement("h2");
        //   let docH3 = window.document.createElement("h3");
        //   let docP = window.document.createElement("p");
        // })();
        // fs.writeFile(`./public/${elementObj.elementName}.html`, toHTML, err => {
        //   if (err) throw err;
        //   console.log("File has been appended");
        // });
        //   req.on("end", () => {
        //     console.log(body);
        //   });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("success : true");
        res.end();
      });
      break;
    case req.url === "/boron.html":
      fs.readFile("./public/boron.html", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(fd);
        res.end();
      });
    default:
      fs.readFile("./public/404.html", (err, fd) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" }); //to client
        res.write(fd);
        res.end();
      });
      break;
  }
  //   res.end(); //this is necessary
});
// server.on("CONNECT", (req, clientSocket, head) => {
//   console.log("Is connected");
//   console.log(req, "connecting req");
//   console.log(head, "head");
//   console.log("client socket", clientSocket);
//   const serverUrl = url.parse(`http://${req.url}`);
//   clientSocket.write("HTTP/1.1 200 OK \n\n");
//   serverSocket.write(head);
//   serverSocket.pipe(clientSocket);
//   clientSocket.pipe(serverSocket);
// });
// server.listen(8080, () => {
//   const options = {
//     port: 8080,
//     method: "CONNECT"
//   };
// });
server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
