const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');
const responseMiddleware = require('./middlewares/response.middleware');
const cors = require('./middlewares/cors.middleware');
//console.log(studentRouter);
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
console.log('Environment=', process.env.NODE_ENV);
app.use(cors.allowCrossDomainRequests);
app.use(responseMiddleware);
app.use(express.json());
connectDB();
const appRouter = require('./routes/v1');

app.use('/v1/student', appRouter.studentRouter);
/**
app.get('/test', (req, res) => {
  res.send('Hello from Express!');
});
**/
// app.post('/postdata', (req, res) => {
//   console.log(req.body);
//   res.send('Hello from Express!');
// });
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
