---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Back End Lesson 3.1: Rails Basics"
description: "imported from WordPress,Back End Lesson 3.1: Rails Basics"
---

# Back End Lesson 3.1: Rails Basics

Welcome to Ruby on Rails Backend 3.1\. We now start the most exciting part of this class, which is to use Rails to create an actual web application. In this unit, we will learn:

- Configuring your machine for rails development
- Creating Rail apps | Models | Views | Controllers

## Back End Lesson 3.1 Goals

- Rails development set-up
- Simple blogging app
- Work with models, views, and controllers to quickly add new features to your app
- Understand how routes match to controller methods and path helpers

## Curriculum

This is your curriculum for Back End 3.1:  
\***\*3.1.1 [Setting Up for Rails Development](https://learn.codethedream.org/configuring-your-machine-for-rails-version-6-development/)** (you should have already done this)  
**3.1.2 [Ruby on Rails 5 Basics](https://teamtreehouse.com/library/ruby-on-rails-5-basics)** **(128 min)** (we will do this on Rails 7)  
**3.1.3 [Rails Routes and Resources](https://teamtreehouse.com/library/rails-routes-and-resources)** **(198 min)**

## Assignments

The assignment for this week is to duplicate the instructor’s work on the blog application with one exception: **You should not do rails new to start.** Your assignment github repository with a starter Rails application is **[here](https://github.com/Code-the-Dream-School/R7-blog)**[.](https://github.com/Code-the-Dream-School/R6-blog) You will fork this repository and clone your fork as usual, instead of doing rails new.

**There are some differences between Rails 5 and Rails 7.** For this lesson, the differences are described in the README.md for your starter repository. **Be sure you read that README before you start.**

**Every time you clone a Rails repository, you will need to install the necessary gems and resources.** To do this, you do the command: bundle install. You need to be in the project directory that was created with the clone process to do the bundle install.

### A Concept: Delete Links

With ordinary HTML, you can do only two kinds of HTTP operations: get operations, which are done with a link, and post operations, which are done when you submit a form. So how do you create a link that does a delete? You should never change data with a get operation. Doing the delete that way would introduce a security risk. In Rails 7, there are two ways to do a delete. They are the following (don’t worry about the syntax for now — you’ll understand it by the end of this lesson):

<%= link_to 'Delete', @page, data: { turbo_method: :delete, turbo_confirm: "Are you sure?" } %>

and

```
<%= button_to 'Delete', @page, method: :delete, data: { turbo_confirm: "Are you sure?" } %>
```

These work in different ways. The first method creates an HTML link, but it marks it so that the turbo library intercepts a click of the link. The turbo library is client side JavaScript that is delivered by Rails with the HTML created from erb files (you’ll learn about erb files in this lesson). Turbo then sends a post, with a payload that tells Rails to do the delete. The second method actually creates a form with a submit button, so that a post is sent to Rails to do the delete. You can try each way when you get to the “Deleting Pages” section of the instructional video. You can then use your browser developer tools to see what HTML is actually present on the browser. The turbo_confirm, which is optional, causes an alert message to prompt the user whether they really want to delete. The button_to creates a button, whereas the link_to creates a link (which you can style as a button if you like).

## Working in Your Git Branch

For this assignment, maintain your repository to reflect all changes that the instructor shows in the video, in a git branch called blog. It is important that you continue to make changes as the instructor directs, because otherwise you won’t remember the skills. You will continue to work with the same git repository in Lesson 3.2.

Your mindset curriculum assignment can be found **[here](https://learn.codethedream.org/mindset-curriculum-debugging-part-1/)**.
