---
layout: "../../layouts/genericMarkdownFile.astro"
title: Node/Express Lesson 5 Coding Assignment
description: Node/Express Lesson 5 Coding Assignment
---

# Node/Express Lesson 5 Coding Assignment

## Warm Up: Array Methods

The Task Manager you develop for this assignment requires you to use a number of methods of the JavaScript Array class. You should review those. See the 03-task-manager/optionalArrayMethodsReviewExtraAssignment.js file. Instructions are inside the file, with examples. You can optionally implement the challenges required; this is recommended!

## Task Manager with Mongo Database

In this lesson, you will

- Set up a free Mongo account, and connect to a Mongo NoSQL database
- Perform CRUD operations on that database
- Only work on the back end. This means that to test your work, you must use Postman.

The instructor suggests that you download code via a link on johnsmilga.com. **Don't do this.** Just continue to work on the same git repository you initially forked and downloaded for this course, which is node-express-course. You do not need to move directories from this git repository. Create a new git branch called week5. **This should be created when the week4 branch is active, so that your work adds on to the work of the week4 branch.**

This week's work is to be created in the 03-task-manager/starter directory. Note that answers, if you get stuck, are in the 03-task-manager/final directory, but try not to refer to that. Once you have changed directories to the 03-task-manager/starter directory, you do an npm install. This loads the node modules you will need.

## **Warning: Be Careful of Your Mongo Password!**

The instructor pastes the Mongo database URI into the code. It includes a password. You may do the same to make sure it works. However, in general, you would **NEVER** put a password or API key into your code because, when you push it to Github, it becomes public and anyone can access your data. There are hackers with github scrapers that go looking for just such an exposure. A little later in the lesson, the instructor moves the Mongo URI into a .env file. This is where it should be kept. You will notice a .gitignore file in the 03-task-manager/starter directory. That contains lines for /node_modules and .env, which are the files you do not want in Github. The .gitignore file is very important! **Do not git add, git commit, or git push your code while the Mongo URI is included in the code.** Be sure it is completely removed from the code, not just commented out! If you make a mistake and git commit your code with a password in it, the ONLY recovery is to change the password. This is because git keeps every old version of your code!

In the future, you would create the .env file at the start of the project, and you would make sure that the .gitignore file includes .env, before putting any secrets like the Mongo password into the .env. You would never put such secrets in your code, even temporarily.

## Additional Assignment

Within the starter directory, create a file quizAnswers.txt. Put answers to the following questions in it.

1.  Quickly explain how middleware is used in an Express application.
2.  What does CRUD stand for?
3.  You are careful to store your sensitive information in a .env file.
    1.  How do you get your app to access the information in the .env file?
    2.  How do you protect the contents of the .env file so that it is not stored in your github repository?
