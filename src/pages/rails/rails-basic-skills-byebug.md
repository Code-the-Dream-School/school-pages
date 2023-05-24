---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Rails Basic Skills: Byebug"
description: "imported from WordPress,Rails Basic Skills: Byebug"
---

# Rails Basic Skills: Byebug

## Getting Started with a Customer App

We will start the quick way. (You should have forked and cloned the repository, and run bundle install.) While in your Backend-validations directory, type:

```
bin/rails generate scaffold Customer first_name:string last_name:string phone:string email:string
bin/rails db:migrate
```

Then, edit your config/routes.rb. You are probably tired of seeing the Yay! Rails screen when you connect your browser to the root path of your application. Right after the Rails.application.routes.draw line of your routes.rb, put the line

```
root to: 'customers#index'
```

This will configure the server to bring up this page when you connect to the root path.

## Try the Application Out

Start the rails server. Then, in the browser, go to your / URL path. Now, the Rails 7 scaffold creates some views that are not as nice as they were in Rails 5 and 6, IMHO, but you can still do all the same things.

Try it out: You will see that you can create customer records, edit them, show them, and delete them. Leave a few customer records in. So far, so good. However in our, now try this URL path

```
/customers/567
```

You will see the error screen that follows:

[![](https://learn.codethedream.org/wp-content/uploads/2023/02/Screenshot-2023-02-25-at-11.33.36-PM.png)](https://learn.codethedream.org/wp-content/uploads/2023/02/Screenshot-2023-02-25-at-11.33.36-PM.png)

So we try byebug, as described below.

## New In Rails 3.1 and Later: Debug

There is now a new debugger, called debug. You can do all the same things as youhcould do with byebug, but with some changes to how things are done. Eventually you should adopt the new one. But, you can also continue to use byebug — except that you have to add it to the Gemfile, which has been done for you in this lesson.

## Byebug

According to the error message, the problem occurs in line 67 of app/controllers/customers_controller.rb. So, with our editor, we add a line that says just:

```
byebug
```

right before the failing line in that file (right after def set_customer). Then we re-run the server, and go to the /customers/567 url to duplicate the error. The browser will appear to hang waiting on the server.

Go to your command line session where you are running the server console. You will see something like this:

![](https://lh5.googleusercontent.com/ooOl1R4qpQGP1y-eY1_eOjFPL0aOtoiWiKvOgbrUxnPzzk0AWYTGZcgT1YXgX3ZO-waWK6SrNqJOKBA8KlzYUs0q3OCuMBuBRQm_J9PXgzas6KPRGe6o7g-sobSxaGZNukvNES8pwio)

## At the Byebug Prompt

You can now type into the server console session, and you can do anything you could do from the rails console, plus byebug commands. In particular, you can look at the value of variables. Type this:

```
params
```

And it will show you the value of the parameters passed to the controller. In particular, it will show “id”=>”567”. Now type:

```
Customer.all
```

and it will show you a list of the customer records you created. None of them have id 567, so that is the reason for the error. Type c and hit enter. This will allow the server to continue.

## Comments on Byebug

This is a very short introduction to byebug. In practice, if you are developing a real application, you will have bugs. To fix them, you will use byebug a lot! It’s a good idea to practice with it, by putting byebug statements at various points in the code and experimenting with what you can see. There are byebug cheatsheets on the web. You can even put byebug statements in your erb files, by adding this line:

```
<% byebug %>
```

It would be a good idea to learn more about byebug than is described in this short lesson. Here is a tutorial: <https://www.sitepoint.com/the-ins-and-outs-of-debugging-ruby-with-byebug/> This is not a required part of the assignment, but it may help you learn byebug. (Note: this tutorial has a sample project you can clone, but because it has old packages you will have to do a bundle update to get it to run.) Another good tutorial on byebug is here: [https://medium.com/le-wagon-tokyo/debugging-with-byebug-gem-6a47b2a210bb ](https://medium.com/le-wagon-tokyo/debugging-with-byebug-gem-6a47b2a210bb). You should now be familiar with the following command line tools: irb, which is the ruby interactive runtime; and bin/rails console, which is the rails console. Everything you can do from the rails console is can also be done in a byebug session.

Be sure to take all byebug statements out of the code before you push it to production! If the server does hit a byebug statement it will hang at that point.
