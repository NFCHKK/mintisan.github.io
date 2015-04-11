 
## 设置过程

0.硬件端口设置
![](http://mint-blog.qiniudn.com/mdk-itm-port.jpg)

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

## 参考资料
- http://www.keil.com/support/man/docs/jlink/jlink_trace_itm_viewer.htm
- http://www.cnblogs.com/Bean-SkyWalker/archive/2013/01/17/2865037.html
- http://blog.csdn.net/hinyunsin/article/details/6546670
