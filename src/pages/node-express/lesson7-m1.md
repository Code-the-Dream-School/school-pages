---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Node/Express Lesson 7: Using Query Parameters"
description: Material link for lesson 7 of the node/express class
---

# Node/Express Lesson 7
# Using Query Parameters

In this lesson, you parse the query parameters passed with the REST request, appending the search filters that result to your find operation. As in the previous lesson, you communicate with a MongoDB database. The lesson starts at 3:07 of **[this video](https://www.youtube.com/watch?v=rltfdjcXjmk&t=23313s)**, and continues to 5:05:34.

## Concept: Thenables

One part of this assignment is a little confusing. You will see code like this:
```
let result = Product.find(queryObject);
...
result = result.sort(sortList);
...
result = result.select(fieldsList);
...
const products = await result;
```
How can this work? Isn't Product.find asynchronous? The reason it works is that Product.find doesn't return a Promise. It returns something that works like a Promise, but has extended capabilities. This is called a thenable. In this case, the thenable allows the search to be further qualified. The Product.find call does not send anything to the Mongo database, until await (or .then) is called on the thenable. Then the fully qualified search is sent to the database, the Promise is resolved, and the products found by the search are returned.

## Concept: Regular Expressions

Regular expressions provide a general purpose string parsing syntax.  A regular expression can
be used to identify strings that match a pattern.  Regular expressions can also be used
to create modified strings by substiting character patterns.  There are several tutorials
on regular expressions on the web.  In this course, we will not teach the use of regular
expressions, but you should be aware of their purpose.  To complete your homework, you 
can just copy the regular expressions used by the instructor from their location in the
final directory.