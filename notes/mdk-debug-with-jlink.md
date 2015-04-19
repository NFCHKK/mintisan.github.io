# J-link 使用笔记


[TOC]

> 自动51时代以来，串口始终在嵌入式工程师的调试兵器谱是始终占有重要的一席之地。
但是随着以Cortex-M系列32位 MCU 的慢慢崛起，可以用的RAM和ROM也增加了1~2个数据量级，较大的空间也给软件的复杂性和不同的调试工具提供了发展的动力。
本文以 MDK+J-link+STM32F4 为例，介绍J-link可以使用的Online/Offline调试工具。

注：此处的Online即为打开Debug，实时仿真条件下；Offline即为插着J-link，但是没有仿真的条件下，是个"伪Offline"。

实验环境：

- MDK 4.72
- J-link V9
- STM32F407ZET6

## 1.ITM(Online)


ITM的全称是`Instrumentation Trace Macrocel`，可以翻译成`指令跟踪宏单元`，它是ARM公司提供的一个可以用来输出MCU上一些信息的硬件模块，其通过输出到主控的那条线叫做`SWO`，所以也可以像J-link把这种方式叫做SWO调试方式，其实是一个东东。这里引用Corte-M3权威指南来对其进行简要的说明。

>ITM的一个主要用途，就是支持调试消息的输出（例如，printf格式的输出）ITM包含了32个刺激(stimulus)端口，允许不同的软件把数据输出到不同的端口，从而让调试主机可以把它们的消息分离开。通过编程“跟踪使能寄存器”，每个端口都可以独立地使能/除能，还可以允许或禁止用户进程对它执行写操作。 
 与基于UART的文字输出不同，使用ITM 输出不会对应用程序造成很大的延迟。在ITM内部有一个FIFO，它使写入的输出消息得到缓冲。不过，为了安全起见，最好还是在写入前检查该FIFO被填满的程度。 
输出的消息被送往TPIU，然后可以通过“跟踪端口接口”或者“串行线接口”来收集
它们。在最终的代码中也无需移除产生调试消息的代码，而是可以把TRCENA位清零，这样ITM 就被除能，调试消息也不会输出，你也可以在一个“live”系统中开启消息输出。另外，通过设置跟踪使能寄存器，可以限定允许使用的端口。 
——《Chapter 16：基于 ITM 的软件跟踪》

其MDK使用RTT的设置步骤如下：


0.硬件端口设置
![](http://mint-blog.qiniudn.com/mdk-itm-port.jpg)
是的，仿真需要`SWDIO`和`SWCLK`两条线就好了，但是如果使用ITM，则需要`SWO`这第三条线，如果你发现添加如下代码之后，能单步运行通过，但是在输出窗口没有看到显示的输出信息，那么横游可能是这根线没有接上。

1.添加 ITM 端口定义的寄存器代码

```c
#define ITM_Port8(n)    (*((volatile unsigned char *)(0xE0000000+4*n)))
#define ITM_Port16(n)   (*((volatile unsigned short*)(0xE0000000+4*n)))
#define ITM_Port32(n)   (*((volatile unsigned long *)(0xE0000000+4*n)))

#define DEMCR           (*((volatile unsigned long *)(0xE000EDFC)))
#define TRCENA          0x01000000
```

2.重定义 **fputc** 函数到 ITM端口寄存器. 然后**printf** 调用 **fputc**来进行输出

```c
struct __FILE { int handle; /* Add whatever you need here */ };
FILE __stdout;
FILE __stdin;

int fputc(int ch, FILE *f) {
  if (DEMCR & TRCENA) {
    while (ITM_Port32(0) == 0);
    ITM_Port8(0) = ch;
  }
  return(ch);
}
```


3.在MDK中设置->Debug->Settings中进行如下的设置

Debug项

![](http://mint-blog.qiniudn.com/mdk-itm-debug.png)

Trace项

![](http://mint-blog.qiniudn.com/mdk-itm-trace.png)

5.调试开始后打开 **View - Serial Windows - Debug (printf) Viewer** 窗口.

![](http://mint-blog.qiniudn.com/mdk-itm-printf-view.png)

6.在需要使用的文件中包含`#include <stdio.h>`，使用**printf**函数进行调试信息的输出

```c
printf("Hello\n");
```
![](http://mint-blog.qiniudn.com/mdk-itm-hello.png)

7.为printf添加一点额外的信息

```c
#define __DEBUG__

/* Debugger */

#ifdef __DEBUG__
#define DEBUG_PRINT(format,...) printf("File: "__FILE__", Line: %05d: "format"\n", __LINE__, ##__VA_ARGS__)
#else
#define DEBUG_PRINT(format,...)
#endif
```

输出信息如下：

![](http://mint-blog.qiniudn.com/mdk-itm-DEBUG_PRINT.png)


## 2.RTT(Online/Offline)

关于什么是RTT，引用[官网](https://www.segger.com/jlink-real-time-terminal.html)的说明如下：

> With RTT it is possible to output information from the target microcontroller as well as sending input to the application at a very high speed without affecting the target's real time behavior.

其MDK使用RTT的设置步骤如下：

1.下载[Download RTT Implementation and Sample Code](http://download.segger.com/J-Link/RTT/RTT_Implementation_141217.zip)

2.将其源代码添加到你的工程

![RTT Source Files](http://upload-images.jianshu.io/upload_images/26219-95b06d11d210811f.png)

3.在你需要使用的应用中添加`#include "SEGGER_RTT.h"`头文件

4.调用`SEGGER_RTT_printf`来输出调试信息。**通道需要设置成为0。**

```c
 SEGGER_RTT_printf(0,"PT_Task_Init is done via RTT.\n");
```

5.如果是Online启动调试器来进行调试，需要启动`JLinkRTTClient.exe`来显示信息。
（嗯，是的，在J-link的安装目录下能找到这些工具。）
![Online 调试信息输出](http://upload-images.jianshu.io/upload_images/26219-b88f4c08ac701570.png)

6.如果是Offline，则需要启动`JLinkRTTViewer.exe`来显示信息，当然，J-link还是需要插着的。

![RTT Viewer 设置](http://upload-images.jianshu.io/upload_images/26219-a40bfb99d020217a.png)

![RTT Viewer 调试信息显示](http://upload-images.jianshu.io/upload_images/26219-481e757cf8f20421.png)


## 3.J-Scope(Offline)


关于J-Scope是什么，引用[官方](https://www.segger.com/j-link-j-scope.html)的说明如下：

> J-Scope is a software to analyze and visualize data on a microcontroller in real-time, while the target is running. It does not require features like SWO or any extra pin on the target, but uses the available standard debug port.

其MDK使用J-Scope的设置步骤如下：

1.进行常规设置

![J-Scope Configuration](http://upload-images.jianshu.io/upload_images/26219-589b93eab655ab01.png)

2.选择需要跟踪的变量

![J-Scope Symbol Selection](http://upload-images.jianshu.io/upload_images/26219-a320a515ba4d870f.png)

3.启动采样

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/26219-a43868016d7faa8c.png)

4.图形化形式实时显示

![变量被事实显示](http://upload-images.jianshu.io/upload_images/26219-877663e73e4cb104.gif)

5.数值亦同步更新

![数值也在同步更新](http://upload-images.jianshu.io/upload_images/26219-e215d2938ae46eef.gif)


## 结语

对于工具的态度：在不影响业务的情况下，试试新工具总是没有坏处的。



## 参考资料
- [semihost/ITM机制浅析以及使用JLINK通过ITM调试stm32单片机](http://www.douban.com/note/248637026/)
- [摆脱UART,仅用JLink也能实现printf功能!!](http://www.cnblogs.com/Bean-SkyWalker/archive/2013/01/17/2865037.html)
- [J-Link/J-Trace User's Guide: ITM Stimulus Ports - Keil](http://www.keil.com/support/man/docs/jlink/jlink_trace_itm_viewer.htm)
- [J-Link SWO Viewer](https://www.segger.com/j-link-swo-viewer.html)
- [Jlink Real Time Terminal](https://www.segger.com/jlink-real-time-terminal.html)
- [开贴研究：JLINK RTT，完爆各种printf形式，从此swo是路人](http://www.amobbs.com/thread-5595476-1-1.html)
- [J-Scope - Real-Time Data Visualization](https://www.segger.com/j-link-j-scope.html)
- [Jlink RTT弱爆了，Jlink Scope来啦！](http://www.amobbs.com/thread-5596670-1-1.html)
