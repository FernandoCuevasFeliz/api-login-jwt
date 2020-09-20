const { connect, connection } = require('mongoose');
const URI = process.env.MONGO_URI || 'mongodb://localhost/db_test';

connect(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const cn = connection;

cn.once('open', () => {
  console.log('DB is connected');
});

cn.on('error', (err) => {
  console.error(err);
});
