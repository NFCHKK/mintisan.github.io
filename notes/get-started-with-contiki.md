# Contiki入门

[原文传送：Get Started with Contiki
](http://www.contiki-os.org/start.html)

[TOC]

> 关于 Instant Contiki：
> Instant Contiki是Contiki的一整套开发环境。它是一个运行在VMWare player中的Ubuntu Linux虚拟机，此外还有Contiki与其所有的开发工具，编译器，仿真器等等。简而言之，有了它，就可以开发Cintiki了。

## 步骤1：获取Instant Contiki
Contiki是一个复杂的软件没错，但是请勿颤抖！因为我们为你提供Instant Contiki和Cooja，这两个家伙可以带你进去Contiki的世界。

让我们以下载Instant Contiki和安装VMWare Player开始吧，接着就可以启动Instant Contiki了。

### 下载Instant Contiki
在下载Instant Contiki之前请自行准备好一杯或者两杯咖啡（这取决于你在天朝的网速），只有2个G多点。当下载完成之后，解压文件到你指定的文件夹，其实Instant Contiki就是在Ubuntu中装上Cooja的虚拟机。

[Download Instant Contiki »](http://sourceforge.net/projects/contiki/files/Instant%20Contiki/)

### 安装VMWare Player
下载并安装VMWare。请自行搜索并下载，下面的链接仅供参考。

[Download VMWare Player »](http://www.vmware.com/go/downloadplayer/)

### 开始Instant Contiki之旅

#### 启动Ubuntu
用虚拟机打开以vmx结尾的文件即可。

![](http://mint-blog.qiniudn.com/instant-contiki-boot.png)


#### 登陆
登陆Instant Contiki。密码是`user`

![](http://mint-blog.qiniudn.com/instant-contiki-login.png)

恭喜恭喜！现在我们已经启动Instant Contiki了，接着我们来开始Cooja。

## 步骤2：开始Cooja

> 关于 Cooja
Cooja 是Cintiki网络仿真器。Cooja用来模拟Contiki程序在其中部署或大或小的传感器网络和节点。仿真可以作为实际使用之前的一个参考，因为仿真是在硬件级别的，就是你在仿真环境咋样，在实际中也是如此。

下面我们会来编译和运行Cooja——Contiki网络模拟器。

### 打开一个终端窗口
为了运行Cooja，首先需要打开一个终端窗口

![](http://mint-blog.qiniudn.com/1-cooja.png)

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

![](http://mint-blog.qiniudn.com/2-cooja.png)

当Cooja编译完成，会显示一个蓝色的空白窗口。

![](http://mint-blog.qiniudn.com/3-cooja.png)

现在Cooja就已经完成启动了，我们可以试着搞一个例子来跑跑仿真了。

## 步骤3：让Contiki在Cooja仿真环境中跑一会

> 关于 Cooja 仿真器
开发者们可以在Cooja上调试和模拟运行程序。就是酱紫。

### 创建一个新的仿真环境

#### 创建一个新的仿真
依次点击菜单`File->New simulation...`

![](http://mint-blog.qiniudn.com/8-cooja-2.png)

#### 设置仿真参数

不出意外，此时Cooja应该打开了`Create new simulation`对话框，在这个对话框里，我们可以给我们的仿真设置一个新的名字，这里我们不做任何改变。并点击`Create`按钮。

![](http://mint-blog.qiniudn.com/9-cooja.png)

#### 仿真界面中的窗口们

Cooja 的仿真界面由以下窗口组成。

- `Network` : 网络窗口位于界面的左上角，所有的传感器节点（motes）都将在这个窗口显示和移动。当然，现在是空的是因为还没有在仿真中新建节点。
- `Timeline` : 时间轴窗口位于界面的底部，在这里记录着整个通讯过程中的log，有助于我们掌握网络的状况。
- `Mote output` : 节点输出窗口在界面的右侧，显示着节点的输出信息。
- `Notes` : 右上角的笔记记录子窗口可以记录一些实验过程中的信息，这样你就不用单独打开一个笔记本了。
- `Simulation control` : 模拟控制窗口事操控我们实验过程的一些按钮，比如启动，暂停和重载。

> 关于什么是传感器节点（motes）？
A sensor node, also known as a mote (chiefly in North America), is a node in a wireless sensor network that is capable of performing some processing, gathering sensory information and communicating with other connected nodes in the network. A mote is a node but a node is not always a mote.


![](http://mint-blog.qiniudn.com/10-cooja.png)

## 添加节点到仿真环境

### 添加节点

在我们开始仿真之前，必须要添加一个或者多个的节点。这个过程可以通过在`Motes`菜单－>`Add motes`来实现...由于这是首次在仿真环境中添加节点，我们必须指定节点的类型。点击`Create new note type`->`Sky mote...`来创建Tmote Sky类型的节点。

> Tmote Sky is a mote platform for extremely low power, 
high data-rate sensor network applications. It has integrated sensors, radio, antenna, microcontroller and programming capabilities.  
http://faculty.uml.edu/yluo/Teaching/AdvCompArch/reports/WeinbergZhangFinalReport.pdf


![](http://mint-blog.qiniudn.com/11-cooja.png)

### 设置节点类型
Cooja 将会自动打开`Create Mote Type`对话框，在这里我们可以为我们的类型重新设置一个自己喜欢的名字。这里我们选择默认的名字，并且点击`Browse...`来选择节点将运行的Contiki应用环境。

![](http://mint-blog.qiniudn.com/12-cooja.png)


### 选择一个Contiki应用环境
进入`/home/user/contiki/examples/ipv6/simple-udp-rpl`文件夹。里面很多的应用环境，我们选择一个通过IPv6来进行UDP通信的简单例子。

![](http://mint-blog.qiniudn.com/13-cooja.png)

### 指定特定应用的C源文件

选择`broadcast-example.c`文件。此文件包含如下简单的动作：每个节点会随机像自己的邻居发送一个UDP包。单击`Open`按钮来选定文件。


![](http://mint-blog.qiniudn.com/14-cooja.png)

### 编译Contiki和应用

现在Cooja需要对我们选择的文件进行验证，也就是需要编译来进行这个过程。点击`Compile`按钮。此编译过程大约持续1分钟以上，并且在编译完成之后将编译信息传输出到地步的窗口。


![](http://mint-blog.qiniudn.com/15-cooja.png)

### 创建节点
单击`Create` 按钮来进行下一步。程序会自动关闭当前窗口，打开下一步所需要的窗口。

![](http://mint-blog.qiniudn.com/16-cooja.png)

### 添加节点到仿真环境

Cooja 将会询问是否将我们之前设定的心类型节点添加到仿真环境。如果是，在这里同样需要设定所需要添加节点的个数，本例我们设定为8个。

![](http://mint-blog.qiniudn.com/17-cooja.png)

### 真的添加进去

我们点击`Add motes`按钮来把8个节点添加到仿真环境中。


![](http://mint-blog.qiniudn.com/18-cooja.png)


### 开发仿真

现在我们就可以看到8个节点出现在`Network`窗口中了。单击`Start`按钮来启动整个仿真过程。


![](http://mint-blog.qiniudn.com/19-cooja.png)

### 暂停仿真

我们可以在`Mote output`窗口看到节点的信息不断输出。`Network`窗口中的节点不断的移动，表明我们的仿真过程正在欢快的进行中。`Timeline`窗口会在节点向外发出无线电波时进行移动。此时，如果看腻了，我们就可以让它暂停下来休息下。

![](http://mint-blog.qiniudn.com/20-cooja.png)

### 完成!

好样的，少年！我们已经完成了第一个属于我们自己的Cooja仿真试验，通过它，我们让Contiki节点随机的向邻居发送`IPv6/UDP`数据包。


## 步骤 4：让 Contiki 在硬件上跑起来

> 关于 Contiki 的硬件系统
Contiki has a build system that is intended to make it easy to run Contiki directly on hardware. The build system is designed to be the same across different hardware platforms, so that the build commands are familiar when switching hardware. The build system consists of a set of makefiles. The base makefile is `contiki/Makefile.include`, platform makefiles in `contiki/platform/*/Makefile.platform` and `contiki/cpu/*/Makefile.cpu`.

### 与硬件相连

在开始下面的实验之前，我们假设你已经拥有[Zolertia Z1](http://www.contiki-os.org/hardware.html)，并且用USB将其与PC相连接。我们必须保证Z1与Contiki是可以通信的。这个可以在VMWare Player的可删除设备列表中找到。

### 打开终端，进入代码目录

生成Contiki需要我们在终端窗口中进行。打开一个终端窗口，进入Hello World例程目录：

```
cd contiki/examples/hello-world
```

### 将Contiki和应用打包编译

现在我们可以为我们的硬件平台编译 Hello World应用程序了。编译应用程序的同时还将编译整个Contiki系统，所以可能需要一些时间。

```
make TARGET=z1 hello-world
```

如果你觉得你待会将不只一次的编译，那么你可以通过下面这条命令来让Contiki来记住你的硬件平台选择。

```
make TARGET=z1 savetarget
```

### 上传Contiki到硬件

现在我们准备将编译好的可执行文件上传到硬件上。我们用下面的特定的带`.upload`后缀的文件来运行：

```
make hello-world.upload
```

**注意**：如果你看到如下的输出，可能意味着你的Z1硬件没有和Instant Contiki连接上，你需要看看你的连接线是不是松了或者咋了：

```
          make z1-reset z1-upload
          make[1]: Entering directory `/home/user/contiki/examples/hello-world'
          make -k -j 20 z1-reset-sequence
          make[2]: Entering directory `/home/user/contiki/examples/hello-world'
          Done
          make[2]: Leaving directory `/home/user/contiki/examples/hello-world'
          make -j 20 z1-upload-sequence
          make[2]: Entering directory `/home/user/contiki/examples/hello-world'
          Done
          make[2]: Leaving directory `/home/user/contiki/examples/hello-world'
          make[1]: Leaving directory `/home/user/contiki/examples/hello-world'
          rm hello-world.ihex
```

检查Z1与PC的连接，查看VMVare Player确认连接，然后再重试。

注意我们其实是可以一步完成编译上传功能的：只要执行`make hello-world.upload`就会自动完成上面的两个步骤。这不是为了让大家伙多敲命名熟悉熟悉么。

### 观察输出

现在我们已经将代码烧录到硬件平台上了，就可以通过串口来观察程序的输出。为了观察串口的输出，我们往终端里敲入下面的命令：

```
make login
```

此时不会显示任何的输出（除了一些VMWare自带的一些垃圾信息），因为`Hello World`程序已经停止运行。为了查看输出，我们可以按下复位按钮。此时，如下的信息将会在终端上显示出来：

```
          Rime started with address 1.1
          MAC 01:01:00:00:00:00:00:00 Contiki-2.6 started. Node id is set to 257.
          CSMA ContikiMAC, channel check rate 8 Hz, radio channel 26
          Starting 'Hello world process'
          Hello, world
```

### 完成！

更好样的！如果你走到这里，那么意味着你已经能够在仿真环境和硬件平台上把Contiki给跑起来了。如果一切正常，你可以尝试着将其它的例程上传到硬件中：比如位于`contiki/examples/ipv6/simple-upd-rpl/`目录下的`broadcast-example`例程，不过跑这个例程需要两台硬件，因为此例程就是让两台硬件通过`IPv6/UDP`来相互通信的。

## 步骤 5: 然后呢？

- **硬件**：仿真毕竟是仿真，如果想看Contiki在真实的硬件环境中如何工作，点击下面的页面：[Hardware »](http://www.contiki-os.org/hardware.html)
- **源代码**：如果你想深入了解Contiki的源代码，你可以用git从下面的地址下载最版本的源代码：[Download »](http://www.contiki-os.org/download.html)
- **社区**：如果想与Contiki的开发者进行交流，可以来Contiki的社区进行进一步的了解：[Community »](http://www.contiki-os.org/community.html)
- **许可**：关于 Contiki的开源协议，详见许可页面：[Open source »](http://www.contiki-os.org/license.html)
- **资源**：关于Contiki 的进一步阅读资源：[Resources »](http://www.contiki-os.org/support.html)





















