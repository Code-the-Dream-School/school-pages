---
title: Week 1 Reviewer Notes (node/express)
description: Reviewer notes for week 1 of the node/express CTD course
layout: "../../layouts/genericMarkdownFile.astro"
---

# Lesson 1: Node Introduction

Students complete the node tutorial up to part 12, the http server.

[Lesson page](https://learn.codethedream.org/ctd-node-express-class-lesson-1a-node-introduction/)

[Tutorial video](https://youtu.be/Oe421EPjeBE) from start to 1:45:57. That is,
until the end of the `Http Module (More Features)` chapter.

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
`../01-node-tutorial/2-async-patterns` are not mentioned in CTD lesson pages.
Students may interact with them, or may ignore them.

# Hard Parts

Pay particular attention to the part 11: the callback-based async fs module
tutorial. Callbacks are consistently confusing for students. In mentor
sessions, be prepared to explain them! Emphasize the low-level asynchrony that
exists during I/O operations. It is important for students to learn that
requesting the contents of a file from the OS and receiving a buffer into which
the OS has loaded the file are two distinct events, and our programs work
better when program execution is not blocked in the meantime.

This explainer from [Hussein Nasser](https://youtu.be/DaU1-XoANig) is a great
place to point advanced students who want to know more.

Here is a [more beginner-friendly explainer with lots of
animations.](https://youtu.be/wB9tIg209-8)

# By the Way!

You'll notice that students have committed the `.txt` file outputs of their
programs. This is normal, and not a mistake.
