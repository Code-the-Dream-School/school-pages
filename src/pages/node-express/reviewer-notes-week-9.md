---
title: Week 9 Reviewer Notes (node/express)
description: Reviewer notes for week 9 of the node/express CTD course
layout: "../../layouts/genericMarkdownFile.astro"
---

# Lesson 9 Jobs API Part 1

[Lesson page](https://learn.codethedream.org/ctd-node-express-class-lesson-9-using-query-parameters/)

[Tutorial video](https://www.youtube.com/watch?v=rltfdjcXjmk&t=23313s) from 6:28:35 to 8:20:35.

Students will work in a new repository, forked from
[Code-the-Dream-School/06-jobs-api](https://github.com/Code-the-Dream-School/06-jobs-api).
They should take care to follow the instructions, ensuring that they fork the
repo (**not** inside their current node-express-course repo) and not using
`git init`.

Students are once again encouraged to think of their own domain that they want
to write this app about. If they stick to the same domain as the instructor,
expect to see an Jobs listing/applicaiton tracking API.

The completed assignment should follow a similar organization as previous
weeks:

- Express app server that connects to Mongo Atlas db
- a User model, and whatever other models the student wants (eg: Job)
- login/register routes and middleware that uses `jsonwebtoken` library for
  authentication
- basic CRUD endpoints for their model(s), ensuring that they use the logged in
  user to fetch/modify only the models that belong to that user
