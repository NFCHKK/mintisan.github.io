
# 基于 STM32 的 µC/OS-III 移植

[TOC]

> 将µC/OS-III移植到ARM Cortex-M3处理器上，选用RealView MDK作为软件开发环境，针对Cortex-M3处理器特性编写了移植所需实现的Ｃ和汇编源代码，并验证了移植的正确性。移植后的µC/OS-III能够稳定运行于Cortex-M3处理器上。该移植对大部分Cortex-M3处理器具有通用性，对其它架构处理器的µC/OS-III移植也具有参考作用。

[工程下载](http://7xnvok.com1.z0.glb.clouddn.com/STM32%28FWLIB3.50%29+UCOSIII-project.zip?attname=&e=1446969971&token=UXirvxOLbIB68QgtQjzLlmLcd3cg6twaGRWnhhPk:qIss6qIujN0bdt8RLwE86rf1EeQ)

##1．硬件开发平台简介

Cortex-M3是ARM公司推出的基于ARMv7-M架构的内核，主要针对高性能、低成本和低功耗的嵌入式应用。Cortex-M3拥有固定的存储器映射，采用更高效的NVIC（nested vectored interrupt controller）、更简单的堆栈及更高性能的指令集，且NVIC（包括SysTick）的寄存器位置固定，极大方便了µC/OS-III的移植以及在基于Cortex-M3内核的处理器之间的迁移。


### 1.1 ALIENTEK MiniSTM32开发板简介 

ALIENTEK MiniSTM32开发板是一款迷你型的开发板，拥有的片上资源很丰富，嗯，其实随便找一块有新片的STM32板子就可以开始了。 

![MiniSTM32 开发板片上资源及外观图](http://mint-blog.qiniudn.com/stm32-ucosiii-1.png)


本次移植过程所使用的ALIENTEK MiniSTM32开发板板载资源如下：
- CPU：STM32F103RBT6，LQFP64，FLASH:128K，SRAM：20K； 
- 1 个标准的 JTAG/SWD 调试下载口 
- 1 个电源指示灯（蓝色） 
- 2 个状态指示灯（DS0：红色，DS1：绿色） 
- 1 个 USB 串口，可用于程序下载和代码调试 
- 1 组3.3V电源供应/接入口 
- 1 个启动模式选择配置接口 
- 1 个复位按钮，可用于复位 MCU和 LCD 
- 1 个电源开关，控制整个板的电源 

### 1.2 LED电路简介

由于本移植过程需要用对LED的调用来验证移植的正确性，故对本开发板的LED硬件电路做些说明。

ALIENTEK MiniSTM32开发板上总共有3个LED，其原理图如下：

![图1.2 LED电路原理图](http://mint-blog.qiniudn.com/stm32-ucosiii-2.png)

其中 PWR 是系统电源指示灯，为蓝色。LED0 和 LED1 分别接在 PA8 和 PD2 上，PA8 还可以通过TIM1的通道1的PWM输出来控制DS0的亮度。其中DS0为红色，DS1 为绿色的 LED灯。

## 2．软件开发平台简介

嗯，用官方版的最省心，不管效率啥的如何，貌似阿莫上有人比较 IAR 编译之后的效率比 MDK 要好，But who cares here

RVMDK源自德国的 KEIL 公司，是 RealView MDK的简称。在全球 RVMDK被超过 10万的嵌入式开发工程师使用，RealView MDK集成了业内最领先的技术，包括 μVision 集成开发环境与 RealView 编译器。支持 ARM7、ARM9 和最新的 Cortex-M3 核处理器，自动配置启动代码，集成 Flash 烧写模块，强大的 Simulation 设备模拟，性能分析等功能。与 ARM之前的工具包 ADS1.2相比，RealView 编译器具有代更小、性能更高的优点，RealView 编译器与 ADS.2的比较： 

- 代码密度：比 ADS1.2 编译的代码尺寸小 10%； 
- 代码性能：比 ADS1.2 编译的代码性能提高 20％； 

现在 RVMDK的最新版本是 RVMDK4.13a，4.0以上的版本的 RVMDK对 IDE 界面进行了很大改变，并且支持 Cortex-M0 内核的处理器。较新的4.10 确实界面是好了，支持的器件也多了，但编译效率没有 3.24/3.80A高，尤其在编译后的代码执行速度（FFT 运算），4.10要对速度进行-O2 优化才能和 3.24/3.80A 的普通级别相比。另外，国内大都数单片机工程师都接触和使用过 KEIL，相信大家都知道 KEIL 的使用是非常简单的，而且很容易上手。

RVMDK的编译器界面和 KEIL 十分相似，本移植过程采用最新的4.22a。图示如图2.1和图2.2所示。
 
![图2.1 KEIL µVision4启动界面](http://mint-blog.qiniudn.com/stm32-ucosiii-3.png)

 
![图2.2 KEIL µVision4工程界面](http://mint-blog.qiniudn.com/stm32-ucosiii-4.png)

## 3．µC/OS-III移植

### 3.1 µC/OS-III简介

μC/OS-III(发音为 Micro Controller OS Three)是一个可扩展的，可固化的，抢占式的实时内核。它对任务的个数无限制。μ/OS-III 是一个第 3代的系统内核，支持现代的实时内核所期待的大部分功能。例如资源管理，同步，任务间的通信等等。然而，μC/OS-III  提供的特色功能在其它的实时内核中是找不到的，比如说完备的运行时间测量性能，直接地发送信号或者消息到任务，任务可以同时等待多个内核对象等。

μC/OS-III 移除了一些 μC/OS-II  很少被使用的功能，增加了一些新的，更高效的特性和服务，其中最重要的一项便是时间片轮转调度(round robin scheduling)，它使得多个任务可以跑在相同的优先级上，用户可以指定每个任务占用 CPU的时间。μC/OS-III 以基于 32 位处理器的思想设计，当然，它也很好的工作在16位甚至多个 8 为处理器。

µC/OSIII增加了很多新功能，如：
- 可嵌套的互斥型信号量 
- 可嵌套的任务挂起 
- 向无信号量请求的任务发送信号量
- 向无消息队列请求的任务法消息 
- 任务被内核的多个元素挂起 
- 为其他任务的状态或“出错代码”服务的任务
- 内在性能测试
- 防死锁机制
- 用户可定义的接口函数等

### 3.2 µC/OS-III移植说明

先来看下移植µC/OS-III的文件系统框图。
 

![图3.1  µC/OS-III文件系统框图](http://mint-blog.qiniudn.com/stm32-ucosiii-5.png)


- Application：应用层代码，包含应用层代码，为了简单起见，上面用 app.c和 app.h代替实际的应用层文件名，实际应用层文件名可以为任意直观的名字。还有一些对应用和系统的配置问件也放在这个目录下面，如app_cfg.h,os_cfg.h等。
- 这次移植中的应用程序是调用STM32的3.5.0版本的库文件，所以把它归在Application里面。
- μC/OS-III 源代码：和处理器无关的，使用  ANSI-C 编写，可移植性很强。
- μC/LIB 源代码：它提供了一系列的通用功能，如内存拷贝，字符串，ASCII相关的函数。
- μC/OS-III Port：我们着重要处理的三个文件。
- μC/CPU，用于包装  CPU  功能模块，和处理器相关的代码，不同的 CPU 代码不同。
- BSP（板级支持包）：开发板相关的文件放在此处，包含bsp.c 和bsp.h，放在目录 uC-BSP 下。

接下来重点说明下Port文件夹的三个文件：

`os_cpu.h`：定义数据类型、处理器相关代码、声明函数原型

**全局变量**
`OS_CPU_GLOBALS` 和 `OS_CPU_EXT` 允许我们是否使用全局变量。

```c
#ifdef  OS_CPU_GLOBALS
#define OS_CPU_EXT
#else                           //如果没有定义OS_CPU_GLOBALS
#define OS_CPU_EXT  extern      //则用OS_CPU_EXT声明变量已经外部定义了。
#endif
```

**宏命令**
```c
#ifndef NVIC_INT_CTRL
#define NVIC_INT_CTRL       *((CPU_REG32 *)0xE000ED04)
#endif

#ifndef NVIC_PENDSVSET
#define NVIC_PENDSVSET      0x10000000
#endif

#define OS_TASK_SW()            NVIC_INT_CTRL = NVIC_PENDSVSET
#define OSIntCtxSw()            NVIC_INT_CTRL = NVIC_PENDSVSET
```

**系统时钟优先级设置**
为了确保系统的实时性，需要把系统滴答中断——RTOS的心脏的优先级设置为最高
```
#define  OS_CPU_CFG_SYSTICK_PRIO           0u
```

**函数声明**
```
void  OSStartHighRdy(void);                     //寻找当前任务中最高优先级的任务

void  PendSV_Handler (void);                        //任务级和中断级调度时触发

void  SysTick_Handler(void);                        //系统时钟中断函数
void  OS_CPU_SysTickInit    (CPU_INT32U  cnts); //初始化函数
```

`os_cpu_c.c`：移植μC/OS-III时，我们需要写1个任务堆栈结构初始化函数，一个系统时钟中断函数，初始化函数，还有9个钩子函数（只需要定义，无需现实，用到的时候实现即可）。

**钩子函数**

> 所谓钩子函数，指男鞋插入到某些函数中为扩展这些函数功能的函数。一般的，钩子函数为第三方软件开发人员提供扩充软件功能的入口点。为了拓展系统功能，μC/OS-II中提供了大量的钩子函数，用户不需要修改μC/OS-II内核代码程序，而只需要向钩子函数添加代码就可以扩充μC/OS-II的功能。
——张勇的《嵌入式操作系统原理与面向任务程序设计》

尽管μC/OS-III和μC/OS-II一样都提供了大量的钩子函数，但是我们一般用得比较少，一下为部分常用的钩子函数。
```
OSInitHookBegin()       //OSIinit()     系统初始化函数开头的钩子函数
OSInitHookEnd()     //OSIinit()     系统初始化函数结尾的钩子函数
OSTaskCreateHook()  //OSTaskCreate()  或OSTaskCreateExt()        创建任务钩子函数
OSTaskDelHook()     //OSTaskDel()       删除任务钩子函数
OSTaskIdleHook()        //OS_TaskIdle() 空闲任务钩子函数
OSTaskStatHook()        //OSTaskStat()      统计任务钩子函数
OSTaskSwHook()      //OSTaskSW()        任务切换钩子函数
OSTCBInitHook()     //OS_TCBInit()      任务控制块初始化钩子函数
OSTimeTickHook()        //OSTaskTick()      时钟节拍钩子函数
```

这些函数都是一些钩子函数，一般由用户拓展。如果用到这些钩子函数，需要在os_cfg.h中的`OS_CFG_APP_HOOKS_EN 为1`，即：

```
#define OS_CFG_APP_HOOKS_EN             1u 
```

**任务堆栈结构初始化函数**

对于像ARM内核一般都比较多寄存器的单片机，我们可以把函数中断的局部变量保存在寄存器中，以加快在任务运行或者切换时的速度。

```
CPU_STK  *OSTaskStkInit (OS_TASK_PTR    p_task,
                         void          *p_arg,
                         CPU_STK       *p_stk_base,
                         CPU_STK       *p_stk_limit,
                         CPU_STK_SIZE   stk_size,
                         OS_OPT         opt)
{
    CPU_STK  *p_stk;
    (void)opt;                                       // 'opt'并没有用到，防止编译器提示警告                       

p_stk = &p_stk_base[stk_size];                    //加载堆栈指针     
                                 
            /*中断后xPSR，PC，LR，R12，R3-R0被自动保存到栈中*/
    *--p_stk = (CPU_STK)0x01000000u;                // xPSR                                                  
    *--p_stk = (CPU_STK)p_task;                 // 任务入口                                           
    *--p_stk = (CPU_STK)OS_TaskReturn;          // R14 (LR)                                               
    *--p_stk = (CPU_STK)0x12121212u;                // R12                                                    
    *--p_stk = (CPU_STK)0x03030303u;                // R3                                                     
    *--p_stk = (CPU_STK)0x02020202u;                /R2                                                     
    *--p_stk = (CPU_STK)p_stk_limit;                // R1                                                     
    *--p_stk = (CPU_STK)p_arg;                  // R0 : 变量                                     
                   /* 剩下的寄存器需要手动保存到堆栈中*/
    *--p_stk = (CPU_STK)0x11111111u;                // R11                                                    
    *--p_stk = (CPU_STK)0x10101010u;                // R10                                                    
    *--p_stk = (CPU_STK)0x09090909u;                // R9                                                     
    *--p_stk = (CPU_STK)0x08080808u;                // R8                                                     
    *--p_stk = (CPU_STK)0x07070707u;                // R7                                                     
    *--p_stk = (CPU_STK)0x06060606u;                // R6                                                     
    *--p_stk = (CPU_STK)0x05050505u;                // R5                                                     
*--p_stk = (CPU_STK)0x04040404u;                // R4                                                     

    return (p_stk);
}
```

这是初始化任务堆栈函数。`OSTaskStkInit ()`被人误创建函数调用，所以要在开时，在栈中做出该任务好像刚被中断一样的假象。

在ARM内核中，函数中断后，`xPSR，PC，LR，R12，R3-R0`被自动保存到堆栈中的，`R11-R4`如果需要保存，只能手动保存。为了迷你被中断后的假象，`OSTaskStkInit ()`的工作就是在任务自己的堆栈中报讯cpu的所有寄存器。这些值里`R1-R12`都没有什么意义，这里用相应的数字代号（如`R1 0x01010101`），主要是为了调试方便。

**SysTick时钟初始化**
```
void  OS_CPU_SysTickInit (CPU_INT32U  cnts)
{
    CPU_INT32U  prio;
    CPU_REG_NVIC_ST_RELOAD = cnts - 1u;
        /* Set SysTick handler prio. */
    prio  = CPU_REG_NVIC_SHPRI3;
    prio &= DEF_BIT_FIELD(24, 0);
    prio |= DEF_BIT_MASK(OS_CPU_CFG_SYSTICK_PRIO, 24);

    CPU_REG_NVIC_SHPRI3 = prio;
      /* Enable timer. */
    CPU_REG_NVIC_ST_CTRL |= CPU_REG_NVIC_ST_CTRL_CLKSOURCE |
                            CPU_REG_NVIC_ST_CTRL_ENABLE;
    /* Enable timer interrupt. */
    CPU_REG_NVIC_ST_CTRL |= CPU_REG_NVIC_ST_CTRL_TICKINT;
}
```

**SysTick时钟处理函数**

```
void  SysTick_Handler (void)
{
CPU_SR_ALLOC();

    CPU_CRITICAL_ENTER();
OSIntNestingCtr++;   
/* Tell uC/OS-III that we are starting an ISR  */
    CPU_CRITICAL_EXIT();

OSTimeTick(); 
 /* Call uC/OS-III's OSTimeTick()  */

OSIntExit();  
/* Tell uC/OS-III that we are leaving the ISR  */
}
```
`os_cpu_a.asm`：这个文件包含了需要用汇编编写的代码。

**声明外部定义及变量**

```asm
    IMPORT  OSRunning                               ;声明外部定义，相当于C中的extern
    IMPORT  OSPrioCur
    IMPORT  OSPrioHighRdy
    IMPORT  OSTCBCurPtr
    IMPORT  OSTCBHighRdyPtr
    IMPORT  OSIntExit
    IMPORT  OSTaskSwHook
    IMPORT  OS_CPU_ExceptStkBase

    EXPORT  OSStartHighRdy                            ; 声明函数
    EXPORT  PendSV_Handler

向量中断控制器NVIC
    NVIC_INT_CTRL   EQU     0xE000ED04               ; 中断控制及状态寄存器ICSR的地址
    NVIC_SYSPRI14   EQU     0xE000ED22               ;系统异常优先级寄存器PRI_14
    NVIC_PENDSV_PRI EQU           0xFF                ; 定义PendSV的可编程优先级为255 
    NVIC_PENDSVSET  EQU     0x10000000              ; 中断控制及状态寄存器ICSR的位28
```

**`PendSV`中断服务**

在第一次开始任务切换时，而任务刚创建时`R4-R11`已经保存在对堆栈中，此时不用再保存，就会跳到`OS_CPU_PendSVHandler_nosave`执行。
真正的任务切换是在PendSV中断处理函数里做的，由于M3在中断时会有一些的寄存器自动保存到任务堆栈中，所以在PendSV中断处理函数最后那个只需保存`R4-R11`并调节堆栈指针即可。其中`xPSR，PC，LRR12，R0-R3`已自动保存，不用我们管了。

```asm
PendSV_Handler
    CPSID   I                                        ; Prevent interruption during context switch
    MRS     R0, PSP                                 ; PSP is process stack pointer
    CBZ     R0, OS_CPU_PendSVHandler_nosave      ; Skip register save the first time

    SUBS    R0, R0, #0x20                            ; Save remaining regs r4-11 on process stack
    STM     R0, {R4-R11}

    LDR     R1, =OSTCBCurPtr                        ; OSTCBCurPtr->OSTCBStkPtr = SP;
    LDR     R1, [R1]
    STR     R0, [R1]                                  ; R0 is SP of process being switched out

           ; At this point, entire context of process has been saved
OS_CPU_PendSVHandler_nosave
    PUSH    {R14}                                     ; Save LR exc_return value
    LDR     R0, =OSTaskSwHook                       ; OSTaskSwHook();
    BLX     R0
    POP     {R14}

    LDR     R0, =OSPrioCur                            ; OSPrioCur   = OSPrioHighRdy;
    LDR     R1, =OSPrioHighRdy
    LDRB    R2, [R1]
    STRB    R2, [R0]

    LDR     R0, =OSTCBCurPtr                          ; OSTCBCurPtr = OSTCBHighRdyPtr;
    LDR     R1, =OSTCBHighRdyPtr
    LDR     R2, [R1]
    STR     R2, [R0]

    LDR     R0, [R2]                      ; R0 is new process SP; SP = OSTCBHighRdyPtr->StkPtr;
    LDM     R0, {R4-R11}                 ; Restore r4-11 from new process stack
    ADDS    R0, R0, #0x20
    MSR     PSP, R0                       ; Load PSP with new process SP
    ORR     LR, LR, #0x04                 ; Ensure exception return uses process stack
    CPSIE   I
    BX      LR                             ; Exception return will restore remaining context

    END
```

如下图为任务切换时的寄存器变化过程。


![图3.2  任务切换时的寄存器变化过程](http://mint-blog.qiniudn.com/stm32-ucosiii-6.png) 



**启动最高优先级任务**

`OSStartHighRdy()`启动最高优先级任务，由OSStart()里调用，调用前必须先调用`OSTaskCreate()`创建至少一个用户任务，否则系统会发生崩溃。
```asm
    LDR     R0, =NVIC_SYSPRI14                     ; Set the PendSV exception priority
    LDR     R1, =NVIC_PENDSV_PRI
    STRB    R1, [R0]

    MOVS    R0, #0                                  ; Set the PSP to 0 for initial context switch call
    MSR     PSP, R0

LDR     R0, =OS_CPU_ExceptStkBase              ; Initialize the MSP to the 

OS_CPU_ExceptStkBase
    LDR     R1, [R0]
    MSR     MSP, R1    

    LDR     R0, =NVIC_INT_CTRL              ; Trigger the PendSV exception (causes context switch)
    LDR     R1, =NVIC_PENDSVSET
    STR     R1, [R0]
    
    CPSIE   I                                           ; Enable interrupts at processor level

OSStartHang
    B       OSStartHang                               ; Should never get here
```

### 3.3 µC/OS-III移植到STM32处理的操作步骤

①、搭建µC/OS-III工程目录和文件结构

工程目录如下：
```
├─APP：app.c,app.h,app_cfg.h
│      
├─BSP:BSP.c,BSP.h,led.c,led.h    
│      
├─CMSIS:core_cm3.c，core_cm3.h，stm32f10x.h，system_stm32f10x.c，system_stm32f10x.h
│  │  
│  └─startup：startup_stm32f10x_md.s
│          
├─DOC
├─FWLib（STM32库文件）
│  ├─inc  
│  └─src
│          
├─uC-CFG：cpu_cfg.h，os_cfg.h，os_cfg_app.h  
│      
├─uC-CPU：cpu_core.c，cpu_core.h，cpu_def.h 
│  │  
│  └─ARM-Cortex-M3
│      │      
│      └─MDK：cpu.h，cpu_a.s，cpu_c.c             
│              
├─uC-LIB：lib_ascii.c，lib_ascii.h，lib_def.h，lib_math.c，lib_math.h，lib_mem.c，lib_mem.h，lib_str.c，       lib_str.h
│  ├─Cfg
│  │  └─Template：lib_cfg.h       
│  │          
│  └─Ports
│      └─ARM-Cortex-M3
│          └─MDK：lib_mem_a.s
│                                  
├─uCOSIII
│  ├─Ports：os_cpu.h，os_cpu_a.s， os_cpu_c.c   
│  └─Source：os.h，os_cfg_app.c，os_core.c，os_dbg.c，os_flag.c，os_int.c，os_mem.c，os_msg.c，          os_mutex.c，os_pend_multi.c，os_prio.c， os_q.c，os_sem.c ，os_stat.c，os_task.c，os_tick.c，           os_time.c，os_tmr.c，os_type.h，os_var.c      
└─USER：includes.h，main.c，stm32f10x_conf.h，stm32f10x_it.c ，stm32f10x_it.h       
```

 工程文件结构如下图所示：
 
![图3.3  μC/OS-III工程文件结构](http://mint-blog.qiniudn.com/stm32-ucosiii-7.png)

 

②、KEIL µVision4工程配置
“Device”选项：选择“STM32F103RB”
“Target”选项：
 
![图3.4“Target”选项设置](http://mint-blog.qiniudn.com/stm32-ucosiii-8.png)

"C/C++"选项：
 
![图3.5“C/C++”选项设置](http://mint-blog.qiniudn.com/stm32-ucosiii-9.png)

Include Paths:
```
..\APP;..\BSP;..\CMSIS;..\FWLib\inc;..\uC-CFG;..\uC-CPU;..\uC-LIB;..\USER;..\uCOSIII\Ports;..\uCOSIII\Source;..\uC-CPU\ARM-Cortex-M3\MDK;..\uC-Probe\Target\Communication\DCC
```

③、创建任务来验证移植的正确性
几个主要的用户程序文件如下所示，具体参看工程。
Main.c：
```c
#include "includes.h"
     
Static  OS_TCB  startup_task_TCB;        
static  CPU_STK startup_task_stk[STARTUP_TASK_STK_SIZE];     //定义栈
  
int main(void)
{
    OS_ERR  err;
    BSP_Init();
    OSInit(&err);

    OSTaskCreate((OS_TCB     *)&startup_task_TCB,           //创建启动任务    
                 (CPU_CHAR   *)"Startup Task",
                 (OS_TASK_PTR )Task_Start, 
                 (void       *)0,
                 (OS_PRIO     )STARTUP_TASK_PRIO,
                 (CPU_STK    *)&startup_task_stk[0],
                 (CPU_STK_SIZE)STARTUP_TASK_STK_SIZE / 10,
                 (CPU_STK_SIZE)STARTUP_TASK_STK_SIZE,
                 (OS_MSG_QTY  )0,
                 (OS_TICK     )0,
                 (void       *)0,
                 (OS_OPT      )(OS_OPT_TASK_STK_CHK | OS_OPT_TASK_STK_CLR),
                 (OS_ERR     *)&err);

    OSStart(&err);
    return 0;
 }
```

App.c：

```c
#include "includes.h"

Static  OS_TCB  task_led2_TCB;       
Static  CPU_STK task_led2_stk[TASK_LED2_STK_SIZE];   //定义栈

void Task_Start(void *p_arg)
{
    OS_ERR  err;
    (void)p_arg;                                // 'p_arg' 并没有用到，防止编译器提示警告
    SysTick_init();

    OSTaskCreate((OS_TCB     *)&task_led2_TCB,                //创建任务2 
                 (CPU_CHAR   *)"LED2 Task",
                 (OS_TASK_PTR )Task_LED2, 
                 (void       *)0,
                 (OS_PRIO     )TASK_LED2_PRIO,
                 (CPU_STK    *)&task_led2_stk[0],
                 (CPU_STK_SIZE)TASK_LED2_STK_SIZE / 10,
                 (CPU_STK_SIZE)TASK_LED2_STK_SIZE,
                 (OS_MSG_QTY  )0,
                 (OS_TICK     )0,
                 (void       *)0,
                 (OS_OPT      )(OS_OPT_TASK_STK_CHK | OS_OPT_TASK_STK_CLR),
                 (OS_ERR     *)&err);

    while (1)
    {
        OS_ERR  err;
        LED1( ON );
        OSTimeDly(500,OS_OPT_TIME_DLY,&err);
        LED1( OFF);   
        OSTimeDly(500,OS_OPT_TIME_DLY,&err);    
    }
}

//任务2
void Task_LED2(void *p_arg)
{
    (void)p_arg;                    
    SysTick_init();
    
    while (1)
    {
        OS_ERR  err;
        LED2( ON );
        OSTimeDly(200,OS_OPT_TIME_DLY,&err);
        LED2( OFF);   
        OSTimeDly(200,OS_OPT_TIME_DLY,&err);  
    }
}
```

App_cfg.h

```c
#ifndef  __APP_CFG_H__
#define  __APP_CFG_H__

/*******************设置任务优先级*******************/
#define STARTUP_TASK_PRIO           4      
#define TASK_LED2_PRIO          5

/************设置栈大小（单位为 OS_STK ）************/
#define STARTUP_TASK_STK_SIZE       80   
#define TASK_LED2_STK_SIZE      80

#endif
```

首先不加任何用户任务来测试移植好的μC/OS-III内核自身运行情况，待验证内核正常运行之后，编写 Task_Start 和Task_LED2 这2个任务，实现对 2盏LED灯不停地闪烁，印证了μC/OS-III系统连续稳定运行没出现任何问题，可见本移植是成功的。


## 参考资料
1. UCOSIII在Cortex M3处理器上的移植 . 李承创，陈跃斌
2. 从0开始移植uCOS-II到野火stm32开发板 . 野火
3. uCOS-III 应用开发指南—基于 STM32F103系列.野火
4. μC/OS-III User's Manual 
5. ARM Cortex-M3权威指南 . Joseph Yiu 著，宋岩 译
6. 例说STM32 . 刘军 编著
