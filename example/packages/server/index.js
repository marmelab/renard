const express = require('express');

const app = express();
const port = process.env.NODE_PORT || 3000;

app.get('/', (req, res) => {
    res.send('OK');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
