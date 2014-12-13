# SVN 使用笔记

> 集中式版本管理工具集大成者。

- 术语(Terminologies)
- 安装(Setup)
- 使用(usage)
    + 新建（create）一个远程仓库（repo)
    + 检出（checkout）
    + 本地操作：新建文件（new）、删除（delete）、修改（modified）、重命名（rename）
    + 提交（commit）
    + 日志（log）
    + 比较（diff）
    + 清除（clean up）
    + 撤销修改（revert）
    + 返回特定版本（revert to this version）
    + 更新（update）
    + 冲突（conflicts）
    + 锁（lock/unlock）
    + 分支（branches）
    + 节点（tags）
- 问题（Issues）
- 书籍（Books）




## 术语（Terminologies）


- **The Repository**: A repository is the heart of any version control system. It is central place where developers store all their work. Repository not only stores files but also history. Repository is accessed over a network, with repository acting as a sever and version control tool acting as a client. Client can connect to repository, and then they can store/retrieve their changes to/from repository. By storing changes, a client makes available these changes to other people and by retrieving changes; a client takes other people changes as a working copy.
- **Trunk**: The trunk is a directory where all the main development happens and is usually checked out by developers to work on the project.
- **Tags**: The tags directory is used to store named snapshots of the project. Tag operation allows to give descriptive and memorable names to specific version in the repository.
- **Branches**: Brach operation is used to create another line of development. It is useful when you want your development process to fork off into two different directions. For example, when you release version 5.0, you might want to create a branch so that development of 6.0 features can be kept separate from 5.0 bug-fixes.
- **Working copy**: Working copy is a snapshot of the repository. The repository is shared by all the team, but people do not modify it directly. Instead each developer checkout working copy. The working copy is private workplace where developer can do their work within isolated from the rest of the team.
- **Commit changes**: Commit is a process of storing changes from private workplace to central server. After commit, changes are made available to all the team. Other developer can retrieve these changes by updating their working copy. Commit is atomic operation. Either whole commit succeeds or is rolled back. Users never see half finished commit.


## 安装（Setup）

主要涉及以下三个软件，其中VisualSVN = Subversion + GUI管理界面：

- [VisualSVN](https://www.visualsvn.com/)（服务端）
- [TortoiseSVN](http://tortoisesvn.net/downloads.html)（客户端）
- [Subversion](http://subversion.apache.org/)（可选）

SVN 是集中式代码管理的集大成者。其架构是典型的C/S结构，Server 端保存着一份最完整的版本，并且分配多个客户端的权限。其安装和基本配置如下教程。

- [怎么安装SVN服务本地攻略](http://jingyan.baidu.com/article/29697b91312c2fab20de3c3f.html)
- [如何搭建SVN服务器端](http://jingyan.baidu.com/article/4b07be3c68942748b380f302.html)
- [SVN-TortoiseSVN安装和常用操作步骤](http://jingyan.baidu.com/article/2009576193bb38cb0721b4c3.html)
- [TortoiseSVN下载,安装,配置,常用操作 svn教程](http://jingyan.baidu.com/article/358570f6638aa4ce4724fcf7.html)


## 使用（usage）

使用SVN的**情景**大致为可以分为个人代码管理（Working with Subversion）和团队协作（Working with a Team）。

### 新建（create）一个远程仓库（repo)

直接用VisualSVN模仿服务器端建立Repo。
1. 创建一个新的仓库（Repo）
2. 选择文件系统
![](http://mint-blog.qiniudn.com/svn-create-new-repository-1.png)
3. 起一个合适的名字
![](http://mint-blog.qiniudn.com/svn-create-new-repository-2.png)
4. 设置恰当的项目目录结构
![](http://mint-blog.qiniudn.com/svn-create-new-repository-3.png)
5. 分配相关人等权限
![](http://mint-blog.qiniudn.com/svn-create-new-repository-4.png)
6. 完成
![](http://mint-blog.qiniudn.com/svn-create-new-repository-5.png)

### 检出（checkout）

在服务器端初始化一个仓库之后，我们先将其同步到本地：执行`Checkout`命令可以初次将远程仓库同步到本地（Working Copies）。
![](http://mint-blog.qiniudn.com/svn-checkout-1.png)
检出完成▼
![](http://mint-blog.qiniudn.com/svn-checkout-2.png)
这样我们本地就有了和远程仓库一样的项目副本▼
![](http://mint-blog.qiniudn.com/svn-checkout-3.png)


### 本地操作：新建文件（new）、删除（delete）、修改（modified）、重命名（rename）

在得到一个远程仓库的本地副本之后，我们就可以在本地的Repo中添加一些文件了。
如，我们可以在`test_svn\trunk`中新建`hello.c`，并添加一些代码：
```c
#include "stdio.h"

int main(int argc, char const *argv[])
{
    printf("%s\n", "Hello SVN");
    return 0;
}
```



注：其他操作和新建文件的过程类似。



### 提交（commit）
在我们增加了一个文件之后，需要进过`add`和`commit`两部来将其提交到服务端的远程仓库，第一步记录一下改变；第二步将本地提交到远程仓库。
![](http://mint-blog.qiniudn.com/svn-commit-1.png)

提交完成▼
![](http://mint-blog.qiniudn.com/svn-commit-2.png)


### 日志（log）
在我们提交的界面，TortoiseSVN给我们留了一块空白处来让我们说明为啥子要提交这个版本。并且，在这些log上可以单击右键，出来很多选项可以进行下一步操作。

![](http://mint-blog.qiniudn.com/svn-log-1.png)


### 比较（diff）
随着开发进程的推进，我们服务器提交了好些版本的代码，此时，我们相比较不同代码的区别，看看自己到底做了哪些改变。如果在没有SVN的时候，我们可能是保存两份代码，然后用[BeyondCompare](http://www.scootersoftware.com/)来比较。在SVN中，天然带了这个功能你开发过程中不同版本的代码的改变。

比如，现在我们往`hello.c`中增加一些代码，然后再提交这个版本。
1. 选中待比较的`commit
![](http://mint-blog.qiniudn.com/svn-diff-1.png)
2. 与当前工作区比较
![](http://mint-blog.qiniudn.com/svn-diff-2.png)
3. 选中比较的文件
![](http://mint-blog.qiniudn.com/svn-diff-3.png)
4. 比较观察
![](http://mint-blog.qiniudn.com/svn-diff-4.png)





### 清除（clean up）

用以清除当前工作区的修改，使其与最近一次提交的`commit`内容一致。
![](http://mint-blog.qiniudn.com/svn-cleanup-1.png)
清除成功▼
![](http://mint-blog.qiniudn.com/svn-cleanup-2.png)

### 撤销修改（revert）
如果在修改完成之后，我们不满意，想回到开始工作的状态。我们这里假设我们每次开始时的状态是提交过的。这时候，我们可以执行`TortoiseSVN->Revert`：

![](http://mint-blog.qiniudn.com/svn-revert-1.png)
撤销完成▼
![](http://mint-blog.qiniudn.com/svn-revert-2.png)


### 返回特定版本（revert  to this version）

如果我们想回到前面已经被提交过的版本，比如想从前面的版本上开发出一个分支。这时候我们就需要打开`TortoiseSVN->Show Log`。

![](http://mint-blog.qiniudn.com/svn-revert-3.png)




-------------------

如果仅仅作为个人的代码版本管理，以上的操作基本就可以胜任了。但若需要和其他人协同维护一份代码，那么可能需要增加一些**同步**的操作。比如当两个人A和B从远程仓库检出到本地，然后各自添加自己的代码，然后A向服务器提交自己的修改；之后，B也修改好了自己的部分，然后打算提交自己的部分，然后被提示如下：

![](http://mint-blog.qiniudn.com/svn-conflicts-1.png)


那么这时候，我们需要去解决这个冲突，请参考`冲突(confilicts)`一节。

### 更新（update）

`SVN Update`是提交（commit）的反方向的，是将服务器端的最新版本更新到本地。
![](http://mint-blog.qiniudn.com/svn-update-1.png)

▼在无冲突的情况下`update`完成，本地的Working Copy和远程的Repo保持一致。
![](http://mint-blog.qiniudn.com/svn-update-2.png)



### 冲突（conflicts）

但是，有时候我们在`update`之后就进行自己的工作，进行修改；而此时别人将他自身的修改`update`到Repo中。当我们修改完之后`update`到Repo就有可能遇到冲突▼

![](http://mint-blog.qiniudn.com/svn-conflicts-1.png)
▼需要将Repo上的最新版下载下来
![](http://mint-blog.qiniudn.com/svn-conflicts-2.png)
▼选择需要合并的文件
![](http://mint-blog.qiniudn.com/svn-conflicts-3.png)
▼对比修改
![](http://mint-blog.qiniudn.com/svn-conflicts-4.png)
▼修改完成
![](http://mint-blog.qiniudn.com/svn-conflicts-5.png)
▼提交合并之后的最终版本
![](http://mint-blog.qiniudn.com/svn-conflicts-6.png)




### 锁（lock/unlock）

锁的功能是将冲突防范于未然。当我将某个文件或者文件夹`TortoiseSVN->Get Lock`，并且可以添加锁文件的一些信息，比如自己的联系方式。此时别人就无法对被锁的文件进行提交。
▼甲方将文件锁住
![](http://mint-blog.qiniudn.com/svn-lock-1.png)

▼乙方无法提交被锁定的文件
![](http://mint-blog.qiniudn.com/svn-lock-2.png)


此时，就需要我们人工去和锁上文件的开发人员进行协商。请他释放对文件的锁`TortoiseSVN->Release Lock...`。▼
![](http://mint-blog.qiniudn.com/svn-unlock-1.png)


### 分支（branches）

使用分支一般发生在以下两种情景：
1. 一个人自己写着写着一个代码，或者突然跑过来一个人说能不能在你现在主干的代码上改一下一个特性看一下效果。但是我们自己却不想破坏现在的工作现场，不然待会还要还原现场，又不像`复制+粘贴`保留一个副本，我们就是用上`branches`来充当**临时缓冲区**的功能，用完删掉就可以了。当然，如果试验完临时的特性之后觉得还不错，就可以`merge`进来。
2. 需要从当前`trunk`上分出一个分支来长期发展，也就是说之后将会保持两条线向前发展，这时候也是需要分支的。



以下就以生成主干`trunk`为例进行演示：

1. 右键选中我们要为其创建分支的对象（trunk），点击`TortoiseSVN->Branch/tag...`生成
![](http://mint-blog.qiniudn.com/svn-branches-1.png)
![](http://mint-blog.qiniudn.com/svn-branches-2.png)
2. 此时我们设定的`b2`是在远程Repo上，需要执行`update`。
![](http://mint-blog.qiniudn.com/svn-branches-3.png)
3. 在`./branches/b2`中修改，测试。完成之后如果觉得不测，需要将`commit`之后才能`merge`到`trunk`中。当然也是需要在`trunk`上右键`merge`。
![](http://mint-blog.qiniudn.com/svn-branches-4.png)
![](http://mint-blog.qiniudn.com/svn-branches-5.png)
![](http://mint-blog.qiniudn.com/svn-branches-6.png)
![](http://mint-blog.qiniudn.com/svn-branches-7.png)
4. 如果此时你的`trunk`也修改相同的内容，就会发生冲突，参考**冲突**解决之后即可。
5. 再将修改之后的`trunk`内容`commit`到远程Repo。

### 节点（tags）

节点可以认为是一个milestone。比如可以把某一阶段之后的发行版放在此处，其他的源码管理放在trunk和branches。
▼选定保存`tag`的位置和名称
![](http://mint-blog.qiniudn.com/svn-tags-1.png)
▼`tag`保存完成
![](http://mint-blog.qiniudn.com/svn-tags-2.png)

注意：此时`tag`是保存在服务器上的，需要先同步到本地。可以`update`把远程Repo的更新下来。
![](http://mint-blog.qiniudn.com/svn-tags-3.png)


- [ 怎样使用svn/svn使用方法/教程/](http://jingyan.baidu.com/season/37040)


## 问题（Issues）



- [怎么设置TortoiseSVN，实现文件夹过滤](http://jingyan.baidu.com/article/cbf0e500f164562eab28935a.html)
- [如何清除SVN的用户名和密码](http://jingyan.baidu.com/article/d45ad148ed12c469552b801b.html)
- [SVN版本控制图标未显示或显示异常解决方法](http://jingyan.baidu.com/article/4d58d541c819a89dd4e9c0e6.html)



## 书籍（Books）


- [SVN Turorial](http://www.tutorialspoint.com/svn/svn_tutorial.pdf)
- [TortoiseSVN Help](http://tortoisesvn.net)
- [Pragmatic Guide to Subversion](http://book.douban.com/subject/4724304/)
- [Pragmatic Version Control Using Subversion](http://book.douban.com/subject/1887817/)
- [Version Control with Subversion](http://svnbook.red-bean.com/)
- [Practical Subversion (Expert's Voice in Open Source)](http://www.amazon.com/exec/obidos/ASIN/1590597532/httpwwwtuto0a-20)
- [TortoiseSVN 1.7 Beginner's Guide](http://www.amazon.com/exec/obidos/ASIN/1849513449/httpwwwtuto0a-20)
