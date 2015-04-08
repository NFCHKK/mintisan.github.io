# Source Insight 常用技巧

[TOC]


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




<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = 'mintisan';

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>

