---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Rails Comprehensive Assignment"
description: "imported from WordPress,Rails Comprehensive Assignment"
---

# Rails Comprehensive Assignment

In this assignment, we put all of the skills together. This assignment is intended to check whether you have learned the basic concepts of Rails development. For each part, there are examples in the blog application or in subsequent lessons, so you should be able to copy/paste into your new code, with changes to make everything work.

## Git Setup

We are going to continue to use the git repository from the last lesson, but we will also use a new git branch for this. For your current branch, make sure you have committed all your changes and pushed them to github. Make sure that the rspec branch is active, so that you have all the changes from that branch. Then do the following commands:

```
git checkout -b full-assignment
git push -u origin full-assignment

```

## Specifications for the Assignment

1. Within the customer-order application, create a new model called Order. This will have attributes called product_name (string), product_count (integer), and customer_id (integer). Each order will belong to a customer. The customer_id field is generated with customer:references — see the generate model command in the following paragraph..
2. Create a new set of routes to manage CRUD operations for the orders resource. Do not nest these routes under customer.
3. Create an OrdersController. Add methods for index, show, new, edit, create, update, and destroy. These will be similar to the methods in other controllers you have seen.
4. Create views (html.erb files) for orders: edit, index, new, and show. These should be similar to the views for customer. edit and new should share a partial form.
5. The new/edit form for the order should have a drop down list of customers to choose from when creating or updating an order, as well as fields for product_name and product_count.
6. The controller should include error handling.
7. Change the show view for the customer, so that if that customer has orders, a list of them are shown in a table at the bottom, with show/update/delete links. You will need to add the appropriate has_many line to the customer model. To create this table, you can follow an example: the index view from the rails5 directory R7-blog repository. Be sure you only show the orders associated with the customer, not all orders.
8. Add validations to the order model so that validates that a product_name, product_count, and customer are present, and so that it checks that the customer_id actually corresponds to a real customer record.
9. Create model tests for the order model, to make sure that each of the validations works correctly.
10. Create request tests for the order controller, to make sure that each of the methods works correctly.

Use the following commands to get started:

```
bin/rails generate model Order product_name:string product_count:integer customer:references
bin/rails db:migrate
bin/rails generate controller orders
```

Before you run rspec, you have to migrate the test database:

```
bin/rails db:migrate db:test:prepare
```

## A Few New Ideas

In your Order model, to validate that the customer_id in the order actually points to an existing customer record, you will need the line:

```
validates_associated :customer
```

To create the dropdown list for choosing the customer for the order, you can use this line:

```
<%= f.collection_select :customer_id, Customer.all, :id, :full_name, include_blank: true %>
```

In the rspec test for the order model, you can set up the subject with this line:

```
subject { Order.new( product_name: "gears", product_count: 7, customer: FactoryBot.create(:customer))}
```

In the rspec test for the order controller, you will need a factory that generates an order. But as each order belongs to a customer, the factory has to create the customer object too. To do this, FactoryBot uses the association method:

```
FactoryBot.define do
  factory :order do
    product_name { Faker::Lorem.word }
    product_count { Faker::Number.number(digits: 3).to_i }
    association :customer
  end
end
```

The key point here is the use of association. Now, we can do order = FactoryBot.create(:order) and it will create an order for us and store it in the database, creating the necessary customer object as well. Unfortunately, that doesn’t quite solve all our problems. For the post method, we need to get the attributes for an order object. If we do attributes = FactoryBot.attributes_for(:order) it will not store anything in the database. It will also not create any attributes corresponding to the customer. So we have to create the customer object explicitly, and add its id to the list of attributes, as follows:

```
customer = FactoryBot.create(:customer)
order_attributes = FactoryBot.attributes_for(:order, customer_id: customer.id)
```

The resulting attributes could be passed in the parameters when testing the post method to create an order entry.

Good rspec testing validates that the correct page is displayed. If a redirect is expected to occur, one should check that the redirect goes to the right page, for example:

```
expect(response).to redirect_to orders_path
```

If a redirect does not occur, you should check that the right page template is displayed:

```
expect(response).to render_template(:show)
```

Here are a couple example tests from the orders request test that may help to explain rspec request testing:

```
  describe "put order_path with valid data" do
    it "updates an entry and redirects to the show path for the customer" do
      order = FactoryBot.create(:order)
      put "/orders/#{order.id}", params: {order: {product_count: 50}}
      order.reload
      expect(order.product_count).to eq(50)
      expect(response).to redirect_to("/orders/#{order.id}")
    end
  end
  describe "put order_path with invalid data" do
    it "does not update the customer record or redirect" do
      order = FactoryBot.create(:order)
      put "/orders/#{order.id}", params: {order: {customer_id: 5001}}
      order.reload
      expect(order.customer_id).not_to eq(5001)
      expect(response).to render_template(:edit)
    end
  end

```
