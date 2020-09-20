const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const db = require('./database');
const routes = require('./routes');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api', routes);

// start server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
