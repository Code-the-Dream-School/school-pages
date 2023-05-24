---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Back End Lesson 3.2: Rails Active Record Associations"
description: "imported from WordPress,Back End Lesson 3.2: Rails Active Record Associations"
---

# Back End Lesson 3.2: Rails Active Record Associations

Welcome to Ruby on Rails Back End Class Lesson 3.2\. In this unit, we will learn:

- Spot, diagnose, and solve problems with Rails application
- Active Record Associations in Rails

## Lesson 3.2 Goals

- Troubleshoot your Rails applications
- Understand active record associations

## Curriculum

This is your curriculum for Back End II.

\***\*3.2.1[ Troubleshooting a Rails Application](https://teamtreehouse.com/library/troubleshooting-a-rails-application)** **(29 min)**  
\***\*3.2.2 [Active Record Associations in Rails](https://teamtreehouse.com/library/active-record-associations-in-rails)** **(100 min)**

## Assignments

The first video is on troubleshooting, here: [Troubleshooting R](https://teamtreehouse.com/library/troubleshooting-a-rails-application)[ails](https://teamtreehouse.com/library/troubleshooting-a-rails-application). Unfortunately, you won’t be able to duplicate the specific steps the instructor takes, because he does it in a Pets application, which you don’t have, rather than in the blog application you do have. Take some notes. You may also want to put some bogus lines in your blog application to see what kinds of errors occur. For example, in your blog application, you see that the index method in app/controller/posts_controller.rb starts with @posts = Post.all. What happens if you leave out the @ symbol? In the new method for that same controller, what happens if you put @post = Nonsense.new ? What happens if you put @post = String.new ? What happens with the create method if instead of redirect_to @post , you do redirect_to invalid_path ? What about leaving out the <% end %> in one of the erb files? Do you see how to use the error messages rails reports to find these problems?

The instructor does not mention one very important tool, called byebug. We’ll go through that in a later session.

As you go through the Active Record Associations in Rails videos, maintain your blog repository, which you used in Lesson 3.1, with the additional changes shown by the instructor in a continuation of assignment 1\. You should put the associations work in a new branch called associations, which you would create from the old blog branch. In addition, there are three shorter assignments on Active Record associations. You will modify three new Rails applications. and you will have a github repository for each. In each case, you do not need to do a rails new, because a starter repository is provided. After forking and cloning each, you should create a branch in each called “lesson”. FOr each of these three applications, you put your work in the lesson branch, add and commit those changes, push the lesson branch to github, and create the pull request, and include a link to the pull request in your homework submission. How you set these these up is in the teacher’s notes, not the videos. You should have a forum application called community, described in: <https://teamtreehouse.com/library/has-and-belongs-to-many-associations> , for which the starter workspace is **[here.](https://github.com/Code-the-Dream-School/R7-community)** Then you will have a magazine subscription application called periodical described in: <https://teamtreehouse.com/library/has-many-through-associations> . The starter workspace for this one is[ **here.**](https://github.com/Code-the-Dream-School/R7-periodical) Finally you will have a movie database called mdb, described in: <https://teamtreehouse.com/library/polymorphic-options> . The starter workspace is **[here.](https://github.com/Code-the-Dream-School/R7-mdb)** These are small applications.

There are a couple of errors in the teacher’s notes. For the community application, be sure you run bin/rails db:migrate after you have modified (uncommenting the index lines) the migration that generates the join table. For the periodical application, the teacher’s notes tells you to do the following:

```
subscription = Subscription.create(months: 12, magazine: Magazine.find_by(title: "Ruby Reader"))
Subscriber.find_by(name: "Jay").subscriptions << subscription
```

The first line above does not work, as you will get a subscriber must exist error. Instead of these two lines, use the following line:

```
Subscriber.find_by(name: "Jay").subscriptions.create(months:12, magazine: Magazine.find_by(title: "Ruby Reader"))
```

Your mindset curriculum assignment can be found **[here](https://learn.codethedream.org/mindset-curriculum-asking-for-help-part-1/)**.
