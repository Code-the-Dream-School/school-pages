---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Styling Your Rails 7 Application with Bootstrap"
description: "imported from WordPress,Styling Your Rails 7 Application with Bootstrap"
---

# Styling Your Rails 7 Application with Bootstrap

To create attractive web applications, it is necessary to apply styling. You may have taken a previous course on HTML and CSS, and you have watched the Treehouse video on the Bootstrap CSS styling classes. In this lesson, you will use Bootstrap classes to style the application you have created. This lesson builds on the previous ones. You will use the same github repository, R7-validations, but for this lesson, you should create a new branch called bootstrap. Make sure that the full-assignment branch is active when you create the bootstrap branch, so that your work adds to what you did before.

## Configuration

The R7-validations starter repository was built to include Bootstrap 5.2.3\. There are several ways to add Bootstrap to the Rails environment. In this case, the following command was used to generate the starter:

```
rails new R7-validations -j esbuild --css bootstrap
```

Next, Fontawesome was added. This tool provides glyphs, which are little icons you can add to improve the appearance of the application. The steps, which have already been done for you for the R7-validations repository, are as follows. First, the following commands were done:

```
yarn add sass
yarn add @fortawesome/fontawesome-free

```

Then, the following lines were added to the master stylesheet file, which in this case is app/assets/stylesheets/application.bootstrap.scss:

```
$fa-font-path: "./webfonts";

@import "@fortawesome/fontawesome-free/scss/regular";
@import "@fortawesome/fontawesome-free/scss/brands";
@import "@fortawesome/fontawesome-free/scss/solid";
@import "@fortawesome/fontawesome-free/scss/fontawesome";
```

Next, we modified package.json. There is a script in that file called build:css. The following command was added to the front of that script:

```
cp -r ./node_modules/@fortawesome/fontawesome-free/webfonts ./app/assets/builds &&
```

Again, you don’t have to do any of the above — the R7-validations repository is already set up with this.

## Adding a Custom Font

You need to add a custom font. Fonts can be downloaded from various web sites, such as https://www.dafont.com. Pick one that you like, and unzip the package (but not inside of your R7-validations repository). Then, within the R7-validations repository, create the app/assets/fonts directory. Next, add the following line to config/application.rb:

```
config.assets.paths << Rails.root.join('app', 'assets', 'fonts')
```

Then copy the font files to the app/assets/fonts directory. Finally, add the following lines to app/assets/stylesheets/application.bootstrap.scss:

```
@font-face {
    font-family: 'Carnivalee';
    src: url('Carnevalee Freakshow.ttf');
 }
 h1 {
    font-family: 'Carnivalee';
  }
```

Except, of course, you have to use the name of the font file and font family you downloaded. The above lines should make all the h1 entries in your pages to have the custom font.

Finally, stop the server, if it is running, and enter the following commands:

```
bin/rails assets:clobber
bin/rails assets:precompile
```

This is necessary so that your assets are processed by the Rails asset pipeline. When you add an image or other asset to the assets folder, you may need to stop the server, enter the commands above, and restart the server.

## Using Bootstrap For Styling

Copy this section into the application.html.erb:

```
    <% if flash[:alert].present? %>
      <p class="my_alert"><%= flash[:alert] %></p>
    <% end %>
```

You want it just below the body tag. When you add the banner div and the navbar, this section will be after the jumbotron but before the navbar.

Edit app/views/layouts/application.html.erb. You are going to add a banner div and a navbar. The banner div should have the following value for the class: “mt-4 p-5 bg-primary text-white rounded”. (This combination is a replacement for the jumbotron class in Bootstrap 4, which is no longer provided in Bootstrap 5.) You should put text inside this div; you choose the wording. The navbar should have two pulldown menus, one for Customers and one for Orders. The items in the Customers pulldown should be List Customers and New Customer. The items in the Orders pulldown should be List Orders and New Order. Each should link to pages you already have. The Bootstrap navbar is documented here: [https://getbootstrap.com/docs/5.2/components/navbar/](https://getbootstrap.com/docs/5.3/components/navbar/) , and the Bootstrap navbar was covered in the Treehouse video. Choose a contrasting color for your navbar. I find navbars confusing, so you can use this cheatsheet:

```
   <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="container-fluid mb-0">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Customers
            </a>
            <ul class="dropdown-menu">
              <li><%= link_to 'List Customers', customers_path, class: "dropdown-item" %></li>
              <li><%= link_to 'New Customer', new_customer_path, class: "dropdown-item" %></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Orders
            </a>
            <ul class="dropdown-menu">
              <li><%= link_to 'List Orders', orders_path, class: "dropdown-item" %></li>
              <li><%= link_to 'New Order', new_order_path, class: "dropdown-item" %></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
```

In your various views, you have links and submit buttons. These should all be styled to look like Bootstrap buttons. This is done by adding the classes “btn btn-primary” to your link_to and form.submit form items. For example, the link to show a customer should look like:

```
<%= link_to 'Show', person, class: "btn btn-primary" %>
```

Give your table the Bootstrap “table” class.

Put the contents of each “show” page into a Bootstrap card, which is a div with the “card” class. The card class is described here: [https://getbootstrap.com/docs/5.](https://getbootstrap.com/docs/5.2/components/card/)[2](https://getbootstrap.com/docs/5.2/components/card/)[/components/card/](https://getbootstrap.com/docs/5.2/components/card/) You should create a shadow around the card to make it look nice, as per:

```
<div class="card shadow p-3 mb-5 bg-white rounded">
```

## Adding Fontawesome Icons

Add Fontawesome Icons somewhere in your views. For example, each row in a table could start with an additional column for the icon. Here is an example of an entry for an icon:

```
<i class="far fa-address-book"></i>
```

The icons you have to choose from are **[here.](https://fontawesome.com/search?m=free&o=r)**

## Creating Your Own Styles

You may want to create styles that are not part of the Bootstrap set, or to override the styles in Bootstrap. In particular, you need to create a style for your banner background as described below. To create a custom style, you edit app/assets/stylesheets/application.bootstrap.scss. (In an scss file, you can use the usual CSS syntax, plus Sass, which is a superset. Sass is beyond the scope of this course, but it has macros like @include.)

## Adding an Image

You can add a jpeg or png file as an image. There are plenty of free ones on the Internet. The image file should be stored in app/assets/images. You can then create a class that, when applied to a given div such as the banner div, will load the image in the background. For example, in your app/assets/stylesheets/application.bootstrap.scss, you could define this class:

```
.banner-background {
  background-image: url('miscpng.png');
  background-size: cover;
}
```

Style your banner div with the image you choose. Style it also with the custom font you choose. You may need to do the assets clobber and precompile, as described above, to get your image included in the Rails asset pipeline.

## Completing your Styling and Submitting

You may want to do other styling to make your application look good. The views you create with Rails support all the standard HTML and CSS styling techniques. When you are through with these steps, push the bootstrap branch to github as usual, create your pull request, and submit your assignment.
