const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.setHeader('cache-control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Max-Age', '0');
    res.setHeader('Access-Control-Allow-Origin', '*.ebene.ru');
    const data = fs.readFileSync(process.env.INDEX_PATH, 'utf8');
    res.end(data);
});

if ("SOCKET" in process.env) {
    const socket = process.env.SOCKET;
    // Socket must be removed before starting server. This action is required. Otherwise server will not start if socket exists.
    if (fs.existsSync(socket)) {
        fs.unlinkSync(socket);
    }
    server.listen(socket, () => {
        fs.chmodSync(socket,0660);
        console.log(`Listening ${socket}`);
    });
} else if ("PORT" in process.env) {
    const hostname = process.env.INSTANCE_HOST;
    const port = process.env.PORT;
    server.listen(port, hostname, () => {
        console.log(`Listening http://${hostname}:${port}/`);
    });
}
