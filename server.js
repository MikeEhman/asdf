var http = require('http');
var url = require('url');
var queryString = require('querystring');

http.createServer(function (req, res) {
    console.log("Request received. URL: " + req.url);
    var theUrl = url.parse(req.url);
    var queryObj = queryString.parse(theUrl.query);
    var obj = JSON.parse(queryObj.jsonData);
    console.log("Name: " + obj.name);
    console.log("Taste: " + obj.taste);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var resObj = JSON.stringify({content:obj.name + " tastes " + obj.taste});
    res.write('_cb('+resObj+')');
    res.end();
}).listen(8888);

console.log("Server has started!");