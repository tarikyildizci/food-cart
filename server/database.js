const mongoose = require('mongoose');
require('dotenv/config');

const dbConnect = () => {
  mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = mongoose.connection;

  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to Database'));
};

module.exports = dbConnect;
