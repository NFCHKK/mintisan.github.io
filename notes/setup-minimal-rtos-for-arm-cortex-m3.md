# 记一个最小RTOS的诞生

芯片平台：STM32F103系列  
开发环境：MDK4.x+  
使用工具：Sublime Text2，CoolFormat
固件版本：FWLIB 3.5  
开发语言：C，ARM汇编+内敛汇编  
代码地址：https://github.com/mintisan/Mint

摘要：其实吧，这个轮子已经被n多人造过了，但是对于菜鸟的我来说，通过再造一遍把思路理清楚的性价比还是蛮高的。但是要做到尽可能的小，那就是一个减法的过程，尽可能减少OS的作用，OS的作用是对硬件的抽象，就是一个夹在应用程序员和硬件之间的glue，它的效果是使每个程序员写的应用程序本身感觉起来像是独占着系统资源，如CPU，内存，I/O和硬盘等等，这里的“系统资源”在任务（程序）看来就是“上下文环境”，如果写成C代码来来看就是一个结构体，这个结构体里面有很多指针，这些个指针指向一些我们分配给它的内存，变量之类的东西，他们记录着任务的运行状态，我们可以通过这些上下文环境，也就是任务的运行状态来操作这些任务，如让他使用或者让出CPU的资源，因此对OS来说最核心的WHAT任务是任务的切换，然后在此基础之上再来谈HOW，即任务切换的策略。

PS：其实，这是我事后写完之后的记录，我个人比较喜欢看别人写的过程思路，这样子的话，我就知道他在遇到某某问题的时候的解决思路的如何的，由于这个代码写完之后放了去敢毕业论文了，放了太久了，只能退而求其次来把结果再回忆一遍，其中的过程思路细节可能会丢失蛮多。


[TOC]


## 新建一个工程
大致按照[野火](http://www.amobbs.com/thread-5416220-1-1.html)的思路来搭建一个project的目录结构，其实在构建目录结构的同时，心里大致已经想好了在哪个目录放哪些文件，哪些文件里放哪些模块的代码。想起某人说过的一句话，“人类的所有事情都可以看成是分类的过程”。也就是说人类的大脑在对任何事情都在进行模式分类，正如最近很火的深度学习类似。扯远了，看MDK project的结构：

![](http://mint-blog.qiniudn.com/setup-rtos-mdk-project.png)

代码和目录结构和项目结构基本对应：

![](http://mint-blog.qiniudn.com/setup-rtos-mdk-dir.png)

由于我买了[原子](http://shop62103354.taobao.com/)的Mini板子，其采用的MCU是STM32F103RB，所以MDK的环境主要配置如下：

![](http://mint-blog.qiniudn.com/setup-rtos-mdk-option.png)

主要是`Include Paths`的设置，把一些常用的头文件都包含进去，让MDK的环境自己去找头文件的所在，这时候在新建项目时就可以不把头文件包含进来了，不过一开始需要看它们，所以还是先包含进来，这样子可以少点一次鼠标。

还有`Define`里面的`STM32F10X_MD`是指明采用芯片的类型是中等容量大小的（MD），这个在此处设置的宏定义会在`system_stm32f10x.c`中的如下代码106~116行中用到：
```c
#if defined (STM32F10X_LD_VL) || (defined STM32F10X_MD_VL) || (defined STM32F10X_HD_VL)
/* #define SYSCLK_FREQ_HSE    HSE_VALUE */
 #define SYSCLK_FREQ_24MHz  24000000
#else
/* #define SYSCLK_FREQ_HSE    HSE_VALUE */
/* #define SYSCLK_FREQ_24MHz  24000000 */ 
/* #define SYSCLK_FREQ_36MHz  36000000 */
/* #define SYSCLK_FREQ_48MHz  48000000 */
/* #define SYSCLK_FREQ_56MHz  56000000 */
#define SYSCLK_FREQ_72MHz  72000000
#endif
```
这里我们看到如果按本文所示设置，则会进入`#else`分支，设置系统时钟为72MHz，正是芯片的系统频率。

同理`USE_STDPERIPH_DRIVER`这个宏定义在`stm32f10x.h`中的8296~8298行起作用：
```c
#ifdef USE_STDPERIPH_DRIVER
  #include "stm32f10x_conf.h"
#endif
```
这里说如果定义了宏`USE_STDPERIPH_DRIVER `，就将`stm32f10x_conf.h`这个文件包含进来，这个文件是用来选择我们将所用到哪些模块的库。在本文中用到的固件库出来基本都要用的misc和rcc，还有就是gpio和usart，gpio用来多任务测试，usart用来输出调试信息。`stm32f10x_conf.h`文件中的模块选择通过注释`//`来打开关闭，如代码26~50行所示：
```c
/* Includes ------------------------------------------------------------------*/
/* Uncomment/Comment the line below to enable/disable peripheral header file inclusion */
//#include "stm32f10x_adc.h"
//#include "stm32f10x_bkp.h"
//#include "stm32f10x_can.h"
//#include "stm32f10x_cec.h"
//#include "stm32f10x_crc.h"
//#include "stm32f10x_dac.h"
//#include "stm32f10x_dbgmcu.h"
//#include "stm32f10x_dma.h"
//#include "stm32f10x_exti.h"
//#include "stm32f10x_flash.h"
//#include "stm32f10x_fsmc.h"
#include "stm32f10x_gpio.h"
//#include "stm32f10x_i2c.h"
//#include "stm32f10x_iwdg.h"
//#include "stm32f10x_pwr.h"
#include "stm32f10x_rcc.h"
//#include "stm32f10x_rtc.h"
//#include "stm32f10x_sdio.h"
//#include "stm32f10x_spi.h"
//#include "stm32f10x_tim.h"
#include "stm32f10x_usart.h"
//#include "stm32f10x_wwdg.h"
#include "misc.h" /* High level functions for NVIC and SysTick (add-on to CMSIS functions) */
```

## 编写裸机app

![](http://mint-blog.qiniudn.com/setup-rtos-app.png)

### GPIO
用GPIO来写的LED跑马灯程序就是嵌入式中的“Hello World”，因为是使用库文件，所以这个程序过程相对比较简单，可以参考[野火](http://www.amobbs.com/thread-5490719-1-1.html)或者[原子](http://openedv.com/forums/show/2.htm;jsessionid=18A71B1D2A90AD9D072B5AD6D36FE0FA)的教程都是不错的选择。本文中设置两个LED轮流亮灭：PA8和PD2两个端口。


### USART
*串口是嵌入式开发人员性价比最高的调试工具，木有之一。*其实话说非嵌入式程序员也会经常使用`print`来通过查看程序的一些状态变量来确实的程序的运行状况，但是在对嵌入式工程师来说串口调试的地位显著提高，因为通过调试器来设置断点的代(jia)价(ge)稍(zhen)微(xin)有(hen)点(gui)大(a)。

在STM32的串口上，可以通过一篇博文（好吧，待续吧）来讨论，因为还是有点东西的，如是否通过ARM公司自带的MicroLib库来，是否通过中断来实现，如何减少printf的时间，如通过缓存+DMA来实现，具体可以查看[AMOBBS](http://www.amobbs.com/search.php?mod=forum&searchid=855&orderby=lastpost&ascdesc=desc&searchsubmit=yes&kw=USART)来查询，代码的话野火和原子的都可以，建议采用库文件跑起来看看，然后可以再学习如何通过不同的方式实现printf，最后可以看一下原子的寄存器版本。


## 移植ucos的移植代码
在ucos移植上，也是可以通过一篇博文（好吧，待续吧）来讨论，虽然也有居多的人造过相同的轮子，但是我觉得还是有的玩的地方地方，比如讲一些汇编代码改写成C代码和内敛汇编，这样在文件后缀名层面上至少全是.c和.h结尾的了XD。[野火](http://www.amobbs.com/thread-5490719-1-1.html)的那个版本是很详细的，也可以看我的一次[ucos-iii的作业](http://pan.baidu.com/s/1jGmNuUa)。

![](http://mint-blog.qiniudn.com/setup-rtos-os-port.png)


## top-down思路写内核source

![](http://mint-blog.qiniudn.com/setup-rtos-os-source.png)

### m_os_cfg.h
因为力求简单，所示任务调度算法采用最简单的方法（详见后面），也没有过多的配置，因此`m_os_cfg.h`为空文件，简单的任务数配置均放在`m_os.h`中。

### m_os.h

#### 说明1
首先说下一个在[《征服C指针》](http://book.douban.com/subject/21317828/)中看到的一个防重定义的小技巧，它可以标识一个变量是否为全局变量。
首先，在头文件m_os.h中定义如下选择宏，外加一些全局变量。
```c
#ifdef GLOBAL_VAR
#define GLOBAL
#else
#define GLOBAL extern
#endif

/* 系统全局变量 */
GLOBAL uint32_t m_prio_tbl[N_TASKS/32+1];

GLOBAL m_tcb*   m_cur_tcb;
GLOBAL m_tcb*   m_high_tcb;

```
然后，在C文件m_core.c中的开始之处加上：
```c
#define GLOBAL_VAR

#include "m_os.h"

```

最后，就ok了，这样就实现了**变量写在头文件，声明在头文件，定义在某个源文件,到处可以被使用**。

#### 说明2
在`typedef`类型上面，采用`stdint.h`中的统一规定，示例如下：
```c
    /* exact-width signed integer types */
typedef   signed          char int8_t;
typedef   signed short     int int16_t;
typedef   signed           int int32_t;
typedef   signed       __int64 int64_t;

    /* exact-width unsigned integer types */
typedef unsigned          char uint8_t;
typedef unsigned short     int uint16_t;
typedef unsigned           int uint32_t;
typedef unsigned       __int64 uint64_t;
```


#### 任务控制块
其实就是保存任务上下文的结构体，貌似不能再小了，如下：
```c
typedef struct m_tcb{           
    uint32_t*   sp;        //堆栈指针
    uint32_t    ticks;            //系统“滴答”时钟
}m_tcb;
```
`sp`的每一个任务的私有堆栈，用来保存任务的一些上下文，如pc，通用寄存器r0~r12，状态寄存器xPSR等，用于恢复现场的；`ticks`是记录任务的运行时钟的，和STM32的系统时钟Systick挂钩，用来记录任务运行了好久（时间片），现阶段主要用来编写延迟函数。

#### 常用配置宏
任务数目，这里分为系统任务和用户任务，目前系统任务就一个空闲任务，当然可以像ucos中再设置个统计任务之类的。
```c
#define USER_TASKS  300
#define SYS_TASKS   2
#define N_TASKS     (USER_TASKS+SYS_TASKS)
```
#### 系统全局变量

```c

GLOBAL m_tcb tcb[N_TASKS];            //任务数个TCB

/* 记录任务优先级的查询表 */
GLOBAL uint32_t m_prio_tbl[N_TASKS/32+1];

GLOBAL m_tcb*   m_cur_tcb;        //当前运行任务tcb指针
GLOBAL m_tcb*   m_high_tcb;    //最高就绪任务tcb指针

GLOBAL uint32_t m_cur_prio;    //当前运行任务优先级
GLOBAL uint32_t m_high_prio;    //最高就绪任务tcb优先级

GLOBAL uint32_t m_int_nest;        //中断嵌套层数，可不要

GLOBAL uint32_t m_time;               //系统开始运行时间

/* 关于空闲任务的一些配置和变量 */
#define IDLE_PRIO (N_TASKS-1)               //空闲任务优先级，最低
#define IDLE_STK_SIZE   100                 //空闲任务优先级的私有栈大小
GLOBAL uint32_t m_idle_stk[IDLE_STK_SIZE];  //栈空间
void m_idle_task(void* pdata);              //空闲任务
```
####  系统对内服务 
```c
void m_sched(void);                         //任务调度函数，在此函数内会发生任务切换
uint32_t* m_init_sp(m_task task, uint32_t* sp);     //在任务创建函数m_create_task中被调用，初始化任务的堆栈空间，就像刚被中断过一样

void m_set_prio(uint32_t prio);                 //当任务就绪时，在任务就绪表中占个坑
void m_reset_prio(uint32_t prio);                   //当任务无法获取资源时，清楚此任务在就绪表中坑
void m_get_high_prio(void);                     //获取优先级最高的就绪任务优先级

void m_enter_int(void);                         //进入临界区，因为此后需要操作全局变量
void m_tick_time(void);                         //系统时钟，放在系统滴答中断SysTick_Handler中
void m_exit_int(void);                          //退出临界区，操作完毕

```

#### 系统对外服务

```c

void m_init(void);                                      //系统初始化，此处仅仅用来初始化系统空闲任务
void m_start(void);                                     //开始运行最高就绪任务，在此之前需要m_create_task一些任务

void m_create_task(m_task task, uint32_t*  sp, uint32_t prio);  //创建任务，在m_start之前创建一些任务供MOS调度
void m_delete_task(uint32_t prio);                      //删除任务，从MOS中消失,但由于内存空间是静态分配，所以还是占着内存

void m_delay_time(uint32_t prio, uint32_t ticks);               //延时函数，用于让出MCU的资源
```

**总结：`m_os.h`和`ucosii.h`类似，记录着整个系统的变量声明和函数声明，变量的定义可以按照《征服C指针》的技巧如自己所愿来定义到任何一个C文件，函数的话，或者称为服务可能更好一点，分为内部和外部，对外的函数只有简单的5个，能实现简单的延时来让出MCU，其实就是拿来写个`高效利用MCU的流水灯`，XD**

### m_core.c
与内核相关的函数均定义在此函数内，不过在操作全局变量的时候没有加入临界区保护的进出代码。
```c
void m_init(void)
{
    m_create_task(m_idle_task,&m_idle_stk[IDLE_STK_SIZE-1],IDLE_PRIO);
}

/*
    1. 获取创建的最高任务的优先级
    2. 设置一些全局变量
    3. 最高优先级任务，走你
*/
void m_start(void)
{
    m_get_high_prio();
    
    m_cur_prio = m_high_prio;
    m_cur_tcb = &tcb[m_cur_prio];
    m_high_tcb = &tcb[m_high_prio];
    
    m_start_high();
}
/* 
    1. 有人被延时（阻塞）了，所以看看有没有更高的就绪任务在
    2. 如果是则
        2.1 设置最该优先级以及当前优先级栈地址
        2.2 切换任务
*/
void m_sched(void)
{
    m_get_high_prio();
    m_enter_critical();
    if(m_high_prio != m_cur_prio)
    {
        /* 此处的顺序是有讲究的，上下文切换需要的是旧的栈地址m_cur_tcb，新的栈地址m_high_tcb，以及新的优先级m_cur_prio */
        m_cur_tcb = &tcb[m_cur_prio];
        m_high_tcb = &tcb[m_high_prio];
        m_cur_prio = m_high_prio;
        m_exit_critical();
        m_switch_task();
    }
    else
    {
        m_exit_critical();
    }
}
/* 
    告诉OS一声：我进入中断了
*/
void m_enter_int(void)
{
    m_int_nest++;
}
/*
    1. 记录系统运行时间+1
    2. 遍历TCB对delay参数减一
    3. 再看看有没有任务延时到期
    4. 如果有，则
        4.1 设置任务状态
*/
void m_tick_time(void)
{
    uint32_t i;
    m_time++;
    for(i = 0;i < N_TASKS;i++)      //数组循环（省空间） or 链表遍历（省时间）
    {
        if(tcb[i].ticks != 0)
        {
            tcb[i].ticks--;
            if(tcb[i].ticks == 0)
            {
                m_set_prio(i);
            }
        }
    }
}
/*
    1. 嵌套层数减一
    2. 启动任务调度函数看看有没有高优先级任务被就绪
*/
void m_exit_int(void)
{
    m_int_nest--;
    m_sched();
}
```


### m_task.c
任务的创建和删除函数在此处定义，任务优先级的设置也在此文件中定义
```c

/*
    在任务就绪的时候，在任务就绪表中占个坑，此函数
    仅在m_tick_time中北检测延时到否，到了设置为就绪
*/
void m_set_prio(uint32_t prio)
{
    m_prio_tbl[prio >> 5] |= (0x01 << (prio % 32 ));
}

/*
    与m_set_prio执行相反的操作，在延时m_delay_time的时候被调用
*/
void m_reset_prio(uint32_t prio)
{
    m_prio_tbl[prio >> 5] &= ~(0x01 << (prio % 32 ));
}

/*
    在m_start和m_sched中北调用，因为MOS总是运行优先级最高的就绪任务
*/
void m_get_high_prio(void)
{
    uint32_t prio = 0;
    uint32_t grp = 0;
    while(m_prio_tbl[grp] == 0)
        grp++;
    
    while((m_prio_tbl[grp] & (0x01 << prio)) == 0)
        prio++;
    m_high_prio = (grp << 5) + prio;
}

/*
    创建一个新的任务，参数参考ucos
*/
void m_create_task(m_task task, uint32_t* sp, uint32_t prio)
{
    tcb[prio].sp = m_init_sp(task,sp);
    tcb[prio].ticks = 0;
    m_set_prio(prio);
}

/* 
    任务删除函数可以删除任意状态的任务，
    只有当其删除自身（即RUNNING状态），会引起调度。
*/
void m_delete_task(uint32_t prio)
{
    m_reset_prio(prio);
    m_get_high_prio();
    if( prio == m_cur_prio)
        m_sched();
}

/*
    被m_init调用，当MCU空闲时运行此任务
    可以再此处加入hook函数啥的来检测系统的状态
*/
void m_idle_task(void* pdata)
{
    static uint32_t counter;
    while(1)
    {
        counter++;
    }
}

```




### m_time.c
只有一个延时函数用于让出MCU的资源
```c
/*
    延时函数，用于让出MCU资源
*/
void m_delay_time(uint32_t prio, uint32_t ticks)
{
    m_enter_critical();
    tcb[prio].ticks = ticks;
    m_reset_prio(prio);
    m_exit_critical();
    
    m_sched();
}
```

## 编写task

![](http://mint-blog.qiniudn.com/setup-rtos-os-task.png)


### m_app.h
此处本来用来放任务相关的变量声明，但是现在比较简单，故为空文件。


### m_app_cfg.h
任务参数配置头文件。与ucos类似。
```c
//任务堆栈大小定义
#define TASK_START_SIZE 50
#define TASK0_TCB_SIZE  50
#define TASK1_TCB_SIZE  50

//任务堆栈定义
APP uint32_t START_STK[TASK_START_SIZE];
APP uint32_t TASK0_STK[TASK0_TCB_SIZE];
APP uint32_t TASK1_STK[TASK1_TCB_SIZE];
//任务优先级定义
#define Start_Prio 0
#define Task0_Prio 128
#define Task1_Prio 64
//任务定义
void StartTask(void *pdata);
void Task0(void *pdata);
void Task1(void *pdata);

```


### m_app.c
任务函数定义之处。
```c
//启动任务，在创建其他两个任务之后自我毁灭
void StartTask(void *pdata)
{
    SysTick_Configuration();
    
    m_create_task(Task0,&TASK0_STK[TASK0_TCB_SIZE-1],Task0_Prio);
    m_create_task(Task1,&TASK1_STK[TASK1_TCB_SIZE-1],Task1_Prio);
    
    /* 建立其他任务之后删除自己，但是其实空间还是被占据的 */
    m_delete_task(Start_Prio);
}

//控制LED0
void Task0(void *pdata)
{
    pdata = pdata;
    while(1)
    {
        //__current_sp()为MDK自带的特殊函数，可直接获得SP的地址
        uint32_t Task0SP = __current_sp();
        printf("Task0's SP is %X \r\n",Task0SP);
        
        m_delay_time(Task0_Prio,500);
        GPIO_ResetBits(GPIOA, GPIO_Pin_8);  
        m_delay_time(Task0_Prio,500);
        GPIO_SetBits(GPIOA, GPIO_Pin_8);
    }
}

//控制LED1
void Task1(void *pdata)
{
    pdata = pdata;
    while(1)
    {
        uint32_t Task1SP = __current_sp();
        printf("Task1's SP is %X \r\n",Task1SP);
        
        m_delay_time(Task1_Prio,500);
        GPIO_SetBits(GPIOD, GPIO_Pin_2);    
        m_delay_time(Task1_Prio,500);
        GPIO_ResetBits(GPIOD, GPIO_Pin_2);  

    }
}
```



## main
好吧，一般都是从main函数入手开始写，此处把它放在最后，但是确实最简单的形式了。
```c
int main(void)
{
    BSP_Init();     //板级资源初始化
    
    m_init();           //MOS系统初始化

    //创建启动任务
    m_create_task(StartTask,&START_STK[TASK_START_SIZE-1],Start_Prio);
    
    //启动MOS系统
    m_start();
    
    //永远不会返回
    return 0;
}

```

## 结果
设置debug为`use simulator`即可，然后开始调试并且运行。
打开`view`中的`usart1`和`Peripherals`中的`GPIOA`和`GPIOD`，可观察PA8和PD2交替亮灭和串口输出如下信息：

![](http://mint-blog.qiniudn.com/setup-rtos-mdk-simulation-result.png)


## 结语
其实，这篇博文的思维过程相对薄弱，在模块中可能重新组织，有点效果，但是在模块之间的编写过程中是交叉进行的，哪有可能一次就搞定的，只是按照事后总结的过程进行**罗列**和分类。






















