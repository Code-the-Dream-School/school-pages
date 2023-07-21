---
layout: "../../layouts/genericMarkdownFile.astro"
title: "Node/Express Lesson 13: Authentication With Passport"
description: Material link for lesson 13 of the node/express class
---

# Node/Express Lesson 13

# Authentication with Passport

When you are creating APIs, you can perform authentication using JavaScript Web Tokens (JWTs). The front end makes an API call passing credentials to the back end, and the back end returns a token, either in the body of the response or by setting a cookie. The front end then passes this token to the back end on all subsequent requests. When the application does not have a separate front end to invoke the APIs, only the cookie approach can work. The browser is making the requests, and browsers can't call APIs or send authorization headers. But there has to be some way to save state, such as the state of being logged on. For applications that are not based on APIs, such as server side rendered applications, this is done using sessions, and sessions are established and maintained using cookies.

This way of handling security can be used for APIs as well, if the APIs are to be called from a browser.
And, when using a browser, the cookie based approach is more secure, because sensitive information
such as the JWT is not stored in local storage. However, when one server calls another, the
cookie based approach can't be used, as cookies only have meaning for browsers.

This is the flow: The browser requests the logon page from the server, and then posts the id and
password obtained from the user. The server verifies the id and password, and if verification
is successful, the server sends a response that
includes a set-cookie header in the response to the browser. The cookie is a cryptographically signed string, signed with a secret key so that it can't be counterfeited by a malicious user. The browser automatically includes the cookie in the header of all subsequent requests to the same URL, until the cookie expires.
For all protected requests, the server has middleware that validates the cookie.
Different browser sessions from different users have different cookie values, so the server
can tell which user is making the request. On the server side, the cookie is used as a key to
access session state data, which is kept on the server. This state data is the user's session.
