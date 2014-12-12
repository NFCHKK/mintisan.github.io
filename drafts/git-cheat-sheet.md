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

```
$ git remote -v
```


```
$ git remote show <remote>
```

```
$ git remote add <remote> <url>
```

```
$ git fetch <remote>
```


```
$ git pull <remote> <branch>
```

★
```
$ git push <remote> :<branch>
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
To everybody else, it will look like the entire feature was developed in a single series of well-planned commits.Keep a project’s history clean and meaningful.

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

