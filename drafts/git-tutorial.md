# Git & Gerrit 学习笔记

1. 初始化git仓库
```
$ git clone ssh://[username] : [path] / [project name]
```
3. 配置 Git 配置环境
```
$ git config --global user.name "xxxx"
$ git config --global user.email "xxxx"
```
3. 安装Hook钩子（Gerrit所需必用）
```
$ scp -p -P 29418 [username]@192.168.0.241:hooks/commit-msg .git/hooks/
```
4. 进行`edit->add->commit`过程，并用`status`和`log`查看当前`git`的状态
```
## 添加readme.txt
$ touch readme.txt
## 文件修改添加到暂存区
$ git add readme.txt
## 或者添加所有被改变的文件
$ git add .
## 添加到本地仓库的当前分支上
$ git commit -m "xxxxx"
## 查看当前本地仓库的状态
$ git status
## 查看提交历史记录
$ git log
## 如果参数太多，可以使用单行版
$ git log --pretty=oneline
```
5. 如果在`edit->add->commit`过程中，修改了工作区的内容，却反悔了,想丢弃工作区的修改
```
$ git checkout -- [file name]
```
6. 如果在`edit->add->commit`过程中，`commit`之后反悔了，则可以回滚到上一版本；或者可以用`reflog`回到任意你想回到的版本
```
## 回到上一个版本
$ git reset --hard HEAD

## git提供了一个git reflog命令来记录你的每一次命令。
$ git reflog

## 再回到未来某个版本
$ git reset --hard [xxxxxxx]
```
7. 当你不但乱改了工作区的内容，还修改了暂存区的内容，想丢弃修改，分两步：
1：git reset HEAD file
2: git checkout -- file
假设你删除了某个文件，有两个选择，第一是你确实想删除某个文件，那就是：
git rm file
第二就是在你删错了，想还原，那就是：
git checkout -- file
创建sshkey：
ssh-keygen -t rsa -C "youemail@example.com"
接下来一路回车，生成两个文件：id_rsa是私匙，不能泄露。id_rsa.pub是公匙。可以放心告诉任何人
登陆github，add ssh key，title任意填写，key里边粘贴id_rsa.pub内容即可。
远端先创建一个仓库，点击Create a new repo,填写仓库名字learngit，其他默认，点击Create repository。
关联一个远程库：
git remote add origin git@github.com:guangmangdz/learngit.git
接下来再推送：
```
$ git push origin HEAD:refs/for/master
```

实际上就是把当前分支推送到远程。由于远端库是空的，所以加了-u参数，以后可以不加。
从现在起，只要本地做了提交，就可以通过命令：
git push origin master，把本地master分支最新更改推送之github。
从远程库克隆：
git clone git@github.com:xxxxxxxx/xxxxx.git
接下来：分支管理
创建分支，例如dev：
git checkout -b dev
也可以用一下两条命令创建：
git branch dev，创建dev分支
git checkout dev,切换到dev分支
列出当前分支：
git branch
合并分支：
git merge dev，操作前提是已经处于master分支状态
合并完成后，就可以放心的删除dev分支了：
git branch -d dev
察看git分支合并图：
git lob --graph
正常的合并是fast forward模式，当然也可以禁用：
git merge --no-ff -m "merge with no-ff" dev
首先，master分支应该是非常稳定的，也就是用来发布新版本，平时不用在上面干活。干活都在dev分支上，也就是说，你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，是不是的往dev分支上合并就可以了。
bug分支：
假如这种情况，你正在dev分支下写代码，但还没写完，又不能提交，而此时接到一个紧急处理bug的紧急任务，且该人物来源于master分支。可以先用git stash将当前工作现场储存起来。
bug解决完了，再回到dev分支，如何恢复现场？
1：git stash apply，恢复后，stash不删除，需要调用git stash drop
2: git stash pop，恢复同时把stash内容也删除。
feature分支：
开发过程中，有无穷无尽的新功能添加进来，但你不希望一些实验性质的代码把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发。
git checkout -b feature
开发完成后，切回dev，准备合并
git checkout dev
但是！突然该功能要求取消，必须销毁这个分支：
git branch -d feature,正常的话会提示销毁失败，因为还未合并，所以就来了下面的命令：
git branch -D feature，强制删除一个分支
多人写作：
察看远程库信息：
git remote
加-v可以察看更详细的信息：
git remote -v
推送分支：
git push origin master
git push origin dev
你的小伙伴想在dev分支下开发，就必须创建远程origin的dev分支到本地：
git checkout -b dev origin/dev
多人写作工作模式通常如下：
1、首先，试图用git push origin branch-name推送自己的修改
2、如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并
3、如果合并有冲突，则解决冲突，并在本地提交
4、没有冲突或者解决冲突后，在用git push origin branch-name推送就能成功
5、如果git pull提示“no tracking infor...”，说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name
标签管理：
发布一个新版本时，通常大一个标签。这个标签唯一确定了打标签时刻的版本。标签也是版本库的一个快照。
git tag xxx
察看所有标签：
git tag
给历史某次提交的commit id打标签：
git tag vx.x xxxxxxx
创建带说明的标签：
git tag -a vx.x -m "tags shuoming" xxxxxxx
打错了标签，也可以删除：
git tag -d Vx.x
推送某个标签到远程：
git push origin vx.x
一次性推送所有未推送的标签到远程：
git push origin --tags
删除远程标签（需先删除本地标签）：
git tag -d v0.9
git push origin :refs/tags/v0.9
让git显示颜色：
git config --global color.ui true
git可以忽略特殊文件，所有配置文件在：
https://github.com/github/gitignore
.gitignore文件本身也需要放到版本库里
最后说说搭建git服务器：
1、ubuntu或debian及其，安装git
sudo apt-get install git
2、创建一个git用户，用来运行git服务
sudo adduser git
3、创建证书登陆：
收集所有需要登陆的用户的公匙，把所有公匙导入到home/git/.ssh/authorized_keys文件里，易行一个。
4、初始化git仓库：
sudo git init --bare sample.git
5、把owner改为git：
sudo chown -R git:git sample.git
6、禁用shell登陆：编辑etc/passwd
git:x:1001:1001:,,,:/home/git:/bin/bash
改为
git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
