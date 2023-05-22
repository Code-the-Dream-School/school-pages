---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Node Express Lesson 4: Middleware, REST Methods, and Postman"
description: Material link for lesson 4 of the node/express class
---

# Node Express Lesson 4

# Middleware, REST Methods, and Postman

You continue watching **[this video\](https://youtu.be/Oe421EPjeBE?t=13246)**. This week, you watch from 3:40:48 of the video to 6:10:46. This section of the video starts with some slides on how the web works. You do not need to write any code for these slides. Then, at about 3:56 of the video, the instructor starts talking about how you download the repository containing the code. **Do not do this.** You already have the code you need, as it is included in the same repository you are using.

The instructor also directs you to remove the .git directory. **Do not remove the .git directory.** Because you forked the original repository, you continue to use the git configuration.

The useful parts of the video resume about 3:58. At about 5:18:13 of the video, the instructor discusses APIs compared with Server Side Rendering. Server Side Rendering is covered towards the end of this course. This section of the course focuses on simple responses, serving static files, and developing APIs. The APIs you develop in this class are built according to an approach called REST, which stands for Representational State Transfer. In addition, the implementation this class teaches for REST uses HTTP requests:

- Get
- Post
- Put
- Patch
- Delete

Each operation goes to a particular URL, and there may be parameters in the URL as is explained in the lesson. In addition, the POST, PUT, and PATCH operations may convey JSON data in the body of the request. JSON data is returned from the server in the body of the response. (It is possible to write APIs that don’t use JSON, but in this class JSON is always used.) If you need to learn or review JSON, a basic introduction is at this link: **[https://www.digitalocean.com/community/tutorials/an-introduction-to-json\](https://www.digitalocean.com/community/tutorials/an-introduction-to-json)**
