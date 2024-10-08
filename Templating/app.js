const express = require('express');
const app = express();

// Tell Express to use Pug as the template engine
app.set('view engine', 'pug');

// Create a route to render a page when the user goes to the homepage
app.get('/', (req, res) => {
  // Render the 'index' template and pass dynamic data
  res.render('index', { name: 'Raja' });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
