## **Lesson Materials**

In this lesson, you parse the query parameters passed with the REST request, appending the search filters that result to your find operation. As in the previous lesson, you communicate with a MongoDB database. The lesson starts at 3:07 of **[this video](https://www.youtube.com/watch?v=rltfdjcXjmk&t=23313s)**, and continues to 5:05:34.

## Concept: Thenables

One part of this assignment is a little confusing. You will see code like this:

    let result = Product.find(queryObject);
    ...
    result = result.sort(sortList);
    ...
    result = result.select(fieldsList);
    ...
    const products = await result;

How can this work? Isn't Product.find asynchronous? The reason it works is that Product.find doesn't return a Promise. It returns something that works like a Promise, but has extended capabilities. This is called a thenable. In this case, the thenable allows the search to be further qualified. The Product.find call does not send anything to the Mongo database, until await (or .then) is called on the thenable. Then the fully qualified search is sent to the database, the Promise is resolved, and the products found by the search are returned.

## **Assignments**

**Coding Assignment**

Continue to work in the node-express-course repository. Create a new branch, week7. **This should be created when the week6 branch is active, so that your new work adds to the previous work.** You work in the directory 04-store-api/starter. Once you have changed to that directory, be sure to run npm install to install the required node modules. As in previous lessons, you duplicate the work of the instructor, testing as you go with Postman.

**This is a difficult lesson, so take your time with it**, stopping the video as needed so that you understand what is being done. Also, if you get stuck, the instructor's solution is in the 04-store-api/final directory. The idea is that one can search by any or all of these attributes: featured, name, price, rating, company. For the numeric fields price and rating, one can also specify greater than, less than, or equal to. One can also specify a sort order. Also one can specify a skip and a limit, to facilitate pagination through the result. Be sure that you test each step with Postman. Almost all of the work is in the controllers/product.js. That file has two methods, getAllProducts and getAllProductsStatic. The getAllProductsStatic method is just for experimentation.

**Mindset Assignment**

Your mindset assignment for this week can be found here: **[Asking for Help](https://learn.codethedream.org/mindset-curriculum-asking-for-help-part-1/)**

## **Submitting Your Work**

When you are done, do the following, use the same procedure as for previous lessons. You do a git add, git commit, and git push for the week7 branch, create your pull request on github, and put a link to your pull request in your assignment submission form below.

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

**Alpaca class use:**

**[Squibby 2.0 Assignment Submission Form](http://tiny.cc/squibby2)**

**Baboon** **and any 2023 classes use:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)
