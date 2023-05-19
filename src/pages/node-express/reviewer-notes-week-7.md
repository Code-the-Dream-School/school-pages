---
title: Week 7 Reviewer Notes (node/express)
description: Reviewer notes for week 7 of the node/express CTD course
layout: "../../layouts/genericMarkdownFile.astro"
---

# Lesson 7: Store API (Query Params)

[Lesson page](https://learn.codethedream.org/ctd-node-express-class-lesson-9-using-query-parameters/)

This week, students complete the Store API assignment (04) from start to
finish.

Students will build out complex filtering and sorting options on a Rest API
endpoint:

> The idea is that one can search by any or all of these attributes: featured,
> name, price, rating, company. For the numeric fields price and rating, one
> can also specify greater than, less than, or equal to. One can also specify a
> sort order. Also one can specify a skip and a limit, to facilitate pagination
> through the result

## Hard Parts

This assignment asks the student to learn and put together a lot of different
concepts using the mongoose ORM. The biggest thing that will likely trip
students up is the Regex used to handle the `numericFilters` query parameter.
Here is an example answer (with the help of ChatGPT 😅) [explaining how the
Regex and the surrounding code
works](https://github.com/NatachaKey/node-express-course/pull/7/files#r1161690739)

The code also involves a bit of string manipulation for the `numericFilters`,
`sort`, and `fields` query parameters in order to convert a human-friendly
value that allows including multiple model fields into the type of value that
`mongoose` is expecting. Be prepared to walk students through those steps.
Lastly, we do a bit of the common `offset` (or in this case `skip`) + `limit`
pagination at the end there; make sure that students understand how that's
working.
