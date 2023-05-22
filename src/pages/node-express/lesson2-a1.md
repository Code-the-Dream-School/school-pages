---
layout: "../../layouts/genericMarkdownFile.astro"
title: Node/Express Lesson 2 Assignment
description: Node/Express Lesson 2 Assignment
---

## **Practice with NPM and Async Patterns**

For week 1, you created files in the node-express-course/01-node-tutorial/answers directory. For week 2, you continue to do your work in that same directory. However, before you do your work for this week, you switch to a new git branch. While the week1 branch is active, use the command

    git checkout -b week2

As you will be working on the node-express-course repository for some weeks, this is the way you separate your assignments for each week. The key topics in this section are:

- use of npm and package.json to manage the project and dependencies
- async patterns
- event emitters and handlers
- streams

The instructor does provide examples if you need them. As for the last lesson, you work in the answers directory within the 01-node-tutorial directory. Step 1: Within your answers directory, create a file called .gitignore. It should have the following lines:

    /node_modules
    .DS_Store

You do not want to store the contents of node_modules in github, because they are already present on the web as public files, accessible by npm. The .DS_Store file is sometimes  created by the mac OS, and you don’t need that one in github either. Step 2: Within your answers directory, run npm init. You can accept all the defaults, except you can enter your name when it prompts you for author. This creates a package.json file. Step 3: Enter the following command:

    npm install nodemon --save-dev

As the instructor has described, npm gives you access to a large library of reusable code, available at [npmjs.com](https://www.npmjs.com/). You have just installed one package, but you have also installed all its dependencies, all in the ./node_modules directory. You can see what you have installed by looking at package-lock.json. The package you install, nodemon, is very useful for development, but you wouldn’t want to deploy it to the cloud, as it is not useful in production, so it is installed as a dev dependency. Step 4: Edit the package.json. This file manages your project, enabling others to contribute and also providing a means to deploy the project to the cloud. You can read a description of package.json [here](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/). There is one other entry that is often useful, called engines. This can be used to specify which version of node your package requires. But for now, you are just going to set up the scripts stanza. Edit it to look like the following:

      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon prompter.js",
        "start": "node prompter.js"
      },

The scripts give npm commands you can run as you develop. In this case, “npm run dev” runs the program within nodemon. If you change the program, nodemon restarts it, which is useful to test continuously as you are changing your program. The command “npm run start” or just “npm start” runs the program under node, which is how it would run in production. Step 5: From within your terminal, while you are in the answers directory, do “npm run dev”. The prompter program starts, and you can access the page from \[http://localhost:3000\] in your browser. Now edit prompter.js and add a comment. Nodemon restarts the program, because prompter.js has changed. As before, you use ctrl-c to end the program. Nodemon is only important for programs that keep running until you press ctrl-c. Now for some code: The instructor showed several patterns for JavaScript asynchronous programming. An asynchronous function returns a promise, or in some cases a “thenable” which acts like a promise. You need to resolve the promise in order to get the actual return. To resolve a promise inside an async function, you use await. This should be used inside a try/catch block, as follows:

    const myFunc = async () => {
        ...
        return result
    }

    const myFunc2 = async () => {
        try {
           result = await myFunc()
           ...
        } catch(err) {
            console.log("An error occurred: ", err)
        }
    }

Sometimes you need to call an async function from within another function that is not async. In this case, you can’t use await – it will give a syntax error. So you can either use .then or you can wrapper the function call as follows:

    const myFunc3 = () => {  // not async, and in some contexts we better not make it async
       myFunc()
       .then((result) => {
          console.log("got the result.")
          ...
       })
       .catch((error)=> {
          console.log("An error occurred: ", error)
       })
    }

    const myFunc4 = () => {  // the other way to do it, via a wrapper:
        const myFunc5 = async () => {
            try {
                   result = await myFunc() {
                   console.log("got the result.")
                   ...
                }
            } catch(error) => {
                console.log("An error occurred: ", error)
            }
        }
        myFunc5() // here's where we call the wrapper, but do NOT do this:
        // result = myFunc5()  This won't work because myFunc5 is asynchronous!
        // All you'd get back is a promise, not the result.
    }

There’s one more trick with the .then. Suppose you need to make a string of calls to async functions. You can chain the .then statements as follows:

    const myFunc6(() => {
        myFunc() // an async function, so it returns a promise
        .then((result) =>{
            console.log("got the first result")
            return myFunc() // here we call it again, we return the promise myFunc returns
        })
        .then((result) =>{
            console.log("got the second result")
        })
        .catch((err)={
            console.log("An error occurred: ", err)
        })

    })

So, you can chain a collection of async calls with .then statements, and one .catch at the end. Ok, that’s the summary. Be sure that you understand this. We will do a lot of asynchronous programming in Express. Now for the programs to write.

1.  Create a program writeWithPromisesAwait.js. This should use the fs.promises package. You’d start with the following code:

         const { writeFile, readFile } = require('fs').promises

    Then create an async function called writer that writes three lines to a file, calling the writeFile function with await. Put the await statements inside of a try/catch block! Create another async function called reader that reads the file with await readFile and logs the return from the await to the screen. Now we want to call the two functions in order, first the writer, and the reader. But, be careful! These are asynchronous functions, so if you just call them, you don’t know what order they’ll occur in. And you can’t use await in your mainline code. So, you write a third async function called readWrite. In that function, you call await reader and await writer. Then test your code. The file you are writing should not be sent to github, so you add the filename as another line to your .gitignore.

2.  Write another program called writeWithPromisesThen.js. You start it the same way, but this time, you use the .then style of asynchronous programming. You don’t need to create any functions. Instead you just use cascading .then statements in your mainline, like this:

         writeFile(...) // write line 1
         .then(() =>{
            return writeFile(...)  // write line 2.
            // Return the promise so you can chain the .then statements
         })
         .then // write the third line, and follow that with two more .then blocks,
         // one to call readFile to read it back out, and one to log the data to the screen.
         ...
         .catch((error) => {
             console.log("An error occurred: ", error)
         })

    Test your code. You may want to sprinkle console.log statements in your code so that you understand the order of execution.

3.  We want to understand event emitters. First, modify prompter.js, to add the following lines above the listen statement:

         server.on('request', (req) => {
         console.log("event received: ", req.method, req.url)
         })

    Then test this (npm run dev) and try with your browser to see the events the server is emitting.

4.  Write a program customEmitter.js. In it, create one or several emitters. Then use the emitter “on” function to handle the events you will emit, logging the parameters to the screen. Then use the emitter “emit” function to emit several events, with one or several parameters, and make sure that the events are logged by your event handlers. This is your chance to be creative! You could have an event handler that emits a different event to be picked up by a different handler, for example. Here’s a couple tricks to try. You can trigger events with a timer, as follows:

         const EventEmitter = require('events')

         const emitter = new EventEmitter()

         setInterval(()=> {
             emitter.emit("timer","hi there")
         }, 2000)

         emitter.on("timer", (msg) => console.log(msg))

    Or, you could make an async function that waits on an event:

         const EventEmitter = require('events')

         const emitter = new EventEmitter()

         const waitForEvent = () => {
             return new Promise((resolve) => {
                 emitter.on("happens", (msg) => resolve(msg))
             })
         }

         const doWait = async () => {
             const msg = await waitForEvent()
             console.log("We got an event! Here it is: ", msg)
         }

         doWait()
         emitter.emit("happens", "Hello World!")

    (I guess that last one is not so easy. We haven’t talked about creating promises.)

5.  Change back to the 01-node-tutorial directory and run 15-create-big-file.js. This creates a big file in the content directory. You’ll note that the instructor has a .gitignore that includes this file name so that it isn’t stored in github. Now, change back to the answers directory, and write a program called stream.js. It should create a read stream for the big file (../content/big.txt) with encoding of utf8 and a highWaterMark of 200. The highWaterMark is the maximum that is read with each chunk of the stream. The program should initialize a counter to 0. Then it should handle the “data” event for the stream by incrementing the counter and logging the event result to the screen. Then it should handle the “end” event by reporting the number of chunks received. Finally, it should handle the stream “error” event by logging the error to the console. Test the program for several values of highWaterMark. You can look at 16-streams.js to help you as needed.
6.  Have a look at 17-http-stream.js. You don’t need to write a program, but observe how the chunks that are read from the stream are piped to the res object that is returned from the http request. Try to understand this program. Usually, if you are sending back voluminous data in response to an HTTP request, you want to break it up into chunks.

When you have completed your programming assignment, do a git add for all your changes to the branch,
commit the changes, and push the changes to your repository. Then create a pull request. A link
to the pull request is to be included in your homework submisson.
