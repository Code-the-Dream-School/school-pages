## **Learning Materials**

You continue watching **[this video](https://youtu.be/Oe421EPjeBE?t=13246)**. This week, you watch from 3:40:48 of the video to 6:10:46. This section of the video starts with some slides on how the web works. You do not need to write any code for these slides. Then, at about 3:56 of the video, the instructor starts talking about how you download the repository containing the code. **Do not do this.** You already have the code you need, as it is included in the same repository you are using. The instructor also directs you to remove the .git directory. **Do not remove the .git directory.** Because you forked the original repository, you continue to use the git configuration. The useful parts of the video resume about 3:58. At about 5:18:13 of the video, the instructor discusses APIs compared with Server Side Rendering. Server Side Rendering is covered towards the end of this course. This section of the course focuses on simple responses, serving static files, and developing APIs. The APIs you develop in this class are built according to an approach called REST, which stands for Representational State Transfer. In addition, the implementation this class teaches for REST uses HTTP requests:

- Get
- Post
- Put
- Patch
- Delete

Each operation goes to a particular URL, and there may be parameters in the URL as is explained in the lesson. In addition, the POST, PUT, and PATCH operations may convey JSON data in the body of the request. JSON data is returned from the server in the body of the response. (It is possible to write APIs that don’t use JSON, but in this class JSON is always used.) If you need to learn or review JSON, a basic introduction is at this link: [https://www.digitalocean.com/community/tutorials/an-introduction-to-json](https://www.digitalocean.com/community/tutorials/an-introduction-to-json)

## **Assignments**

**Coding Assignment** The basic elements of an express program are as follows:

- The require statement for express
- Creation of the app as returned from express()
- app.use statements for the middleware. You’ll eventually use many kinds of middleware, but for now the only middleware we are using is express.static().
- app.get and app.post statements for the routes you will handle. Eventually these will be refactored into router modules, but for now you can put them inline.
- An app.all statement after these to handle page not found conditions.
- An app.listen statement

You continue working in the node-express-course repository, but for this week, you switch to the 02-express-tutorial directory. This week introduces the Express npm package, which makes web development much quicker than using Node alone. There is no need to use an answers folder. You just put your work in the 02-express-tutorial folder. Complete the following steps:

1.  While the week2 branch is active, create a week3 branch, for this week’s work.
2.  While you are in the 02-express-tutorial folder, run npm install. The instructor has provided a package.json and a .gitignore, so npm install does the installation of the express package, as needed for this week’s work.
3.  Create a public folder within 02-express-tutorial. Create an HTML file within it called index.html. It’s not critical what you put in the HTML file – just something simple.
4.  Edit app.js to add all the elements of an Express application as listed above, in the right order. You won’t have any app.get or app.post statements yet. You should have the statement app.use(express.static(‘./public’)) so that your HTML file will load. Use port 3000 in the listen statement.
5.  Start the server, with “npm start”. Then use your browser to load http://localhost:3000. You should see the HTML page you created.
6.  Try the URL http://localhost:3000/not-there. You should see that your app.all for page not found returns a 404 error.
7.  For the next part, you will implement APIs that return JSON. Because you are using the browser to display the JSON, you may want to add a JSON formatter plugin into your browser, so that it looks right. Add an app.get statement to app.js. It should be after the Express static middleware, but before the not found handler. It should be for the URL /api/v1/test. It should return JSON as follows:

         res.json({message: 'It worked!'})

    Try that URL from your browser, and verify that it works.

8.  Next, we want to return some data. We haven’t learned how to access a database from Express yet, so the instructor has provided data to use. It is in data.js, so have a look at that file.  Then add the following require statement to the top of the program:

         const { products } = require('./data')

    The value of the products variable is an array of objects from data.js, which are various items of furniture. We now want to return this array. So add an app.get statement for the url /api/v1/products. Put in code to return JSON for the products array. Test the url with your browser.

9.  Next, you need to provide a way to retrieve a particular product by ID. This is done by having an app.get statement for the url /api/v1/products/:productID . The colon in this url means that :productID is a parameter. So, when your server receives the get for a url like /api/v1/products/7, req.params will have the hash { productID: 7 }. Try this out by creating the app.get statement and doing a res.json(req.params).
10. Of course, the API should actually return, in JSON form, the product that has ID 7. So you need to find that product in the array. For that, you use the find function of the array:

    const idToFind = parseInt(req.productID) // because this will be a string, and we need an integer
    const product = products.find(p => p.id = idToFind)

    Change the app.get statement so that it returns JSON for the product. Test it out.

11. The user may request a product that is not there, for example with a url like /api/v1/products/5000 or /api/v1/products/nottthere. So in that case, you’d return a 404 status code and JSON for { message: “That product was not found.”} Add this logic to the app.get statement, and test that it works.
12. The user may also want to do a simple search, instead of getting all the products. In this case, the url would contain a query string, like:

    /api/v1/query?search=al&limit=5

    What this means, in this case, is that the user wants to see all products where the name starts with al, but the user wants to see no more than 5 products. When the app.get for /api/v1/query is called, req.query is a hash that may contain values for search or limit or both or neither, depending on what the user puts in the query string. Again, there are array methods you can use to find that list. They are Array.filter() and Array.slice(). Add a new app.get statement for /api/v1/query, and include logic to handle these query strings. Then test it out.

13. Add some more logic: you choose! For example, the user might want to send a regular expression instead of search for starting letters. Or the user may only want products that cost less than 20.00.
14. Optional additional item: Add a button to your index.html. Add JavaScript, either within index.html or in a JavaScript file it references (which would also be in the public directory.) When you click the button, your JavaScript would issue a fetch call for /api/v1/products. Then you’d add the data you get back to a div in your HTML.

### Bonus Assignment

In the node-express-course/week_3_alt_assignment directory, a sample express application is provided.  This is to give you a chance to do something creative with Express!  Completion of the assignment is optional.  The goals of the lesson are in the README.md, and the instructions are in index.js.  You should run the sample. You can then follow the instructions to create your own simple game.  You'd give your file a name like app.js (also within the same directory, and you'd change the package.json so that the start command runs app.js instead of index.js. The example shows how HTML returned by the application can be made dynamic, through string interpolation.  We'll learn another way to return dynamic HTML later in the course. You should certainly run the sample application, as it explains important concepts.  Creation of your own game is optional, but recommended. **Mindset Assignment** Your mindset assignment for this week can be found here: **[Curiosity to Learn](https://learn.codethedream.org/mindset-curriculum-curiosity-to-learn/)**

## **Submitting Your Work**

When you are done, do the following, use the same procedure as for previous lessons. You do a git add, git commit, and git push for the week3 branch, create your pull request on github, and put a link to your pull request in your assignment submission form below. **When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:** [**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)
