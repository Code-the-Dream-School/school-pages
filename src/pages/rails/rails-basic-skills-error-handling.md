---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Rails Basic Skills: Error Handling"
description: "imported from WordPress,Rails Basic Skills: Error Handling"
---

# Rails Basic Skills: Error Handling

Edit app/controllers/customers_controller.rb. You will see a create and an update method. We won’t explain their current contents right now, because we are going to change them. Comment all the lines out between the def and the end for the create method. Do the same for the update method.

Now in the create method, put these lines:

```
@customer = Customer.new(customer_params)
@customer.save
flash.notice = "The customer record was created successfully."
redirect_to @customer
```

In the update method, put these lines:

```
@customer.update(customer_params)
flash.notice = "The customer record was updated successfully."
redirect_to @customer

```

These will make the functions work, but without error processing. Now, if you try to create a customer with blank fields, it will not give error messages. It won’t actually create the record, but it will tell you that it succeeded. (By the way, the flash.notice is displayed by the line at the top of app/views/customers/index.html.erb , where it puts out the notice.)

## Checking for Errors and Handling Them

We need to get our error messages back. Basically, if @customer.save succeeds, it will return the @customer object, updated with the newly created id. If it fails, typically because validation fails, it returns nil — and then we have to handle the error. The same is true of the update function. So change those methods as follows.

## The create Method With Error Handling

```
    @customer = Customer.new(customer_params)
    if @customer.save
      flash.notice = "The customer record was created successfully."
      redirect_to @customer
    else
      render :new, status: :unprocessable_entity
    end

```

## The update Method With Error Handling

```
    if @customer.update(customer_params)
      flash.notice = "The customer record was updated successfully."
      redirect_to @customer
    else
      render :edit, status: :unprocessable_entity
    end
```

If @customer.save or @customer.update return non-nil values, that means they succeeded, and we can redirect back to the show page with a success message. If they return nil, we have the else processing. In that, we render the page again (put the previous screen back up), but pass the status of unprocessable_entry, and Rails, because that status is set, displays the error that occured.

## Additional Methods in the Customer Model Class

We added a full_name method to the Customer model class. Additional methods in model classes can be convenient. This will show how. Edit app/views/customers/\_customer.html.erb . Replace this:

```
  <p>
    <strong>First name:</strong>
    <%= customer.first_name %>
  </p>

  <p>
    <strong>Last name:</strong>
    <%= customer.last_name %>
  </p>
```

with this:

```
  <p>
    <strong>Full name:</strong>
    <%= customer.full_name %>
  </p>
```

Here we add the full_name method we added to the Customer model class. Now go to the /customers url and you will see the difference.

(Time to save your work to github!)
