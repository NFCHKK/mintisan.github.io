title: get started with contiki
tags:
---



# Contiki入门

[原文传送：Get Started with Contiki
](http://www.contiki-os.org/start.html)


## 步骤1：获取Instant Contiki
Contiki是一个复杂的软件没错，但是请勿颤抖！因为我们为你提供Instant Contiki和Cooja，这两个家伙可以带你进去Contiki的世界。

让我们以下载Instant Contiki和安装VMWare Player开始吧，接着就可以启动Instant Contiki了。

### 下载Instant Contiki
在下载Instant Contiki之前请自行准备好一杯或者两杯咖啡（这取决于你在天朝的网速），只有2个G多点。当下载完成之后，解压文件到你指定的文件夹，其实Instant Contiki就是在Ubuntu中装上Cooja的虚拟机。

[Download Instant Contiki »](http://sourceforge.net/projects/contiki/files/Instant%20Contiki/)

### 安装VMWare Player
下载并安装VMWare，这在天朝的我们应该蛮容易的，原因呢，大家都懂得。请自行搜索并下载，下面的链接仅供参考。

[Download VMWare Player »](http://www.vmware.com/go/downloadplayer/)

### 开始Instant Contiki之旅

#### 启动Ubuntu
用虚拟机打开以vmx结尾的文件即可。

<img src="http://www.contiki-os.org/img/start/instant-contiki-boot.png" alt="" title="" width="600" />


#### 登陆
登陆Instant Contiki。密码是`user`

<img src="http://www.contiki-os.org/img/start/instant-contiki-login.png" alt="" title="" width="600" />

恭喜恭喜！现在我们已经启动Instant Contiki了，接着我们来开始Cooja。

## 步骤2：开始Cooja
下面我们会来编译和运行Cooja——Contiki网络模拟器。

### 打开一个终端窗口
为了运行Cooja，首先需要打开一个终端窗口
<img src="http://www.contiki-os.org/img/start/1-cooja.png" alt="" title="" width="600" />


### 运行Cooja
在终端窗口中输入以下命令，进入到Cooja目录：

```
cd contiki/tools/cooja
```

输入启动Cooja的命令：

```
ant run
```

### 等待Cooja的启动
当Cooja首次启动的时候，它会花一些时间来编译自己。

<img src="http://www.contiki-os.org/img/start/2-cooja.png" alt="" title="" width="600" />

当Cooja编译完成，会显示一个蓝色的空白窗口。

<img src="http://www.contiki-os.org/img/start/3-cooja.png" alt="" title="" width="600" />

现在Cooja就已经完成启动了，我们可以试着搞一个例子来跑跑仿真了。

## 步骤3：让Contiki在Cooja仿真环境中跑一会

### 创建一个新的仿真

#### 创建一个新的仿真
依次点击菜单`File->New simulation...`

<img src="http://www.contiki-os.org/img/start/8-cooja-2.png" alt="" title="" width="600" />

#### 设置仿真参数

不出意外，此时Cooja应该打开了`Create new simulation`对话框，在这个对话框里，我们可以给我们的仿真设置一个新的名字，这里我们不做任何改变。并点击`Create`按钮。

<img src="http://www.contiki-os.org/img/start/9-cooja.png" alt="" title="" width="600" />

#### 出现的仿真窗口**们**




<img src="" alt="" title="" width="600" />
<img src="" alt="" title="" width="600" />
<img src="" alt="" title="" width="600" />
<img src="" alt="" title="" width="600" />
<img src="" alt="" title="" width="600" />
<img src="" alt="" title="" width="600" />
<img src="" alt="" title="" width="600" />
<img src="" alt="" title="" width="600" />
<img src="" alt="" title="" width="600" />










-----
## 参考资料

1. [Contiki STM32移植](http://blog.csdn.net/xukai871105/article/details/7482858)
2. [Contiki学习笔记](http://blog.chinaunix.net/uid-9112803-id-2978041.html)























