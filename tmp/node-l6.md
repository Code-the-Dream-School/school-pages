## **Learning Materials**

This week begins at 1:29 of **[this video](https://www.youtube.com/watch?v=rltfdjcXjmk&t=23313s)**, and continues until the end of the task manager project, at 3:07:18 of the video.

## **Assignments**

**Coding Assignment**

In this lesson you will continue to develop the Task Manager API, testing with Postman as you go. You will add:

- Input Validation
- Error Handling
- Additional CRUD Operations

Create a new git branch called week6. **This should be created when the week5 branch is active, so that it adds to week 5.** Continue to work in the node-express-course/03-task-manager/starter directory.

## Additional Assignment

Create a file in the starter directory called QuizAnswers2.txt. Put answers to the following questions in it.

1.  In this lesson, you created a middleware function called asyncWrapper. Why?
2.  Suppose that you want to make sure that both a status code and and error message are send back to the user when they request the URL for a task that does not exist. Assume that you've created a CustomAPIError class and an error handler that references that class. Complete the code:

    const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ \_id: taskID });
    if (!task) {
    // your code here
    }
    res.status(200).json({ task });
    });

As you will see in the lessons that follow, you do not have to create the asyncWrapper middleware, because you can instead use an NPM package called express-async-errors that provides the capability. The course uses Express 4, but in Express 5, function equivalent to express-async-errors is automatically included, so for Express 5 this package is not needed.

**Mindset Assignment**

Your mindset assignment for this week can be found here: **[Debugging](https://learn.codethedream.org/mindset-curriculum-debugging-part-1/)**

## **Submitting Your Work**

When you are done, do the following, use the same procedure as for previous lessons. You do a git add, git commit, and git push for the week6 branch, create your pull request on github, and put a link to your pull request in your assignment submission form below.

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

**Alpaca class use:**

**[Squibby 2.0 Assignment Submission Form](http://tiny.cc/squibby2)**

**Baboon** **and any 2023 classes use:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)
