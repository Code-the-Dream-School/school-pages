---
layout: "../../layouts/genericMarkdownFile.astro"
title: Node/Express Lesson 4 Coding Assignment
description: Node/Express Lesson 4 Coding Assignment
---

# Node/Express Lesson 4 Coding Assignment

For this lesson, you continue to work in the node-express-course/02-express-tutorial directory. As usual, you should use git to switch to a new branch, the week4 branch from the week3 branch, before you start your work. However, there is a potential hitch. Suppose your week3 branch has not been approved by your reviewer? You are going to continue to work on app.js, so your new changes might conflict with any changes that the reviewer requests. There are various ways to solve this problem, having to do with resolution of merge conflicts. One is as follows:

- Add and commit the changes you have made so far to the week4 branch.
- Checkout week3.
- Make the changes requested by your reviewer, and add, commit, and push them. This adds them to your PR.
- Checkout week4.
- Do: git merge week3 -m “merge of changes to previous week lesson”

At this point, you may get a merge conflict. If you know how to resolve merge conflicts,  this is the best way to proceed. If you do not know how to resolve merge conflicts, you will  need to learn it sooner or later.  There is a good tutorial **[here.](https://www.youtube.com/watch?v=lz5OuKzvadQ)** But, here is an alternate procedure:

- Add and commit your changes to the week4 branch.
- Checkout week3, make the changes required, and add, commit, and push.
- Checkout week4
- Do: git checkout main -- app.js >apptemp.js
- Copy the changes you need from apptemp.js to app.js, and then erase apptemp.js

Make the following changes to app.js and related files.  (Note that examples of code that perform these functions are available in the final directory.) First, create a middleware function called logger in app.js. A middleware function is passed req and res, just like an app.get, but it is also passed a third parameter, next. The next() function must be called once middleware processing is completed, else no response is sent back for the request. The middleware function you create should log the method and url from the req object, as well as the time, before calling next(). Middleware functions are called in two ways. First, you can insert them into your route statements, as follows:

```
    app.get('/', logger, (req, res) => {
        ...
    })
```

The second way to invoke middleware is via an app.use() statement:

```
    app.use(['/path1', '/path2'],logger)
```

In this case, the first argument is a path or an array of paths indicating the urls for which the middleware is called. This argument is optional. If you leave it out, it is called for all urls. When using an app.use() statement order is important! For example, if you put app.use(express.json()) after your app.post() statement, the app.post() won’t work, because the body will not have been parsed yet. Call your logger using the first method, in one of your app.get() statements, and verify that it works. Then, take the logger call out of your app.get() statement, and call it via app.use() instead. Verify that it still works. Next, you need to implement some APIs for people. You have a require statement for ./data.js that gets the value of products. Get the value for people, also from ./data.js (in the same require statement). Then implement an app.get for /api/v1/people. Test it with your browser.  You are returning JSON, so you call res.json(...) to send the data back. You now need to implement a an app.post for /api/v1/people. This is to add an entry to the people array. Post operations are sent from the browser with a body. You need to add middleware to parse this. The following statements do this parsing, returning the result as a hash in req.body.

```
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
```

The first of these parses urlencoded data, which is what is sent by an HTML form. This is not typcally needed if you are only implementing an API. The second statement parses a JSON body. You need these statements before your app.post() statement, so that the body is parsed before you do the rest of the processing. Now you implement the app.post statement for /api/v1/people. The statement should check req.body to see if there is a req.body.name. If not, it should return JSON for an error, as follows:

```
    res.status(400).json({success: false, message: 'Please provide a name'})
```

This sets the HTTP result code to 400, which means there was an error on the client side, and also returns an error message. But suppose there is a value in req.body.name. You want to add this entry to the people array, as follows:

```
    people.push({id: people.length, name: req.body.name})
    req.status(201).json({success: true, name: req.body.name})
```

The HTTP status code 201 means that an object was created on the server side. Of course, as there is no database, this data will be gone when you restart the server. Now is the time to test it out using Postman. Create a Postman get request for /api/v1/people and verify that that works. Then create a Postman post request for /api/v1/people. Choose the raw form of the body, and select JSON from the pulldown. Put a JSON object with a name in the body, and verify that that works. Do the get request again from Postman, to verify that the person is added to the array. Try the post request with an invalid body as well. The instructor has provided a sample front end, and you can try this as well. Change the directory for your static serving from ./public to ./methods-public, and try out that front end from your browser. The next step is refactoring. You do not want too much logic in the app.js file. Create directories called routes and controllers. Create a file called routes/people.js. It should start with the following statements:

```
    const express = require('express')
    const router = express.Router()
```

You then need to add a router.get() statement for the ‘/’ path. This should do the same thing as your app.get(‘/api/v1/people’) statement. Similarly, you need a router.post()statement for ‘/’. Finally, at the bottom, you need module.exports = router. You now need to add a require statement for the peopleRouter into app.js. Then you need the following app.use() statement, also in app.js:

```
    app.use('/api/v1/people', peopleRouter)
```

Be careful that this app.use statement comes after the parsing of the body, or stuff won’t work. Then comment out your app.get and app.post statements for /api/v1/people. Test the result using Postman, fixing bugs as needed. The refactoring is not yet done. You need to create the file controllers/people.js. That should start with a require statement that gets the people array from ../data.js. Then create functions addPerson and getPeople. These are each passed req and res. Copy the logic from your router/people.js file, for both the get and the post. Then export { addPerson, getPeople }. Then require them in your routes/people.js, as follows:

```
    const { addPerson, getPeople } = require('../controllers/people.js')
```

Then change the router.get and router.post statements to call these functions, instead of doing the processing inline. Test again using Postman. So much for refactoring. You could also refactor the products routes, but it is not required. Add a router.get statement to routes/people.js. This is to get a particular entry from the people array. You need an id parameter, so the path should have /:id. Then write code so that, if the array includes a people entry with a matching id, a JSON object with that entry is returned (return code 200). You can use Array.find(), but req.params.id will be a string, so you’ll have to convert it to an integer. If the entry is not found, return an error 404 with JSON that has an appropriate message. Test this with Postman. Then move the logic for the statement to controllers/people.js, and update the module.exports statement in that file, as well as the require statement in the routes/people.js, so that the route calls the controller function you create. Add a router.put statement to routes/people.js to update the people entry if it is found, and to return an error if it isn’t. The processing for this should be in the controller. Do a router.delete statement as well. Test these using Postman. For the delete, you might use Array.filter() to create the updated people array.

## Optional Additional Assignment

This optional assignment gives some idea of how authentication might work. You will use the cookie-parser npm package, so do an npm install for that package.  Cookies are set, typically by the back end, and accompany each subsequent request. Add to app.js a require statement for cookie-parser. Then, right after you parse the body of the request, add a statement to parse the cookies:

```
    app.use(cookieParser())
```

Now write a middleware function called auth. This checks for req.cookies.name. If that cookie is present, it sets req.user to the value, and calls next. If it is absent, it sets the res status to 401 (which means unauthorized), and returns a message in a JSON object that says ‘unauthorized’. It does not call next() in this case. (Typically middleware would throw an error at this point, instead of returning a result.) Now add an app.post(‘/logon’), which should require a name in the body. If it is present, it should do a res.cookie(‘name’, req.body.name), and send back a 201 result code plus a message that says hello to the user. If name is not present, it should return a 400 and an error message in JSON. Now add an app.delete(‘/logoff’). This should do a res.clearCookie(‘name’), and then it should return a 200, with a message in JSON that the user is logged off. Now add an app.get(‘/test’). The auth middleware should be invoked in this app.get statement. The get should just return a 200, plus a message in JSON that says welcome to the user, whose name is in req.user. Then test this with Postman. You should be able to logon, logoff, and test, and the test should do something different depending on whether or not you are logged in.

When you have completed your programming assignment, git add, git commit, and git push your branch, and create a pull request, so that you can include a link to your pull request in your homework submission.
