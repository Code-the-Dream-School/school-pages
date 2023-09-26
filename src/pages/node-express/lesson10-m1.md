---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Node/Express Lesson 10: Jobs API Part 2"
description: Material link for lesson 10 of the node/express class
---

# Node/Express Lesson 10

# Jobs API Part 2

In this lesson, you complete implementation of the CRUD operations for the API, using either the `Job` model as the instructor does, or the model you invented in the last lesson. You test with Postman as you go. Your Postman configuration should have environment variables for the URL and, as the instructor explains, the accessToken. You will improve the error handling to return meaningful error messages to the user when Mongoose validation errors occur. You then add security protection for the application so that it can be deployed on the Internet. The security configuration uses the following node packages:

- [helmet](https://www.npmjs.com/package/helmet) for setting various HTTP headers to protect against well-known vulnerabilities
- [cors](https://www.npmjs.com/package/cors) for enabling cross-origin resource sharing
- [xss-clean](https://www.npmjs.com/package/xss-clean) for preventing cross-site scripting attacks. Note that this package is now deprecated. We can still use it for this assignment, but we will need to find a replacement for it in the future.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) for limiting the number of requests from a single IP address. This is to prevent denial of service attacks.

These packages must be used whenever you deploy an application publicly, to minimize the chance of a security exposure. For your class final project, you will use these same packages, because you will deploy your final project on the Internet, and you want it to be secure.

As for the previous lesson, you may duplicate the work that the instructor shows, or if in the last lesson you invented your own model to use instead of the `Job` model, you instead implement CRUD operations for your model. You continue to put your work in the new `06-jobs-api` **repository** that you forked and cloned last session. If you get stuck, answers are in the `node-express -course/06-jobs-api/final` directory, and it's certainly a good idea to read the instructors code, but please try to do your own work. Before you start this lesson, you create the `week10` git branch, **which should be created when the `week9` git branch is active**. This lesson runs from 8:20:35 to 9:34:30 of **[this video](https://youtu.be/rltfdjcXjmk?t=30036)**.

The instructor shows how to deploy to Heroku. However, since this video was made, Heroku has announced that they are ending free access for deploying web applications. **Therefore, do not install the Heroku CLI, and do not deploy to Heroku.** Instead, you deploy your application to Render.com. Instructions for deploying to Render.com are found in the [Assignment section](/node-express/lesson10-a1).

## Concepts: Internet Deployment

When you deploy to the Internet, you need to be confident that your application is secure. In your case, the risk is very small, because you aren't storing or retrieving sensitive information. This is fortunate, because security is hard -- very hard. The packages the instructor specifies are good starting points. 

CORS is not really about security. It stands for cross origin resource sharing, and it is what allows one web application to call another, subject to configuration limits. 

The xss-clean package is to avert an attack called cross site scripting. This occurs when an attacker is able to insert some JavaScript into your application and have your application run that script, potentially getting access to resources managed by the application. This can happen when a script is inserted into a URL that calls the application, or into a REST request, or into an HTML form. The xss-clean package strips those scripts out. 

The helmet package provides additional protection against cross site scripting. It sets headers on your HTML pages to limit what script the pages will load. Helmet can get a bit complicted to configure for a front end, particularly if the front end uses resources to style the application such as Bootstrap. 

The express-rate-limit package limits the number of requests that can be issued per minute from a given client, so that attackers can't cause application problems by brute force.
