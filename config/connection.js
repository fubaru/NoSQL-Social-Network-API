const { connect, connection } = require('mongoose');

require("dotenv").config();
connect(process.env.MONGODB_URI || 'mongodb://localhost/socialMediaHW', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;