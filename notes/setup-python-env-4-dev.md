# Python 开发环境


> Python + pip 

1. [下载](https://www.python.org/downloads/)官方的安装文件，并将`C:\Python27`添加到系统环境变量
```
λ python
Python 2.7.8 (default, Jun 30 2014, 16:03:49) [MSC v.1500 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
```
2. 安装pip
下载[get-pip.py](https://bootstrap.pypa.io/get-pip.py)，并安装`pip`
```
λ python get-pip.py
Collecting pip
  Using cached pip-6.0.6-py2.py3-none-any.whl
Collecting setuptools
  Using cached setuptools-12.0.1-py2.py3-none-any.whl
Installing collected packages: setuptools, pip


Successfully installed pip-6.0.6 setuptools-12.0.1
```
将`C:\Python27\Scripts`添加到系统环境变量中，方便全局访问`pip`和后面的`ipython`命令。安装完pip，会在`C:\Python27\Lib\site-packages`和`C:\Python27\Scripts`多出相对应的模块
3. 安装IPython
```
λ pip install ipython
Collecting ipython
  Downloading ipython-2.3.1-py27-none-any.whl (2.8MB)
    100% |################################| 2.8MB 238kB/s ta 0:00:01
Collecting pyreadline>=2.0 (from ipython)
  Downloading pyreadline-2.0.zip (108kB)
    100% |################################| 110kB 1.2MB/s ta 0:00:01
    package init file 'pyreadline\configuration\__init__.py' not found (or not a regular file)
Installing collected packages: pyreadline, ipython
  Running setup.py install for pyreadline
    package init file 'pyreadline\configuration\__init__.py' not found (or not a regular file)

Successfully installed ipython-2.3.1 pyreadline-2.0
```
输入`ipython`来启动IPython
```
λ ipython
Python 2.7.8 (default, Jun 30 2014, 16:03:49) [MSC v.1500 32 bit (Intel)]
Type "copyright", "credits" or "license" for more information.

IPython 2.3.1 -- An enhanced Interactive Python.
?         -> Introduction and overview of IPython's features.
%quickref -> Quick reference.
help      -> Python's own help system.
object?   -> Details about 'object', use 'object??' for extra details.
```
输入`help()`进入帮助模式，输入`q`退出帮助模式
```
In [5]: help()

Welcome to Python 2.7!  This is the online help utility.

If this is your first time using Python, you should definitely check out
the tutorial on the Internet at http://docs.python.org/2.7/tutorial/.

Enter the name of any module, keyword, or topic to get help on writing
Python programs and using Python modules.  To quit this help utility and
return to the interpreter, just type "quit".

To get a list of available modules, keywords, or topics, type "modules",
"keywords", or "topics".  Each module also comes with a one-line summary
of what it does; to list the modules whose summaries contain a given word
such as "spam", type "modules spam".

help> q

You are now leaving help and returning to the Python interpreter.
If you want to ask for help on a particular object directly from the
interpreter, you can type "help(object)".  Executing "help('string')"
has the same effect as typing a particular string at the help> prompt.
```
输入`exit()`退出IPython
```
In [7]: quit()

C:\Users\mint
λ
```
4. `pip`小用
查看当前安装的包
```
λ pip freeze
ipython==2.3.1
pyreadline==2.0
```
查找包
```
λ pip search SomePackage
```
安装包
```
λ pip install SomePackage
```
查看包的信息
```
λ pip show --files ipython
---
Name: ipython
Version: 2.3.1
Location: c:\python27\lib\site-packages
Requires: pyreadline
```
哪些包需要更新
```
λ pip list --outdated
```
升级包
```
λ pip install --upgrade SomePackage
```
卸载包
```
λ pip uninstall SomePackage
```
 pip参数解释
```
view sourceprint?
# pip --help
 
Usage:   
  pip <command> [options]
 
Commands:
  install                     安装软件.
  uninstall                   卸载软件.
  freeze                      按着一定格式输出已安装软件列表
  list                        列出已安装软件.
  show                        显示软件详细信息.
  search                      搜索软件，类似yum里的search.
  wheel                       Build wheels from your requirements.
  zip                         不推荐. Zip individual packages.
  unzip                       不推荐. Unzip individual packages.
  bundle                      不推荐. Create pybundles.
  help                        当前帮助.
 
General Options:
  -h, --help                  显示帮助.
  -v, --verbose               更多的输出，最多可以使用3次
  -V, --version               现实版本信息然后退出.
  -q, --quiet                 最少的输出.
  --log-file <path>           覆盖的方式记录verbose错误日志，默认文件：/root/.pip/pip.log
  --log <path>                不覆盖记录verbose输出的日志.
  --proxy <proxy>             Specify a proxy in the form [user:passwd@]proxy.server:port.
  --timeout <sec>             连接超时时间 (默认15秒).
  --exists-action <action>    Default action when a path already exists: (s)witch, (i)gnore, (w)ipe, (b)ackup.
  --cert <path>               证书.
```
5. 安装其他包
```
λ pip install numpy
λ pip install scipy
λ pip install matplotlib
λ pip install scikit-learn
λ pip install pandas
```

总结：这种自己折腾的相对来说是比较灵活的，编译器，Shell窗口，编辑器，各种自己需要的包和库文件都可以自由选择和自行下载。缺点是比较浪费时间，不管在初期，还是后期的维护上，比如某一个升级之后，就需要手动去升级。

当然，肯定有人也认为比较折腾，然后就有人将这些个乱七八槽的东西打包到一块，点击下一步下一步就好了（因为不是所有人都想去折腾环境的，特别是在学习的初期，重点是学习代码和语法）。下面3个都是打包好的，安装即用：

- **Python(x,y)**:不折腾人士专用
- Anaconda
- PortablePython

Q & A :

如果使用的是64位的Window操作系统，可能在使用pip安装的时候会遇到`Fixing python error: Unable to find vcvarsall.bat`错误，此时需要我们手动的去[下载](http://www.lfd.uci.edu/~gohlke/pythonlibs/)那些我们需要的库了。

其解释参考：[Python 第三方库安装技巧](http://www.jianshu.com/p/9acc85d0ff16)







## 参考资料
- [Cmder](http://bliker.github.io/cmder/)
- [Python](https://www.python.org/)
- [pip](https://pip.pypa.io/en/latest/)
- [IPython](http://ipython.org/index.html)
- [Python的包管理工具](http://jiayanjujyj.iteye.com/blog/1409819)
- [pip使用详解](http://www.ttlsa.com/python/how-to-install-and-use-pip-ttlsa/)
- [Numpy](http://www.numpy.org/)
- [Scipy](http://scipy.org/)
- [Matplotlib](http://matplotlib.org/)
- [Python Extension Packages](http://www.lfd.uci.edu/~gohlke/pythonlibs/)
- [Anaconda](http://www.continuum.io/)
- [PortablePython](http://portablepython.com/)
- [Python(x,y)](http://code.google.com/p/pythonxy/)







