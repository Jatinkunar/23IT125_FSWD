const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000
;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  // Set response headers
  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // Welcome route
  if (parsedUrl.pathname === '/' && method === 'GET') {
    return sendJSON(200, { message: 'Welcome to the User Management API!' });
  }

  // GET /users
  if (parsedUrl.pathname === '/users' && method === 'GET') {
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) return sendJSON(500, { message: 'Internal Server Error' });
      sendJSON(200, JSON.parse(data));
    });
  }

  // POST /users
  else if (parsedUrl.pathname === '/users' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });

    req.on('end', () => {
      const newUser = JSON.parse(body);

      fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) return sendJSON(500, { message: 'Internal Server Error' });

        const users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8', err => {
          if (err) return sendJSON(500, { message: 'Error saving user data' });
          sendJSON(201, newUser);
        });
      });
    });
  }

  // DELETE /users/:id
  else if (parsedUrl.pathname.startsWith('/users/') && method === 'DELETE') {
    const userId = parsedUrl.pathname.split('/')[2];

    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) return sendJSON(500, { message: 'Internal Server Error' });

      let users = JSON.parse(data);
      const filteredUsers = users.filter(user => user.id !== userId);

      if (users.length === filteredUsers.length) {
        return sendJSON(404, { message: 'User not found' });
      }

      fs.writeFile('users.json', JSON.stringify(filteredUsers, null, 2), 'utf8', err => {
        if (err) return sendJSON(500, { message: 'Error deleting user' });
        sendJSON(200, { message: 'User deleted successfully' });
      });
    });
  }

  // Route not found
  else {
    sendJSON(404, { message: 'Route not found' });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});