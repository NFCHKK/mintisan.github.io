# Source Insight 常用技巧

[TOC]

## 官网

- http://www.sourceinsight.com/
- http://www.sourceinsight.com/docs35/UserManual.pdf

## 设置工程相对路径

用 SourceInsight 设置 [LIS3DH](http://www.st.com/web/cn/catalog/tools/FM147/CL1818/SC1885/PF258116) G-sensor 的 Linux 驱动为例进行说明，设置好之后就可以到处移动了。

0. 新建项目文件夹
![](http://mint-blog.qiniudn.com/si-path-setting.png)
1. 新建工程：`Project`->`New Project`
![](http://mint-blog.qiniudn.com/si-new-project.png)
此时，保持`Project Source Directory`默认设置即可
![](http://mint-blog.qiniudn.com/si-default-new-project-settings.png)
2. 点击`OK`之后，添加源代码文件
![](http://mint-blog.qiniudn.com/si-add-source-files.png)
**注意**：文件窗口还是显示绝对路径文件名。
![](http://mint-blog.qiniudn.com/si-source-path-1.png)
3. 修改项目设置：`Project`->`Default Project Settings`
修改`E:\linux_driver\lis3dh\si_prj`为`..\source`，如下图所示
![](http://mint-blog.qiniudn.com/si-project-settings-path.png)
此时，文件窗口仅仅显示文件名，路径名称消失。
![](http://mint-blog.qiniudn.com/si-source-path-2.png)
4. 另外，我们在移动项目时，最好将原工程中打开的文件在`Window List`中关闭，否则...
![](http://mint-blog.qiniudn.com/si-window-list.png)
否则，在别处打开的时候提示所打开的文件不存在。
![](http://mint-blog.qiniudn.com/si-file-not-exit-warning.png)
所以，不要拷贝工程修改之前需要将打开的文件在Window List中关闭，否则，你可能修改的是拷贝之前的源文件，如果你只是在本地移动整个工程目录Window List。

## 括号对歪问题

默认设置情况下，SI的`{}`对其会自动多缩进一块，如下图所示。

![](http://mint-blog.qiniudn.com/si-problem1.gif)

这是SI自作聪明造成，可以在菜单栏中的`Options -> Document Options -> Auto Indent...`中设置如下

![](http://mint-blog.qiniudn.com/si-problem2.png)

完成修改之后，括号不会对歪了

![](http://mint-blog.qiniudn.com/si-problem3.gif)

## 使用小技巧

- 按住"ctrl", 再用鼠标指向某个变量，点击一下，就能进入这个变量的定义。
- 让每个字符的宽度一致 : 选上"view --> draft view"， 就可以了。快捷键是 "Alt + F12"
- "shift+F8" 标亮所有文本中光标所在位置的单词
- 跳到某一行："ctrl + g"

## 主题

[Son of Obsidian for Visual Studio ](https://plus.google.com/+AndreaDellaCorte85/posts/KgwXQEdcFnN)

![Custom Son Of Obsidian](http://mint-blog.qiniudn.com/siCustomSonOfObsidian.png)

[Download Custom Son Of Obsidian](http://mint-blog.qiniudn.com/siCustomSonOfObsidian.CF3)

[Source Insight 3.5 Solarized(Light)配色方案  ](http://download.csdn.net/detail/heranl/8990411)
![Solarized-Light)](http://mint-blog.qiniudn.com/siSolarized-Light.png)

[Download Solarized-Light](http://mint-blog.qiniudn.com/siSolarized-Light.CF3)


[给 source insight 做了个 style 配色方案，风格类似 sublime text](http://www.amobbs.com/thread-5589365-1-1.html)
![Monokai](http://mint-blog.qiniudn.com/siMonokai.png)

[Download Monokai](http://mint-blog.qiniudn.com/siMonokai.CF3)


[Source Insight Extra（背景主题颜色+其它）](http://download.csdn.net/detail/better0332/2480193)
![ExtraBlack](http://mint-blog.qiniudn.com/siExtraBlack.png)

[Download ExtraBlack](http://mint-blog.qiniudn.com/siExtraBlack.CF3)

