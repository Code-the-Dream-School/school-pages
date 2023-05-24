---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Rails Basic Skills: Validation"
description: "imported from WordPress,Rails Basic Skills: Validation"
---

# Rails Basic Skills: Validation

So far, we have talked about byebug, exception handling, logging, layouts, flash messages, and styles. Validation is next. Try this: Create several customers with blank first names or last names or phone numbers with letters in them or with email addresses that don’t have an @ sign. You will see that it just creates these nonsense entries. We wouldn’t want this in a production application. We want the entries to be validated so that they make sense.

We will use a gem called email-validator. Add this line to your Gemfile, above the development, test group:

```
gem 'email_validator'
```

Then run bundle install so that you pick up this gem.

Next, edit app/models/customer.rb. It should be changed to look like this:

```
class Customer < ApplicationRecord
 validates :first_name, presence: true, format: { with: /\A[a-z\-' ]+\z/i }
 validates :last_name, presence: true, format: { with: /\A[a-z\-' ]+\z/i }
 validates :phone, presence: true
 validates :phone, numericality: { only_integer: true }
 validates :phone, length: { is: 10 }
 validates :email, presence: true, email: true

 def full_name
   "#{first_name} #{last_name}"
 end
end

```

## Explaining the Code

We have added validators, as described here: <https://guides.rubyonrails.org/active%5Frecord%5Fvalidations.html> . The presence validator means that the entry can’t be blank. The numericality validator for the phone means that only digits are accepted. The length validator for the phone means that it must be 10 digits. (Note that this would not work for other countries, as they have numbers of different lengths.) For the email, we are using the email_validator gem. We are also using a regular expression to validate the format of the first and last name. We won’t explain regular expressions now, but they are good to learn. In this case, the expression provides a pattern that the first and last names must match.

Note: Validators do not correct entries that are already in the database. It only prevents new ones or updated ones from being incorrect.

The full_name method is not a validator. We’ll use that for something else.

## Trying the New Validators

Restart the server with the new code, and try to create a customer record with everything blank. You will see this message:

[![](https://learn.codethedream.org/wp-content/uploads/2023/02/Screenshot-2023-02-27-at-10.19.18-AM.png)](https://learn.codethedream.org/wp-content/uploads/2023/02/Screenshot-2023-02-27-at-10.19.18-AM.png)

## How These Messages Come Up

When the save is attempted for the new customer object, the validators run. If any of the validations fail, the record is not written to the database. Instead, error information, including messages, is stored in the customer object, so that they can be reported to the user. Suppose the object to be saved is @customer. Then @customer.errors.full_messages contains an array of messages about the failures.

Now look at app/views/customers/\_form.html.erb . You will see a block at the start that starts if customer.errors.any? . This is the block that displays the error messages.

This error handling is provided because we generated the scaffold for customers. You will need to know how to code error handling within your controller, which is the subject of the next section.
