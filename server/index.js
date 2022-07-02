const express = require('express');
const app = express();
const port = 8000;
const userRouter = require('./routes/user_route');
const discussionRouter = require('./routes/discussion_route');
const backtestRouter = require('./routes/backtest_route');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for api call
app.use('/', userRouter);
app.use('/', discussionRouter);
app.use('/', backtestRouter);

// for frontend url (after react build)
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/', function (_req, res, next) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
      next(err);
    }
  });
});
// handle errors
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app is listening at port:${port}`);
});
