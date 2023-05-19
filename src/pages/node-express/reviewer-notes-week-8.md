---
title: Week 8 Reviewer Notes (node/express)
description: Reviewer notes for week 8 of the node/express CTD course
layout: "../../layouts/genericMarkdownFile.astro"
---

# Lesson 8: JWT Basics

[Lesson page](https://learn.codethedream.org/ctd-node-express-class-lesson-8-jwt-basics-a/)

[Tutorial video](https://youtu.be/rltfdjcXjmk?t=18272) from 5:05:30 to 6:28:35.

Students are presented with two extra assignments:

1. Create a new Express app with JWT auth from scratch (from written
   instructions)
2. Following along with the video exactly

If students do the "preferred" assignment (#1), they will put it in
`05-JWT-Basics/preferred`. Otherwise, their work will be in
`05-JWT-Basics/starter`.

If students do the preferred assignment, compare their work to the written
instructions; expect to spend more focus on the code review.

If students do the starter assignment, you can copy and paste their work into
the final directory, and then view the resultant diff to get a narrower focus
on what, if anything, they changed compared to what the instructor
demonstrated.

For the most part, the `starter` folder for this assignment (and likely the
students `preferred` folder as well) will follow the same general structure as
the last few weeks. There will be a main `app.js` Express entrypoint,
controllers, routes middleware, and error directories.

The main thing to look out for this week is whether the students have a good
understanding of:

- What is a JSON Web Token
- Why / when is it used in web development
- How to sign and verify a token
- Correctly using the authorization HTTP header
- Storing the JWT secret in the env variables
- Using auth middleware to pass along the decoded user details to the
  controllers
