const fs = require('fs');

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url == '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <head><title>Create a user</title></head>
        <body>
          <form action="/create-user" method="POST">
            <h1>Create a User</h1>
            <input type="text" name="username">
            <button type="submit">Create</button>
          </form>
        </body>
      </html>
    `);
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const username = parseBody.split('=')[1];
      console.log(username);
      fs.writeFile('users.txt', username, (err) => {
        res.writeHead(302, { location: '/' });
        // code below is same as above
        // res.statusCode = 302
        // res.setHeader('Location', '/')
        return res.end();
      });
    });
  }
  if (url == '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <head><title>Create a user</title></head>
        <body>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
          </ul>
        </body>
      </html>
    `);
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = requestHandler;
