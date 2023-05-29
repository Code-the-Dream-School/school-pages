---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Documenting REST APIs with Swagger"
description: "imported from WordPress,Documenting REST APIs with Swagger"
---

# Documenting REST APIs with Swagger

When you create a REST API, you also need (a) an automated way to test the API, something easier than curl, and (b) a way to document the API, so that implementers of front end applications that call the API can know how to call it. RSpec may be used to test APIs as well as to test Rails UI applications. The standard and best way to document the API is to create a special user interface for it called Swagger.

We will create a partial set of RSpec tests. These tests will be of a particular format, so that they can be used to generate the Swagger UI.

## Setting Up for Rspec and Swagger

Add the following lines to your Gemfile:

First, in the section before the group :development, :test line, add these lines to get the swagger gem:

```
gem 'rspec-rails'
gem 'rexml'
gem 'rswag'
```

The rswag line is to add the swagger gem. Then, add a group :test section to your Gemfile, near the bottom, which should look like:

```
group :test do
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'rails-controller-testing'
end
```

When all of these changes have been made, do a bundle install to load the new gems. Then, complete the installation of the rswag and rspec-rails gems with these commands:

```
bin/rails generate rspec:install
bin/rails generate rswag:install
```

## Factories and RSpec Tests

You will need FactoryBot factories for test user, member, and fact entries. Create spec/factories/users.rb as follows:

```
require 'faker'

FactoryBot.define do
  factory :user do |f|
    f.email { Faker::Internet.email }
    f.password { Faker::Internet.password }
  end
end
```

Create also spec/factories/members.rb as follows:

```
require 'faker'

FactoryBot.define do
  factory :member do |f|
    f.first_name { Faker::Name.name }
    f.last_name { Faker::Lorem.word }
  end
end
```

Create also spec/factories/facts.rb as follows:

```
FactoryBot.define do
  factory :fact do
    fact_text { Faker::ChuckNorris.fact }
    likes { Faker::Number.number(digits: 3).to_i }
    association :member
  end
end
```

## Creating the Rspec Tests

We need to create tests for each of the controllers. First, create spec/requests/registrations_spec.rb, as follows:

```
require 'swagger_helper'

RSpec.describe 'user/registrations', type: :request do
  path '/users' do
    post 'create user' do
      tags 'Registrations'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, required: true, schema: {
        type: :object,
        required: %i[email password],
        properties: { user: { properties: {
          email: { type: :string },
          password: { type: :string }
        }}}
      }
      response(201, 'successful') do
        let(:user1) { FactoryBot.attributes_for(:user) }
        let(:user) do
          { user: {
              email: user1[:email],
              password: user1[:password]
          }}
        end
        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end
  end
end
```

The swagger gem is here introducing some domain specific language into rspec. This is done so that the Swagger UI can be generated from the rspec tests. You have a series of path statements corresponding to your rails routes, and get/post/put/patch/delete statements also corresponding to the routes. We also specify the parameters and their types. We are just testing that a valid return code and json body comes back. Good rspec testing would add a number of expect statements to make sure the body is valid, and additional test cases would be provided for invalid data. So what we have is too limited to be a comprehensive test, but it suffices to generate swagger code. (By the way, the swagger gem has the capability to generate an outline for these test files — unfortunately there is a bug in that function so we avoid it for now.)

We also need tests for the sessions controller. We will need to enable authentication for some of these tests. There are helper routines in Devise JWT to facilitate this. To have access to these helper routines, add the following line to the top of spec/spec_helper.rb:

```
require 'devise/jwt/test_helpers'
```

Create spec/requests/sessions_spec.rb as follows:

```
require 'swagger_helper'

describe 'sessions API' do
  #Creates swagger for documentaion for login
  path '/users/sign_in' do

    post 'Creates a session' do
      let(:user1) { FactoryBot.create(:user) }
      tags 'sessions'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, required: true, schema: {
        type: :object,
        properties: { user: { properties: {
          email: { type: :string },
          password: { type: :string}
        }}},
        required: [ 'email', 'password' ]
      }

      response '201', 'session jwt token created' do
        let(:user) do
          { user: {
              email: user1.email,
              password: user1.password
          }}
        end
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:user) do
          { user: {
              email: user1.email,
              password: ""
          } }
        end
        run_test!
      end
    end
  end

#Swagger documentation for logout.
  path '/users/sign_out' do

    delete 'Destroy JWT token' do
      let(:user) { FactoryBot.create(:user) }
      let (:auth_header) {"Bearer "+Warden::JWTAuth::UserEncoder.new.call(user, :user,nil)[0]}
      tags 'sessions'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
      #This includes a valid auth token header
        response '200', 'blacklist token' do
          let(:"Authorization") {auth_header}
          run_test!
        end
        #This does not include anything in the header so it fails
      response '401', 'no token to blacklist' do
        let(:"Authorization") {}
        run_test!
      end
    end
  end
end
```

By creating the test for the sessions controller, we provide a means for the user to log on using the Swagger interface. We also document logout. For logout it is necessary that the user be authenticated. So we have to create a user, and then a token associated with that user. That is done with the lines

```
   let(:user) { FactoryBot.create(:user) }
      let (:auth_header) {"Bearer "+Warden::JWTAuth::UserEncoder.new.call(user, :user,nil)[0]}
```

To have access to the JWTAuth helper that creates the token, we have to require the jwt test helpers, as per the second line in this file. We also have to tell swagger that authentication is needed for this API. That is done with the line:

```
      security [Bearer: {}]
```

Next we create a test for the members controller, and for each of the methods within that controller. Every method within the members controller requires authentication. Create spec/requests/api/v1/members_spec.rb as follows:

```
require 'swagger_helper'

RSpec.describe 'api/v1/members', type: :request do
  let(:user1) { FactoryBot.create(:user) }
  let (:token){Warden::JWTAuth::UserEncoder.new.call(user1,:user,nil)}
  let(:Authorization){ "Bearer "+ token[0]}
  let!(:members) { FactoryBot.create_list(:member, 10) }
  let(:member_id) { members.first.id }

  path '/api/v1/members' do

    get('list members') do
      tags 'Members'
      produces 'application/json'
      security [Bearer: {}]
      response(200, 'successful') do
        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    post('create member') do
      tags 'Members'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
      parameter name: :member, in: :body, required: true, schema: {
        type: :object,
        required: %i[first_name last_name],
        properties: {
          first_name: { type: :string },
          last_name: { type: :string }
        }
      }

      response(201, 'successful') do
        let(:member) { { first_name: "jqpublic23", last_name: "mypasswd"}}

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end
  end

  path '/api/v1/members/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show member') do
      tags 'Members'
      security [Bearer: {}]
      response(200, 'successful') do
        let(:id) { member_id }

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    patch('update member') do
      tags 'Members'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
      parameter name: :member, in: :body, schema: {
        type: :object,
        properties: {
          first_name: { type: :string },
          last_name: { type: :string }
        }
      }
      response(200, 'successful') do
        let(:id) { member_id }
        let(:member) {{first_name: 'fred'}}
        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    put('update member') do
      tags 'Members'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
      parameter name: :member, in: :body, schema: {
        type: :object,
        properties: {
          first_name: { type: :string },
          last_name: { type: :string }
        }
      }
      response(200, 'successful') do
        let(:id) { member_id }
        let(:member) {{first_name: 'fred'}}

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    delete('delete member') do
      tags 'Members'
      security [Bearer: {}]
      response(200, 'successful') do
        let(:id) { member_id }

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end
  end
end
```

Finally, we create the test file for facts, as spec/requests/api/v1/facts_spec.rb;

```
require 'swagger_helper'

RSpec.describe 'api/v1/facts', type: :request do
  # Initialize the test data
  let(:user1) { FactoryBot.create(:user) }
  let (:token){Warden::JWTAuth::UserEncoder.new.call(user1,:user,nil)}
  let(:Authorization){ "Bearer "+ token[0]}

  let!(:member) { FactoryBot.create(:member) }
  let!(:facts) { FactoryBot.create_list(:fact, 20, member_id: member.id) }
  let(:member_id) { member.id }
  let(:fact_id) { facts.first.id }

  path '/api/v1/members/{member_id}/facts' do
    parameter name: 'member_id', in: :path, type: :string, description: 'member_id'

    get('list facts') do
      tags 'Facts'
      security [Bearer: {}]
      response(200, 'successful') do

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    post('create fact') do
      tags 'Facts'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
      parameter name: :fact, in: :body, required: true, schema: {
        type: :object,
        required: %i[fact_text likes],
        properties: {
          fact_text: {type: :string},
          likes: {type: :integer}
        }
      }
      response(201, 'successful') do
        let(:fact) { { fact_text: "This is a fact.", likes: 15} }

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end
  end

  path '/api/v1/members/{member_id}/facts/{fact_id}' do
    parameter name: 'member_id', in: :path, type: :string, description: 'member_id'
    parameter name: 'fact_id', in: :path, type: :string, description: 'id'

    get('show fact') do
      tags 'Facts'
      security [Bearer: {}]
      response(200, 'successful') do

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    patch('update fact') do
      tags 'Facts'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
      parameter name: :fact, in: :body, required: true, schema: {
        type: :object,
        properties: {
          fact_text: {type: :string},
          likes: {type: :integer}
        }
      }
      response(200, 'successful') do
        let(:fact) { {fact_text: "This is another fact."}}

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    put('update fact') do
      tags 'Facts'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
          parameter name: :fact, in: :body, required: true, schema: {
        type: :object,
        properties: {
          fact_text: {type: :string},
          likes: {type: :integer}
        }
      }
      response(200, 'successful') do
        let(:fact) {{ fact_text: "This is another fact." }}

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    delete('delete fact') do
      tags 'Facts'
      security [Bearer: {}]
      response(200, 'successful') do

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end
  end
end
```

Edit spec/swagger_helper.rb to read as follows:

```
# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.swagger_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under swagger_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a swagger_doc tag to the
  # the root example_group in your specs, e.g. describe '...', swagger_doc: 'v2/swagger.json'
  config.swagger_docs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'API V1',
        version: 'v1'
      },
      paths: {},
      components: {
        securitySchemes: {
          Bearer: {
            description: "Bearer token",
            type: :apiKey,
            name: 'Authorization',
            in: :header
          }
        }
      },
      servers: [
        {
          url: "#{ENV['APPLICATION_URL']}"
        }
      ]
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The swagger_docs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.swagger_format = :yaml
end
```

You are really only changing two sections. You are changing the server section so that the swagger UI has the right URL, and you are also specifying what kind of authentication is to be used in the securitySchemes section.

Now run rspec. It should complete without errors. If not, you may have problems in your controller logic.

## Creating the Swagger UI

Type:

```
bundle exec rake rswag:specs:swaggerize
```

Then start your server as usual. You will find that you have a new route, so that you can, from your browser, access http://localhost:3000/api-docs . Experiment with this page, using the registrations section to create users and using the sessions section to log on.

You will find that the logoff as well as all of the sections for members and facts don’t appear to work. They always return a 401 for unauthorized. You can set up authentication for these operations as follows. First, do a logon for a user you have created. You will see it returns a response with an Authorization header. Copy the contents of the Authorization header, which starts with Bearer and continues with a log string of characters, that being the JWT token, something like:

```
Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjI5NDc0NzM1LCJleHAiOjE2Mjk0NzgzMzUsImp0aSI6IjA2MWZmNDQxLTA2NmQtNDAwZS1hZDk4LWM4MWEyYThiMzgzMSJ9.HP3bz_xDEd8_00MfG2ZNR61afUXf-YujinwSdExmkig
```

You won’t be able to use the token above, because it wasn’t generated by your server, but you can use the token returned by the logon operation. Now scroll to the top of the swagger page. You will see a button with Authorize and a lock icon. Click on it. It will open a little dialog box prompting you for the value. Paste in the Authorization header you copied, and then click on authorize and then on close. Verify that you can now do the member and facts operations on the swagger page.

When you have verified that each of the operations on the swagger page works, you have completed the lesson. Use git to add, commit, and push your changes to the swagger branch, and then create a pull request as usual.
