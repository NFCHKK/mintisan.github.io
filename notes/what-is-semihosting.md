# What is Semihosting?

by [LPCWARE : What is Semihosting?](http://www.lpcware.com/content/faq/lpcxpresso/semihosting)


[TOC]


## Background to Semihosting

When creating a new embedded application, it can sometimes be useful during the early stages of development to be able to output debug status messages to indicate what is happening as your application executes.

Traditionally, this might be done by piping the messages over, say, a serial cable connected to a terminal program running on your PC. LPCXpresso also offers an alternative to this, called semihosting. Semihosting provides a mechanism for code running on the target board to use the facilities of the PC running the IDE. The most common example of this is for the strings passed to a printf being displayed in the IDE's console view.

The term "semihosting" was originally termed by ARM in the early **1990s**, and basically indicates that part of the functionality is carried out by the host (the PC with the debug tools running on it), and partly by the target (your board). The original intention was to provide i/o in a target environment where no real peripheral-based i/o was available at all.

> Semihosting翻译成“半主机”，就是让mcu来“借用”下pc的i/o口来交互，所以这才是“半”的来源吧。而且，是上个世纪90年代的产物，对于有摩尔定律的集成电路行业来说有点老了。


## Semihosting implementation

The way it is actually implemented by the tools depends upon which target CPU you are running on. With Cortex-M based MCUs, the bottom level of the C library contains a special `BKPT` instruction. The execution of this is trapped by the debug tools which determine what operation is being requested - in the case of a printf, for example, this will effectively be a "write character to stdout". The debug tools will then read the character from the memory of the target board - and display it in the console window within the IDE.

Semihosting also provides support for a number of other I/O operations. For example it provides the ability for scanf to read its input from the IDE console. It also allows file operations, such that fopen can open a file on your PC's hard drive, and fscanf can then be used to read from that file.

On ARM7/9 based targets the same principles of working are used, but implemented using the `SWI / SVC` instruction rather than the BKPT.

> 通过软中断来实现，具体的指令在ARM7/9和Cortex-M上是不同的。其过程可以大致如下：当mcu执行到printf的地方时候，触发一个软中断，调试器在接收到这个软中断时，就去读区mcu需要显示的内容（内容的地址是双方规定好的，这也是Semihosting协议的一部分），然后将其显示在IDE的窗口中，然后让mcu接着往下走（不过可能在接到中断之后就先让它往下走，然后读取内存中的内容，这样mcu的中断时间就短多了）；当然scanf的过程刚好相反。

## Semihosting Performance

It is fair to say that the semihosting mechanism does not provide a high performance i/o system. Each time a semihosting operation takes place, the processor is basically stopped whilst the data transfer takes place. The time this takes depends somewhat on the target CPU, the debug probe/link (thus Red Probe+ provides a much enhanced semihosting speed over LPC-Link), the PC hardware and the PC operating system. But it takes a definite period of time, which may make your code appear to run more slowly.

> 简而言之，速度狠不行。并且没有给一个量化的实例值。

## Important notes about using semihosting

When you have linked with the semihosting library, your application will no longer work standalone - **it will only work when connected to the debugger**.

Semihosting operations cause the CPU to drop into "debug state", which means that for the duration of the data transfer between the target and the host PC no code (including interrupts) will get executed on the target. **Thus if you application uses interrupts, then it is normally advisable to avoid the use of semihosting whilst interrupts are active.** If you still need to use printf, then you can retarget the bottom level of the C library to use an alternative communication channel, such as a UART. 

> 提的注意点，其实就是缺点么。  
> 1. 当我们用半主机的库时，就和对应的调试器绑定了。就这一点来说，还不如重定向，至少只要串口久可以了，但是速度有待商榷。咦，不是说在出现性能问题之前，性能就不是问题么。  
>  2. 不要在有中断的情况下使用Semihosting，最好把它关掉，不然就可能把你的中断给抢断了，不要怪我没提醒过你。  
>  3. 如果用仅仅是用串口，用重定向就好了，其实就是串口＋重定向的作用与调试器＋Semihosting的作用是一样的，只是前者显示在串口窗口，后者显示在IDE的串口而已。不过成本显然前者更有优势，后者只不过是买调试器顺便送个串口。

## Semihosting Specification

The semihosting mechanism used within LPCXpresso based on the specification contained in the following document available from ARM's website...

=> ARM Developer Suite (ADS) v1.2 Debug Target Guide, Chapter 5. Semihosting

- [Online html](http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.dui0058d/CIHBDHFF.html)
- [PDF version](http://infocenter.arm.com/help/topic/com.arm.doc.dui0058d/DUI0058.pdf)

> 从这段文字中获得信息是，同学们啊，Semihosting 这个概念很老了，是ADS时代的产物了，速度也不行了，跟不上时代的发展了。但是，后来的那些各种碉堡了的调试设计思路都和我差不多，大家了解了解我，然后再去用其他的，如ITM, [RTT](https://segger.com/jlink-real-time-terminal.html),[JLink-Scope](https://www.segger.com/j-link-j-scope.html)就好了。

## For more information...

- [Using printf()](http://www.lpcware.com/content/faq/lpcxpresso/using-printf)
- [What are none, nohost and semihost libraries?](http://www.lpcware.com/content/faq/lpcxpresso/library-variants)

> 我会说LPC给的扩展阅读很不走心么。

