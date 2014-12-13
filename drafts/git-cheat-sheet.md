# Git Cheat Sheet


## CREATE

clone 远程仓库到本地
```
$ git ssh://user@domain.com/repo.git
```

新建一个本地的仓库

```
$ git init
```

## WHO I AM

设置提交人信息
```
# Global
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

# Local
$ git config --local user.name "Your Name"
$ git config --local user.email "email@example.com"
```

查看 git 的配置信息
```
$ git config -l
```


## LOCAL CHANGES

★查看 workding directory 被改变的文件
```
$ git status
```

```
$ git diff
```

★
```
$ git add .
```

```
$ git add -p <file>
```

```
$ git commit -a 
```

★
```
$ git commit -m <message>
```

For **premature commits** : combine staged changes with the previous commit instead of committing it as an entirely new snapshot.
```
$ git commit --amend -m <message>

$ git commit --amend --no-edit

```

**ATTENTION** :  never amend commits that have been pushed to a public repository.

## COMMIT HISTORY

★
```
$ git log
```

```
$ git log --pretty=oneline

$ git log --oneline master

$ git checkout master
$ git log origin/master
```

```
$ git log -p <file>
```

★
```
$ git reflog
```


```
$ git blame <file>
```

## BRANCHES & TAGS

```
$ git branch
```

★
```
$ git checkout <branch>
```


```
$ git branch <new-branch>
```

```
$ git branch -b <new-branch>
```

```
$ git branch --track <new-branch>
```


```
$ git branch -d <branch>
```

★
```
$ git tag <tag-name>
```

## UPDATE & PUBLISH

▼List the remote connections you have to other repositories.
```
$ git remote
```

▼Same as the above command, but include the URL of each connection.
```
$ git remote -v
```


```
$ git remote show <name>
```

```
$ git remote add <name> <url>
```

▼Remove the connection to the remote repository called <name>.
```
$ git remote rm <name>
```

▼Rename a remote connection from <old-name> to <new-name>.
```
$ git remote rename <old-name> <new-name>
```

Fetch all of the branches from the repository. This also downloads all of the required commits and files from the other repository.
```
$ git fetch <remote>
```

Same as the above command, but only fetch the specified branch.
```
$ git fetch <remote> <branch>
```

`git pull` : fetch, then merge.
```
$ git pull <remote> <branch>
```

This simply moves your local changes onto the top of what everybody else has already contributed.
```
$ git checkout master
$ git pull --rebase origin
```

★
```
$ git push <remote> <branch>
```

Push all of your local branches to the specified remote.
```
$ git push <remote> --all
```


★
```
$ git push --tags
```

## MERGE & REBASE

★
```
$ git merge <branch>
```

The primary reason for rebasing is to maintain a linear project history. On the other hand, rebasing is like saying, “I want to base my changes on what everybody has already done.”
```
$ git rebase <base>

$ git rebase -i <base>
```
To everybody else, it will look like the entire feature was developed in a single series of well-planned commits.Keep a project’s history clean and meaningful.Many developers prefer rebasing over merging, since it’s like saying, “I want to put my changes on top of what everybody else has done.”

**ATTENTION** : Don’t Rebase Public History


```
$ git rebase --abort
```


```
$ git rebase --continue
```

```
$ git mergetool
```

```
$ git add <resolved-file>
```


```
$ git rm <resolved-file>
```

## UNDO

★
```
$ git reset --hard HEAD
```
**ATTENTION** :  never reset commits that have been pushed to a public repository.

```
$ git checkout HEAD <file>
```

★
```
$ git revert <commit>
```

```
$ git reset --hard <commit>
```


```
$ git reset <commit>
```

```
$ git reset --keep <commit>
```

