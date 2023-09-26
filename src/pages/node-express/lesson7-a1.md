---
layout: "../../layouts/genericMarkdownFile.astro"
title: Node/Express Lesson 7 Coding Assignment
description: Node/Express Lesson 7 Coding Assignment
---

# Node/Express Lesson 7 Coding Assignment

Continue to work in the `node-express-course` repository. Create a new branch, `week7`. **This should be created when the `week6` branch is active, so that your new work adds to the previous work.** You will work in the directory `04-store-api/starter`. Once you have changed to that directory, be sure to run `npm install` to install the required Node modules. As in previous lessons, you will duplicate the work of the instructor, testing as you go with Postman.

**This is a difficult lesson, so take your time with it**, stopping the video as needed so that you understand what is being done. Also, if you get stuck, the instructor's solution is in the `04-store-api/final` directory. The idea is that one can search by any or all of these attributes: `featured`, `name`, `price`, `rating`, and `company`. For the numeric fields (`price` and `rating`), one can also specify that you are comparing the number given to see if its "greater than", "less than", or "equal to" that value. One can also specify a sort order (ascending or descending). Also, one can specify a `skip` and a `limit`, to facilitate pagination through the result. Be sure that you test each step with Postman. Almost all the work will be done in the `controllers/product.js` file. That file has two methods, `getAllProducts` and `getAllProductsStatic`. The `getAllProductsStatic` method is there for you to experiment with and won't be directly reviewed.
