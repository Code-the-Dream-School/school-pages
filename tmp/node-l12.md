**Lesson Materials**
--------------------

In this lesson, you learn EJS, a templating language for Express. The templates contain embedded JavaScript, which is executed on the server side. This constructs an ordinary HTML page, but with dynamic content. Because the embedded JavaScript runs on the server, before the page is sent to the client, dynamic content can be delivered, such as information from a database. This is called server side rendering. Except for the embedded JavaScript, the templates are ordinary HTML pages, which may be combined with CSS and client side JavaScript.

Server side rendering is in some respects easier than writing first an API and then a front end for it, where the front end makes fetch calls to the API. On the other hand, if you don't create an API, you can't access the data via React or other front ends that run outside the application itself.

In EJS, there are really only three kinds of embedded JavaScript statements:

    <%- include 'filename' %>
    <% code %>
    <%= code %>

All are encased in the <% %> sequence. The one with the minus in front does an include of another template, so that you can have headers, footers, and other partials. The one with no minus or equals sign executes code but does not return any change to the HTML. This is used for logic statements, such as if statements and loops. The one with the equals sign executes code and returns the result in line as HTML.

Please be sure that you understand where each piece of JavaScript executes! The JavaScript for your controllers, routes, middleware, etc. executes on the server side. If you do a console.log for this code, it appears in the server console. The code you put into an EJS file also executes on the server side, to customize the page with variable data before it is sent to the browser. However, you can also put JavaScript into an HTML page, or load it from a page, where the JavaScript is not within the EJS "<% %>" enclosure. That JavaScript is loaded by the browser and runs in the browser context, which means that it has access to the window and the DOM, but it does not have access to server side data and the database.

**Assignments**
---------------

**Coding Assignment**

Create an ejs-demo directory. This should not be inside the node-express-course directory. It should be alongside the node-express-course directory, that is, node-express-course and ejs-demo should have the same parent. Go to the following link and follow the instructions: [https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application](https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application) . This creates a working application that you should test by opening it with your browser, at localhost:8080.

Saving Your Work to Github
--------------------------

This assignment did not begin with a starter git repository. You must create a new one to be able to submit your work. Within the ejs-demo directory, type the following terminal commands:

    cp ../node-express-course/03-task-manager/starter/.gitignore .
    git init
    git add -A
    git commit -m "first commit"

Sign in to github and create a new repository called ejs-demo. You do this using the plus icon in the upper right of the screen. It should be a public repository. Do not create a gitignore, README, or license. This then shows you a screen including a section that looks like this:

    git remote add origin https://github.com/<your-git-id>/ejs-demo.git
    git branch -M main
    git push -u origin main

except it has your git id in the origin line. Execute each of these commands in your terminal. This creates your github repository and stores the code in it.

... But we are just getting started.

Adding Code to Do CRUD Operations with MongoDB
----------------------------------------------

Now you add the code to the ejs-demo application to do database operations, using the task manager database from a previous lesson. Do the following commands:

    cp ../node-express-course/03-task-manager/starter/.env .
    cp -r ../node-express-course/03-task-manager/starter/db ./db
    cp -r ../node-express-course/03-task-manager/starter/models ./models
    npm install mongoose
    npm install dotenv
    npm install express-session
    npm install flash
    npm install nodemon --save-dev

Edit the db/connect.js file, which was copied from the earlier project. Mongoose has changed, so some of the options used in that file no longer work. It should read as follows:

    const mongoose = require('mongoose');
    
    const connectDB = (url) => {
      return mongoose.connect(url);
    }
    
    module.exports = connectDB;

Edit the .env file, to add a line like:

    SESSION_SECRET=q98rpok90845okseutw

It is not critical what value you use for the session secret, except that it should be a long difficult to guess string. Then edit the package.json file, and add lines to the script stanza, so that it looks like this:

     "scripts": {
        "test": "echo "Error: no test specified" && exit 1",
        "start": "node server",
        "dev": "nodemon server"
      },

Once you have done this, you can do npm start to start the server, but you can also do npm run dev to start the server under nodemon, so that it will automatically restart when you make code changes. You have copied the .env file from the 03-task-manager project, and this contains the MONGO\_URI. You have also copied the db directory, which has code to connect to the database. You also need to set up a session, for reasons described further on in this lesson. To get those loaded in, add the following lines to the top of server.js:

    require('dotenv').config();
    const connectDB = require('./db/connect');
    const session = require('express-session');

You now fix the startup sequence to automatically connect to the database. In server.js, replace these lines at the bottom of the file:

    app.listen(8080);
    console.log('Server is listening on port 8080');

with these:

    const port = 8080;
    const start = async () => {
      try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
          console.log(`Server is listening on port ${port}...`)
        );
      } catch (error) {
        console.log(error);
      }
    };
    
    start();

At this point, you may want to start the server and make sure it still works. The only real change is that you are connecting to the database.

Adding Routes, Controllers, and Middleware
------------------------------------------

Under the ejs-demo directory, create a routes directory, a middleware directory, and a controllers directory.

Within the routes directory, create a file tasks.js with the following contents:

    const express = require("express");
    
    const router = express.Router();
    const {
      addTask,
      createTask,
      deleteTask,
      getTasks,
      updateTask,
      editTask,
    } = require("../controllers/tasks");
    
    router.route("/").post(createTask).get(getTasks);
    router.route("/edit/:id").get(editTask);
    router.route("/delete/:id").get(deleteTask);
    router.route("/update/:id").post(updateTask);
    router.route("/add").get(addTask);
    
    module.exports = router;
    

Note that we use only get and post operations. These operations are to be performed by the browser. A browser can't send delete, put, or patch operations.

Next, create a file also called tasks.js inside the controller directory, with the following contents:

    const Task = require('../models/Task');
    
    const addTask = (req, res) => {
        res.send("in addTask");
    }
    
    const createTask = async (req, res) => {
         res.send("in createTask");
    }
    
    const deleteTask = async (req, res) => {
        res.send("in deleteTask");
    }
    
    const editTask = async (req, res) => {
        res.send("in editTask");
    }
    
    const updateTask = async (req, res) => {
       res.send("in updateTask");
    }
    
    const getTasks = async (req, res) => {
        res.send("in getTasks");
    }
    
    module.exports = {
        addTask,
        createTask,
        deleteTask,
        updateTask,
        editTask,
        getTasks
    };

Now we change the server.js to load the routes and middleware, by adding some lines. Add these lines at the top of the file:

    const taskRouter = require('./routes/tasks');
    const setMessage = require('./middleware/message');

Then add these lines after the line that sets the view engine to ejs:

    app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
    app.use(require('flash')();
    app.use(express.urlencoded({extended: false}));
    app.use('/tasks', taskRouter);

FIrst you set up the session. Then, the express.urlencoded line invokes express middleware to parse the data that is returned when the browser posts form results. Next, you load the flash middleware. This stores messages to be displayed to the user on the next window. The messages are stored in the user's session, persistent storage that is either kept in a cookie on the browser, or in a separate session store such as a database. You can log the value of req.session to see what is there, and you can also set values in the req.session hash. The following line invokes the the routes you created.

You should now test the following routes using the browser:

    localhost:8080/tasks
    localhost:8080/tasks/add
    localhost:8080/tasks/delete/123
    localhost:8080/tasks/edit/123

You can't test the post routes, because you need to create forms to do the posts. But now we need some views.

Creating Templates for Views
----------------------------

We want to display the flash messages, so we will add to the partials/header.ejs. Add these lines at the bottom:

      <% flash.forEach(msg) { %>
         <p><%= msg.type + ": " + msg.message %></p>
      <% } %>

For each request, the flash middleware retrieves the flash hash from the session and stores it in res.locals.flash. This is a hash of objects, each of which has two string attributes, the type and the message. The res.locals hash is always available in templates.

In the views/pages directory, create a file tasks.ejs with the following contents:

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <%- include('../partials/head'); %>
    </head>
    <body class="container">
    
    <header>
      <%- include('../partials/header'); %>
    </header>
    
    <main>
      <div class="jumbotron">
        <% if (tasks.length > 0) { %>
          <table class="table"
            <tr><th>Name</th><th>Completed</th><th colspan="2"></th></tr>
            <% tasks.forEach(function(task){ %>
              <tr><td><%= task.name %></td><td><%= task.completed %></td>
                <td><a href=<%= "/tasks/edit/" + task.id %>  class="btn btn-primary">Edit</a></td>
                <td><a href=<%= "/tasks/delete/" + task.id %>  class="btn btn-primary">Delete</a></td>
              </tr>
            <% }) %>
          </table>
        <% } else { %>
          <h2>There are no tasks to display.</h2>
        <% } %>
        <a href="/tasks/add" class="btn btn-primary">Add a Task</a>
      </div>
    </main>
    
    <footer>
      <%- include('../partials/footer'); %>
    </footer>
    
    </body>
    </html>

Take a close look at the file above to make sure you understand it. There is embedded JavaScript that checks the tasks variable. This is an array of tasks. If the array is empty, there are no tasks in the database, so a message is shown. If the array is not empty a loop is executed, and a row is added for each task. Each row has an edit button and a delete button, which are links styled as buttons. Note that the links include the ID of the task entry, so that the controller knows which task to edit or delete.

Next, create the template for adding a task. Create a file views/pages/addTask.ejs, with the following contents.

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <%- include('../partials/head'); %>
    </head>
    <body class="container">
    
    <header>
      <%- include('../partials/header'); %>
    </header>
    
    <main>
    <form action="/tasks" method="post">
      <label for="name">Name:</label><br>
      <input name="name"><br>
      <label for="complete">Completed: </label>
      <input type="checkbox" name="complete" value="true"><br><br>
      <button type="submit">Add</button>
    </form>
      </div>
    </main>
    
    <footer>
      <%- include('../partials/footer'); %>
    </footer>
    
    </body>
    </html>

This is simpler. It is a straightforward form with a submit button. There isn't a lot of embedded JavaScript except for the includes and the message. However, for edit, you have to prepopulate the form with the values from an existing task, so that's more complicated. Create a file views/pages/editTask.ejs with the following contents.

    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <%- include('../partials/head'); %>
    </head>
    
    <body class="container">
    
      <header>
        <%- include('../partials/header'); %>
      </header>
    
      <main>
        <form action=<%= "/tasks/update/" + task.id %> method="post">
          <label for="name">Name:</label> <br>
          <input name="name" value="<%=task.name %>"><br>
          <label for="complete">Completed: </label>
          <% if (task.completed) { %>
            <input type="checkbox" name="complete" value="true" checked><br><br>
            <% } else { %>
              <input type="checkbox" name="complete" value="false"><br><br>
              <% } %>
                <button type="submit">Update</button>
        </form>
        </div>
      </main>
    
      <footer>
        <%- include('../partials/footer'); %>
      </footer>
    
    </body>
    
    </html>

This is a little trickier. When the template is loaded, it is passed a task variable for the task being edited. The name of the task is set as the initial value in the entry field for name. There is a checkbox for completed, and this is checked if task.completed is true.

Finishing the Tasks Controller
------------------------------

To display these new pages and to perform database operations, you must add code to the controller, controllers/tasks.js. Within that file, change the addTask method to read:

    const addTask = (req, res) => {
        res.render('pages/addTask');
    };

This just renders the addTask.ejs template, with a message if any. Change the createTask method to read:

    const createTask = async (req, res) => {
      try {
        if (req.body.complete) {
          req.body.completed = true;
        }
        await Task.create(req.body);
        req.flash("info","The task was created."
        res.redirect("/tasks");
      } catch (err) {
        if (err.name === "ValidationError") {
          req.flash("error", "Validation error.");
        } else 
          req.flash("error", "Something went wrong.");
        }
        res.render("pages/addTask");
      }
    };
    

Here you are using the values posted in req.body to create a task. That may succeed or fail, depending on the validation of values. req.body.complete may have the string value "true" for complete, which must be changed to the boolean value of true for completed. If the create is successful, a flash message (which is displayed after a redirect operation) gives the user feedback, and a redirect is sent back to display the tasks page again. If the create fails, the user is given a message, which might be a schema validation error, and the add page is rendered again. Note that the method must be async so that you can await the result of the create operation.

Now change the editTask method to read as follows:

    const editTask = async (req, res) => {
        try {
            const task = await Task.findById(req.params.id)
            if (task) {
               res.render('pages/editTask', { task })
            } else {
              req.flash("error", "No task with id ${req.params.id} was found`);
              res.redirect("/tasks");
            }
        } catch (err) {
            req.flash("error", 'Something went wrong.');
            res.redirect('/tasks')
        }
    }

To edit a task, you have to load it first, hence the findById call. That may fail in which case the error is reported to the user. If it succeeds, the task variable is passed to the editTask.ejs on the render.

Now change the updateTask method to read:

    const updateTask = async (req, res) => {
      const oldTask = false;
      try {
        oldTask = await Task.findByID(req.params.id);
        if (req.body.complete) {
          req.body.completed = true;
        }
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
          runValidators: true,
        });
        if (task) {
          req.flash("info", "The task was updated.");
          res.redirect("/tasks");
        } else {
          req.flash("error", `No task with id ${req.params.id} was found.");
          res.redirect("/tasks");
        }
      } catch (err) {
        if (err.name === "ValidationError") {
          req.flash("error","Validation error.");
        } else {
          req.flash("error", "Something went wrong.");
        }
        if (oldTask) {
           res.render("pages/editTask", {task: oldTask} );
        } else {
           res.redirect("/tasks");
      }
    };

FIrst, you find the task being updated. Then you attempt to update it with the values from the body of the post request. Then, if that fails, you render the page again, passing the message and the task on the render call. If it succeeds, you give the user the success message and redirect to the tasks page.

Next, change the getTasks method to read as follows:

    const getTasks = async (req, res) => {
      try {
        const tasks = await Task.find();
        res.render("pages/tasks", { tasks });
      } catch (err) {
        req.flash("error", "Something went wrong.");
        res.render("/tasks", { tasks: []);
      }
    };

This method retrieves the list of tasks. It may be an empty array, or a list of tasks, which is passed on the render call to the tasks.ejs template on the render call. In this case, you do not want to pass a res.redirect() if an error occurs, because that would loop without end.

Finally, make this small change to views/partials/header.ejs: Add these lines to the navbar between the nav-items for home and about:

          <li class="nav-item">
            <a class="nav-link" href="/tasks">Tasks</a>
          </li>

At this point, try the application out. You should be able to view, add, and edit tasks. Delete still does not work. That is left for you to complete. You need to change the deleteTask method in the controller to issue a findByIdAndDelete. Then it should should display a message on the success or failure of the operation and then redirect to the tasks page. (The way delete is done here is very bad practice, because when you click on the delete link get operation causes a change to the database. This shouldn't ever be done in a production application. The right way to do it is to create a delete button, not a link, and to have JavaScript that sends a delete request to the back end.)

**Mindset Assignment**

Your mindset assignment for this week can be found here: **[Accessibility](https://learn.codethedream.org/mindset-curriculum-accessibility-a11y/)**

**Submitting Your Work**
------------------------

When you are done, do the following, use the same procedure as for previous lessons. You do a git add, git commit, and git push for the week13 branch, create your pull request on github, and put a link to your pull request in your assignment submission form below.

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

**Alpaca class use:**

**[Squibby 2.0 Assignment Submission Form](http://tiny.cc/squibby2)**

**Baboon** **and any 2023 classes use:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)