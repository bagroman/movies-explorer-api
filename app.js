require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const corsOptions = require('./middlewares/cors');
const { ERROR_CODE_DEFAULT } = require('./errors/error-codes');

const { PORT = 3000, MONGO = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(MONGO);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors(corsOptions));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_CODE_DEFAULT, message } = err;
  res.status(statusCode).send({ message: statusCode === ERROR_CODE_DEFAULT ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT);
