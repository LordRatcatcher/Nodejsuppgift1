/* Includes:cvv */
var http = require('http');
var fs = require('fs');
var url = require('url');
function calculator(res) {
    fs.readFile('jscalc.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}
function computePage(adr, res) {     
    var q = url.parse(adr, true);
    


    res.write("         <!DOCTYPE html > \n");
    res.write("     <html>  \n");
    res.write("              <head> \n");
    res.write("           <title>" + q.search + "</title> \n");
    res.write("          </head> \n");
    res.write("             <body> \n");
    
    
    var X = q.query.x * 1, Y = q.query.y * 1, Z;
    switch (q.query.op) {
        case "plus": Z = X + Y; break;
        case "minus": Z = X - Y; break;
        case "times": Z = X * Y; break;
    }
    var expr = X + " " + q.query.op + " " + Y + " = " + Z;
    if (q.query.op == "plus") {
        expr = X + " " + " + " + " " + Y + " = " + Z;
    }
    else if (q.query.op == "minus") {
        expr = X + " " + " - " + " " + Y + " = " + Z;
    } 
    else if (q.query.op == "times") {
        expr = X + " " + " * " + " " + Y + " = " + Z;
    } 

    

    res.write("         <h1>" +expr+ "</h1> \n");
    res.write("              </body> \n");
    res.write("     </html>");
    res.end();
}


/* Register server: */
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
  //  res.write(req.url);
    console.log("Serving " + req.url);
    var p = url.parse(req.url, true);
    if (req.url == "/") {
        res.write("         <!DOCTYPE html > \n");
        res.write("     <html>  \n");
        res.write("              <head> \n");
        res.write("           <title>" + req.url + "</title> \n");
        res.write("          </head> \n");
        res.write("             <body> \n");

        res.write("         <h1>" + req.url + "</h1> \n");
        res.write("              <p>paragraph</p> \n");

        res.write("              </body> \n");
        res.write("     </html>");
        res.end();
    }
    else if (req.url == "/calc") {
        calculator(res)
    }
    else if (p.pathname == "/compute") {
        computePage(req.url, res);
    }
    
}).listen(8080);
