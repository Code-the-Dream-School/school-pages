# School Pages

This is a site for hosting static markdown content related to CTD courses. All
contributors are welcome! See the [contributing guide](./CONTRIBUTING.md).

This site will include pages for the Node, React, Intro, and Rails classes, as
well as general purpose supplementary content like git guidance, SQL, life as a
programmer, how to overcome adversity, et cetera.

To contribute, fork and clone this repository, and then add or modify files. In
general, contributions should be in markdown format, and should be put in one
of the folders under src/pages. Markdown files should have the following front matter:

```
---
layout: "../../layouts/genericMarkdownFile.astro"
title: <your title>
description: <your description>
---
```

Contributions to any of the CTD classes are encouraged. They do not have to
be complete lessons, and some material may be appropriate for the general or blog
folders, such as how to deal with setbacks or find help. If your content includes
images, put them in the public folder. (The technology we are using, Astro, does
not yet have an assets pipeline.)
