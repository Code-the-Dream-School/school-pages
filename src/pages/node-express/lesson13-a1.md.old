---
layout: "../../layouts/genericMarkdownFile.astro"
title: Node/Express Lesson 13 Coding Assignment
description: Node/Express Lesson 13 Coding Assignment
---

# Node/Express Lesson 13 Coding Assignment

In this lesson, you use the express-session, passport, and passport-local packages to handle user authentication, from within a server-side rendered application.

## First Steps

The lesson begins at this link: [Authentication Basics | The Odin Project](https://www.theodinproject.com/lessons/nodejs-authentication-basics) . You should do your work in a passport-demo directory, which would be in the same directory as the node-express-course folder. Be sure that this folder is not inside of another repository folder, such as the one for the node-express-class. There are some additional steps you need to take, and explanations on unclear points, and these are below. The information at the link recommends that you put the Mongo URL, including a password, into the code. This is a very bad practice, so **don't do it**. The lesson at the link also has you put the session secret in the code, using the value "cats". This is also a very bad practice. Instead, use dotenv and an .env file to store these values. The lesson simplifies some things, which makes it a little crude: all the code is in a single app.js file, so there aren't separate model, view, routes, and controllers directories. **This is a bad practice!** All that is done in this lesson could be refactored to have separate model, view, routes, and controllers directories.

For the npm install, you will need to do also:

```
npm install dotenv
npm install nodemon --save-dev
```

Create a .env file in the passport-demo. This must have a line for the MONGO_URI. You use the same MONGO_URI as for the previous lesson, except you use a new database name, PASSPORT-DEMO. The .env file must also have a line for SESSION_SECRET, and the value should be a long, difficult to guess string. Create also a .gitignore file, also in the passport-demo directory. You will submit this work to github, so you need to make sure that the .env file is not stored on github. The .gitignore should read:

```
.env
/node_modules
```

Edit the package.json file to add these lines to the scripts section.

```
    "start": "node app",
    "dev": "nodemon app"
```

This way, you can test your application using "npm run dev".

When you create the app.js, add this line to the top of the file:

```
require('dotenv').config();
```

Also, the line that reads

```
const mongoDb = "YOUR MONGO URL HERE";
```

should be changed to read

```
const mongoDb = process.env.MONGO_URI;
```

And, the line that reads

```
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
```

should be changed to read

```
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
```

Continue with the lesson, until you come to the part about "A Quick Tip". That's not clear. Add the recommended middleware above your routes. You can then change

```
    res.render("index", { user: req.user });
```

to read just

```
    res.render("index");
```

You also change index.ejs so that instead of if (user) it has if (currentUser) and instead of user.username, it has currentUser.username. The point is that the variables in res.locals are always available inside of the templates.

The section on bcrypt.hash and bcrypt.compare is also a little unclear. Once you have installed bcryptjs and added the require statement for it, you change the app.post for "/sign-up" to read

```
app.post("/sign-up", async (req, res, next) => {
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ username: req.body.username, password: hashedPassword });
    res.redirect("/");
    } catch (err) {
    return next(err);
    }
});
```

and you change the passport.use section to read

```
passport.use(
    new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
        return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect password" });
        }
        });
    } catch (err) {
        return done(err);
    }
    })
);
```

This is kind of a crude approach for simplicity. It would be better to extend the schema for User as was done in earlier lessons on JWT authentication, but this is one way to do it.

Test the application to make sure it works. You now add some things.

## Additions to the Lesson

Within the browser window that is running the application, bring up developer tools. In the Chrome developer tools you click on application. Then on the left side of the screen you see a section for cookies. Click on the cookie for http://localhost:3000. You see a cookie with the name of connect.sid. This is the cookie stored by express.session. It does not actually contain the session data. Instead it contains a cryptographically signed key into the session data stored on the server.

The code now does a req.logout() when the user logs off. It is better to delete all the session information at logoff time. So change that code as follows:

```
app.get("/log-out", (req, res) => {
    req.session.destroy(function (err) {
    res.redirect("/");
    });
});
```

Notice that if you attempt to logon with an incorrect password, it just redisplays the logon form. The message is not returned to the user. Let's fix that. First, change the passport.authenticate part to read:

```
    passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true
    });
```

Passport documentation is clumsy, but this is the way Passport error messages into the session, so that they can be displayed on subsequent screens. The messages are put in an array, req.session.messages. This can then be displayed in the index.ejs. First, change the route that displays index.ejs so that it reads:

```
app.get("/", (req, res) => {
    let messages = [];
    if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
    }
    res.render("index", { messages });
});
```

Then, change index.ejs to add these lines, right under the <h1> for Please Log In:

```
    <% messages.forEach((msg) =>{ %>
        <p><%= msg %></p>
    <% }) %>
```

Then, try logging on with an incorrect password. You should see an error message.

Once authentication is enabled, you need to perform access control, so that certain pages are restricted only to those users that log in. This is done with middleware. Add the following code above your routes:

```
const authMiddleware = (req, res, next) => {
    if (!req.user) {
    if (!req.session.messages) {
        req.session.messages = [];
    }
    req.session.messages.push("You can't access that page before logon.");
    res.redirect('/');
    } else {
    next();
    }
}
```

This code redirects the user to the logon page with a message if the user attempts to access a restricted page without being logged in. To test this, first create a page that will be restricted, restricted.ejs:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restricted</title>
</head>
<body>
    <p>This page is restricted.  You can't see it unless you are logged on.</p>
    <p>You have visited this page <%= pageCount %> times since logon.</p>
</body>
</html>
```

Then, create the route statement that loads the page, as follows:

```
app.get('/restricted', authMiddleware, (req, res) => {
    if (!req.session.pageCount) {
    req.session.pageCount = 1;
    } else {
    req.session.pageCount++;
    }
    res.render('restricted', { pageCount: req.session.pageCount });
})
```

Here the code shows also how the session can be used to store state, in this case the number of page visits.

## A Production Grade Session Store

The code, as written, stores session data in memory. That is the default for express-session. However, this approach should never be used in production, because (a) if the application is restarted, all session data is lost, and (b) session data could fill up memory. A production application stores session data another way, and there are a variety of choices. Here we use MongoDB.

First, do an npm install of connect-mongodb-session. Then add the following lines to app.js underneath your existing require statements:

```
const MongoDBStore = require('connect-mongodb-session')(session)

var store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

// Catch errors
store.on('error', function (error) {
    console.log(error);
});
```

Then change the app.use for session to read:

```
app.use(session({
    secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true,
    store: store
}));
```

Retest the application. It should work as before. Logon to your mongodb.com account and check out the PASSPORT-DEMO database. You see two collections, one for users and one for sessions, and you can check to see what information is stored in the session record.

## Fixing the Security

Passport is using the session cookie to determine if the user is logged in. This creates a security vulnerability called cross site request forgery (CSRF). We will demonstrate this.

Add the following to the top of the app.js:

```
let secretString = "Beginning value";
```

Add the following to the bottom of restricted.ejs, just above the </body> tag:

```
    <p>The secret string is <%= secretString %></p>
    <p>To change it, put in a new value below</p>
    <form action="/restricted" method="POST">
        <input name="secretString" type="text" />
        <button>Submit</button>
    </form>
```

Then, change the res.render statement for /restricted to read:

```
    res.render('restricted', { pageCount: req.session.pageCount,
      secretString });
```

Then, add the following in app.js:

```
app.post('/restricted', authMiddleware, (req,res) => {
    secretString = req.body.secretString;
    res.redirect('/restricted');
})
```

Then, test it out with your browser. You see that you can change the secret string. And the route that posts to the /restricted URL is protected, right, because of the authMiddleware? Well -- it isn't. To see this, clone **[this repository](https://github.com/Code-the-Dream-School/sample-attack)** into a separate directory, outside passport-demo. Then, within the directory you cloned, do an "npm install" and a "node app". This will start another express application listening on port 4000 of your local machine. This is the attacking code. It could be running anywhere on the Internet -- that has nothing to do with the attack.

You should have two browser tabs open, one for localhost:3000, and one for localhost:4000. The one at localhost:4000 just shows a button that says Click Me! Don't click it yet. Use the ejs-demo application in the 3000 tab to set the secret string to some value. Then log off. Then click the button in the 4000 tab. Then log back on in the 3000 tab and check the value of the secret string. So far so good -- it still has the value you set. Now, while still logged in, click the button in the 4000 tab. Now, back in the 3000 tab, refresh the /restricted page. Hey, what happened! (By the way, this attack would succeed even if you closed the 3000 tab entirely.)

You see, the other application sends a request to your application in the context of your browser -- and that request automatically includes the cookie. So, the application thinks the request comes from a logged on user, and honors it. If the application, as a result of a form post, makes database changes, or even transfers money, the attacker could do that as well.

So, how to fix this? In the ejs-demo project, do an npm install of host-csrf and also of cookie-parser. Then follow the instructions **[here](https://www.npmjs.com/package/host-csrf)** to integrate the package with your application. You will need to change app.js as well as each of the forms in your ejs files. You can use process.env.SESSION_SECRET as your cookie-parser secret. Note that the app.use for the csrf middleware must come after the cookie parser middleware and after the body parser middleware, but before any of the routes. You will see a message logged to the console that the CSRF protection is not secure. That is because you are using HTTP, not HTTPS, so the package is less secure in this case, but you would be using HTTPS in production. As you will see, it stops the attack.

Retest, first to see that your application still works, and second, to see that the attack no longer works. (A moral: Always log off of sensitive applications before you surf, in case the sensitive application is vulnerable in this way. Also note that it does not help to close the application, as the cookie is still present in the browser. You have to log off to clear the cookie.)
