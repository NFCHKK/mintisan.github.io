# Sublime Text 使用小记

[TOC]

![Sublime Text](http://mint-blog.qiniudn.com/sublime-text-1.png)

如何安装插件详见：https://packagecontrol.io/installation

## C语言

1. [Alignment](http://wbond.net/sublime_packages/alignment)：选中并按`ctrl+alt+a`就可以使其按照等号对其。
![按等号对其，强迫症患者必备](http://mint-blog.qiniudn.com/sublime-text-2.gif)
2. [C Improved](https://github.com/abusalimov/SublimeCImproved)：更加人性化的C语言着色方案。
![着色对比，还不错](http://mint-blog.qiniudn.com/sublime-text-3.png)
![最好设置为默认用C Improved打开C文件](http://mint-blog.qiniudn.com/sublime-text-4.png)
3. [CoolFormat](http://akof1314.github.io/CoolFormat/)：简单好用的代码格式化工具，相当于简化版的Astyle，默认`ctrl+alt+shift+q`格式化当前文件，`ctrl+alt+shift+s`格式化当前选中。
![默认选中按`ctrl+alt+shift+s`格式化当前](http://mint-blog.qiniudn.com/sublime-text-5.gif)
**注**：格式的设置可以打开控制面板，输入CoolFormat : Formatter Setting，C/C++文档参考[此处](http://akof1314.github.io/CoolFormat/doc/Cpp.html)
![控制面板相关命令](http://mint-blog.qiniudn.com/sublime-text-6.png)
4. [DocBlockr](https://github.com/spadgos/sublime-jsdocs)：自动生成大块的注释，并且可以用`tab`在不同内容之间切换，很爽的
![用`tab`在参数之间平滑切换](http://mint-blog.qiniudn.com/sublime-text-7.gif)
![当然，不在函数上面也可以比较方便的生成注释块](http://mint-blog.qiniudn.com/sublime-text-8.gif)
**注**：安装完重启一下，否则可能效果不理想，比如`tab`跳到别的地方去了
5. [ AllAutocomplete](https://github.com/alienhard/SublimeAllAutocomplete)：Sublime自带的可以对当前文件中的变量和函数名进行自动提示，但是AllAutocomplete可以对打开的所有文件的变量名进行提示，增强版的代码自动提示符。
> Extend Sublime autocompletion to find matches in all open files of the current window
6. [CTags](https://github.com/SublimeText/CTags)：可以在函数的声明和定义自检来回跳转了，首先需要[下载Ctags](http://ctags.sourceforge.net/)，比如我存在D盘的根目录下，之后需要在Sublime中配置路径。
![Ctags路径设置](http://mint-blog.qiniudn.com/sublime-text-9.png)
然后在工程文件夹的右键生成索引文件，
![为工程文件夹内的文件生成索引](http://mint-blog.qiniudn.com/sublime-text-10.png)
然后就可以用`ctrl+shift+左键`跳转到定义处了，`ctrl+shift+右键`回来了（不过，还是没有Source Insight方便，可以实时小窗口预览）
![跳过来跳过去](http://mint-blog.qiniudn.com/sublime-text-11.gif)
7. [SublimeAStyleFormatter](http://theo.im/SublimeAStyleFormatter/)：国人做的Astyle Sublime版，蛮不错的。
安装完成之后，下面这个配置一定要打开，即保存自动格式化，这个相比于CoolFormat要简单很多。
![保存自动格式化配置](http://mint-blog.qiniudn.com/sublime-text-12.png)
![按`ctrl+s`保存的同时自动格式化当前文件](http://mint-blog.qiniudn.com/sublime-text-12.gif)

## 增强

1. [WordCount](https://github.com/titoBouzout/WordCount)：可以实时显示当前文件的字数。
![安装后，后下角多出字数](http://mint-blog.qiniudn.com/sublime-text-13.png)
2. [EncodingHelper](https://github.com/titoBouzout/EncodingHelper)：编码众多，比较丰富
![安装后，在右下角的`UTT-8`右键可以将其他编码转换成UTF-8](http://mint-blog.qiniudn.com/sublime-text-14.png)
3. [ConvertToUTF8](https://github.com/seanliang/ConvertToUTF8)：比上面的那个要方便，直接在菜单栏中可以转了，专为中文设计，妈妈再也不通担心中文乱码问题了
![安装后，将可以将常用中文编码转换成UTF-8](http://mint-blog.qiniudn.com/sublime-text-15.png)
4. [ Terminal](http://wbond.net/sublime_packages/terminal)：Sublime版的`在当前文件夹内打开`
![增加Open Terminal Here，快捷键为`Ctrl+Shift+T`](http://mint-blog.qiniudn.com/sublime-text-16.png)
5. [Side​Bar​Enhancements](https://github.com/titoBouzout/SideBarEnhancements)：右键一下子多处那么多选择，：D
![会在FOLDERS右键菜单上多出很多选项](http://mint-blog.qiniudn.com/sublime-text-17.png)
6. [SideBarFolders](https://github.com/titoBouzout/SideBarFolders)：打开的文件夹都太多了，再用这个来管理文件夹
![安装后会在`菜单栏`多出Folders来管理文件夹](http://mint-blog.qiniudn.com/sublime-text-18.png)
7. [Compare Side-By-Side](https://bitbucket.org/dougty/sublime-compare-side-by-side)：Sublime版本的BeyongCompare，虽然没那么强大，但是也非常够用了，真是一个插件就是一个软件
![在待比较的Tab上右键选择`Compare with...`，然后选择另一个打开的比较对象即可，Sublime会自动弹出新的窗口显示两个文件](http://mint-blog.qiniudn.com/sublime-text-19.png)
8. [BracketHighlighter](https://github.com/facelessuser/BracketHighlighter)：显示我在哪个括号内，前端和Lisp的福音啊
![会在行号的左侧显示当前所在的括号类型](http://mint-blog.qiniudn.com/sublime-text-20.png)
![或者前端使用时更有用点](http://mint-blog.qiniudn.com/sublime-text-21.png)
9. [PlainTasks](https://github.com/aziz/PlainTasks)：又是一个插件顶一个软件的东东
![带上TODO的本文会被PlainTasks识别](http://mint-blog.qiniudn.com/sublime-text-22.png)
10. [TrailingSpaces](https://github.com/SublimeText/TrailingSpaces)：强迫症患者必备
![高亮显示尾部多余的空格，强迫症患者专用](http://mint-blog.qiniudn.com/sublime-text-23.png)
11. [AdvancedNewFile](https://github.com/skuroda/Sublime-AdvancedNewFile)：看名字就知道来，可以配置新建文件的附属文件，直接生成一个工程都可以
![`ctrl+alt+shfit+n`可以设定额外生成的文件](http://mint-blog.qiniudn.com/sublime-text-24.png)
12. [HexViewer](https://github.com/facelessuser/HexViewer)：玩单片机的玩家都懂这个是很重要的
![用`ctrl+alt+p`打开hex命令，分析hex文件利器](http://mint-blog.qiniudn.com/sublime-text-25.png)
13. [Search Stack Overflow](https://github.com/ericmartel/Sublime-Text-2-Stackoverflow-Plugin)：就是不想动鼠标，直接在Sublime中打开浏览器搜索Stackoverflow
![`ctrl+shift+p`打开stackoverflow，输入问题，自动打开浏览器](http://mint-blog.qiniudn.com/sublime-text-26.png)

## 主题

1.  软件自带：在`Preferences->Color Theme`中可以任意选择，选择完即可查看主题风格，不用重启。并且会在`Preferebces.sublime-seetings`中自动保存设定。
![Color Theme](http://mint-blog.qiniudn.com/sublime-text-27.png)
2. [官方插件](https://packagecontrol.io/browse/labels/theme)搜索安装，不过基本上都被下面那个网站收纳了，并做了一个管理主题的插件，方便预览和安装。在设置一个新的主题时，需要设置`theme`和`color_scheme`两个方面，前者决定了打开不同类型文件的配色，后者决定了Tab栏，SideBar大小和图标，以及相应字体的大小设置。
3. [ColorSublime](http://colorsublime.com/)：一个Sublime主题的网站，推荐使用`Package Control`的方式来[安装](http://colorsublime.com/how-to-install-a-theme)[ColorSublime插件](https://github.com/Colorsublime/Colorsublime-Plugin)，安装完可以使用在控制面板中移动上下箭头就可以预览，回车即可安装。
![预览主题](http://mint-blog.qiniudn.com/sublime-text-28.gif)
4. [Predawn](https://github.com/jamiewilson/predawn)：一款为Sublime和Atom打造的暗色主题，可以定义Tab的大小，SideBar大小，Find栏大小，为Markdown高亮着色，并提供主题同款的ICON。
![predawn](http://mint-blog.qiniudn.com/sublime-text-29.png)
5. [Spacegray](https://github.com/kkga/spacegray)：3种不同深度的颜色，可以定义Tab的大小，SideBar字体大小，文件之间的间隔大小。
![Spacegray](http://mint-blog.qiniudn.com/sublime-text-30.png)
![Spacegray Light](http://mint-blog.qiniudn.com/sublime-text-31.png)
![Spacegray Eighties](http://mint-blog.qiniudn.com/sublime-text-32.png)
6. [Material Theme](http://equinusocio.github.io/material-theme/) : The most epic theme for Sublime Text 3
```
"theme": "Material-Theme.sublime-theme","color_scheme": 
"Packages/Material Theme/schemes/Material-Theme.tmTheme",
```
![Default](http://mint-blog.qiniudn.com/sublime-text-33.png)
```
"theme": "Material-Theme-Darker.sublime-theme","color_scheme": 
"Packages/Material Theme/schemes/Material-Theme-Darker.tmTheme",
```
![Darker](http://mint-blog.qiniudn.com/sublime-text-34.png)
```
"theme": "Material-Theme-Lighter.sublime-theme","color_scheme": 
"Packages/Material Theme/schemes/Material-Theme-Lighter.tmTheme",
```
![Ligher](http://mint-blog.qiniudn.com/sublime-text-35.png)


## Markdown


1. [MarkDown Editing](https://github.com/SublimeText-Markdown/MarkdownEditing)：支持Markdown语法高亮；支持Github Favored Markdown语法；自带3个主题。
![MarkDown Editing 界面](http://mint-blog.qiniudn.com/sublime-text-36.png)
![主题选择](http://mint-blog.qiniudn.com/sublime-text-37.png)
**注：**如果你安装完之后，遇到了如下的[错误](https://github.com/SublimeText-Markdown/MarkdownEditing/issues/115)，那么你安装的时候可能开着一个Markdown文件，所以卸载完之后在不打开Markdown的情况下再次安装就可以解决了。
![Markdown.tmLanguage错误](http://mint-blog.qiniudn.com/sublime-text-38.png)
2. [MarkdownPreview](https://github.com/revolunet/sublimetext-markdown-preview)：按`CTRL + B`生成网页HTML；在最前面添加`[TOC]`自动生成目录；
![Markdown 生成HTML预览](http://mint-blog.qiniudn.com/sublime-text-39.png)
3. [Markdown Extended](https://github.com/jonschlinkert/sublime-markdown-extended) + [Extends Monokai](https://github.com/jonschlinkert/sublime-monokai-extended)：不错的Markdown主题，支持对多种语言的高亮
![C语言语法高亮](http://mint-blog.qiniudn.com/sublime-text-40.png)
4. [OmniMarkupPreviwer](http://theo.im/OmniMarkupPreviewer/)：**实时**在浏览器中预，而`MarkdownPreview`是需要手动生成的和F5的。览如果双屏的话，应该具有不错的体验。快捷键如下：
    - `Ctrl+Alt+O`: Preview Markup in Browser.
    - `Ctrl+Alt+X`: Export Markup as HTML.
    - `Ctrl+Alt+C`: Copy Markup as HTML.
![实时在浏览器中显示编辑的文档](http://mint-blog.qiniudn.com/sublime-text-41.gif)
5. [TableEditor](https://github.com/vkocubinsky/SublimeTableEditor)：Markdown中的表格书写体验真心不咋样，所有有人为这个开发了一个插件，具有较好的自适应性，会自动对齐，强迫症患者喜欢。
首先需要用`ctrl + shift + p`打开这个功能（Table Editor: Enable for current syntax or Table Editor: Enable for current view or "Table Editor: Set table syntax ... for current view"），然后就可以狂用`tab`来自动完成了~~~
![用`tab`来自动完成表格间的切换和下一行表格的生成](http://mint-blog.qiniudn.com/sublime-text-42.gif)
6. [Markdown TOC](https://github.com/naokazuterada/MarkdownTOC)：编辑MD文件的时候可以查看自动生成，并且可以控制生产目录的层次，不过不会自动跳转。编辑的时候可以看看，如果需要生成的HTML具有超链接跳转的功能，还是用**MarkdownPreview**吧。
![修改目录深度实时在MD文件中预览，不过这个用`CTRL+R`就可以产看，个人觉得不太实用](http://mint-blog.qiniudn.com/sublime-text-43.gif)

## Git

1. [SublimeGit](https://sublimegit.net/)：Git党必备
在安装后，如果在使用`ctrl+shift+p`输入一些个Git命令之后，弹出如下的错误提示，那么可能是因为Git可执行命令没有加入到环境变量中。
![提示Git命令不在PATH中错误](http://mint-blog.qiniudn.com/sublime-text-44.png)
**解决办法**：将Git的bin文件夹目录添加到系统环境变量，然后重启Sublime即可，嗯，一定要重启Sublime才可以使用。
此时，可以使用`git status`，`git log`等常用命令，但是一旦使用`git pull`来与远程服务器同步，此时就发现Sublime下面的状态栏就会一直来回摆动，无法与远程同步，原因为仅仅将Git命令加入Path是不够的，需要安装[msysgit](https://msysgit.github.io/)时选择将其集成到Windows中，如下图所示：
![将Git集成到Windows命令行选项中](http://mint-blog.qiniudn.com/sublime-text-45.png)
好吧，此时才将Git命令集成到Sublime中。输入`ctrl+shift+p`，输入`git `显示可以调用的相关命令如下图所示。
![集成到Sublime中的Git命令](http://mint-blog.qiniudn.com/sublime-text-46.png)
2. [GitSavvy](https://github.com/divmain/GitSavvy)：SublimeGit的同类竞品
3. [GitGutter-Edge](https://github.com/jisaacks/GitGutter)：实时显示当前工作区的文件与以下四种的区别
    - Compare against HEAD(默认选项)
    - Compare against particular branch
    - Compare against particular tag
    - Compare against specific commit
如果选择默认的第一个选项，就可以实时看到当前的工作区（workplace）相对于最近一次提交（HEAD）的修改。
4. [Gitignore](https://github.com/kevinxucs/Sublime-Gitignore)：一键生成[the collection of gitignore boilerplates by Github](https://github.com/github/gitignore)，多种文件类型任你选，以下用Gitignore新建C语言的忽略文件模板。
![用Gitignore新建`.gitignore`模板文件](http://mint-blog.qiniudn.com/sublime-text-47.gif)
5. [Git Config](https://github.com/robballou/gitconfig-sublimetext)：设置`.gitignore`和`.gitconfig`等文件语法高亮。
![安装完后可设置为Git Ignore或者Git Config高亮显示](http://mint-blog.qiniudn.com/sublime-text-48.png)
6. [SideBarGit](https://github.com/titoBouzout/SideBarGit)：在侧边栏的右键上增加Git常用操作，鼠标党喜欢的方式
![左右资源栏出现`Git`一项可以调用常用Git命令](http://mint-blog.qiniudn.com/sublime-text-49.png)
7. [Github Tools](https://github.com/temochka/sublime-text-2-github-tools) / [Sublime GitHub](https://github.com/bgreenlee/sublime-github)：与GitHub网站紧密联系，可以直接在Sublime中打开与GitHub关联的网址
![Sublime GitHub](http://mint-blog.qiniudn.com/sublime-text-50.png)
8. [GitHub Sublime Theme](https://github.com/AlexanderEkdahl/github-sublime-theme)：一款GitHub主题，好像和Git没啥关系，乱入的
9. [Git Conflict Resolver](https://github.com/Zeeker/sublime-GitConflictResolver)：用以解决在Merge过程中产生的冲突用
![Git Conflict Resolver命令](http://mint-blog.qiniudn.com/sublime-text-51.png)
10. [Sublime Merger](http://www.sublimerge.com/)：各种比较，套用官方的话和图如下
> Sublimerge brings the missing side-by-side diff to Sublime Text and turns your favorite editor into the professional diff and merge tool with amazing features!
![看上去很强大的样子](http://mint-blog.qiniudn.com/sublime-text-52.png)
![Sublime Merger命令](http://mint-blog.qiniudn.com/sublime-text-53.png)
11. [Sublime Gerrit](https://github.com/borysf/SublimeGerrit)：使用在Git之上搭建起来的Gerrit Code Review的命令与原生有点不同，因为Gerrit默认是推送到中间用于Review的缓冲区的，只有Reivew通过之后才会并入真正的代码版本库。其命令使用如下：
![Sublime Gerrit命令](http://mint-blog.qiniudn.com/sublime-text-54.png)

## 技巧
1. 用`ctrl+b`调用Windows批处理`bat`
首先，`Tools`->`Build System`->'New Build Sytem...'
```
{
    "shell_cmd": "make"
}
```
然后，修改并保存
```
{
    "cmd": ".\\Build.bat"
}
```

## 学习资源


### 教程
- [Sublime Text 全程指南][1]
- [Sublime Text 2 入门及技巧][2]
- [Sublime Text 使用介绍、全套快捷键及插件推荐][3]
- [Sublime Text 3 学习及使用][4]
- [Sublime Text 3 使用心得][5]
- [Sublime Text 3 新手上路：必要的安裝、設定與基本使用教學][6]
- [Perfect Workflow in Sublime 2][7]
- [6 Ways to Turn Sublime Text Into the Perfect Blogging Tool][8]
- Scotch Series
    - [Best of Sublime Text 3: Features, Plugins, and Settings][9]
    - [Sublime Text Keyboard Shortcuts][10]
    - [THE COMPLETE VISUAL GUIDE TO SUBLIME TEXT 3][11]
    - [Themes, Color Schemes, and Cool Features][12]
    - [Getting Started and Keyboard Shortcuts][13]
    - [Plugins Part 1][14]
    - [Plugins Part 2][15]
- [Working With Code Snippets In Sublime Text][16]
- [The Best Plugins for Sublime Text][21]

### 视屏
- [快乐的sublime编辑器](http://www.imooc.com/learn/333)
- [前端开发工具技巧介绍—Sublime篇](http://www.imooc.com/learn/40)
- [Perfect Workflow in Sublime Text 2](http://code.tutsplus.com/courses/perfect-workflow-in-sublime-text-2)

### 书籍
- [Sublime Text 手冊][17]
- [Sublime Text Unofficial Documentation][18]
- [Sublime Text Power User][19]
- [Instant Sublime Text Starter](https://www.packtpub.com/hardware-and-creative/instant-sublime-text-starter-instant)
- Mastering Sublime Text
- [Sublime Productivity][20] 


  [1]: http://zh.lucida.me/blog/sublime-text-complete-guide/
  [2]: http://lucifr.com/2011/08/31/sublime-text-2-tricks-and-tips/
  [3]: http://www.daqianduan.com/4820.html
  [4]: http://blog.csdn.net/idxuanjun/article/details/13292847
  [5]: http://ce.sysu.edu.cn/hope/Item/106853.aspx
  [6]: http://blog.miniasp.com/post/2014/01/07/Useful-tool-Sublime-Text-3-Quick-Start.aspx
  [7]: http://code.tutsplus.com/courses/perfect-workflow-in-sublime-text-2
  [8]: http://sublimetexttips.com/sublime-productivityuctivityroductivityuctivity
  [9]: http://scotch.io/bar-talk/best-of-sublime-text-3-features-plugins-and-settings
  [10]: http://scotch.io/bar-talk/sublime-text-keyboard-shortcuts
  [11]: http://scotch.io/series/the-complete-visual-guide-to-sublime-text-3
  [12]: http://scotch.io/bar-talk/the-complete-visual-guide-to-sublime-text-3-themes-color-schemes-and-cool-features
  [13]: http://scotch.io/bar-talk/the-complete-visual-guide-to-sublime-text-3-getting-started-and-keyboard-shortcuts
  [14]: http://scotch.io/bar-talk/the-complete-visual-guide-to-sublime-text-3-plugins-part-1
  [15]: http://scotch.io/bar-talk/the-complete-visual-guide-to-sublime-text-3-plugins-part-2
  [16]: http://www.hongkiat.com/blog/sublime-code-snippets/
  [17]: http://docs.sublimetext.tw/
  [18]: http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/index.html
  [19]: http://ipestov.com/the-best-plugins-for-sublime-text/
  [20]: https://leanpub.com/sublime-productivity
  [21]:https://scotch.io/bar-talk/best-of-sublime-text-3-features-plugins-and-settings

(⊙v⊙)嗯，如果将以上插件都装上，那么肯定已经很卡了，所以可以一般顺过遍，以后装个新的，想用啥就装上就好了。

