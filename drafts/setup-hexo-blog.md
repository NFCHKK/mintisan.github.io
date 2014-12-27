title: Hexo Blog
date: 2014-01-07 22:58:58
categories: [前端后端]
tags: [git,hexo,markdown]
---

 *建立博客主要用到的就是git和hexo，写博客的话，就用markdown。*

<!-- more -->


## **Git篇**
网上介绍Git的文章很多了。不过大都是以[GitHub](Github.com)为例进行讲解的。这里就以国内速度还可以的[GitCafe](https://gitcafe.com)。（我会告诉你这两个东东对我们用户来说是一样的么。）。

#### [**注册GitCafe**](https://gitcafe.com/signup)

#### **然后，看官网写的教程。**
[如何安装和设置 Git](https://gitcafe.com/GitCafe/Help/wiki/%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85%E5%92%8C%E8%AE%BE%E7%BD%AE-Git#wiki)

#### **多说一句**
在本地生成公钥之后，也就是
```
~/.ssh/id_rsa.pub
```
里面的内容，在windows下面，这玩意在哪里呢？  
~代表的是用户目录，也就是  
![用了Everthing你才晓得啥子是所输即所得](http://mint-blog.qiniudn.com/post-ssh-dir.png "")  
这里推荐用[**Everything**](http://xbeta.info/everything-search-tool.htm)，当然装这货不仅仅是为了这次找个.ssh文件夹而已，它是个人在Windows下面用过的“最爽”的软件。

#### 然后先把GitCafe放一放，看看Hexo先。

### **其他资料**
1. [Pro Git](https://gitcafe.com/beginning_git)
1.  [在windows平台使用github](http://itfan.github.io/#show/2013-06-07-use-github-on-windows "")
2.  [Github使用教程(一)--搭建Github环境](http://blog.csdn.net/gavincook/article/details/11992827)
3.  [史上最全github使用方法：github入门到精通](http://www.eoeandroid.com/thread-274556-1-1.html)
4.  [学习Git](http://yangjian.me/learning/learning-git/)



## **Hexo篇**
网上介绍Hexo的文章也很多了。
#### 安装[msysgit](http://code.google.com/p/msysgit/)和[Node.js](http://nodejs.org/)
#### 启动Git bash & 用npm命令安装hexo  
```
npm install hexo -g
```

#### 查看hexo版本，确认安装成功  
```
hexo version
```  
![看清楚了，这个是2.4.2版本](http://mint-blog.qiniudn.com/post-hexo-version.png "")


#### 进入指定目录并创建文件夹
```
cd d:
cd workplace/
``` 
![你自己建立的任何目录都可以](http://mint-blog.qiniudn.com/post-cd-dir.png "")
```
mkdir blog
cd blog/
pwd
```
![pwd-dir.png](http://mint-blog.qiniudn.com/post-pwd-dir.png "")

#### [**hexo**](https://github.com/tommy351/hexo)三板斧
```
hexo init
```
![其实，这里的每个文件都有自己的作用（废话），如igitignore就是忽略上传到GitCafe的内容，其他_config.yml是配置整个大框架，像C语言中的全局变量，对整个博客都有影响；scaffold就是生成文章时调用的模板库，后面我们用命令新建一个文章时就从这里调用，我们可以讲其改为适合我们的样式。](http://mint-blog.qiniudn.com/post-hexo-init-ls.png "")  
文件夹目录：  
![就看看文件夹的目录文件](http://mint-blog.qiniudn.com/post-hexo-init-dir.png "")  
这里简要介绍下重要的文件和文件夹：（其实只是我我晓得，O(∩_∩)O~，ps：推荐看一下我最后推荐的两篇博客，别人都写过了，你还在这里猜猜猜。）  
* _config.yml : 主要的配置文件，如该主题等等，参考[文档](http://zespia.tw/hexo/docs/)
* source/ :  写的文章实体就放在此处，就是那些个以md为后缀的Markdown文档
* themes/ :  [主题](https://github.com/tommy351/hexo/wiki/Themes)的位置，可以clone一些别人写，熟了就自己改改，一个主题对应一个文件夹
* public/ : generate生成的文件就放这里，为发布用，如果我没猜错的话，我们本地的server就是访问这个文件夹内的文件。

```
hexo generate
```
![前面的Public就是我们博客根目录下面的public，即生成要发布的内容，这些内容可以被浏览器读取之后展示给我们看。](http://mint-blog.qiniudn.com/post-hexo-generate.png "")  
generate的过程就是类似于C语言中编译的过程，在这里是用Node.js将前面文件夹的配置文件翻译成可以被浏览器识别的HTML、CSS和JS。
```
hexo server
```
![Theme就是博客根目录下面的/themes/lanscape，你在这个下面可以找到source文件夹，它是一个变量（上面的Public也是一个变量，只是恰好和文件夹同名），不是themes文件夹。](http://mint-blog.qiniudn.com/post-hexo-server.png "")  
生成一些建立本地服务器的一些文件-styl是啥？并以4000为端口。

#### 在浏览器中输入本地博客服务[地址](http://localhost:4000/)
```
http://localhost:4000/
```
![默认主题界面](http://mint-blog.qiniudn.com/post-landscape-hello.png "")   
前面我们用*hexo version*命令看到我们的hexo版本是2.4.2的，这个版本默认使用landscape主题的。  
![主题目录下面会有以主题名字命名的文件夹](http://mint-blog.qiniudn.com/post-landscape-thmes.png "")  
我们明明没有写文章，为啥就有“Hello World”了呢，老版本是需要手动输入命令设置的，这个版本直接默认生成了，这样在新手上手的时候又少了一步。那放在哪里呢？  
![2.4.2版本自动生成的文章](http://mint-blog.qiniudn.com/post-hello-world.png "")


### 修改主题
注：至于为啥要修改，那是因为网上绝大部分的教程是以另一个主题[light](https://github.com/tommy351/hexo-theme-light)为模板而讲解的，如它的名字，light主题也比较简洁。
#### 把light主题git clone到themes文件夹内
**坑**：此时确保你在blog的根目录。
```
git clone git://github.com/tommy351/hexo-theme-light.git themes/light
```
![git-clone-light.png](http://mint-blog.qiniudn.com/post-git-clone-light.png "")  
这样我们的themes下面就多出来一个light了  
![下载的新的light主题问文件夹，即主题名](http://mint-blog.qiniudn.com/post-themes-light.png "")  

#### 修改blog/_config.yml配置文件
**坑**：在_config文件中，用#或者//为注释。并将_config.yml文件另存为UTF-8编码格式，除非你不用中文，好吧，如果你碰到浏览器显示的时中文乱码，你就按照这个设置吧，不过话说在linux下面就默认不会又这个问题。
![防止乱码设置](http://mint-blog.qiniudn.com/post-UTF-8.png "")  

1. 修改theme项  
```
theme: landscape
```  
修改为  
```
theme: light
```  
**坑**：': '后面有一个空格space，并且不要不用tab，不然无法识别。
2. 运行程序并对照此[别人的教程修改-推荐加粗的两个网址，较详细](详见参考资料)或者[官方文档](http://zespia.tw/hexo/docs/)一项一项的实验：修改-保存-Ctrl+C-hexo+server-刷新。

#### 布置博客到网上
注：此时请确保完成第一部分的git配置，能够push项目到自己的repository，也就是完成了Git篇的内容。
首先，在自己的GitCafe中创建和账号一样的rep，  
![mint](http://mint-blog.qiniudn.com/post-gitcafe-mint.png "")  
然后，找到并修改博客根目录文件_config.yml文件中的deploy项：
```
#gitcafe
deploy:
  type: github
  repository: git@gitcafe.com:Mint/mint.git
  branch: gitcafe-pages
```
将上面的Mint/mint替换成自己的。
最后，运行如下命令。
```
hexo generate
hexo deploy
```
![发布到网上，其实Git和？Hexo是分开的，两个并无啥子关系，所以你本地配置好之后，也可以传到别的服务器上，见参考资料。](http://mint-blog.qiniudn.com/post-hexo-deploy.png "")

### **坑**
1. 在上面介绍了一些小坑，由于Hexo出来还不是太久，还是有很多的坑的，特别的，它对格式的要求很严格。如你在配置文件中间插入一个注释，generate错误了。所以，这里介意在修改配置文件的时候，不要在某个变量的中间放入注释。
给一个方法现场把。
修改hexo/themes/light/_config.yml中的widgets侧边栏变量，正常如下：
![正常情况下的设置](http://mint-blog.qiniudn.com/post-widgets-normal.png "") 
但是若在期间插入一个注释：
![插入一个注释行](http://mint-blog.qiniudn.com/post-widgets-abnormal.png "") 
就会报错： 
![终端就会实时检测到错误](http://mint-blog.qiniudn.com/post-widgets-abnorma-error.png "")
那么你需要将其放在最后就ok了：
![放到最后就ok了](http://mint-blog.qiniudn.com/post-widgets-modified.png "")  
2. 
要是你在改变了一个配置之后，生成不了，或者发布不了，而且改过去也生成不了，（也就是不可逆了，⊙﹏⊙b汗）。  
万金油：删除博客根目录下面的db.json和.deploy，然后generate && deploy；神马，还不行，删除public文件夹内的东东（不是删除public文件夹），然后再保存之后generate && deploy，用这招还没有返不回去的。还不行的话就Google，一般会定位到作者GitHub的主页iss讨论区。
2. 还有就是，你修改了文章或者配置文件之后，刷新浏览器，错位了，用Ctrl+C来停止hexo，再重启hexo服务器即可。

#### **拓展**
基础搞定了，还有很多可以折腾把玩的，如评论，文章下面放前后页，支持数学公式，添加图片和视屏，独立域名，High一下，侧边栏东东的添加等等。  
下面的参考资料都有说明。

### **参考资料**

1. [Hexo Github主页](https://github.com/tommy351/hexo)
2. [台湾主页](http://zespia.tw/hexo/)
3. [**使用Github Pages建独立博客**](http://beiyuu.com/github-pages/)
5.  [**hexo系列教程：（1-5）**](http://zipperary.com/categories/hexo//)
1.  [搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
2. [用Hexo搭博客啦](http://chenyue.me/2013/12/16/hexo-my-blog)
2.  [象写程序一样写博客：搭建基于github的博](http://blog.devtang.com/blog/2012/02/10/setup-blog-based-on-github/)
3.  [使用Github Pages搭建个人独立博客](http://hahaya.github.io/2013/06/26/build-blog-on-github.html)
6.  [2013工作室](http://www.studio2013.com/)
7. [使用hexo搭建静态博客](http://jimliu.net/2013/09/08/使用hexo搭建静态博客/)
8. [hexo你的博客](http://ibruce.info/2013/11/22/hexo-your-blog/)
9. [hexo数学公式](http://wugh.github.io/2013/11/12/hexo数学公式/)
10. [hexo中使用mathjax插入数学公式](http://www.winterland.me/2013/12/hexo-mathjax/)
11. [Hexo 优化与定制-添加前一篇和后一篇](http://nirdonkey.com/optimization-of-hexo.orz)


## **Markdown篇**
网上介绍Markdown的文章更多了。

### **参考资料**
1. [Markdown 语法说明(简体中文版)](http://wowubuntu.com/markdown/)
2. [Markdown-引领未来科技写作的博客利器](http://ux.etao.com/posts/620)
2. [献给写作者的 Markdown 新手指南](http://jianshu.io/p/q81RER)
3. [GitHub MD](https://help.github.com/articles/github-flavored-markdown)
4. [StackOverFlow MD](http://stackoverflow.com/editing-help)
3. [作业部落在线MD](http://www.zybuluo.com/mdeditor)
4. [马克飞象在线MD](http://maxiang.info/)
5. [StackEdit在线MD](https://stackedit.io/)
6. [MaHua在线MD](http://mahua.jser.me/)



>建立博客都不是事，坚持写文章才是事。