This sheet is to help understand the concepts used by the Node/Express class. The ideas here should get you off to a running start with the class.

Why Node.js?
------------

JavaScript was invented to run in the browser, to give the end user a rich experience. Many programmers learned the language for this reason, and it still is the only language that is native to browsers. Node.js runs outside the browser, so that one can leverage JavaScript skills to write all sorts of programs, including web applications and web back ends.

How is Node Different from Browser JavaScript
---------------------------------------------

The syntax is almost entirely the same. One difference is that in the browser, to load another module, you use import, whereas in Node, at least at present, you use require.

There are important differences, though, in what JavaScript does in Node.js as compared with browser JavaScript. In Node.js there is no window, no document, and no DOM. But there are important additional capabilities in Node. You can do file I/O, get input from the keyboard, find out about the current process, and listen on a TCP/IP port, none of which could be done in browser JavaScript.

A Few Key JavaScript Concepts: Destructuring
--------------------------------------------

These are things you need to know for both front end and back end JavaScript programming. This code:

    const first = 1
    const second = "this number"
    const third = false
    const my_obj = {first: first, second: second, third: third }
    // could also be written
    const my_obj1 = {first, second, third}
    // or you might have
    const new_third = true
    const my_obj2 = {first, second, third: new_third}
    
    module.exports = my_obj

Now, suppose elsewhere in the program, you want to access the first value above. You could write:

    const this_obj = require("./other_module")
    const first = this_obj.first

or you could write this, which does the same thing:

    const { first } = require("./other_module")

You will also sometimes see a leading three dots in front of an array name, which means the members of the array. It is usually used to add all the members of one array to another array:

    const my_array1 = [ "apple", "banana", "orange" ]
    const my_array2 = [ "pineapple", ...my_array1, "grapefruit" ]

A Few Key Concepts: Arrow Functions
-----------------------------------

This:

    function do_something(a, b) {
      console.log(a)
      console.log(b)
    }

is basically the same (there are some subtle differences that usually don't matter) as this:

    const do_something = (a,b) => {
      console.log(a)
      console.log(b)
    }

Functions can be passed as arguments into other functions, which happens a lot in asynchronous programming. Here is one way to do it:

    function my_callback(err, result) {
      if (err) {
        console.log("oops, we had an error")
      } else {
        console.log("the result was: ", result)
      }
    }
    
    calling_function("this", "that", my_callback)

Often though, the callback is an arrow function, declared inline. This is what is done below, which does the same thing as the above:

    calling_function("this", "that", (err, result) => {
      if (err) {
        console.log("oops, we had an error")
      } else {
        console.log("the result was: ", result)
      }
    }

A Few Key Concepts: Asynchronous Programming
--------------------------------------------

JavaScript is single threaded. That means if you make a function call that takes a long time, the program just waits ... or would wait, except there is a way to call the function and have it tell you later when it has completed. The old way was via callbacks, which are functions that get called when the long running function completes. Here is an example from the file system:

    { writefile } = require("fs")  // this is object destructuring again
    console.log("at 1")
    writefile("./output.txt", "This is the first file line.\n", (err) => {
      if (err) {
        console.log("we had an error!")
      }
      console.log("at 2")
    }) // here we are passing a function as an argument.  The function is 
       // declared inline
    console.log("at 3")

The function that we pass as an argument (the callback) only gets called when the writefile completes. But the rest of the program keeps running in the meantime. So, what we would see on the console is:

    at 1
    at 3
    at 2

Make sure you understand why the "at 3" appears before "at 2"! This means that, if we want to write a bunch of lines to the file and keep them in order, we have to do something like:

    { writefile } = require("fs")
    writefile("./output.txt", "This is the first file line.\n", (err) => {
      if (err) {
        console.log("we had an error!")
      } else {
        writefile("./output.txt", "This is the second  file line.\n", (err) => { 
        if (err) { 
         console.log("an error here")
        } else {
          writefile("./output.txt", "This is the third file line.\n", (err) => {
        if (err) {
          console.log("still another error")
        } else {
          console.log("now the file is done")
        }
       })
      })
    })

Which is obviously very messy. So, there is a better way based on what are called Promises. A Promise is a special class of JavaScript object that one can use to wait until a function completes. So now we can do:

    const { writefile }= require("fs").promises // get the promises 
    // version!
    const my_function = async () => { 
      try {
        await writefile("./output.txt","This is the first file line.\n" )
        await writefile("./output.txt","This is the second file line.\n" ) 
        await writefile("./output.txt","This is the third file line.\n" )
      } catch(e) {
        console.log("oops, we had an error")
      }
      console.log("the file is done")
    }
    console.log("at 1")
    my_function()
    console.log("at 2")

This is obviously nicer. A couple of things to note: In the function, we would see, at 1, then at 2, and then "the file is complete", even though we log the latter message inside my\_function. Asynchronous functions don't complete until later. We can only use await inside of my\_function because we have marked it as async. If we were to do const value = my\_function(), we would find that the returned value is a Promise. Async functions always return a Promise. So how do we get any other value out of it? Well, here's an example:

    const { readfile } = require("fs").promises
    const myfunc = async () => {
      try {
         const line = await readfile("./input.txt")
      } catch(err) {
         console.log("an error occurred.)
      }
      return line
    }

When the await happens, the readfile Promise is resolved into the return value. And although the myfunc function, being asynchronous, returns a promise, an await statement would resolve the promise into the returned value, which is "line" above.

Sometimes you need to call an async function from within a function that is not async. Suppose we could not change myfunc in the code above into an async function. This happens, for example, in some React functions. In this case, we need to use the .then function as follows:

    const { readfile } = require("fs").promises
    const myfunc1 = () => {
      readfile("./input.txt")
      .then((line) => {
        return line
      })
      .catch(err) {
        console.log("another error")
      }
    }

So myfunc, being async, returns a Promise that resolves into a line with the await statement. But the function myfunc1 is not async, so it does not return a Promise, it returns the line.

One More Tip
------------

Suppose you need to call a function to read a line from a file, but you don't know how to pass the right arguments. Or, suppose you don't even know what function to call. Fortunately, you can find out easily. For example, if you are doing file I/O, you can do a web search for node fs and you will get the programming reference for the fs module. Be sure you check the online reference if your code is not doing what you want.