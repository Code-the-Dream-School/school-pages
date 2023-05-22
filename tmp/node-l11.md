## **Lesson Materials**

In this lesson, you create a front end for the Jobs API you created in the previous lesson. Front ends may be created in various ways, for example using React, and they may run in various environments, such as an app for a smart phone. The front end for this lesson is created using just HTML and JavaScript. It runs in a browser, and is loaded from the same Express instance as the API it calls. **There is no video for this lesson. Instead there are the detailed instructions below.**

**Note: This lesson appears to be mostly copy/paste -- but it isn't!** You create forms and tables, but if you used a data model different from Job, as was recommended in lessons 9 and 10, you must modify the HTML and JavaScript so that the forms, tables, and JavaScript variables match your data model. This may seem like a lot of work, and perhaps it is, but once you have completed it, if you used a data model different from the Job model used by the instructor (or you at least substantially extended that model) then you are well on your way to completing your class final project.

## **Assignments**

**Coding Assignment**

Continue working in the 06-jobs-api repository that you used for lessons 9 and 10. Before you start, create a new branch as usual, with a branch name of week12. (Week 11 was a catch up week, so you create the week12 branch when the week10 branch is active.)

Create a public directory under starter. This is for the HTML and JavaScript files for the front end. The HTML file is already created, and the code is below. Put that in the public directory with a file name of index.html. (Reminder: You do have to change the form, which below is for a job, to match your data model.)

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jobs List</title>
    </head>

    <body>
        <h1>Jobs List</h1>
        <button type="button" id="logoff" style="display:none;">logoff</button>
        <hr>
        <p id="message"></p>
        <hr>
        <div id="logon-register" style="display:none;">
            <button type="button" id="logon">logon</button>
            <button type="button" id="register">register</button>
        </div>
        <div id="logon-div" style="display:none;">
            <form>
                <div>
                    <label for="email">email:</label>
                    <input type="email" id="email">
                </div>
                <div>
                    <label for="password">password:</label>
                    <input type="password" id="password">
                </div>
                <button type="button" id="logon-button">logon</button>
                <button type="button" id="logon-cancel">cancel</button>
            </form>
        </div>
        <div id="register-div" style="display:none;">
            <form>
                <div>
                    <label for="name">name:</label>
                    <input type="text" id="name">
                </div>
                <div>
                    <label for="email1">email:</label>
                    <input type="email" id="email1">
                </div>
                <div>
                    <label for="password1">password:</label>
                    <input type="password" id="password1">
                </div>
                <div>
                    <label for="password2">verify password:</label>
                    <input type="password" id="password2">
                </div>
                <button type="button" id="register-button">register</button>
                <button type="button" id="register-cancel">cancel</button>
            </form>
        </div>
        <div id="jobs" style="display:none;">
            <p id="jobs-message"></p>
            <table id="jobs-table" style="display:none;">
                <tr id="jobs-table-header">
                    <th>Company</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th colspan="2"></th>
                </tr>
            </table>
            <button type="button" id="add-job">add job</button>
        </div>
        <div id="edit-job" style="display:none;">
            <form>
                <div>
                    <label for="company">company:</label>
                    <input type="text" id="company">
                </div>
                <div>
                    <label for="position">position:</label>
                    <input type="text" id="position">
                </div>
                <div>
                    <label for="status">status:</label>
                    <select id="status">
                        <option value="pending">pending</option>
                        <option value="interview">interview</option>
                        <option value="declined">declined</option>
                    </select>
                </div>
                <button type="button" id="adding-job">add</button>
                <button type="button" id="edit-cancel">cancel</button>
            </form>
        </div>
        <script src="./jobs.js"></script>
    </body>
    </html>

This front end uses a single page style. There are multiple views in the page, in different DIV entries, but which of these is visible is controlled by the JavaScript you write.

Edit app.js. Comment out the following lines:

    app.get('/', (req, res) => {
      res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
    });

Add the following line below these commented out lines:

    app.use(express.static('public'))

Start the server and go to localhost:3000 in your browser. You see the page, but it does not do anything. This is because there is no JavaScript to go with it. You create that now. Create a file public/jobs.js. This is the JavaScript for the front end. **Front end JavaScript does not run in Node. Instead it is delivered to the browser and runs in the browser context, with full access to the document, window, and DOM.**

There are various divs and controls to be manipulated by this JavaScript. (Again, you have to change this code to match your data model.) The divs and controls must be resolved by their ID. Start jobs.js with the following code (again, as modified to match your data model):

    document.addEventListener("DOMContentLoaded", () => {
      const logoff = document.getElementById("logoff");
      const message = document.getElementById("message");
      const logonRegister = document.getElementById("logon-register");
      const logon = document.getElementById("logon");
      const register = document.getElementById("register");
      const logonDiv = document.getElementById("logon-div");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const logonButton = document.getElementById("logon-button");
      const logonCancel = document.getElementById("logon-cancel");
      const registerDiv = document.getElementById("register-div");
      const name = document.getElementById("name");
      const email1 = document.getElementById("email1");
      const password1 = document.getElementById("password1");
      const password2 = document.getElementById("password2");
      const registerButton = document.getElementById("register-button");
      const registerCancel = document.getElementById("register-cancel");
      const jobs = document.getElementById("jobs");
      const jobsTable = document.getElementById("jobs-table");
      const jobsTableHeader = document.getElementById("jobs-table-header");
      const addJob = document.getElementById("add-job");
      const editJob = document.getElementById("edit-job");
      const company = document.getElementById("company");
      const position = document.getElementById("position");
      const status = document.getElementById("status");
      const addingJob = document.getElementById("adding-job");
      const jobsMessage = document.getElementById("jobs-message");
      const editCancel = document.getElementById("edit-cancel");

      // section 2
    });

(The section 2 comment is added to show where the next code will go.) At various times in the application, the home page must be displayed. The home page will show a logon button and a register button if the user is not logged in. If the user is logged in, the logoff button is shown, as well as a table of jobs entries, if the user has any. Because the home page must be brought up at various points in the application, you create an event listener for it, and trigger its display by dispatching an event. This is the next section of code to be added, after the line that says section 2:

      let showing = logonRegister;
      let token = null;
      document.addEventListener("startDisplay", async () => {
        showing = logonRegister;
        token = localStorage.getItem("token");
        if (token) {
          //if the user is logged in
          logoff.style.display = "block";
          const count = await buildJobsTable(
            jobsTable,
            jobsTableHeader,
            token,
            message
          );
          if (count > 0) {
            jobsMessage.textContent = "";
            jobsTable.style.display = "block";
          } else {
            jobsMessage.textContent = "There are no jobs to display for this user.";
            jobsTable.style.display = "none";
          }
          jobs.style.display = "block";
          showing = jobs;
        } else {
          logonRegister.style.display = "block";
        }
      });

      var thisEvent = new Event("startDisplay");
      document.dispatchEvent(thisEvent);
      var suspendInput = false;

      // section 3

In the code above, several operational variables (token, showing, thisEvent, and suspendInput) are created. The token is retrieved from local storage. Local storage persists even if the page is refreshed. If the token is not present in local storage, that means the user is not logged in, so the logon/register div is shown. Otherwise the logoff button and the jobs div are shown. The jobs div contains the table for jobs entries, and this is shown only if the user has jobs entries. The showing variable keeps track of which div is being shown. The thisEvent variable is used to create an event, which, when dispatched, triggers the home page display. Divs are shown and hidden by setting the style.display for the div to "block" or "none".

This section of code calls a function, buildJobsTable. This function does the complicated task of populating the jobs table. For now, just add this code to the top of jobs.js:

    async function buildJobsTable(jobsTable, jobsTableHeader, token, message) {
        return 0
    }

This function is async because it will eventually await a fetch call to retrieve the list of jobs. It returns the number of jobs retrieved. Right now of course, it just returns 0.

The flow of the application is controlled by button clicks, so you need an event listener to catch those. The first button click to handle is the logon. The callback for the click event listener is async, because there are awaits for fetch calls in the body of that function. So next, add these lines of code after the section 3 comment:

    document.addEventListener("click", async (e) => {
        if (suspendInput) {
          return; // we don't want to act on buttons while doing async operations
        }
        if (e.target.nodeName === "BUTTON") {
          message.textContent = "";
        }
        if (e.target === logoff) {
          localStorage.removeItem("token");
          token = null;
          showing.style.display = "none";
          logonRegister.style.display = "block";
          showing = logonRegister;
          jobsTable.replaceChildren(jobsTableHeader); // don't want other users to see
          message.textContent = "You are logged off.";
        } else if (e.target === logon) {
          showing.style.display = "none";
          logonDiv.style.display = "block";
          showing = logonDiv;
        } else if (e.target === register) {
          showing.style.display = "none";
          registerDiv.style.display = "block";
          showing = registerDiv;
        } else if (e.target === logonCancel || e.target == registerCancel) {
          showing.style.display = "none";
          logonRegister.style.display = "block";
          showing = logonRegister;
          email.value = "";
          password.value = "";
          name.value = "";
          email1.value = "";
          password1.value = "";
          password2.value = "";
        } else if (e.target === logonButton) {
          suspendInput = true;
          try {
            const response = await fetch("/api/v1/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email.value,
                password: password.value,
              }),
            });
            const data = await response.json();
            if (response.status === 200) {
              message.textContent = `Logon successful.  Welcome ${data.user.name}`;
              token = data.token;
              localStorage.setItem("token", token);
              showing.style.display = "none";
              thisEvent = new Event("startDisplay");
              email.value = "";
              password.value = "";
              document.dispatchEvent(thisEvent);
            } else {
              message.textContent = data.msg;
            }
          } catch (err) {
            message.textContent = "A communications error occurred.";
          }
          suspendInput = false;
        } else if (e.target === registerButton) {
          if (password1.value != password2.value) {
            message.textContent = "The passwords entered do not match.";
          } else {
            suspendInput = true;
            try {
              const response = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name.value,
                  email: email1.value,
                  password: password1.value,
                }),
              });
              const data = await response.json();
              if (response.status === 201) {
                message.textContent = `Registration successful.  Welcome ${data.user.name}`;
                token = data.token;
                localStorage.setItem("token", token);
                showing.style.display = "none";
                thisEvent = new Event("startDisplay");
                document.dispatchEvent(thisEvent);
                name.value = "";
                email1.value = "";
                password1.value = "";
                password2.value = "";
              } else {
                message.textContent = data.msg;
              }
            } catch (err) {
              message.textContent = "A communications error occurred.";
            }
            suspendInput = false;
          }
        } // section 4
      })

Let's explain what is going on here. First, if an async operation is in progress, you do not want to handle button clicks, because that could disrupt the flow of the application. The suspendInput variable is set to true if an asynchronous operation is in progress, and false once that operation completes. If suspendIInput is true, the button click is ignored. Second, the message variable stores the DOM entry of a paragraph that displays messages to the user. The message has to be cleared when a subsequent button click occurs. The code that follows handles clicks for the logoff, logon, register, logonCancel, registerCancel, logonButton, and registerButton. Let's discuss each in turn.

The logoff button clears the token and removes it from local storage, so the user is no longer logged on. The contents of the jobs table are also cleared, so that the next user can't access them. Note that even if the jobs table is hidden, a user could see its contents using browser development tools. The table is cleared by making the header row as the only child of the table. Then an event is dispatched to cause the home screen to display, and a message (you are logged off) is shown.

The logon button causes the logonDiv to be shown. The home screen is hidden by setting the style.display of showing to "none". Similarly the register button causes the registerDiv to be shown. THe logonCancel and registerCancel buttons just trigger the display of the home page.

The logonButton button causes user input (email and password) to be collected. Then (!!!) a jobs API is called, using fetch. This is done inside of a try/catch block, in case of error conditions. If a successful (status 200) response is recieved, the body of the response contains the JWT token, so this is stored in local storage and the home page display is triggered. Otherwise the body of the response contains a message, which is displayed in the message paragraph. Note that the URL for the API call is a relative URL, /api/v1/login . This means that the web address to be called is the same one as for the index.html page.

The registerButton button works similarly, except that the user is registered, instead of logging in an existing user.

At this point, after the code above has been added and saved, go to the localhost:3000 page and refresh it. You will find that several functions now work, including register, logon, and logoff. Try them out. Of course, there is nothing to handle the CRUD operations: creating, reading, updating, or deleting jobs entries. Let's add that next.

Add the following code below the section 4 comment:

        else if (e.target === addJob) {
          showing.style.display = "none";
          editJob.style.display = "block";
          showing = editJob;
          delete editJob.dataset.id;
          company.value = "";
          position.value = "";
          status.value = "pending";
          addingJob.textContent = "add";
        } else if (e.target === editCancel) {
          showing.style.display = "none";
          company.value = "";
          position.value = "";
          status.value = "pending";
          thisEvent = new Event("startDisplay");
          document.dispatchEvent(thisEvent);
        } else if (e.target === addingJob) {

          if (!editJob.dataset.id) {
            // this is an attempted add
            suspendInput = true;
            try {
              const response = await fetch("/api/v1/jobs", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  company: company.value,
                  position: position.value,
                  status: status.value,
                }),
              });
              const data = await response.json();
              if (response.status === 201) {
                //successful create
                message.textContent = "The job entry was created.";
                showing.style.display = "none";
                thisEvent = new Event("startDisplay");
                document.dispatchEvent(thisEvent);
                company.value = "";
                position.value = "";
                status.value = "pending";
              } else {
                // failure
                message.textContent = data.msg;
              }
            } catch (err) {
              message.textContent = "A communication error occurred.";
            }
            suspendInput = false;
          } else {
            // this is an update
            suspendInput = true;
            try {
              const jobID = editJob.dataset.id;
              const response = await fetch(`/api/v1/jobs/${jobID}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  company: company.value,
                  position: position.value,
                  status: status.value,
                }),
              });
              const data = await response.json();
              if (response.status === 200) {
                message.textContent = "The entry was updated.";
                showing.style.display = "none";
                company.value = "";
                position.value = "";
                status.value = "pending";
                thisEvent = new Event("startDisplay");
                document.dispatchEvent(thisEvent);
              } else {
                message.textContent = data.msg;
              }
            } catch (err) {

              message.textContent = "A communication error occurred.";
            }
          }
          suspendInput = false;
        } // section 5

The addJob button causes the editJob div to be shown in place of the home page. This div is used both for add and for edit. You need to keep track of whether an add or edit is being done. This is done with the editJob.dataset.id value. The dataset attribute of a DOM entry may be used to store arbitrary values. If editJob.dataset.id is not set, then this is an add. If it is set, it holds the value of the entry being edited. You will see how that value is set for an edit further on in the lesson. If the addingJob pushbutton is clicked, an add or an update is attempted. If this is successful, a messsage is displayed to the user and the display of the home page is triggered. If the add or update operation fails, a message, taken from the body of the response, is showed to the user. The add operation corresponds to a fetch call with POST as the method. The update operation corresponds to a fetch with a PATCH method. Note that, unlike the logon and register, these operations use and require the Authorization header, which has the bearer token. If that is not present, the operation fails with a 401 not authorized result code.

Once you have added this code, try out the application again. You are now able to add entries, but you can't actually see them. Next you add the code to populate the table of jobs entries.

Go to the top of the jobs.js file. Replace the buildJobsTable function there with the following:

    async function buildJobsTable(jobsTable, jobsTableHeader, token, message) {
      try {
        const response = await fetch("/api/v1/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        var children = [jobsTableHeader];
        if (response.status === 200) {
          if (data.count === 0) {
            jobsTable.replaceChildren(...children); // clear this for safety
            return 0;
          } else {
            for (let i = 0; i < data.jobs.length; i++) {
              let editButton = `<td><button type="button" class="editButton" data-id=${data.jobs[i]._id}>edit</button></td>`;
              let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.jobs[i]._id}>delete</button></td>`;
              let rowHTML = `<td>${data.jobs[i].company}</td><td>${data.jobs[i].position}</td><td>${data.jobs[i].status}</td>${editButton}${deleteButton}`;
              let rowEntry = document.createElement("tr");
              rowEntry.innerHTML = rowHTML;
              children.push(rowEntry);
            }
            jobsTable.replaceChildren(...children);
          }
          return data.count;
        } else {
          message.textContent = data.msg;
          return 0;
        }
      } catch (err) {
        message.textContent = "A communication error occurred.";
        return 0;
      }
    }

In this code, there is a GET request for all of the jobs entries. If no entries are returned, the function just returns 0. If entries are returned, they must be added to the table in the following columns: company, position, status, edit button, delete button. The rows of the table are accumulated in a loop, with the first row being the table header row. The tricky part is the buttons. We need to identify whether a button represents an add or delete. This is done with the editButton and deleteButton classes. We also have to record which jobs entry corresponds to which button. This is done with the dataset.id attribute, which is set in the HTML using dataset-id. Then the HTML for each row is created and turned into a DOM entry. The table is updated with the rows using a replaceChildren() call.

Once you have added and saved this code, try the application again. You should see the entries that have been created, each with an edit and delete button. However, the edit and delete buttons don't do anything. To fix this for the edit, add the following code after the section 5 comment:

        else if (e.target.classList.contains("editButton")) {
          editJob.dataset.id = e.target.dataset.id;
          suspendInput = true;
          try {
            const response = await fetch(`/api/v1/jobs/${e.target.dataset.id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
            if (response.status === 200) {
              company.value = data.job.company;
              position.value = data.job.position;
              status.value = data.job.status;
              showing.style.display = "none";
              showing = editJob;
              showing.style.display = "block";
              addingJob.textContent = "update";
              message.textContent = "";
            } else {
              // might happen if the list has been updated since last display
              message.textContent = "The jobs entry was not found";
              thisEvent = new Event("startDisplay");
              document.dispatchEvent(thisEvent);
            }
          } catch (err) {
            message.textContent = "A communications error has occurred.";
          }
          suspendInput = false;
        }

For an update, you must first keep track of the jobs entry that is being updated, which is in the dataset.id of the button that was clicked. This is stored in the dataset.id of the editJob.div. Next that entry must be retrieved from the database. The ID of the entry to be retrieved is appended to the URL for the GET method. This is to populate the entry fields with the current values of company, position, and status for that entry. Then the editJob div is displayed, unless there are errors.

Once you have added this code, try it out. Verify that you can now modify entries.

This completes all CRUD operations except for delete. You will notice that the delete buttons don't work. FIx this. **Implement the delete function following the pattern used for the edit button.** You call the jobs delete API, and in the URL you include the ID of the entry to be deleted. Then the home page is displayed again. **Note:** There is an error in the implementation of the delete operation in the jobs controller. The instructor's guidance is to use this line:

    res.status(StatusCodes.OK).send()

This is incorrect, because an empty body is not valid JSON. Change it to:

    res.status(StatusCodes.OK).json({msg: "The entry was deleted."})

If you do not make this change, an exception is thrown on the front end when you attempt to parse the response body with response.json().

Once you have everything working, do a git, add, and commit to the week12 branch, and push it to your github repository. Then modify the Render.com deployment you have to point to the new branch. This will cause your new code to be deployed to Render.com. Verify that your application front end is working on Render.com.

## Tips on Getting the Delete to Work

This is a little cheat sheet so that you don't find it too hard.

- How do you know it is a delete? In the buildJobsTable function, each of the delete buttons is given a class of deleteButton. You check for that class in the e.target.
- How do you know which entry to delete? The id of the entry is stored in the data-id of the button, as done in the buildJobsTable function.
- How do you do the delete? You need a call to fetch with a method of DELETE giving the URL of that entry. Be sure you include the authorization header. Also, remember that fetch is asynchronous, and should be called in a try/catch block.
- What do you do if the delete succeeds? First, you put a message in the text content of the message paragraph. Second, you redraw the table showing the updated list of entries. You can redraw the table by dispatching an event to startDisplay. You'll see other places in the code where this is done?
- What do you do if the delete fails? Put a message indicating the failure in the message paragraph.
- Anything else? You don't want to take input while these asynchronous operations are in progress, so you set the suspendInput flag before you start them, and clear it afterwards.

**Mindset Assignment**

Your mindset assignment for this week can be found here: **[Design Concepts](https://learn.codethedream.org/mindset-curriculum-design-concepts/)**

## **Submitting Your Work**

When you are done, do the following, use the same procedure as for previous lessons. You do a git add, git commit, and git push for the week12 branch, create your pull request on github, and put a link to your pull request in your assignment submission form below.

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

**Alpaca class use:**

**[Squibby 2.0 Assignment Submission Form](http://tiny.cc/squibby2)**

**Baboon** **and any 2023 classes use:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)
