---
layout: "../../layouts/genericMarkdownFile.astro"
title: "REST Introduction and Authentication"
description: "imported from WordPress,REST Introduction and Authentication"
---

# REST Introduction and Authentication

We are going to create an API that communicates using REST protocols, and that exchanges JSON data. It’s a good idea to understand what REST is:

<https://dzone.com/articles/introduction-to-rest-api-restful-web-services>

And also, you will want to understand JSON:

## Creating the API Server Application

A starter Rails application for the API Server has been created for you in the git repository **[here.](https://github.com/Code-the-Dream-School/R7-rest)** You do NOT need to do the command to create the application. You only need to fork and clone the repository as usual. After you have cloned the repository, cd to the repository directory and create a branch called rest-authentication. This is where you will put the first part of your assignment.

The command we used to create this workspace was:

```
rails new rest-rails --api -T
```

Note the –api parameter. This Rails application loads a subset of Rails. You can’t render views with it, but you can send and receive JSON documents, as we will see. The following section on authentication was borrowed, with some edits, from a tutorial by GreekDataGuy **[here.](https://medium.com/ruby-daily/a-devise-jwt-tutorial-for-authenticating-users-in-ruby-on-rails-ca214898318e)**

## Initial Setup

You will need some additional gems. Add the following to your Gemfile. These settings should be added before the group development, test section.

```
gem 'devise'
gem 'devise-jwt'
```

Then do a bundle install.

Next we set up devise. Devise is a gem that enables authentication, and we are using it in combination with devise-jwt, which allows the creation of json web tokens as credentials. Enter the following commands:

```
bin/rails g devise:install
bin/rails g devise User
bin/rails db:migrate
```

Update the app/models/user.rb file as follows:

```
class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true

  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         jwt_revocation_strategy: JwtDenylist
end
```

One of the problems with JWT token authentication is logoff. In order to enable logoff, we have to invalidate the token, and one means of doing that is to create a list of revoked tokens. Create another model file called app/models/jwt_denylist.rb and paste in the following.

```
class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist

  self.table_name = 'jwt_denylist'
end
```

Next, create a migration for the jwt_denylist table:

```
rails g migration CreateJwtDenylist
```

The migration file you have created, in db/migrate, should be edited to match this:

```
class CreateJwtDenylist < ActiveRecord::Migration[6.1]
  def change
    create_table :jwt_denylist do |t|
      t.string :jti, null: false
      t.datetime :exp, null: false
    end
    add_index :jwt_denylist, :jti
  end
end
```

Then run the migration.

```
bin/rails db:migrate
```

This completes the initial setup.

## Creating Controllers

We need three controllers, one for user registration, one for session management, and one for testing logon. So, enter the following commands:

```
bin/rails g controller users/Registrations
bin/rails g controller users/Sessions
bin/rails g controller test
```

Edit app/controllers/users/registrations_controller.rb, to match the following:

```
class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: { message: 'Signed up sucessfully.' }, status: :created
  end

  def register_failed
    render json: { message: "Something went wrong." }, status: :bad_request
  end
end
```

It is not really obvious what this controller does, but it overrides the Devise controller to handle JSON responses. The same is true of app/controllers/users/sessions_controller.rb, which should be changed to match this:

```
class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if !resource.id.nil?
      response.set_header('Access-Control-Expose-Headers','authorization')
      render json: { message: 'You are logged in.' }, status: :created
    else
      render json: { message: 'Authentication failed.'}, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: { message: "You are logged out." }, status: :ok
  end

  def log_out_failure
    render json: { message: "Hmm nothing happened."}, status: :unauthorized
  end
end
```

In general, REST operations other than registration and logon require authentication. So we need a method to verify that a user has been authenticated. We create that method in a new file you should create, app/controllers/concerns/authentication_check.rb, as follows:

```
module AuthenticationCheck
  extend ActiveSupport::Concern

  def is_user_logged_in
    if current_user.nil?
      render json: { message: "No user is authenticated." },
        status: :unauthorized
    end
  end
end
```

This is the standard way of creating a method that will be accessible to a variety of controllers. Now edit app/controllers/test_controller.rb to match the following. You will see that it calls the method is_user_logged_in.

```
class TestController < ApplicationController
  include AuthenticationCheck

  before_action :is_user_logged_in

  def show
    render json: { message: "If you see this, you're logged in!" },
      status: :ok
  end
end
```

This is just a test controller to verify that login works.

## The Devise JWT Secret Key

In JWT based authentication, the tokens are digitally signed. To make these signatures secure, we need a secret key. We can’t put this key in the code, because then it would be stored in github. Rails has a means of storing secret keys in encrypted form. We will create the secret and store it in an encrypted credentials file. The procedure is a little clumsy, because the credentials file can only be edited with a text mode editor, such as, in this case, vi.

Generate the secret with:

```
bin/rake secret
```

This will give a very long string of gobbledygook. Copy the string to the clipboard. Then open the credentials file with this command:

```
EDITOR=vi rails credentials:edit
```

Here, you may get a message:

```
Couldn't decrypt config/credentials.yml.enc. Perhaps you passed the wrong key?
```

If you see this message (this is likely) just delete config/credentials.yml.enc and repeat the previous command so that you can edit this file.

You next type i to get vi into insert mode. Then, using the arrow keys, move the cursor to the first line after the end of the file, and type in:

```
devise:
  jwt_secret_key: <rake secret key>
```

Where the rake secret key is pasted in from the clipboard. This is a yml file, so careful indentation is important. Then press esc to get out of insert mode and type :wq and press enter. This will save the encrypted file. When you get done, run the rails console, and type

```
Rails.application.credentials.devise
```

It should show you the secret, with a key of jwt_secret_key. If it does not, repeat the steps above. Do not do the next step until you have the secret key set up correctly.

Edit config/initializers/devise.rb to point devise to the encrypted secret we will create. The following lines should be added to the config block:

```
config.jwt do |jwt|
  jwt.secret = Rails.application.credentials.devise[:jwt_secret_key]
end
```

## Adding Routes

Now we need to configure routes for the controllers that have been created. config/routes.rb should be edited to match the following:

```
Rails.application.routes.draw do
  devise_for :users,
             controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'
             }
  get '/test', to: 'test#show'
end
```

## Testing the REST Server with Curl

We are now ready to start the REST server. Typically the server would be called by a separate front end process, written in a framework such as React. We will create such a front end, just using Rails, in a future lesson. However, we can test without the front end using a Linux utility called curl, which sends HTTP requests to a specified target.

Start the server as usual. Then try the following curl commands. You will need a separate command shell to send the commands. If you are using vagrant, this will be a separate vagrant ssh session. Your separate command session should be in a directory that is not part of a git project, as we are going to create some temporary files.

We will first try to access the test controller without being authenticated, using the following command:

```
curl -XGET -H "Content-Type: application/json" http://localhost:3000/test
```

This will fail. It will return the 401 unauthorized return code, with a message that no user has been authenticated. Next, register a user with this command:

```
curl -XPOST -H "Content-Type: application/json" -d '{ "user": { "email": "test@example.com", "password": "12345678" } }' http://localhost:3000/users
```

You should see a message come back that the user was signed up successfully.

Now, log in with the following command:

```
curl -XPOST -D headers.txt -H "Content-Type: application/json" -d '{ "user": { "email": "test@example.com", "password": "12345678" } }' http://localhost:3000/users/sign_in
```

You should see a message that you are logged in. With JWT authentication, the authentication token is returned as a Bearer token in the Authorization header. The option -D header.txt in the curl command writes the returned headers to the file header.txt. Display this file using this command:

```
cat headers.txt
```

You will see a number of headers, including the authorization header. We want to include the authorization header in subsequent curl requests, so that they are authenticated. Use this command to separate out the authorization header:

```
grep Authorization headers.txt >authheader.txt
```

Now you can retry access to the test controller as follows:

```
curl -XGET -H @authheader.txt -H "Content-Type: application/json" http://localhost:3000/test
```

If all is working correctly, you should see a message that tells you you are in. If this does not work, retrace your steps to see what is wrong.

You can also log out, invalidating the JWT token, with this command:

```
curl -XDELETE -H @authheader.txt -H "Content-Type: application/json" http://localhost:3000/users/sign_out
```

## Submitting Your Work

Once you have this working, do git add, commit, and push of your rest-authentication branch, and then submit your pull request as usual. In the next section, we will add additional REST operations.
