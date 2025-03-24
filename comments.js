// create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const comments = [];
http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (req.method === 'GET') {
        if (pathname === '/') {
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    res.end('Server error');
                    return;
                }
                res.end(data);
            });
        } else if (pathname === '/comments') {
            res.end(JSON.stringify(comments));
        } else {
            res.end('404');
        }
    } else if (req.method === 'POST') {
        if (pathname === '/comment') {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                const comment = qs.parse(data);
                comments.push(comment);
                res.end('success');
            });
        } else {
            res.end('404');
        }
    } else {
        res.end('404');
    }
}).listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});