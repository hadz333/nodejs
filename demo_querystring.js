var http = require('http');
var url = require('url');

// url http://localhost:8080/?year=2017&month=July will print 2017 July on page
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080);