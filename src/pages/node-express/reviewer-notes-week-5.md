---
title: Week 5 Reviewer Notes (node/express)
description: Reviewer notes for week 5 of the node/express CTD course
layout: "../../layouts/genericMarkdownFile.astro"
---

# Lesson 5: Task Manager Part 1

[Lesson page](https://learn.codethedream.org/ctd-node-express-class-lesson-5-task-manager-api-part-1/)

[Tutorial video](https://www.youtube.com/watch?v=rltfdjcXjmk) from the
beginning to 1:28:45.

Students do part 1 of the Task Manager API (a classic to-do app). They scaffold
out the project, wrestle with connecting to a MongoDB database for the first
time. This week is heavy on the project setup and methods to query the
database. In part 2, students will finish building out the API

Students should have the following changes in the `03-task-manager/starter`
directory:

- `app.js` with a `/hello` route and an `/api/v1/tasks` prefix. Server start
  method should include connecting to their MongoDB cluster using an
  environment variable.
- `controller/tasks.js`: only the `createTask` endpoint is fully built out,
  using `mongoose` to create a Task in the database. The other endpoints
  (`get`, `getAll`, `update`, and `delete`) should be defined but generally
  just have placeholder code this week.
- `db/connect.js`: code to connect to MongoDB Atlas
- `models/Task.js`: basic model code with no validation fields yet
- `routes/tasks.js`: define the route methods and connect to the controller

Pay special attention to `quizAnswers.txt`, which has students' responses to
some open-ended questions.

Also watch that students have not committed their `.env` file to their
repository. Students are using MongoDB atlas, so leaked credentials are a
serious concern here.
