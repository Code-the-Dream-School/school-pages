---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Node/Express Lesson 9: Jobs API Part 1"
description: Material link for lesson 9 of the node/express class
---

# Node/Express Lesson 9

# Jobs API Part 1

## Thinking About Your Final Project

In this lesson, as in the previous one, you can choose to implement some content different from what the instructor shows. The instructor shows CRUD operations for job records, and uses a Job model. However, you can choose to store objects of a different kind instead of job records. Try to imagine something for an application you'd like to invent! This work could then comprise the beginning of your final project. Look at the final project rubric **[here](https://learn.codethedream.org/node-express-final-project-latest/)** to see what is required. (Bear in mind, though, that there are two ways to go in the final project -- either using a front end and back end, or using server side rendering, which we haven't covered yet.)

If you do implement a model different from the Job model, it should still have a createdBy attribute, which is a reference to a User record, to associate each entry with a particular users, and the createdBy attribute should be of type mongoose.Types.ObjectId. This is for access control: A particular user can do CRUD operations only on their own records. Your model should also have an entry that is an enum. You use an enum when an attribute can take only a small set of values, like vanilla, chocolate, and strawberry. See the instructor's work for the Job model in the final directory for an example, both of how to do the createdBy attribute and how to do an enum. You are encouraged to use a variety of data types in your model such as numbers, strings, and dates.

## Concepts: Authentication with JWT Tokens

In this lesson as in the previous one, you use JSON web tokens (JWTs) for authenticating the user. But, in this case, you do store user records in MongoDB, so you have a User model. You store the user name, email, and hashed password in the database. We never store passwords in plain text. Instead they are cryptographically hashed so that even if the database is compromised, the passwords are not. The cryptography for the password comes from the bcryptjs npm package. The hashing is performed in a middleware routine that is added to the User model, which is a pre routine for the save operation. You also add instance methods to the User model for generating the JWT and for validating the user password. When you do so, you use the function keyword, not the arrow function syntax, so that the function is associated with "this" which is a user instance. You also set timestamps on your entries, just as the instructor does.

As in the previous lesson, you use authentication middleware to protect routes.

## Concepts: Access Control for Entries

The purpose of createdBy is to limit access to certain entries. For each of your CRUD operations, you use the ID of the User record for the logged on user. Your authentication middleware stores this in req.user when the JWT token is validated. When creating a Job entry (or an entry of the new model you create instead of using Job) you store the ID in the createdBy attribute. When retrieving the Job entries, or a single Job entry, or doing an update or delete of a Job entry, you include the ID to filter your Mongoose operation, to make sure that a user can't see or change or delete another user's records.

For this lesson, you create only an API. Although the instructor mentions a front end, he does not provide one, so each of your routes must be tested using Postman.

## Continuing with the Video

This lesson runs from 6:28:35 to 8:20:35 of **[this video](https://www.youtube.com/watch?v=rltfdjcXjmk&t=23313s)**. **Read the Coding Assignment Instructions before watching the video so you know how your assignment will differ from the video instructions.**

As for previous lessons, you duplicate the work that the instructor shows, except that instead of creating a Job model, you can choose to create a model of your own choosing. (You can use the Job model the instructor uses if you prefer, but it would have to be extended to make a final project.)
