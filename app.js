/**
 * Add variables to require the necessary dependencies. You'll need to require:
 * Express
 * Your data.json file
 * Optionally - the path module which can be used 
 * when setting the absolute path in the express.static function.
 */

const express = require('express');
const routesMain = require('./routes');
const projectsHere = require('./routes/projects');

const app = express();












 /**
  * Set up your middleware:
  * set your “view engine” to “pug”
  * use a static route and the express.static method 
  * to serve the static files located in the public folder
  */

app.set('view engine', 'pug');
app.use('/static', express.static('public'));





/**
 *  Set your routes. You'll need:
 * An "index" route (/) to render the "Home" page with the locals set to data.projects
 * An "about" route (/about) to render the "About" page
 * Dynamic "project" routes (/project/:id or /projects/:id) 
 * based on the id of the project that render a customized version of the Pug project template 
 * to show off each project. Which means adding data, or "locals", 
 * as an object that contains data to be passed to the Pug template.
*/  

app.use(routesMain);
app.use('/projects', projectsHere);
app.use(pageNotFound);
app.use(serverError);


/**
 * Finally, start your server. Your app should listen on port 3000, 
 * and log a string to the console that says which port the app is listening to.
 */

app.listen(3000, () => console.log('app is listening to....'));
