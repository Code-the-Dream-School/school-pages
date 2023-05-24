---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Rails: Calling REST with Fetch"
description: "imported from WordPress,Rails: Calling REST with Fetch"
---

# Rails: Calling REST with Fetch

Now we will call the API using Fetch, from a front end application. We will create this front end application using ordinary JavaScript and HTML. Usually, a front end is created using a framework such as React. This lesson explains how it works, without requiring that you know React. However, this lesson does require knowledge of JavaScript, in particular to access and manipulate the DOM and to access APIs using fetch(). The fetch() API is asynchronous. In the provided code, the return is handled with .then and errors are handled with .catch. Optionally, you could mark event handling functions with async and use the await statement in a try/catch block, if you are more familiar with that style.

As the previous lesson was a long one, this lesson is optional, but it will help you understand how front end applications access a Rails API.

## The Starter Application

You already have the starter application, but it is not functionally complete. It is comprised of the two HTML files and the two JavaScript files in the public directory of the Rails REST application. Often, a front end is not served up by the same server as the back end API. If the front end resides on a different server, fetch calls to the API must have the full URL, instead of just the /. Also, the back end with the API must be configured with an additional gem, the rack-cors gem, to allow access from the front end that is on a different server. For simplicity, this lesson keeps everything on the same server. Start the server as usual.

Now open the browser to localhost:3000\. You will see a very basic page, which is not styled at all. The default (session) page allows user enrollment, user logon, and user logoff. The members and facts page allows CRUD operations for members. You will extend this to implement additional CRUD operations for members and facts.

Use the session page to log in a user, using one of the users you created in a previous step. Then go to the members and facts page and list members. If you try to list members without logging in, you will get a 401 return code, indicating that you are not authenticated.

The HTML for this application is in public/index.html and public/session.html. The first of these pages calls public/member_ops.js. The second page calls public/session_ops.js. Your assignment will involve extending index.html and member_ops.js.

Study the JavaScript in member_ops.js. You will see that it creates a click event listener for the div containing each button. Within the event listener is logic to check which button was clicked (the event.target). , and then when one is clicked, it causes a javascript fetch request. If the fetch is a POST or a PUT, a JSON body is included with the request. When the request completes, the result is sent to the screen, or an error is given in an alert. Because these requests require authentication, the authorization header is included with the request. The value of the authorization header is derived from the logon. You can see how by looking at the logon operation in session_ops.js.

(A note on security: For this assignment, the JWT is acquired from the back end at logon time, and then stored in browser local storage. Use of browser local storage in this way is a common practice, but it entails significant security risks. When authenticating from a browser, it is better if the server stores the token on the browser side by creating an httponly cookie. Authentication via JWTs in the header are better used when one server is calling the API of another, because in that case the token does not reside in local storage.)

## Assignment

Create a git branch called fetch. This is where you will put the code changes for your lesson.

Extend the index.html file. Add another line, on which you would have an entry field for member_id and a button for Delete Member. Add logic to the member_ops.js so that you can delete a member entry. You can use the existing event listener, with the new target being the delete button you create. This is similar to the update logic, but the method is ‘DELETE’ and there is no body to the request. You still have to specify the authentication header. Test it out to be sure it works.

Extend the index.html file further. Add another entry field and button for list facts. The entry field should be for the id of a member entry. Add code to the member_ops.js so that when the second pushbutton is clicked, it retrieves all the facts belonging to that member entry, via a fetch request. You have to send the fetch request to the URL http://members/member_id/facts where member_id is from the corresponding entry field.

Once you get this working, extend the index.html and member_ops.js files further. Add entry fields for member_id, fact, and likes, as well as a pushbutton for create fact. You want to create a fact belonging to the member specified by the member_id. You will need to send a POST request to the same URL as for the fact list request, with a JSON encoded body for the fact object to be created. Note that the member_id is not in the JSON body because it is in the URL.

Once that is working, add code to update and delete fact entries, and test those changes too.

When all is working, push your fetch branch to github and create a pull request.

This reference may be helpful: <https://developer.mozilla.org/en-US/docs/Web/API/Fetch%5FAPI/Using%5FFetch>
