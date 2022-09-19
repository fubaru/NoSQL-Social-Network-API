const express = require('express');
const app = express();
const PORT = 3001;

const db = require('./config/connection');
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for Social NetWork API running on port ${PORT}!`)
    });
});