const express = require('express'); //Node isn't campatible with ES6 module syntax

// Creates a new express app
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);



