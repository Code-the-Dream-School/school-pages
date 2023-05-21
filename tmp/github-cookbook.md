This page describes a few git commands. You will need to do these commands to submit weekly assignments and to complete the Ruby on Rails Back End course. If you are unfamiliar with git, you should complete the [Introduction to Git](https://teamtreehouse.com/library/introduction-to-git) course on Treehouse. Another, perhaps better, introduction is **[here.](https://www.youtube.com/watch?v=RGOj5yH7evk)** Unfortunately, the Treehouse class does not explain branching, forking, and other operations that you will have to do. These are explained in the courses on [Git Branches and Merging](https://teamtreehouse.com/library/git-branches-and-merging) and [Github Basics](https://teamtreehouse.com/library/github-basics) , but these are long courses, more than you need to know now. So, here's a cookbook.

First, if you don't have a github account, create one at [https://github.com](https://github.com) . If you use a Mac or Linux, you should have git already installed on your workstation. You can check this by typing

    git --version

at your command line.  
  
If you are using Windows, we provide a vagrant virtual machine image for you to run, and git is already installed in that virtual machine image, as described in the lesson [here.](https://learn.codethedream.org/configuring-your-machine-for-ruby-rails-development/) Be sure that you do all git operations from within the vagrant session, and not from Git Bash. For Windows, you need to do some additional one time setup, by doing the following commands in your vagrant session:

    git config --global user.email <your email address>
    git config --global user.name <your github id>
    git config --global core.eol lf
    git config --global core.autocrlf input

For each lesson, you will have a starter github repository. Fork that repository, creating a public fork of it in your own github account. You do this by clicking on the fork button that appears on the upper right in the github page for the starter repository.

After the fork is created, you need to clone it onto your workstation. The github page for your fork has a green code download button. Click on that. You will use https to clone your fork. You will see a clipboard icon next to the https link so that you can copy the URL of your fork. Then, within the directory where you are keeping the code you develop, type:

    git clone <url>

where the url is the one you copied to the clipboard. This will copy the github repository into a directory. The directory will have the same name as the starter repository. Be sure you clone your fork, and not the starter repository. Then, cd to the directory created by the cloning process. You now need to create a branch of the repository to contain the changes you make for the lesson. This is done as follows:

    git checkout -b lesson

Some lessons have you create branches with other names. Next, you make your changes to the code that was downloaded using your editor. When your changes are complete, the following steps will stage, commit, and push those changes, so that they are stored in your github repository:

    git status
    git add -A
    git commit -m "put a useful commit message here"
    git push origin lesson

except that for some lessons, the name of the branch will be something other than lesson, as described in the instructions for that lesson. You can stage, commit, and push your changes at any time. The git status command will tell you if you have uncommitted or unstaged changes. The push operation requires that you enter your git userid and a git personal access token. If you do not have a git personal access token, you can create one using the steps described **[here.](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)** Your git client will save this token, so that you do not have to enter it every time.

When you are done with the lesson and want it reviewed, you create a pull request. This is done when you are logged into github. You open up the repository containing your fork of the lesson. You will see a little button that says "main". (For older repositories, it may say "master".) This is your main branch. If you click on that button, you will see that you can switch to your lesson branch. Do so. Then click on "pull request". You will see a button that allows you to choose the base repository. You want the to specify your own repository, not the Code-The-Dream-School one. You are creating the pull request with, as the base, the main branch of your own forked repository. Click on the button that says "Create Pull Request".  
  
This is enough to get you started with git. There are additional courses on Treehouse to help you learn git completely. If you get stuck with any of these steps, put a question into the slack channel.

**Steps for Submitting Assignments via GitHub**
-----------------------------------------------

1.  Fork the lesson workspace (in github).
2.  Git clone your fork (from the terminal command line).
3.  Create a git branch for the lesson.
4.  Edit a file within the lesson.
5.  Test your changes.
6.  Git stage the files. (To stage all changed or added files, do "git add -A".
7.  Git commit the files. (git commit -m "some message about what you did").
8.  Git push the branch back to your fork. (git push -u origin <branchname>)
9.  Create a pull request on github, from your working branch to your main branch.
10.  Submit a link to your pull request using the  **[homework assignment submission form.](https://airtable.com/shrBpqHbS6wgInoF9)** (Classes starting before October 2022 use **[this form.](https://airtable.com/shrSiBzWPqo1xUBv4)**)

If you can't get the code working correctly, you can still submit your homework, but you should try to get it working, with mentor help as needed.

Reviewers will post comments via Github. After you have received their comments, you can merge your assignment branch into your main branch. It's best to do this after your assignment has been reviewed, as your reviewer may recommend changes.

Creating a New Repository
-------------------------

Some assignments do not start with a repository. In particular, the final class project for many classes does not have a starter repository. Instead, you create your own, with the following steps:

1.  Create the project directory. Don't have spaces in the directory name.
2.  Change to the project directory.
3.  Create at least one file that will belong to the project. Recommended: create a README.md file, a text file that describes the project.
4.  Do: git init
5.  Do: git add -A
6.  Do: git commit -m "first commit"
7.  Log on to github. The plus sign in the upper right allows you to create a new repository. Create it. Do not create a .gitignore or a README.md in this step.
8.  Once you have created the repository, click on the little copy icon next to the link. This copies the URL of the repository to the clipboard, used in the next step.
9.  On your workstation in your project directory, do: git remote add origin <URL>
10.  Do: git push origin main

You should do all subsequent work in branches, pushing those branches to github periodically. When you are satisfied with a branch, you can do a pull request on github and then merge the pull request into main.

A Couple More Tips
------------------

Try to remember not to make changes to the main branch. You want to make your changes to working branches, push them to github, make a pull request, and then merge the pull request.

If you forget, and start working on the main branch, but have not committed anything, you can do git stash, then create or check out your working branch, then do git stash apply. If you commit to the main branch, you can still recover the previous state. RIght after your commit, with the main branch still active, create the branch you want to work in. This new branch will then have the changes you have committed to main. Be sure to do this first, or your work will be lost! Then checkout main. Then do:

    git fetch origin
    git reset --hard origin/main
    git clean -f

Finally, try not to make this **bad mistake.** Suppose you have a project directory called project1. While you are in the project1 directory, you do a git clone to create a directory for project2. You will then have two git repositories, one nested inside the other. This is bad. Git operations will do different things with your files, depending on which directory is active. If you make this mistake and you haven't yet committed anything, you can delete the nested directory. If you have already committed something, you have a mess and you may need help from a mentor.

Here is a page you should look at next:

**[More Git: Experimenting, Recovering From Mistakes](https://learn.codethedream.org/more-git-experimenting-recovering-from-mistakes/)**

Here are some suggestions on how to make git work better for you.

Experimenting
-------------

Suppose you are going to try a big change to the code, but you are not sure it will work or that it is what you want. Or suppose you are making temporary changes to the code that you know you won't want to keep. One way to handle this is to create a temporary branch from your current working branch. Then make changes to the temporary branch. If you decide to keep those changes, you commit them to the temporary branch. Then you check out the working branch, and you do:

    git merge <temporary>

where <temporary> is the name of your temporary branch. If you don't want to keep the changes, you checkout the working branch and delete the temporary branch.

Recovering from Mistakes
------------------------

Students sometimes make mistakes with their assignments and projects, get confused, and decide they need to start over from scratch. This costs a lot of time. You do not need to start over if you understand git.

One great thing about git is that you can always restore files to the state they were in at the time of a previous commit. If you commit whenever your code is in a stable state, you can recover that state. Here are some recovery scenarios:

1.  You have made a change with strange results, and you can't remember what you did. To see what you changed, use:

    git log
    (this will show you your commit history) and then do
    git diff
    or
    git diff <commitNumber>

The git log shows the number of each commit. You can use those numbers in various git commands. You just need to use the first 8 characters of the commit number. When git diff is used without parameters, git it shows you what has been changed since the last commit. If you specify a commit number, you can see all the changes since that previous commit.

2.  You have made a change you don't want to keep, and you have not committed the file.

    git checkout -- <filename>

This restores the file to the state it was in the last commit.

3.  You have made changes to several files, and you want to go back to the last commit, discarding all the changes you have made since the last commit. Do:

    git reset HEAD --hard
    git clean -fd

3.  You have made changes to several files, you have not committed them yet, and you want to save those changes, but you want to restore the project to the state it was in before the last commit. Do:

    git stash

You could then get those changes back with git stash apply.

4.  You have changed a file, you don't want to keep the change, and you have committed the change. For example, you may have accidentally deleted the file and then committed the change. To recover, first use git log to find the commit number where the file was in a good state. Then do:

    git checkout <commitNumber> -- <filename>

Where filename is the name of the file you want to restore.

5.  Suppose you want to look at the files as they were for a previous commit. You can do

    git checkout <commitNumber>

This will checkout the whole project at a particular commit level -- but don't make changes while you are in this state. You only do this to look at the files, or perhaps to try the program to see if it was working correctly at the time of that commit. Switch back to your working branch to make changes.

6.  You have made and committed a bunch of changes you don't want to keep, so you want to go back to the state of the branch at a previous commit level. Now, be careful with this one, as it does **throw away** all the changes since that earlier commit. Do NOT use it if you have already pushed the branch to github and it has been merged into main. Find the commit level you want, and then do:

    git reset --hard <commitNumber>

7.  You have messed up your branch, but you have a version of the branch on Github that is in a good state. You may want to save your work just in case there is anything to remember in it. To save the messed up state, add and commit your changes. Then create a new branch. This will save the state. Then checkout the messed up branch. Then do:

    git fetch origin
    git reset --hard origin/<branchname>
    git clean -df

Advanced Topics
---------------

There are several other git commands that you will need. They are merge and revert. What makes these commands a little more difficult is that you can get merge conflicts.

The revert command undoes all the changes associated with a particular commit. However, suppose another change has been committed that affects the reverted change. Then you will get a conflict, to be resolved in an editor, which can be tricky, because you have to figure out how to preserve appropriate logic in the code.

The merge change combines all the changes from one branch into another. However, the problem again is that there may be conflicts between the states of the code in the two branches. Again, you have to resolve the conflicts with your editor.

You do have to learn how to resolve merge conflicts, and how to minimize them in the first place, in order to work on a joint project where a team shares code. Code the Dream practicums and the projects developed by Code the Dream interns are team projects. The git process you use is described at **[this link.](https://learn.codethedream.org/git-process-for-code-the-dream-practicums/)**