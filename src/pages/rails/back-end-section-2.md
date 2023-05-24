---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Back End Lesson 1.2: More SQL, Ruby Introduction"
description: "imported from WordPress,Back End Lesson 1.2: More SQL, Ruby Introduction"
---

# Back End Lesson 1.2: More SQL, Ruby Introduction

Welcome to Ruby on Rails Back End Class Lesson 2\. In this unit, we will learn:

- What is a Relational Database | Database Normalization | Database Keys| Relationships | Set Operations
- Database joins
- Ruby syntax | Objects | Strings | Numbers | If statements

## Back End Lesson 1.2 Goals

- Getting acquainted with the database and more complex concepts
- Practice join logic
- Explore the Ruby environment and learn how to write simple Ruby programs

## Curriculum

This is your curriculum for Lesson 1.2.  
**1.2.1 [Querying Relational Databases](https://teamtreehouse.com/library/querying-relational-databases) (145 min)**
**1.2.2 [Ruby Basics](https://teamtreehouse.com/library/ruby-basics-2)** **(169 min)**

## Data Normalization and Object Relational Mapping

When you set up your database, you first figure out your data model. Then you create the tables associated with that model. A database has more function than a spreadsheet table, in that the storage of data can be normalized. Normalized data has associations between tables, to store data more compactly. Consider the w3schools database here: <https://www.w3schools.com/sql/trysql.asp?filename=trysql%5Fselect%5Fcolumns> . There is an association between the order table and the customer table. If we had to store all the information about a customer, including each of their orders, in one table, the table would have to have an unlimited number of columns. So the orders are put in a separate table. Each entry in the customer table has a primary key, which is the id. Each entry in the order table has a foreign key, which is the customer_id. So any given order record points back to the corresponding customer. In the order table, there are several other foreign keys, corresponding to the employee and the shipper associated with the order. We say that the order belongs to the customer, and that the customer has many orders. Note that we do not change the customer table in order for the order to belong to the customer. We only have the required customer_id column in the order table. This is a one-to-many association.

There are also many-to-many associations. In the w3schools database, an order may be comprised of many products. On the other hand a given product may be included in many orders. If we add the foreign key order_id to the product table, we could have many products for an order, but not many orders for a product. Suppose we also add the product_id foreign key to the order table. That doesn’t solve it either. A product would belong to only one order, and an order would belong to only one product. The problem is solved by having a join table. The join table has both the product_id and the order_id. For a given order, there may be many entries in the join table, each pointing to a different product. For a given product, there may be many entries in the join table, each pointing to a different order. In the w3schools database, the join table is the OrderDetails table. Note that the join table may contain additional information. In this case it contains a quantity column, which tells how many of a given product are included in the order.

In Rails and in other frameworks, the database is often accessed using an Object Relational Mapping (ORM). The Rails ORM is called ActiveRecord. The value of an ORM is that you can use object oriented syntax for operations, instead of having to code the SQL directly. For example:

```
Order.all
```

would give an array of objects corresponding to the SQL

```
SELECT * FROM Orders;
```

and these statements

```
order = Order.find(10248)
order.products
```

would return an array of objects corresponding to the SQL

```
orders = SELECT * FROM Orders WHERE id = 10248 LIMIT 1;
SELECT * FROM Products WHERE order_id = ?, orders[0].id;
```

All of this will become clearer when you do the ActiveRecord exercises for Rails.

## Assignments

Your assignment for Lesson 1.2 can be found[ ](https://classroom.github.com/a/TEnB9osU)[**here**](https://github.com/Code-the-Dream-School/Backend-sqlruby).

Your mindset curriculum assignment can be found [**here**](https://learn.codethedream.org/mindset-curriculum-assignment-on-mindset/).
