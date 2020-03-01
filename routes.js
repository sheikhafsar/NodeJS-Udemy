
const fs = require('fs');

const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"> <button>Send</button></form></body>');
        res.write('</html>');
        return res.end;
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

       return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
            res.statusCode = 302 ;      //redirect
            res.setHeader('Location','/');
            return res.end;
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Home</title></head>');
    res.write('<body><h1>Welcome</h1></body>');
    res.write('</html>');
}

module.exports = {
    handler: requestHandler,
    someText: "This is hardcoded Text"
}