const express = require('express');
const path = require('path');
const app = express();

// Set the public folder as the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
