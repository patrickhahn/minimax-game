# minimax-game

<h2>Guide to using git to work on this repository.</h2>

https://xkcd.com/1597/

The code in the repository is stored online by GitHub, but you will create a local copy of the repository on your machine to work on. Each time you start working on the project, you will manually download the changes that were pushed by other team members since your last session, and you will "commit" (save) and "push" (upload to main repository) whenever you have a significant change.

<h3>1) Cloning the repository</h3>

To create a local copy of the repository that you can make changes to, open your terminal and move into the directory where you want to set up your local copy. There is no need to create a new directory, as the ```git clone``` command will create the directory. Next, use the command

```git clone https://github.com/patrickhahn/minimax-game.git```

Now you should have a directory called 'minimax-game' which contains all the code from this repository.

<h3>2) Pulling changes by other team members</h3>

The code in your local repository will <i>not</i> update automatically in response to changes by other team members. All changes are pushed to the remote repository on GitHub, so you must manually "pull" (download) these changes to your local repository. Each time you start working on the project or whenever a teammate makes changes, move into the 'minimax-game' directory and run

```git pull```

If you have made changes in your local repository since your last push, you will want to apply your changes on top of the ones you are downloading, so you should commit any uncommitted changes (more on that later) and run

```git pull --rebase```

instead, so your changes will be applied.

<h3>3) Pushing your changes to the main repository</h3>

Whenever you have made a significant change you want to add, you must commit your changes, which 'saves' them to the repository along with a log message describing the changes. To commit, first make sure you are in your local 'minimax-game' directory and run

```git status```

to see which files were modified or added. If everything looks correct, you can stage all these changes for commit by running

```git add -A```

Now that everything is staged, you can run

```git commit -m "INSERT COMMIT MESSAGE HERE"```

and now all your changes are committed in the local repository. Before you push to the remote repository, you'll want to run ```git pull --rebase``` to pull in any changes your teammates might have made while you were working to avoid any conflicts. Finally, run

```git push```

to push your changes to the remote repository. You can go on the github page and check the list of commits, and the commit you just made should now show up in the log, since it was pushed to the main repository.

<h3>Summary</h3>

My general workflow look something like this each time I sit down to work on the project:

1) Open terminal and navigate to 'minimax-game' directory

2) Run ```git pull``` or, if you have uncommitted changes left over from your last session, commit them and run ```git pull --rebase```. If you don't want to commit the changes quite yet, you also have the option of doing a ```git stash``` to hide your changes before pulling, then run ```git pull'' followed by ```git stash pop``` to get your changes back.

3) Write code!

4) You have code you want to push

5) ```git status```, make sure everything looks right

6) ```git add -A``` to stage changes

7) ```git commit -m "insert messge here"``` to commit changes

8) ```git pull --rebase``` in case someone made changes while you were working.

9) ```git push``` to push changes to everyone.

10) Return to step 3

If you are still confused about how to git, Codecademy has a short git course you could check out: https://www.codecademy.com/learn/learn-git

Also, you can refer to the official git documentation here: https://git-scm.com/documentation
