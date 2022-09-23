const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = 8000;

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);

  let reqUrl = req.url;
  const PUBLIC_DIRECTORY = path.join(__dirname, '../public')

  switch(reqUrl){
    case "/":
        reqUrl = '/index.html';
        break;

    case "/cars":
        reqUrl = '/cars.html';
        break;
    default:
        reqUrl = req.url;
        break;
  }

  // parse URL
  const parsedUrl = url.parse(reqUrl);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extension. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
  // maps file extension to MIME typere
  const absolutePath = path.join(PUBLIC_DIRECTORY, pathname);
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpeg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  fs.exists(absolutePath, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
     
      res.statusCode = 404;
      res.end("ERROR 404 NOT FOUND");
      
      return;

    }
    // console.log(absolutePath);
    // // if is a directory search for index file matching the extension
    // if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

    // read file from file system
    fs.readFile(absolutePath, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });


}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);