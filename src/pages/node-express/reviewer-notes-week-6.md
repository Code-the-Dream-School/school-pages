---
title: Week 6 Reviewer Notes (node/express)
description: Reviewer notes for week 6 of the node/express CTD course
layout: "../../layouts/genericMarkdownFile.astro"
---

# Lesson 6: Task Manager API Part 2

[Lesson Page](https://learn.codethedream.org/ctd-node-express-class-lesson-8-task-manager-api-part-2/)

[Tutorial video](https://youtu.be/rltfdjcXjmk?t=5343) from 1:29:00 to 3:07:18.

Students finish the task manager API, which they started last week. This is the
first proper API with a database connection (MongoDB) in the course.

Students add 3 features:

- Input Validation
- Error Handling
- Additional CRUD Operations (some more exotic HTTP methods)

Students should have completed the following in the `03-task-manager/starter`
directory:

- `app.js`: updated to use their defined `not-found` and `error-handler`
  middleware and serving static code from the `public` folder (the code in the
  public folder is created already for them)
- `controllers/tasks.js`: all routes should now fully talk to the database and
  forward requests to the error handler middleware if there are errors
  saving to the database
- `errors/cusotm-errors.js`: custom error class
- `middleware/async.js`: custom async wrapper to be used in all the tasks
  routers
- `middleware/error-handler.js`: custom middleware for handling errors using
  the custom error class
- `middleware/not-found.js`: custom middleware for handling 404 route not
  found errors
- `models/Task.js`: should have added required fields and validation fields to
  the model

## Additional Assignment

Expect to find a file `QuizAnswers2.txt` with answers to open-ended questions.
Look at the lesson page for details.
