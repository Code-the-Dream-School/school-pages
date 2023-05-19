---
title: Week 2 Reviewer Notes (node/express)
description: Reviewer notes for week 2 of the node/express CTD course
layout: "../../layouts/genericMarkdownFile.astro"
---

# Lesson 2: Async Patterns (mainly callbacks)

Students continue to work on the node tutorial in `01-node-tutorial` from
part 12 to the end (part 17).

[Lesson page](https://learn.codethedream.org/ctd-node-express-class-lesson-2a-npm-and-async-patterns/)

[Tutorial video](https://www.youtube.com/watch?v=Oe421EPjeBE&t=6357s) from 1:45:57 to 3:40:46 (end of `End of Node Tutorial Module` chapter)

# Tedium

This is a copy-and-paste-heavy assignment. Since students put their work into a
different folder, it's quite tricky to understand exactly what they changed
unless you know the course well. As a workaround, you can move student work
into the not-answers folder to easily see exactly what (if anything) they
changed compared to the boilerplate that comes with the course:

```bash
git remote add $STUDENT_NAME $STUDENT_REMOTE_URI
git fetch $STUDENT_NAME
git checkout $STUDENT_NAME/$STUDENT_BRANCH
# Note that students often put their work in random places, but this is where
# it's supposed to be according to directions!
cp 01-node-tutorial/answers/*.js 01-node-tutorial
git diff
```

Also, note that example in `../01-node-tutorial/1-event-loop-examples` and
`../01-node-tutorial/2-async-patterns` are not mentioned in CTD lesson
pages. Students may interact with them, or may ignore them.

# Hard Parts

## Event Emitter

Students experiment with the node event emitter API a bit during this lesson.
The learning objective here is to develop students' understanding of the fact
that programs can be event-driven rather than procedural. Students can get a
bit overwhelmed, perplexed, and confused by the event emitters API. If you
encounter this, emphasize the fundamental learning goal here. Ask questions
about websites (request -> response) or web pages (click -> event handler).
Even if students have never written a web server or UI, these are technologies
that everyone interacts with. Students will usually understand that it is
important for us to be able to write software that responds to events coming
from the outside world, as opposed to just running scripts from beginning to
end. We won't visit the event emitter API again; if the HTTP server stuff is
clicking with students, but the event emitter is not, simply offer
encouragement and reinforcement to the student. Ask questions that scaffold
students' understanding of the important learning objects instead of the
minutia of the event emitter API.

## Streaming

Again, very tricky content that we don't revisit later in the course. Lay the
validation and sponsorship on thick.

Of course, streams and buffers are a fundamental concept in computing and
operating systems. They are present during any HTTP operation, file I/O, or
interaction between a web application server and a database.

Try explaining streams and buffers with high-level analogies, since a
high-level understanding is enough for students to walk away with. For example:

> Consider people waiting in line. Then length of the line is the buffer size.
> Reading from the stream is like serving a customer, they are removed from the
> line. Writing to the stream is like someone new getting in line.

It may be worthwhile to point out that most HTTP application servers do not
deal with this problem at all; at least not insofar as pushing around very
large files. They will typically defer problems like this to S3 or a CDN.

Here are some resources to offer to students for further reading:

- [Playing with Node.js Streams](https://kinda-silly-blog.vercel.app/posts/nodejs-streams)
- [A Visual Guide to Node.JS Streams](https://archive.ph/jBRlO)
- [Node.js streams with Luciano Mammino (youtube)](https://www.youtube.com/watch?v=ldcfYB_mo6Q)
- [Everything You Should Know about Node.js Streams (youtube)](https://www.youtube.com/watch?v=BdePYKgrMh0)
