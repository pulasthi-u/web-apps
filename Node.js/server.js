var http = require("http");
var url = require("url");

http.createServer(function(req, res) {
    
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.write("MY FIRST LINES OF Node.js CODE");
    
    var adr = req.url;
    res.write("<BR>");
    
    res.write(adr);
    
    var parts = url.parse(adr, true).query;
    
    res.write("<BR>" + parts.helo);
    
}).listen(8080);

console.log("SERVER RUNNING ON PORT 8080");