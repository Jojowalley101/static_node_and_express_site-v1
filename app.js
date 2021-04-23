/**
 * Add variables to require the necessary dependencies. You'll need to require:
 * Express
 * Your data.json file
 * Optionally - the path module which can be used 
 * when setting the absolute path in the express.static function.
 * @source adapted from Node and Express project practice files
 */

const express = require('express');
const path = require('path');
const { projects } = require('./data.json');
const app = express();

// view engine setup
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {projects})
});

app.get('/about', (req, res) => {
  res.render('about');
});



 /**
  * Set up your middleware:
  * set your “view engine” to “pug”
  * use a static route and the express.static method 
  * to serve the static files located in the public folder
  */

//app.set('view engine', 'pug');



// module.exports = app;

/**
 *  Set your routes. You'll need:
 * An "index" route (/) to render the "Home" page with the locals set to data.projects
 * An "about" route (/about) to render the "About" page
 * Dynamic "project" routes (/project/:id or /projects/:id) 
 * based on the id of the project that render a customized version of the Pug project template 
 * to show off each project. Which means adding data, or "locals", 
 * as an object that contains data to be passed to the Pug template.
*/  

app.get('/projects/:id', function(req, res, next) {
  const projectsId = req.params.id;
  const projs = projects.find(({id}) => id === +projectsId);
  if (projs) {
    res.render('projs', {projs});
  } else {
    const errorNotFound = new Error('Error, project not found');
    errorNotFound.status = 404;
    console.log(errorNotFound.status, errorNotFound.message);
    next(errorNotFound);
  }
});

app.use((req, res, next) => {
  const errorNotFind = new Error('Page not found');
  errorNotFind.status = 404;
  console.log(errorNotFind.status, errorNotFind.message);
  next(errorNotFind);
});

app.get('/error', (req, res, next) => {
  const errorServer = new Error('Server error');
  errorServer.status = 500;
  console.log(errorServer.status, errorServer.message);
  next(errorServer);
});

app.use((errors, req, res, next) => {
  res.locals.error = errors;
  res.status(errors.status || 404);

  if (errors.status === 500) {
    res.render('page-not-found');
  } else {
    res.render('error');
  }
});


/**
 * Finally, start your server. Your app should listen on port 3000, 
 * and log a string to the console that says which port the app is listening to.
 */

app.listen(3000, () => console.log('app is listening to....'));

//module.exports = router;