---
layout: "../../layouts/genericMarkdownFile.astro"
title: "More REST APIs"
description: "imported from WordPress,More REST APIs"
---

# More REST APIs

In the previous part of the lesson, we implemented REST authentication using JWT tokens. Of course, when building an API, you do more than authenticate. In this part of the lesson we will add some additional APIs for CRUD operations. Create a new branch called more-rest for this part of the assignment.

## Models

First, create your models. WIthin the repository directory, you do the following commands:

```
bin/rails generate model Member first_name:string last_name:string
bin/rails generate model Fact member:references fact_text:string likes:integer
```

There is a one-to-many relationship between member and facts. Next you edit the model files. The file app/models/member.rb should look like this:

```
class Member < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  has_many :facts
end
```

And app/models/fact.rb should look like this:

```
class Fact < ApplicationRecord
  validates :fact_text, presence: true
  validates :likes, presence: true
  validates :member_id, presence: true
  validates_associated :member
  belongs_to :member
end
```

Note that you have validations, just as in Rails UI applications with views. Next, you set up the development and test databases as follows:

```
bin/rails db:migrate
bin/rails db:migrate RAILS_ENV=test
```

## Controllers

Now, you set up your controllers. We are going to set them up with a route namespace, that includes a version number for the API. This is best practice, as your API may change over time.

```
bin/rails g controller api/v1/Members
bin/rails g controller api/v1/Facts
```

Next you set up your routes. You should add the following section to yourconfig/routes.rb file:

```
  namespace :api do
    namespace :v1 do
      resources :members do
        resources :facts
      end
    end
  end
```

These routes are similar to what you have used before, with the exception that you are using route namespaces to separate them out. The routes for facts are nested within the member routes, corresponding to the one-to-many association between members and facts.

## Adding Application Logic

Your application logic goes in your controllers. Because this is an API, there are no files corresponding to views. When a request comes in, the response will always render json, to send the responses in json format back to the caller. In other respects, the processing is much as in Rails UI applications. The HTTP status code returned will be, by default, 200, but there are other status codes that are appropriate sometimes. For example, 201 means resource created, and the 400 series codes imply a client side error. We will require authentication for access to these controller operations, so we need to include AuthenticationCheck and call is_user_logged_in. This is an unfinished version of your app/controllers/api/v1/members_controller.rb file:

```
class Api::V1::MembersController < ApplicationController
  include AuthenticationCheck

  before_action :is_user_logged_in
  before_action :set_member, only: [:show, :update, :destroy]

  # GET /members
  def index
    @members = Member.all
    render json: @members
  end

  # GET /members/:id
  def show
    # your code goes here
  end

  # POST /members
  def create
    @member = Member.new(member_params)
    if @member.save
      render json: @member, status: 201
    else
      render json: { error:
        "Unable to create member: #{@member.errors.full_messages.to_sentence}"},
        status: 400
    end
  end

  # PUT /members/:id
  def update
    # your code godes here
  end

  # DELETE /members/:id
  def destroy
    @member.destroy
    render json: { message: 'Member record successfully deleted.'}, status: 200
  end

  private

  def member_params
    params.require(:member).permit(:first_name, :last_name)
  end

  def set_member
    @member = Member.find(params[:id])
  end

end
```

You will have to complete the update and show methods yourself.. Include error handling! For the app/controllers/api/v1/facts_controller.rb file, you can use the following outline, but most of the methods you will have to complete yourself.

```
class Api::V1::FactsController < ApplicationController
  include AuthenticationCheck

  before_action :is_user_logged_in
  before_action :set_fact, only: [:show, :update, :destroy]

  # GET /members/:member_id/facts
  def index
    @member = Member.find(params[:member_id])
    render json: @member.facts # note that because the facts route is nested inside members
                             # we return only the facts belonging to that member
  end

  # GET /members/:member_id/facts/:id
  def show
    # your code goes here
  end

  # POST /members/:member_id/facts
  def create
     @member = Member.find(params[:member_id])
    @fact = @member.facts.new(fact_params)
    if @fact.save
      render json: @fact, status: 201
    else
      render json: { error:
"The fact entry could not be created. #{@fact.errors.full_messages.to_sentence}"},
      status: 400
    end
  end

  # PUT /members/:member_id/facts/:id
  def update
    # your code goes here
  end

  # DELETE /members/:member_id/facts/:id
  def destroy
    # your code goes here
  end

  private

  def fact_params
    params.require(:fact).permit(:fact_text, :likes)
  end

  def set_fact
    @fact = Fact.find(params[:id])
  end

end
```

## Exception Handling

The client application may send some bad json, or specify the id of a user or fact that does not exist. You need to catch those errors and return an appropriate error message and HTTP result code to the calling client application. This is done by creating an exception handler module, which is app/controllers/concerns/exception_handler.rb:

```
# app/controllers/concerns/exception_handler.rb
module ExceptionHandler
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      render json: { error: e.message }, status: :not_found
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      render json: { error: e.message }, status: :unprocessable_entity
    end

    rescue_from ActionController::ParameterMissing do |e|
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end
end

```

Then add this line to app/controllers/application_controller.rb, just before the end statement:

```
  include ExceptionHandler
```

## Testing Your Code Using Curl

The curl tool will send json to the URL you specify, and will also report back the json it receives. You can send the following commands, to see what happens. First, start the server using

```
bin/rails s
```

And then try REST requests to that server, using curl. You will need a second command line for this. If you are running vagrant, that is another git bash session in which you have run vagrant ssh. Note that we need authentication, so we pass as a header the contents of authheader.txt, which was created in the previous part of the lesson.

```
curl -XGET -H @authheader.txt -H "Content-Type: application/json" http://localhost:3000/api/v1/members

curl -XPOST -H @authheader.txt -H "Content-Type: application/json" -d '{ "first_name": "Fred", "last_name": "James" }' http://localhost:3000/api/v1/members

curl -XPOST -H @authheader.txt -H "Content-Type: application/json" -d '{ "first_name": "Mary", "last_name": "Jones" }' http://localhost:3000/api/v1/members

curl -XGET -H @authheader.txt -H "Content-Type: application/json" http://localhost:3000/api/v1/members

curl -XGET -H @authheader.txt -H "Content-Type: application/json" http://localhost:3000/api/v1/members/1

curl -XPOST -H @authheader.txt -H "Content-Type: application/json" -d '{ "fact_text": "This is a new fact.", "likes": 6 }' http://localhost:3000/api/v1/members/1/facts

curl -XGET -H @authheader.txt -H "Content-Type: application/json" http://localhost:3000/api/v1/members/1/facts
```

You should try PUT and DELETE requests as well. In the above, you may not have a member with id 1, so you would have to change 1 to the id of some member you do have. You should also try a curl command without sending authheader..txt, to see that you get a message back that you are not authenticated.

Once you get this far, stop the server, commit your changes, push them to github, and open a pull request. We will do the next steps in a new branch called swagger. After you have pushed your changes, while the more-rest branch is active, create a swagger branch from the more-rest branch.
