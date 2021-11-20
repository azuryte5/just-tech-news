const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// sequelizestore pass through (session.Store) property

// sess is the session object
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
//saveUn when you make a new session, it is saved as part of store
//resave forces save even before cookie is saved?
// db: sequelize sets up connection with db and set up session table, and save in table.

// this calls the middleware to get it to run
app.use(session(sess));

//cont helper 

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// ex.static method is a built-in Express.js middleware function that can take all of the contents of a folder 
// and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.

// turn on routes
app.use(require('./controllers/'));
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});