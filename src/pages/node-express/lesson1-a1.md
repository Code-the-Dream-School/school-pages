---
layout: "../../layouts/genericMarkdownFile.astro"
title: Node/Express Lesson 1 Coding Assignment
description: Node/Express Lesson 1 Coding Assignment
---

## Node/Express Lesson 1 Coding Assignment

You should already have done the steps described in the getting started page **[here](../node-setup)**. That page describes how to get git, the VSCode Editor, Node, and Postman. All of those should be installed when you start this lesson.

The next step is to do a git fork of your starter repository for this lesson, which is found **[here](https://github.com/Code-the-Dream-School/node-express-course)**. The fork button is on the upper right of that page. Once the fork is complete, you clone your fork. Please don’t clone the original repository, as if you do that, you will not be able to push your work to github.

You do all of your work inside the directory created by the git clone, which is node-express-course. Change directories so that you are inside that directory. Then create the branch for this week, using the command **git checkout -b week1** .

Now change the directory to the one that says 01-node-tutorial/answers. You’ll do all of this week’s work inside this directory.

Create the following programs for this lesson, all within the answers directory. By the way, there are examples of each of the programs you need to create in the 01-node-tutorial directory (in case you get stuck) but try to do your own work. If you need to review a section of the video for any of these exercises, view the video within youtube, but not in full screen mode. The panel on the right shows you the chapter of the video so that you know what you should review.

1.  intro.js: This program should use console.log to write something to the screen. While you are in the answers directory, run node intro to verify that the program runs. You can also put JavaScript logic in your program.
2.  globals.js: This program should use console.log to write some globals to the screen. Set an environment variable with the following command: `export MY_VAR="Hi there!"` The program should then use console.log to print out the values of \_\_dirname (a global) and process.env.MY_VAR (process is also a global, and contains the environment variables you set.) You could print out other globals as well. For each of these programs, you invoke them with node to make sure they work.
3.  For this part, you write multiple programs. names.js, utils.js, alternative-flavor.js, and mind-grenade.js are modules that you load, using require statements, from modules.js, which is the main program. Remember that you must give the path name in your require statement, for example:

         const names = require('./names.js')

    names.js should export multiple values in an object. utils.js should export a single value, which is a function you call in modules.js. alternative-flavor.js should export multiple values in the module.exports object, but it should use the alternative approach, adding each value one at a time. The exported values from each should be used in modules.js, logging results to the console so that you know it is working. mind-grenade.js may not export anything, but it should contain a function that logs something to the console. You should then call that function within the mainline of mind-grenade.js. This is to demonstrate that when a module is loaded with a require statement, anything in the mainline code of the loaded module runs. The only program you run to test is modules.js, because it loads the others.

4.  Write os.js. This should load the built in os module and display some interesting information from the resulting object. As for all modules, you load a reference to it with a require statement, in this case

         const os = require('os')

    You can look **[here](https://nodejs.org/api/os.html)** for documentation on the stuff in the built in os module.

5.  Write path.js. This should load the path module, which is another built in module. It should then call path.join to join up a sequence of alphanumeric strings, and it should print out the result. The result will work one way on Windows, where the directory separator is a backslash, and a different way on other platforms, where the directory separator is a slash.
6.  Write fs-sync.js. This should load writeFileSync and readFileSync from the fs module. Then use writeFileSync to write 3 lines to a file, ./temporary/fileA.txt, using the append flag for each line after the first. Then use readFileSync to read the file, and log the contents to the console. Be sure you create the file in the temporary directory. That will ensure that it isn’t pushed to github when you submit your answers.
7.  Write fs-async.js. This should load the fs module, and use the asynchronous function writeFile to write 3 lines to a file, ./temporary/fileB.txt. Now, be careful here! This is our first use of asynchronous functions in this class, but we are going to use them a lot! First, you need to use the append flag for all but the first line. Second, each time you write a line to the file, you need to have a callback, because the write to the operation is asynchronous. Third, for each line you write, you need to do the write for the line that follows in the callback – otherwise the operations won’t happen in order. Put console.log statements at various points in your code to tell you when each step completes. Then run the code. Do the console log statements appear in the order you expect? Run the program several times and verify that the file is created correctly. Here is how you might start:

        const { writeFile } = require('fs');
        console.log("at start");
        writeFile('./temporary/output.txt',
          'This is line 1\n', (err, result) => {
            console.log("at point 1")
        if (err) {
            console.log("This error happened: ", err);
        } else {
            // here you write your next line
         }
         })  console.log('at end');

    To get the lines to be written in order, you end up with a long chain of callbacks, which is called “callback hell”. We’ll learn a better way to do this.

8.  Write http.js. This program should use the built in http module to create a simple web server that listens on port 3000. This is done with the createServer call. You pass it a function that checks req.url, and depending on what the URL is, sends back a message to the browser screen,for ‘/’ and several other URLs. Then have your code listen on port 3000, run it, and test it from your browser, using http://localhost:3000 as the url. You can look at 12-http.js for the instructor’s answer (except that program listens on 5000). You will need to do a ctrl-c to exit your program.
9.  Within your answers directory is a program called prompter.js. This is a program for a simple server. Try it out! It just puts up a form, which you can access from your browser at http://localhost:3000. Then, when the user submits the form, it echoes back what wassubmitted, and displays the form again. You don’t have to worry about how it works. Thereis a simple body parser to read any values submitted with the form, and that parser returns a hash with the name and value of each. Because the parser is asynchronous, you get back the hash in a callback.

    Now, your task is to change this program so that it does something interesting! First, you can change the variables that you want to store when you get the form back. Then, you can change the form itself to return the values you want from the user, which you store in those variables. Then, you can use string interpolation to insert the values of your variables into the HTML. Finally, you change the logic that handles the hash of values you get when the user submits the form, so that you save the values the user submits. The places you would change are marked in the code.

    For example, you could change the input field to be a dropdown with various colors, and you could set the background color of the body to be what the user chooses. Or, you could make a number guessing game: Start with a random number from 1 to 100, let the user guess, and tell the user if their guess is low or high. In this case, you’d change the input field so that it accepts only numeric input (but when it is returned in the hash, it will be a string, so you’d have to convert it.)

When you are done, do the following to submit your work:

```
git commit -m "answers for lesson 1"
git push origin week1
```

Then go to your github repository – the one you created with a fork. Create a pull request. The target of the pull request should be the main branch of the repository you created when you forked -- not the Code-the-Dream-School main branch! Once you have created the pull request, include the link to the pull request in your homework submission form. The homework submission form
is on the main page for this lesson. This will be the general procedure for submitting homework for
this course. When you submit your homework, you also submit your answers to the mindset assignment,
if there is one for that lesson.
