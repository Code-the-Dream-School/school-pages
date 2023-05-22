---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Node/Express Lesson 8: JWT Basics"
description: Material link for lesson 8 of the node/express class
---

# Node/Express Lesson 8

# JWT Basics

## Concepts: Authentication with JWT Tokens

When you deploy a web application that allows users to create entries in a database, you typically need to protect that application with a logon. Each user registers with the application, specifying a user identifier and a password. This information is stored by the application, typically in a database. If the application stores this information in MongoDB, you will have a User model. The model stores the user ID, a hash of the password, and perhaps other information. The password itself is never stored, because that would make the application a risky repository of user passwords. Instead, a cryptographic hash of the password is stored, and this information allows the user password to be validated at logon time, without storing the password itself.

When the user logs in, the front end of the application needs to store a credential for use in subsequent requests -- otherwise the user would have to login for every protected request. One type of credential that is often used for REST requests is a JSON web token (JWT). The token is cryptographically signed by the server, using a server maintained secret, so it can't be counterfeited. The token contains information about which user is logged in. The token is not human readable, but it is not encrypted either, so you should never put sensitive information in it, especially not the password. When the user is registered in MongoDB, a unique ID is created, just as it is for every MongoDB entry. This ID is typically stored in the token.

## A Comment On Security

The way the instructor uses the JWT is as follows: (1) The user logs in with id and password, and the JWT is returned in the body of the response. (2) The web front end stores the JWT in local storage. (3) In subsequent requests, the JWT is inserted by the front end as a bearer token in the authorization header, so that it can be validated and so that the back end knows which user is making the request. You can see an example of this in the public directory for this assignment. This is a common practice -- and a **very bad one!** You should never store sensitive information in local storage. This is because, especially in large and complicated web front ends, it is common to introduce a vulnerability to a security attack called cross site scripting (XSS). If the application has an XSS vulnerability anywhere, the attacker can capture the token from local storage, and can then reuse that token to impersonate the user, doing any operations the user can do.

So, if you can't put the token in local storage, how can you keep it on the browser side to maintain a logged on user session? The way this is done is for the server to set an httponly cookie for the user session. The cookie is stored by the browser, but it is inaccessible to JavaScript in the browser session. When the front end sends a fetch() request to get data, the fetch() is performed with credentials: 'include' or credentials: 'same-origin'. This causes the cookie to be sent back to the back end for validation.

But, there is one more hitch. When a cookie is used, an attacker can then do cross site request forgery (CSRF), another security attack where the attacker leverages the fact that the cookie is automatically sent with a form post. So, one must add protections for CSRF, such as that provided by [this package](https://www.npmjs.com/package/host-csrf). we'll use that package later in the course.

For the next few assignments, you will follow the approach the instructor recommends -- but do not do it in a production application! Actually, the approach where the caller saves the JWT for use in the authorization header is fine, but only when one server is talking to another. In that case, the calling server can store the JWT without using browser local storage.

## Protecting Routes

To protect routes in your Express application, you create authentication middleware, which runs before the route handler for each protected request. The authentication middleware checks that the token is present with the HTTP request, typically as the bearer token in the Authentication header. Then it validates the token cryptographically, making sure the signature matches the secret. Then, it stores the user ID and perhaps other information about that user in the req.user hash, so that it can be used by the controller functions handling each request. For example, the controllers could return only the information that the logged on user is authorized to see.

Some routes are not protected by the authentication middleware, including in particular the logon route and registration routes and any pages that don't require protection.

Cryptography is complicated, and you shouldn't try do your own. In this assignment we use the jsonwebtoken npm module to create the tokens (at logon time) and to validate tokens (in the middleware). For this lesson, we won't store the user information, which means that the user is not registered and the password is not validated. (We'll do that in a later lesson.) Instead, the user enters an ID and password and a JWT token is created. Then the token is used to access the protected route.

## Concepts: Error Handling

The instructor shows how to throw errors, such as authentication errors, and how to handle them in an error handler. The elements of error handling are as follows:

- The express-async-errors package to catch errors thrown in your controllers and send them on to the process error handler
- A StatusError class that can be instantiated when an error occurs. This class should extend the built in Error class. It should have a constructor that takes two parameters, the error message and a number that is the HTTP status code.
- Error handling middleware. This is called as a result of an app.use() statement that appears after all of your routes. It must be declared with four parameters, which are named err, req, res, and next.

The error handler has to return something to the caller, as otherwise the caller would just hang waiting on the HTTP response. So it returns an appropriate HTTP result code, along with a descriptive error message. As this is an API, the error message is returned as JSON. If there is an error in your code, the error handler is invoked. Some errors are expected, such as authentication errors, and in this case the error handler can return a descriptive errror message and an appropriate HTTP result code to the caller. For example, you might have a validation error when creating or updating an entry. In your error handler, you need to parse the validation error to get a useful error message, such as how one or several attributes fail validation. Authentication errors (bad user email or password) are also expected. Cast errors can occur if the request includes an ID that is not a valid Mongo entry ID, so this is an expected error and you can return a 404. Please look at the instructor’s code to see how these cases are handled.

But some errors are not expected — that is, if your code is working right, they should never occur. An example is a variable reference error caused by a code bug. For these, it is not a good idea to give the original error message back to the user, as it is not friendly and discloses code internals. So you return a message such as “A server error occurred.” with a 500 result code, and you also do a console log of such errors, so that you can find the bug. The instructor does not do this logging, but he should.

The StatusError class could look like this:

```
class StatusError extends Error {
    constructor(message, resultCode) {
    super(message)
    this.statusCode = resultCode
    }
}
```

Using this class, if your authentication middleware finds that the JWT token is missing or invalid, you can just throw the error as follows:

```
throw new ResultError("The request was not authenticated", StatusCodes.UNAUTHORIZED)
```

Then you add appropriate code to the error handler to handle this case, sending back the status code and an appropriate JSON message to the caller.

## Continuing with the Video

The video instruction for this lesson starts at 5:05:30 of **[this video](https://www.youtube.com/watch?v=rltfdjcXjmk&t=23313s)** and continues to 6:28:35.
