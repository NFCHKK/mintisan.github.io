
[TOC]

## 深度截图工具

恩，其实QQ的截图快捷键还是蛮好用的，包括后来搜狗输入法的截图插件，小巧方便，但是在Linux下面自带的截图工具只能截图保存之后才能编辑，这对于一些非需要重度修改的图来说是及其麻烦的。在Linux下，深度截图工具还是不错的。

1. 安装依赖包
```
sudo apt-get install python-xlib aria2 python-webkit
```
2. 下载安装deb包
```
wget http://packages.linuxdeepin.com/deepin/pool/main/d/deepin-scrot/deepin-scrot_2.0-0deepin_all.deb
```
3. 安装deb包
```
sudo dpkg -i deepin-scrot_2.0-0deepin_all.deb
```
如果提示需要安装其他依赖，可以执行`sudo apt-get -f install`来安装。
4. 设置快捷键
每次使用都输入`deepin-scrot`是蛮麻烦的，那么设置一下快捷键吧，要用的时候按`ctrl+alt+a`呼出即可。
![设置深度截图快捷键](http://upload-images.jianshu.io/upload_images/26219-b37f365e02a55109.png)

[Ubuntu/Kubuntu 下安装Linux Deepin截图工具](http://jingyan.baidu.com/article/e2284b2b5d27ebe2e6118db4.html)

## Sublime Text 3

1. 安装
```
sudo add-apt-repository ppa:webupd8team/sublime-text-3
sudo apt-get update
sudo apt-get install sublime-text
```
2. 修复搜狗输入法无法使用中文的情况
[Ubuntu下Sublime Text 3解决无法输入中文的方法](http://jingyan.baidu.com/article/f3ad7d0ff8731609c3345b3b.html)

