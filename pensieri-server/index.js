const express = require('express');
const expressGraphQL = require('express-graphql');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app     = express();
const databaseConfig = require('./config/db');
const schema = require('./models/schema');

const path = require('path');

//Database Connection
mongoose.Promise = require('bluebird');
mongoose.set('useCreateIndex', true);
mongoose.connect(databaseConfig.database.connectionURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'There is an error while attempting to connect to the database.'));
db.once('open', function() {
  console.log('Successfully connected to the database ' + db.name + '.');
});

//Routes Files
const index = require('./routes/index');
const user = require('./routes/user');
const category = require('./routes/category');
const post = require('./routes/post');

//Cors Config
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/'));

//Routes Paths
app.use('/', index);
app.use('/users', user);
app.use('/categories', category);
app.use('/posts', post);

//GraphQL
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'), () => console.log('Running on port ' + app.get('port')));

module.exports = app;
