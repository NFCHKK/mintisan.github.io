title: core_cm3文件函数一览
categories: [底层驱动]
tags: [Cortex-M3,ARM汇编]
date: 2013-09-03 22:21:00
---

 *对ARM Cortex-M3的底层文件core_cm3.c进行梳理。*

<!-- more -->


core_cm3是ARM公司推出来的统一规定，这是对下游芯片厂商的统一规定，因此可以再Cortex-M3(CM3)之间进行移植。此文件中定义了一些对特殊功能寄存器的C语言形式的操作，本质上是内敛汇编和嵌入式汇编。本文均已μC/OS-II移植为例进行举例。

那么先通过几个例子介绍下内敛汇编和嵌入式汇编的形式吧，，因为下面要用到，看完这几个例子就能看懂了，但是如果需要详细学习，请参考文末的参考资料，因为与真正的汇编还是有不少区别的，比如在内敛汇编中我们操作的都是虚拟寄存器（那么它是如何转到真正的寄存器的呢？不晓得，⊙﹏⊙b汗），“pc(r15)、lr(r14) 和 sp(r13) 寄存器根本不能访问。访问这些寄存器时，会产生错误消息。”等等。

##单行内敛汇编

```c
#define OS_ENTER_CRITICAL()         __asm("CPSID   I")
#define OS_EXIT_CRITICAL()          __asm("CPSIE   I")
```

主要是小括号+双引号。

##多行内敛汇编

```c
__asm
{
    //原汁原味的汇编语句
}
```

用大括号取代了小括号，并且不需要双引号了，直接加上就可以了。不过要是用到R0寄存器不声明的话，会有个warning，可以在前面int R0声明下。

这里用的时候我产生了一个小疑问，当我用到R0，R1这些寄存器的时候，需不需要先PUSH，用完之后在POP呢？看完《编译器用户指南》之后，它说了，不用，编译器帮我们做了。


##嵌入式汇编

```c
__asm uint32_t __get_PSP(void)
{
  mrs r0, psp
  bx lr
}
```

在前面加上__asm关键字即可。不过要注意的是需要在最后加上bx lr显式返回，我之前就忘了返回，然后就HardFault_Handler了。

直接看代码：

```c
/* define compiler specific symbols */
#if defined ( __CC_ARM   )
  #define __ASM            __asm     /*!< asm keyword for ARM Compiler */
  #define __INLINE         __inline   /*!< inline keyword for ARM Compiler */

#elif defined ( __ICCARM__ )
  #define __ASM           __asm       /*!< asm keyword for IAR Compiler */
  #define __INLINE        inline      /*!< inline keyword for IAR Compiler. Only avaiable in High optimization mode! */

#elif defined   (  __GNUC__  )
  #define __ASM            __asm    /*!< asm keyword for GNU Compiler */
  #define __INLINE         inline   /*!< inline keyword for GNU Compiler */

#elif defined   (  __TASKING__  )
  #define __ASM            __asm   /*!< asm keyword for TASKING Compiler */
  #define __INLINE         inline  /*!< inline keyword for TASKING Compiler */

#endif
```


就我所知，对ARM芯片进行编程，市面上大抵有三款编译器可供选择：ARM自家的ARM Compiler，第三方的IAR Compiler和GNU针对ARM的Compiler。最后一个木有见过，TASKING Compiler（  Embedded software development tools）？

不同的编译器具有的不同关键字形式，不过貌似就ARM自家的内敛关键字的前面多两个下划线，但是人家形式看上去更加统一一点，这对于有“强迫症”的工程师是不错的。

然后就是针对不同编译器的函数定义，也是通过与以上形式一致的方式来实现的，给出个框架先。用哪个编译器就用编译相对应的代码即可。

```c
/* ###################  Compiler specific Intrinsics  ########################### */

#if defined ( __CC_ARM   ) /*------------------RealView Compiler -----------------*/
/* ARM armcc specific functions */


#elif (defined (__ICCARM__)) /*------------------ ICC Compiler -------------------*/
/* IAR iccarm specific functions */


#elif (defined (__GNUC__)) /*------------------ GNU Compiler ---------------------*/


#elif (defined (__TASKING__)) /*------------------ TASKING Compiler ---------------------*/
/* TASKING carm specific functions */


/*
 * The CMSIS functions have been implemented as intrinsics in the compiler.
 * Please use "carm -?i" to get an up to date list of all instrinsics,
 * Including the CMSIS ones.
 */

#endif
```

然后针对ARM Compiler形式的函数进行讨论，即对`/* ARM armcc specific functions */`讨论下。

```c
/**
 * @brief  Return the Process Stack Pointer
 *
 * @return ProcessStackPointer
 *
 * Return the actual process stack pointer
 */
__ASM uint32_t __get_PSP(void)
{
  mrs r0, psp
  bx lr
}

/**
 * @brief  Set the Process Stack Pointer
 *
 * @param  topOfProcStack  Process Stack Pointer
 *
 * Assign the value ProcessStackPointer to the MSP 
 * (process stack pointer) Cortex processor register
 */
__ASM void __set_PSP(uint32_t topOfProcStack)
{
  msr psp, r0
  bx lr
}
```

这里的两个函数都是用R0的原因是ARM有默认的规定，传入的参数从左至右依次放入R0-R4中，这里也就是写C函数的时候，输入的参数不要过多，不然得PUSH到栈中，速度就下来；如果有返回值，则将R0的值返回。

这里放一个自己发现的此函数的一个小例子，在CM3上移植μC/OS-II时，需要移植首次启动时-OSStart函数中最后调用的OSStartHighRdy，一般采用汇编编写，如下所示，不想看的直接跳过看下面的中文描述也可：


` os_cpu_a.asm：OSStartHighRdy`

```asm
;定义几个常量，类似C语言中的#define预处理指令。     
NVIC_INT_CTRL       EQU     0xE000ED04  ; 中断控制寄存器
NVIC_SYSPRI14       EQU     0xE000ED22  ; PendSV优先级寄存器的地址
NVIC_PENDSV_PRI     EQU     0x000000FF  ; PendSV中断的优先级为255（最低）
NVIC_PENDSVSET      EQU     0x10000000  ; 触发软件中断的值，位28为1.
;********************************************************************************************************
;                                         START MULTITASKING
;                                      void OSStartHighRdy(void)
;
; Note(s) : 1) This function triggers a PendSV exception (essentially, causes a context switch) to cause
;              the first task to start.
;
;           2) OSStartHighRdy() MUST:
;              a) Setup PendSV exception priority to lowest;
;              b) Set initial PSP to 0, to tell context switcher this is first run;
;              c) Set the main stack to OSRunning
;              d) Trigger PendSV exception;
;              e) Enable interrupts (tasks will run with interrupts enabled).
;********************************************************************************************************
OSStartHighRdy
        ;设置PendSV中断的优先级
        LDR     R4, =NVIC_SYSPRI14      ; set the PendSV exception priority
        LDR     R5, =NVIC_PENDSV_PRI
        STR     R5, [R4]
        ;设置PSP为0
        MOV     R4, #0                 ; set the PSP to 0 for initial context switch call
        MSR     PSP, R4
        ;设置OSRunning为TRUE
        LDR     R4, =OSRunning         ; OSRunning = TRUE
        MOV     R5, #1
        STRB    R5, [R4]

        ;触发PendSV中断
        LDR     R4, =NVIC_INT_CTRL     ;rigger the PendSV exception (causes context switch)
        LDR     R5, =NVIC_PENDSVSET
        STR     R5, [R4]

        CPSIE   I                      ;enable interrupts at processor level
        ;死循环，应该不会到这里
OSStartHang
        B       OSStartHang            ;should never get here
```

转换成中文描述过程如下：

1. 设置PendSV优先级
2. 设置PSP为0
3. 设置系统的运行状态
4. 开始执行最高优先级任务
5. 开中断

补充说明下：关于第1点，参考权威指南讨论PendSV即可；关于第2点，其实不设置也是可以的，它的作用是省掉第一次上下文切换时候的R4-R11的入栈保护，仅此而已，这是事实没错，但是这个考虑会增加代码的编写，体现在此处和PendSV中断函数的编写上，不过这也表明作者的多OS过程的认识，思维的严谨。关于第5点，显示声明中断要开着，没有也没关系，因为本来中断就是开着的，只要你不蛋疼的去把它关掉。

改成C语言形式如下：

```c
#define  NVIC_INT_CTRL              *((OS_CPU_SR *)0xE000ED04)  //中断控制寄存器ICSR
#define  NVIC_PENDSVSET             0x10000000  //触发软件中断的值，位28为1.
#define  OS_TASK_SW()               NVIC_INT_CTRL = NVIC_PENDSVSET
#define  OSIntCtxSw()               NVIC_INT_CTRL = NVIC_PENDSVSET

#define OS_ENTER_CRITICAL()         __asm("CPSID   I");
#define OS_EXIT_CRITICAL()          __asm("CPSIE   I");

#define NVIC_SYSPRI14               *((OS_CPU_SR *)0xE000ED22)  //PendSV优先级寄存器的地址
#define NVIC_PENDSV_PRI             0x000000FF                  //PendSV中断的优先级为255（最低）
#define SET_PENDSV_FF()             NVIC_SYSPRI14=NVIC_PENDSV_PRI

void OSStartHighRdy(void)
{   
    SET_PENDSV_FF();         //这里写FF是因为把它的中断优先级设置为最低255
    __set_PSP(0);
    OSRunning = 1;
    OS_TASK_SW();
    OS_EXIT_CRITICAL();
}
```

怎么样，优雅多了吧，而且也比较明了。此处我把它放在os_cpu_c.c文件中，当然一般的宏定义还是会放在头文件oc_cpu.h中的。

要是与会变形式的再像一点，在最后加上死循环while(1);则完全一致了，只不过不会在这里的，因为它马上就去优先级最高的任务那里去了。

这里还要说一下，在我们板子启动的时候，使用的MSP，要是我们使用前后台的形式来开发程序，不管在用户程序还是中断程序里面，我们就用一个MSP就ok了，因为就相当于一个线程在那里不停的跑。而当我们使用RTOS，如μC/OS-II，那么我们在所有的用户任务中，使用的PSP，这也是我之前没注意的地方。

扯远了，看下一个：

`主堆栈：获取MSP和设置MSP`
```c
/**
 * @brief  Return the Main Stack Pointer
 *
 * @return Main Stack Pointer
 *
 * Return the current value of the MSP (main stack pointer)
 * Cortex processor register
 */
__ASM uint32_t __get_MSP(void)
{
  mrs r0, msp
  bx lr
}

/**
 * @brief  Set the Main Stack Pointer
 *
 * @param  topOfMainStack  Main Stack Pointer
 *
 * Assign the value mainStackPointer to the MSP 
 * (main stack pointer) Cortex processor register
 */
__ASM void __set_MSP(uint32_t mainStackPointer)
{
  msr msp, r0
  bx lr
}
```
使用尚待开发。


`反转无符号16位值和有符号16位值`
```c
/**
 * @brief  Reverse byte order in unsigned short value
 *
 * @param   value  value to reverse
 * @return         reversed value
 *
 * Reverse byte order in unsigned short value
 */
__ASM uint32_t __REV16(uint16_t value)
{
  rev16 r0, r0
  bx lr
}

/**
 * @brief  Reverse byte order in signed short value with sign extension to integer
 *
 * @param   value  value to reverse
 * @return         reversed value
 *
 * Reverse byte order in signed short value with sign extension to integer
 */
__ASM int32_t __REVSH(int16_t value)
{
  revsh r0, r0
  bx lr
}
```
使用尚待开发。

`其他`
```c
/**
 * @brief  Remove the exclusive lock created by ldrex
 *
 * Removes the exclusive lock which is created by ldrex.
 */
__ASM void __CLREX(void)
{
  clrex
}

/**
 * @brief  Return the Base Priority value
 *
 * @return BasePriority
 *
 * Return the content of the base priority register
 */
__ASM uint32_t  __get_BASEPRI(void)
{
  mrs r0, basepri
  bx lr
}

/**
 * @brief  Set the Base Priority value
 *
 * @param  basePri  BasePriority
 *
 * Set the base priority register
 */
__ASM void __set_BASEPRI(uint32_t basePri)
{
  msr basepri, r0
  bx lr
}

/**
 * @brief  Return the Priority Mask value
 *
 * @return PriMask
 *
 * Return state of the priority mask bit from the priority mask register
 */
__ASM uint32_t __get_PRIMASK(void)
{
  mrs r0, primask
  bx lr
}

/**
 * @brief  Set the Priority Mask value
 *
 * @param  priMask  PriMask
 *
 * Set the priority mask bit in the priority mask register
 */
__ASM void __set_PRIMASK(uint32_t priMask)
{
  msr primask, r0
  bx lr
}

/**
 * @brief  Return the Fault Mask value
 *
 * @return FaultMask
 *
 * Return the content of the fault mask register
 */
__ASM uint32_t  __get_FAULTMASK(void)
{
  mrs r0, faultmask
  bx lr
}

/**
 * @brief  Set the Fault Mask value
 *
 * @param  faultMask  faultMask value
 *
 * Set the fault mask register
 */
__ASM void __set_FAULTMASK(uint32_t faultMask)
{
  msr faultmask, r0
  bx lr
}

/**
 * @brief  Return the Control Register value
 * 
 * @return Control value
 *
 * Return the content of the control register
 */
__ASM uint32_t __get_CONTROL(void)
{
  mrs r0, control
  bx lr
}

/**
 * @brief  Set the Control Register value
 *
 * @param  control  Control value
 *
 * Set the control register
 */
__ASM void __set_CONTROL(uint32_t control)
{
  msr control, r0
  bx lr
}
```

以上的嵌入汇编可以拿来对照权威指南学习，看看寄存器的变化过程以及造成的影响，主要是P14页的”特殊功能寄存器“中的那些个特殊功能寄存器。使用尚待开发。

如果文中有描述不清楚或者错误的地方，请参考《编译器用户指南》和《ARM Cortex-M3权威指南》，并以此为准。

另外，虽然μC/OS-II的移植已经被讲烂了，但是看了这个还是有点搞头的，新版的正在紧张改写中，它更加简洁明了。

To Be Continued~~










