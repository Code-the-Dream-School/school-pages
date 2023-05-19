---
title: Week 4 Reviewer Notes (node/express)
description: Reviewer notes for week 4 of the node/express CTD course
layout: "../../layouts/genericMarkdownFile.astro"
---

# Lesson 4: Middleware, REST Methods, and Postman

[Lesson page](https://learn.codethedream.org/ctd-node-express-class-lesson-4-middleware-rest-methods-and-postman/)

[Tutorial Video](https://youtu.be/Oe421EPjeBE?t=22245) from 6:10:46 to the end
of the video.

Students finish the Express tutorial they started last week. You should expect
the following modules to be completed in the `02-express-tutorial` directory:

- 08-middleware-basic.js
- 09-middleware-use.js
- 10-middleware-options.js
- 11-methods.js
- 12-route-app.js
- routes/people.js
- routes/auth.js
- controllers/people.js
- authorize.js (used in file 9)
- logger.js (used in file 8 and file 9)

## Additional Assignment: Practice Middleware

This additional assignment is found in `practice-middleware.js`, and it is not
part of the video tutorial. Make sure it's completed! Also, give it a closer
look, since students are applying their knowledge from instructions rather than
rote following, so there's a chance that there will be an opportunity to
provide more meaningful feedback.

# Hard Parts

Help the students to understand the different ways that middleware can be
called in Express (global `app.use`, on a group of sub-routes, or even on a
specific path). Also check that they understand the importance of the order of
middleware and that the request will be handed off to each middleware until a
response is sent or the pipeline is halted.

Students sometimes struggle with the way we're using and passing around
callbacks here so if needed, you can refer them back to some of the work in
the first two weeks that covers that at a lower level. We also begin using
arrow functions more liberally here so it's possible that'll be new to some
students. A common gotcha is not leaving the `res.send` (or other
response-rendering call) as the last line in a route method, without an
explicit `return` keyword.
