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
          JSON.stringify(elementObj),
          err => {
            if (err) throw err;

            console.log(`${elementObj.elementName}.html has been saved!`);
          }
        );
      });
      //   req.on("end", () => {
      //     console.log(body);
      //   });

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
