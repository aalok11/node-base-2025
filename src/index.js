const http = require('http');
const PORT = 3002;
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<form action="http://localhost:3002/formdata" method="POST">
  <input name="name" placeholder="Enter name" />
  <input name="role" placeholder="Enter role" />
  <button type="submit">Submit</button>
</form>`);
  } else if (req.method === 'POST' && req.url === '/formdata') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('Received POST data:', body);

      // Send response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ message: 'Data received successfully', data: body })
      );
    });
  } else {
    res.writeHead(404);
    res.end('404 - Page not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
