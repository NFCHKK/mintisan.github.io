# MSP430 驱动库学习笔记

[TOC]


## 开发环境
1. MSP430F5xxx系列开发板
2. MSP-FET430UIF仿真器
3. USB-串口转接板
4. [MSP430 CCS v5 IDE][1]
5. [MSP430 Driver Library][2]

## 库文件概览
假设，你已经准备好了开发环境的前4条，然后从[官方][2]下载到最新版本的驱动库，本文以`msp430_driverlib_1_90_00_65.zip`为例进行开发，先来看看官方是如何介绍**MSP430驱动库**的：
> What is MSP430 Driver Library?  
MSP430 Driver Library is a collection of high level APIs that speed up software development for MSP430. The MSP430 Driver Library package includes API documentaion and examples to help you get started. 

简而言之，就和STM32的固件库是一个类似的东西，是将底层的寄存器进行封装，我们只需要操作上层的API接口。这样子可以加快工程师的开发速度，快速的搭建我们需要的原型，并且相对于直接操作寄存器，其在可移植性和代码逻辑的可读性上也更胜一筹。

目前驱动库支持以下的MSP430器件类型，幸运的是，我们使用的**MSP430F5510**在此之列:

- MSP430F5xx_6xx
- MSP430FR57xx
- MSP430FR5xx_6xx
- MSP430i2xx

现在将下载好的`msp430_driverlib_1_90_00_65.zip`解压之后，进入`.\msp430_driverlib_1_90_00_65\driverlib_1_90_00_65`文件夹，其目录如下所示：

![MSP430驱动库目录][3]

由于我们的芯片是`MSP430F5510`，所以关心的是带`MSP430F5xx_6xx`的内容，

- 文档：`\doc\MSP430F5xx_6xx`
- 驱动库：`\driverlib\MSP430F5xx_6xx`
- 例程：`\examples\MSP430F5xx_6xx`

### 新建工程

文档相当于一个字典，当我们需要查什么是在去看。这里先简要的介绍了如何快速的建立以驱动库为基础的模板工程。
1、`Project->New CCS Project`填写工程名，选择器件类型，按`Finish`完成。

![NewCCSProject][4]

2、配置项目并添加驱动库

新建完工程之后，其工程目录如下图所示：

![工程目录][5]

- `Includes`：这里就是我们刚才在选择器件类型时，CCS帮我们自动添加的头文件，主要是MSP430的寄存器头文件。
- `Lnk_msp430f5510.cmd`：这是链接之后生成的内存分布图，指定了变量在哪一块内存地址上，代码段在哪一段Flash地址上。
- `main.c`：基本为空的一个入口函数`main`所在的文件。
- `MSP430F5510.ccxml`：这是我们的配置文件，CCS识别MSP430项目基本就靠这个配置文件。

在项目上点击右键，选择`Properties->Optimization`，将其优化等级关闭，其原因是在调试的时候，CCS过度的优化，将它认为无用的变量和语句忽略掉，是的，连语句也给忽略掉了，强(keng)大(die)的编译器。

![关闭编译优化][6]

然后，将我们需要的驱动库`\driverlib\MSP430F5xx_6xx`复制到我们实际文件夹的目录，并且打开`Include Options->Add..->Workspalce->Toggle the GPIO->MSP430F5xx_6xx`，完成头文件的添加。其作用就是在我们引用头文件的时候，不用添加绝对路径的地址，因为CCS会将其设置为系统当前路径，和C语言以及MSP430的头文件的待遇一样。

![添加库文件路径][7]


3、添加自己的代码

默认项目新建完成之后，main函数的代码非常简单。
```c
/*
 * main.c
 */
void main(void) {
    
}
```

我们需要去看看TI给我们的例程：`\examples\MSP430F5xx_6xx`下的`gpio_ex1_outputHi.c`，去掉其BSD声明如下：
```c
//******************************************************************************
//   Write a Word to Port A (Port1+Port2)
//
//   Writes a Word(FFFFh) to Port A and stays in LPM4
//   ACLK = 32.768kHz, MCLK = SMCLK = default DCO
//
//  Tested On: MSP430F5529, MSP430FR5739
//             -----------------
//         /|\|                 |
//          | |                 |
//          --|RST          PA.x|-->HI
//            |                 |
//            |                 |
//
//
//   This example uses the following peripherals and I/O signals.  You must
//   review these and change as needed for your own board:
//   - GPIO Port peripheral
//
//   This example uses the following interrupt handlers.  To use this example
//   in your own application you must add these interrupt handlers to your
//   vector table.
//   - None.
//******************************************************************************
#include "driverlib.h"

void main(void)
{
        //Stop WDT
        WDT_A_hold(WDT_A_BASE);

        //PA.x output
        GPIO_setAsOutputPin(
                GPIO_PORT_PA,
                GPIO_PIN0 + GPIO_PIN1 + GPIO_PIN2 + GPIO_PIN3 +
                GPIO_PIN4 + GPIO_PIN5 + GPIO_PIN6 + GPIO_PIN7 +
                GPIO_PIN8 + GPIO_PIN9 + GPIO_PIN10 + GPIO_PIN11 +
                GPIO_PIN12 + GPIO_PIN13 + GPIO_PIN14 + GPIO_PIN15
                );


        //Set all PA pins HI
        GPIO_setOutputHighOnPin(

                GPIO_PORT_PA,
                GPIO_PIN0 + GPIO_PIN1 + GPIO_PIN2 + GPIO_PIN3 +
                GPIO_PIN4 + GPIO_PIN5 + GPIO_PIN6 + GPIO_PIN7 +
                GPIO_PIN8 + GPIO_PIN9 + GPIO_PIN10 + GPIO_PIN11 +
                GPIO_PIN12 + GPIO_PIN13 + GPIO_PIN14 + GPIO_PIN15
                );

        //Enter LPM4 w/interrupts enabled
        __bis_SR_register(LPM4_bits + GIE);

        //For debugger
        __no_operation();
}
```

这里我们直接引用MSP430的驱动库`#include "driverlib.h"`，就是因为我们在之前的头文件中进行了配置。

另外，在修改之前需要说明的是，`PortA`相当于`Port1 + Port2`，这里为了和原理图上的一直，均改成以数字结尾。

![MSP430F5510芯片引脚图][8]

这里我们将其进行简化改写，来使其翻转一个GPIO即可。修改之后如下：

```c
#include "driverlib.h"

void main(void)
{
        //停止看门狗中断
        WDT_A_hold(WDT_A_BASE);

        //设置P1.0为输出功能
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        while(1){
        //设置P1.0输出为高
        GPIO_setOutputHighOnPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );
        __delay_cycles(4000);       //延时4000个circle
        //设置P1.0输出为低
        GPIO_setOutputLowOnPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );
        __delay_cycles(4000);       //延时4000个circle
        }
}
```

这里稍微解释下`__delay_cycles(4000);`，它让MSP430空转了4000个时钟周期，那么在默认情况下（即我们没有对430进行时钟设置的时候），大概多少时间呢？

而我们看到在官方例程中，`ACLK = 32.768kHz, MCLK = SMCLK = default DCO 1.045MHz`，430使用主时钟MCLK为系统时钟信号。貌似430的时钟也是蛮复杂的，需要配置若干寄存器，这里先不说明如何配置时钟的寄存器，具体可以参考[MSP430时钟系统讲解][10]。这里通过示波器看到翻转周期为7.74ms，那么每次翻转为7.74ms/2=3.87ms。1000/3.87*4000 = 1.033592MHz，如果将GPIO翻转的时间考虑进来，与官方的1.045MHz还是满接近的。（To Be Continued... in 时钟）

可以看到，其代码过程与我们的思路是完全一致的，可读性也比较高。当我们需要某个模块时，我们只要去找文档查我们需要的API即可，如`MSP430F5xx_6xx_DriverLib_Users_Guide-1_90_00_65.pdf`。


4、编译运行

可以在项目右键上点击`Build Project`

![编译结果][11]

这里我们可以看到右边有一大堆黄色的东西，那是因为CCS默认开启了它的`ULP Advisor`，简而言之，它就是一套TI建议的编程规范，按照它建议编写出来的代码具有更强的健壮性。不过话说连自己的库也是没有遵循自己的代码规范，看来这个规范的推行是多么的困难；或者说改变一个人自认为舒服的习惯是多么的困难，即使明知改变对自己是有利的。

![ULPAdvisor][12]


最后，我们只需要点击那个`小虫子`，就可以下载并调试代码了。

## 例程

### 基础篇

#### 时钟
时钟之于嵌入式硬件就像心脏之于人体。心脏的跳动为血液在全身的流动提供了源源不断的动力；晶振的振动为内设和外设的工作提供了时钟的驱动，如果木有时钟的跳动，那么这个硬件就是死的。

由于时钟如此的重要，所以不管430还是STM32都为其准备了我们叫做“时钟树”的东东来连接时钟源和使用时钟的设备。

先来看看它的时钟源和时钟信号：

在MSP430单片机单片机中一共有三个或四个**时钟源**：

1. LFXT1CLK，为低速/高速晶振源，通常接*32.768kHz*，也可以接（400kHz～16Mhz）； 
2. XT2CLK，可选高频振荡器，外接标准高速晶振，通常是接*8Mhz*，也可以接（400kHz～   16Mhz）；  
3. DCOCLK，数控振荡器，为内部晶振，由RC震荡回路构成； 
4. VLOCLK，内部低频振荡器，12kHz标准振荡器。 

![MSP430时钟源][9]

在MSP430单片机内部一共有三个**时钟信号**：

1. ACLK，Auxiliary Clock，辅助时钟，通常由LFXT1CLK或VLOCLK作为时钟源，可以通过软件控制更改时钟的分频系数；  
2. MCLK，Master Clock，系统主时钟单元，为系统内核提供时钟，它可以通过软件从四个时钟源选择； 
3. SMCLK，Sub-Main Clock，系统子时钟，也是可以由软件选择时钟源。

#### 看门狗
最早听到**看门狗**这个概念是在大学学51的时候，然后，

问大神：啥是看门狗？
大神言之：你在门口放一只狗，然后你要每隔一段时间就去“喂狗”，不然它就“叫”。

再问大神：那有啥子用处？
大神言之：一般用来放置程序跑飞用的，因为如果跑飞了，那么就喂不了狗了，那么狗就叫了，比如它可以让你快速重启你的系统。

其实，以上只是看门狗的一个用处，其实它就是一个稍微有点特殊的定时器，多了一个“喂”就不“叫”的功能。这里用430的官方例子，主要来指定不同的时钟源来驱动看门狗。第一个是内部SMCLK；第二个是内部ACLK；最后一个就是上面大神讲的用看门狗来修复程序跑飞的示例了。


先瞅瞅第一个例程：
```c
//******************************************************************************
//!
//! WDT - Toggle P1.0, Interval Overflow ISR, DCO SMCLK
//!
//!  Toggle P1.0 using software timed by the WDT ISR. Toggle rate is approx.
//!  30ms = {(default DCO 1.045MHz) / 32768} based on default DCO = SMCLK clock
//!  source used in this example for the WDT.
//!  ACLK = n/a, MCLK = SMCLK = default DCO ~1.045MHz
//!
//!  Tested On: MSP430F5529,MSP430FR5739
//!             -----------------
//!         /|\|                 |
//!          | |                 |
//!          --|RST              |
//!            |             P1.0|-->LED
//!            |                 |
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - WDT peripheral
//! - GPIO Port peripheral
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - WDT_A_VECTOR
//!
//******************************************************************************
#include "driverlib.h"
void main(void)
{
        //采用内部SMCLK时钟来初始化WDT模块，其喂狗时间间隔:
        //WDT_A_CLOCKDIVIDER_2G     :
        //WDT_A_CLOCKDIVIDER_128M   :
        //WDT_A_CLOCKDIVIDER_8192K  :   8s
        //WDT_A_CLOCKDIVIDER_512K   :   500ms
        //WDT_A_CLOCKDIVIDER_32K    :   32ms
        //WDT_A_CLOCKDIVIDER_8192   :   8ms
        //WDT_A_CLOCKDIVIDER_512    :   500us
        //WDT_A_CLOCKDIVIDER_64     :   62.5us
        WDT_A_intervalTimerInit(WDT_A_BASE,
                                WDT_A_CLOCKSOURCE_SMCLK,
                                WDT_A_CLOCKDIVIDER_32K);
        //启动看门狗A
        WDT_A_start(WDT_A_BASE);

        //使能看门狗中断，当然在使能之前最好清除一下其中断标志位
        SFR_clearInterrupt(SFR_WATCHDOG_INTERVAL_TIMER_INTERRUPT);
        SFR_enableInterrupt(SFR_WATCHDOG_INTERVAL_TIMER_INTERRUPT);

        //设置P1.0为输出模式
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //进入 LPM0, 并使能全局中断
        __bis_SR_register(LPM0_bits + GIE);
        //好让你设置断点用
        __no_operation();
}

//看门狗中断服务函数
#pragma vector=WDT_VECTOR
__interrupt
void WDT_A_ISR(void)
{
        //翻转 P1.0
        GPIO_toggleOutputOnPin(
                GPIO_PORT_P1,
                GPIO_PIN0);
}

```

在确定时钟源的情况下，可以改变的就是分频系数了，看例程最前面的详解可知`30ms = {(default DCO 1.045MHz) / 32768}`，大致算下就可以获得中断触发的时间了，我这里用示波器测试了下，给出了较短时间的间隔供参考。

第二个例程就是改变了时钟源的选择，此时的分频系数需要重新进行计算，具体改变的代码如下：
```c
        //采用内部ACLK时钟来初始化WDT模块，其喂狗时间间隔:
        //WDT_A_CLOCKDIVIDER_2G     :
        //WDT_A_CLOCKDIVIDER_128M   :
        //WDT_A_CLOCKDIVIDER_8192K  :   250s
        //WDT_A_CLOCKDIVIDER_512K   :   16s
        //WDT_A_CLOCKDIVIDER_32K    :   1s
        //WDT_A_CLOCKDIVIDER_8192   :   250ms
        //WDT_A_CLOCKDIVIDER_512    :   16ms
        //WDT_A_CLOCKDIVIDER_64     :   2ms
        WDT_A_intervalTimerInit(WDT_A_BASE,
                                WDT_A_CLOCKSOURCE_ACLK,
                                WDT_A_CLOCKDIVIDER_64);
```


第三个例程将中断服务函数取消掉，此时便为`看门狗模式`，如果在预定时间内未喂狗，那么此时将会导致重启：
```c
#include "driverlib.h"

void main(void)
{
        //记录翻转的次数
        static uint8_t toggle_times;

        //看门狗模式：超时时间为1s
        WDT_A_watchdogTimerInit(WDT_A_BASE,
                                WDT_A_CLOCKSOURCE_ACLK,
                                WDT_A_CLOCKDIVIDER_32K);
        //启动看门狗
        WDT_A_start(WDT_A_BASE);

        //设置P1.0为输出模式
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        toggle_times++;
        //翻转 P1.0
        GPIO_toggleOutputOnPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //进入 LPM3 低功耗模式
        __bis_SR_register(LPM3_bits + GIE);
        //好让你设置断点用
        __no_operation();
}
```

> 此处，经过实验发现，其周期为3s左右，不知为啥扩大了3被左右的周期。

此时的现象如下：由于是重启了芯片，所以`reset_times`的次数总是为`0`，但是GPIO是会翻转的。此时，我们需要在规定时间内进行喂狗来避免重启，我们需要在翻转之后喂狗。修改后的代码如下所示：

```c
        while(1)
        {
            toggle_times++;
            //翻转 P1.0
            GPIO_toggleOutputOnPin(
                    GPIO_PORT_P1,
                    GPIO_PIN0
                    );
            //重新进行初始化，即喂狗
            WDT_A_watchdogTimerInit(WDT_A_BASE,
                                    WDT_A_CLOCKSOURCE_ACLK,
                                    WDT_A_CLOCKDIVIDER_32K);

            WDT_A_start(WDT_A_BASE);
            //延时，但不能超过喂狗时间，否则将会重启
            __delay_cycles(50000);
        }
```


#### GPIO

简单的GPIO翻转已经在`**新建工程**`中演示过了，此处将介绍两个例程，第一个是将其配置为中断输入，来扑捉其边沿触发；第二个例程是将一个GPIO作为输入，然后轮训之，获得其其状态并作出相应的改变。

GPIO作为输入时非常常用的功能，但是从驱动库的宏定义可以看出只支持上升沿触发和下降沿触发，不支持边沿触发。
```c
//*****************************************************************************
//
// The following are values that can be passed to the edgeSelect parameter for
// functions: GPIO_interruptEdgeSelect().
//
//*****************************************************************************
#define GPIO_HIGH_TO_LOW_TRANSITION                                      (0x01)
#define GPIO_LOW_TO_HIGH_TRANSITION                                      (0x00)

```

下面这个例程用 P1.0 捕获下降沿，然后捕获一次，翻转一次 P1.0 。
```c
//******************************************************************************
//   Software Port Interrupt Service on P1.1 from LPM4 with
//                     Internal Pull-up Resistance Enabled
//
//   A hi "TO" low transition on P1.1 will trigger P1_ISR which,
//   toggles P1.0. P1.1 is internally enabled to pull-up. Normal mode is
//   LPM4 ~ 0.1uA. LPM4 current can be measured with the LED removed, all
//   unused Px.x configured as output or inputs pulled high or low.
//   ACLK = n/a, MCLK = SMCLK = default DCO
//
//  Tested On: MSP430F5529, MSP430FR5739, MSP430FR5510
//             -----------------
//         /|\|              XIN|-
//          | |                 |
//          --|RST          XOUT|-
//      /|\   |                 |
//       --o--|P1.1         P1.0|-->LED
//      \|/
//
//   This example uses the following peripherals and I/O signals.  You must
//   review these and change as needed for your own board:
//   - GPIO Port peripheral
//
//   This example uses the following interrupt handlers.  To use this example
//   in your own application you must add these interrupt handlers to your
//   vector table.
//   - PORT1_VECTOR
//******************************************************************************
#include "driverlib.h"

void main(void)
{
        //关闭看门狗
        WDT_A_hold(WDT_A_BASE);

        //设置 P1.0 为输出
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //设定 P1.1 内部接上拉电阻
        //若需下降沿触发，则需接下拉电阻。
        GPIO_setAsInputPinWithPullUpresistor(
                GPIO_PORT_P1,
                GPIO_PIN1
                );

        //使能 P1.1 中断功能
        GPIO_enableInterrupt(
                GPIO_PORT_P1,
                GPIO_PIN1
                );

        //设置 P1.1 为下降沿触发
       //若需下降沿触发，则为：GPIO_HIGH_TO_LOW_TRANSITION
       //若需上升沿触发，则为：GPIO_LOW_TO_HIGH_TRANSITION
        GPIO_interruptEdgeSelect(
                GPIO_PORT_P1,
                GPIO_PIN1,
                GPIO_HIGH_TO_LOW_TRANSITION
                );


        //清除 P1.1 中断标志位 IFG
        GPIO_clearInterruptFlag(
                GPIO_PORT_P1,
                GPIO_PIN1
                );

        //进入 LPM4 低功耗模式并使能全局中断
        __bis_SR_register(LPM4_bits + GIE);

        //好让你设置断点用
        __no_operation();
}

//******************************************************************************
//
//This is the PORT1_VECTOR interrupt vector service routine
//
//******************************************************************************
#pragma vector=PORT1_VECTOR
__interrupt
void Port_1(void)
{
        //翻转 P1.0
        GPIO_toggleOutputOnPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //手动清除 P1.1 中断标志位 IFG
        //注意：如果不清除，则会在本次退出之后，再次马上进入此中断。
        GPIO_clearInterruptFlag(
                GPIO_PORT_P1,
                GPIO_PIN1
                );

}
```

需要注意的是，GPIO 的中断标志位需要手动清除，与STM32一致，不然会在你退出中断之后又再次进入。不过比STM32要弱一点的是，所有 P1 口都共享一个中断向量，这个没有任何问题，但是没有寄存器区分 P1.x 进入了中断？！也就是说，你不能同时设置P1.0和P1.1同时作为中断源，因为没有办法区分哪个产生了中断。

第二个例程的作用类似，只是将中断捕获改为`while(1)`轮询输入口的状态并执行相应动作。
```c
#include "driverlib.h"

void main(void)
{
        //关看门狗功能
        WDT_A_hold(WDT_A_BASE);

        //设置 P1.0 为输出模式
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //设置 P1.1 为输入模式
        GPIO_setAsInputPin(
                GPIO_PORT_P1,
                GPIO_PIN1
                );

        while (1) {
                //查询 P1.1 口状态
                if (GPIO_INPUT_PIN_HIGH == GPIO_getInputPinValue(
                            GPIO_PORT_P1,
                            GPIO_PIN1
                            )) {
                        //如果 P1.1 为高, 设置 P1.0 为高
                        GPIO_setOutputHighOnPin(
                                GPIO_PORT_P1,
                                GPIO_PIN0
                                );
                } else {
                        //否则，设置 P1.0 为低
                        GPIO_setOutputLowOnPin(
                                GPIO_PORT_P1,
                                GPIO_PIN0
                                );
                }
        }
}
```




#### 定时器

定时器主要有3种工作模式：up模式、continuous模式和up/down模式。

例程1：P2.0 输出 PWM波。
```c
//*******************************************************************************
//!  Timer_A3, PWM TA1.1, Up Mode, DCO SMCLK
//!
//!  Description: This program generates PWM outputs on P2.2 using
//!  Timer1_A configured for up mode. The value , TIMER_PERIOD, defines the PWM
//!  period and the value DUTY_CYCLE the PWM duty cycle. Using ~1.045MHz
//!  SMCLK as TACLK, the timer period is ~500us with a 75% duty cycle on P2.2
//!  ACLK = n/a, SMCLK = MCLK = TACLK = default DCO ~1.045MHz.
//!
//!  Tested On: MSP430F5529, MSP430F5510
//!            -------------------
//!        /|\|                   |
//!         | |                   |
//!         --|RST                |
//!           |                   |
//!           |         P2.0/TA1.1|--> CCR1 - 75% PWM
//!           |                   |
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - Timer peripheral
//! - GPIO Port peripheral
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - NONE
//******************************************************************************

#include "driverlib.h"

#define TIMER_PERIOD    511         //周期
#define DUTY_CYCLE      350         //高电平周期

void main(void)
{
        //关闭看门狗功能
        WDT_A_hold(WDT_A_BASE);

        //设置 P2.0 为 PWM 输出
        GPIO_setAsPeripheralModuleFunctionOutputPin(
                GPIO_PORT_P2,
                GPIO_PIN0
                );

        //产生 PWM 波 - 定时器采用 Up-Down 模式
        TIMER_A_generatePWM(TIMER_A1_BASE,
                            TIMER_A_CLOCKSOURCE_SMCLK,
                            TIMER_A_CLOCKSOURCE_DIVIDER_1,
                            TIMER_PERIOD,
                            TIMER_A_CAPTURECOMPARE_REGISTER_1,
                            TIMER_A_OUTPUTMODE_RESET_SET,
                            DUTY_CYCLE
                            );

        //进入 LPM0 低功耗模式
        __bis_SR_register(LPM0_bits);

        //为了便于调试，设置断点
        __no_operation();
}
```

问题：如何将任意的GPIO和定时器绑定之后，均可以输出PWM波呢？

例程2：P2.0和P2.1 多路输出 PWM波。

```c
#include "driverlib.h"

#define TIMER_PERIOD    127         //周期
#define DUTY_CYCLE1     32          //CCR1 - 25% PWM
#define DUTY_CYCLE2     96          //CCR1 - 75% PWM

void main(void)
{
        //关闭看门狗
        WDT_A_hold(WDT_A_BASE);

        //设置 P2.0 和 P2.1 为功能输出
        GPIO_setAsPeripheralModuleFunctionOutputPin(
                GPIO_PORT_P2,
                GPIO_PIN0 + GPIO_PIN1
                );

        //启动定时器
        TIMER_A_configureUpDownMode( TIMER_A1_BASE,
                                     TIMER_A_CLOCKSOURCE_SMCLK,
                                     TIMER_A_CLOCKSOURCE_DIVIDER_1,
                                     TIMER_PERIOD,
                                     TIMER_A_TAIE_INTERRUPT_DISABLE,
                                     TIMER_A_CCIE_CCR0_INTERRUPT_DISABLE,
                                     TIMER_A_DO_CLEAR
                                     );

        TIMER_A_startCounter( TIMER_A1_BASE,
                              TIMER_A_UPDOWN_MODE
                              );

        //初始化比较寄存器产生PWM1
        TIMER_A_initCompare(TIMER_A1_BASE,
                            TIMER_A_CAPTURECOMPARE_REGISTER_1,
                            TIMER_A_CAPTURECOMPARE_INTERRUPT_ENABLE,
                            TIMER_A_OUTPUTMODE_TOGGLE_SET,
                            DUTY_CYCLE1
                            );
        //初始化比较寄存器产生PWM2
        TIMER_A_initCompare(TIMER_A1_BASE,
                            TIMER_A_CAPTURECOMPARE_REGISTER_2,
                            TIMER_A_CAPTURECOMPARE_INTERRUPT_DISABLE,
                            TIMER_A_OUTPUTMODE_TOGGLE_SET,
                            DUTY_CYCLE2
                            );

        //Enter LPM0
        __bis_SR_register(LPM0_bits);

        //For debugger
        __no_operation();
}

```

问题：同例程1

扩展1：若将`TIMER_A1_BASE`换成`TIMER_B0_BASE`，则`P5.7/TB0.1`和`P7.4/TB0.2`将输出PWM，看来定时器和PWM输出口是绑定的，不是你想让哪个输出都可以输出的。

```c
//             -----------------
//         /|\|              XIN|-
//          | |                 |  32kHz
//          --|RST          XOUT|-
//            |                 |
//            |       P5.7/TB0.1|--> CCR1 - 75% PWM
//            |       P7.4/TB0.2|--> CCR2 - 25% PWM
//            |                 |
//            |                 |
//            |                 |
//            |                 |

#define TIMER_PERIOD    511         //周期
#define DUTY_CYCLE1     128          //CCR1 - 25% PWM
#define DUTY_CYCLE2     383          //CCR1 - 75% PWM
```

扩展2：
将`TIMER_A_configureUpDownMode`换成`TIMER_A_configureUpMode`，则定时器从up/down模式切换到up模式。


例程3：定时器工作在连续模式[continuous mode]
```c
//******************************************************************************
//!  TIMER_A, Toggle P1.0, CCR0 Cont. Mode ISR, DCO SMCLK
//!
//!  Toggle P1.0 using software and TA_0 ISR. Toggles every
//!  50000 SMCLK cycles. SMCLK provides clock source for TACLK.
//!  During the TA_0 ISR, P1.0 is toggled and 50000 clock cycles are added to
//!  CCR0. TA_0 ISR is triggered every 50000 cycles. CPU is normally off and
//!  used only during TA_ISR.
//!  ACLK = n/a, MCLK = SMCLK = TACLK = default DCO ~1.045MHz
//!
//!  Tested On: MSP430F5529,MSP430FR5739
//!         ---------------
//!     /|\|               |
//!      | |               |
//!      --|RST            |
//!        |               |
//!        |           P1.0|-->LED
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - TimerA peripheral
//! - GPIO peripheral
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - Timer A0
//!
//
//*****************************************************************************
#include "driverlib.h"

#define COMPARE_VALUE 50000     //50ms的中断周期

void main(void)
{
        //关闭看门狗
        WDT_A_hold(WDT_A_BASE);

        //设置 P1.0 为输出
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //启动由 SMCLK 驱动的连续模式的timer_a1
        TIMER_A_configureContinuousMode( TIMER_A1_BASE,
                                         TIMER_A_CLOCKSOURCE_SMCLK,
                                         TIMER_A_CLOCKSOURCE_DIVIDER_1,
                                         TIMER_A_TAIE_INTERRUPT_DISABLE,
                                         TIMER_A_DO_CLEAR
                                         );

        //初始化比较模式
        TIMER_A_clearCaptureCompareInterruptFlag(TIMER_A1_BASE,
                                                 TIMER_A_CAPTURECOMPARE_REGISTER_0
                                                 );
        TIMER_A_initCompare(TIMER_A1_BASE,
                            TIMER_A_CAPTURECOMPARE_REGISTER_0,
                            TIMER_A_CAPTURECOMPARE_INTERRUPT_ENABLE,
                            TIMER_A_OUTPUTMODE_OUTBITVALUE,
                            COMPARE_VALUE
                            );

        TIMER_A_startCounter( TIMER_A1_BASE,
                              TIMER_A_CONTINUOUS_MODE
                              );

        //进入 LPM0 低功耗模式,并打开全局中断
        __bis_SR_register(LPM0_bits + GIE);

        //便于设置断点调试
        __no_operation();
}

//******************************************************************************
//
//This is the TIMER1_A0 interrupt vector service routine.
//
//******************************************************************************
#pragma vector=TIMER1_A0_VECTOR     //注意：是A0，而不是A1
__interrupt
void TIMER1_A0_ISR(void)
{
        uint16_t compVal = TIMER_A_getCaptureCompareCount(TIMER_A1_BASE,
                                                          TIMER_A_CAPTURECOMPARE_REGISTER_0)
                           + COMPARE_VALUE;

        //Toggle P1.0
        GPIO_toggleOutputOnPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //Add Offset to CCR0
        TIMER_A_setCompareValue(TIMER_A1_BASE,
                                TIMER_A_CAPTURECOMPARE_REGISTER_0,
                                compVal
                                );
}


```

问题：将基地址或者中断向量函数改成一致均不能进入ISR，不过为啥子定时器的基地址和中断向量对不上呢？


扩展：将其中的`TIMER_A1_BASE`和`TIMER1_A0_VECTOR`换成`TIMER_B0_BASE`和`TIMER1_B0_VECTOR`同样适用。

例程4：工作在**up模式**,up模式的基地址和中断向量名称统一，并且不用手动清除标志位，用起来还是蛮爽的，推荐。

```c
//******************************************************************************
//!  Timer_B, Toggle P1.0, CCR0 Up Mode ISR, DCO SMCLK
//!
//!  Description: Toggle P1.0 using software and TB_0 ISR. Timer_B is
//!  configured for up mode, thus the timer overflows when TBR counts
//!  to CCR0. In this example, CCR0 is loaded with 50000.
//!  ACLK = n/a, MCLK = SMCLK = TBCLK = default DCO ~1.045MHz
//!
//!  Tested On: MSP430F5229
//!         ---------------
//!     /|\|               |
//!      | |               |
//!      --|RST            |
//!        |               |
//!        |           P1.0|-->LED
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - Timer peripheral
//! - GPIO Port peripheral
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - Timer B0
//!
//*****************************************************************************
#include "driverlib.h"

#define TIMER_PERIOD 50000

void main(void)
{
        //关闭看门狗
        WDT_A_hold(WDT_A_BASE);

        //设置 P1.0 为输出
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //启动定时器
        TIMER_B_clearTimerInterruptFlag(TIMER_B0_BASE);
        TIMER_B_configureUpMode(   TIMER_B0_BASE,
                                   TIMER_B_CLOCKSOURCE_SMCLK,
                                   TIMER_B_CLOCKSOURCE_DIVIDER_1,
                                   TIMER_PERIOD,
                                   TIMER_B_TBIE_INTERRUPT_DISABLE,
                                   TIMER_B_CAPTURECOMPARE_INTERRUPT_ENABLE,
                                   TIMER_B_DO_CLEAR
                                   );

        TIMER_B_startCounter(
                TIMER_B0_BASE,
                TIMER_B_UPDOWN_MODE
                );

        //Enter LPM0, enable interrupts
        __bis_SR_register(LPM0_bits + GIE);

        //For debugger
        __no_operation();
}

//******************************************************************************
//
//This is the Timer B0 interrupt vector service routine.
//
//******************************************************************************
#pragma vector=TIMERB0_VECTOR
__interrupt
void TIMERB0_ISR(void)
{
        //Toggle P1.0 using exclusive-OR
        GPIO_toggleOutputOnPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );
}
```



例程5：TIMER_A overflow
```c
//******************************************************************************
//! TIMER_A, Toggle P1.0, Overflow ISR, 32kHz ACLK
//!
//! Description: Toggle P1.0 using software and the TIMER_A overflow ISR.
//! In this example an ISR triggers when TB overflows. Inside the ISR P1.0
//! is toggled. Toggle rate is exactly 0.25Hz = [32kHz/FFFFh]/2. Proper use of the
//! TAIV interrupt vector generator is demonstrated.
//! ACLK = TBCLK = 32kHz, MCLK = SMCLK = default DCO ~ 1.045MHz
//!
//! Tested On: MSP430F5529,MSP430FR5739,MSP430F5510
//!             ---------------
//!     /|\|               |
//!      | |               |
//!      --|RST            |
//!        |               |
//!        |           P1.0|-->LED
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - Timer peripheral
//! - GPIO peripheral
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - TIMER_A1
//!
//
//*****************************************************************************

#include "driverlib.h"

void main(void)
{
        //关闭看门狗
        WDT_A_hold(WDT_A_BASE);

        //设置 P1.0 为输出
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //启动由 ACLK 驱动的连续模式的timer_a1
        TIMER_A_clearTimerInterruptFlag(TIMER_A1_BASE);
        TIMER_A_configureContinuousMode(TIMER_A1_BASE,
                                        TIMER_A_CLOCKSOURCE_ACLK,
                                        TIMER_A_CLOCKSOURCE_DIVIDER_1,
                                        TIMER_A_TAIE_INTERRUPT_ENABLE,
                                        TIMER_A_DO_CLEAR
                                        );

        TIMER_A_startCounter(TIMER_A1_BASE,
                             TIMER_A_CONTINUOUS_MODE
                             );

        //进入 LPM0 低功耗模式, 并使能全局中断
        __bis_SR_register(LPM0_bits + GIE);

        //For debugger
        __no_operation();
}

//******************************************************************************
//
//This is the TIMER1_A1 interrupt vector service routine.
//
//******************************************************************************
#pragma vector=TIMER1_A1_VECTOR     //注意:是A1
__interrupt
void TIMER1_A1_ISR(void)
{
        //Any access, read or write, of the TAIV register automatically resets the
        //highest "pending" interrupt flag
        switch ( __even_in_range(TA1IV, 14) ) {
        case  0: break;                                 //No interrupt
        case  2: break;                                 //CCR1 not used
        case  4: break;                                 //CCR2 not used
        case  6: break;                                 //CCR3 not used
        case  8: break;                                 //CCR4 not used
        case 10: break;                                 //CCR5 not used
        case 12: break;                                 //CCR6 not used
        case 14:
                //Toggle P1.0                    // overflow
                GPIO_toggleOutputOnPin(
                        GPIO_PORT_P1,
                        GPIO_PIN0
                        );
                break;
        default: break;
        }
}


```

问题：同上上例。

扩展：将其中的`TIMER_A1_BASE`和`TIMER1_A1_VECTOR`换成`TIMER_B0_BASE`和`TIMERB1_VECTOR`同样适用。




#### 内部Flash

Flash是非易失性储存设备，就是说掉电之后重新信息不丢失，所以一般用来储存一些常用的出厂设置参数。之于430内部Flash，其实就是用指针来操作相应的内存地址，和操作内存非常像，不过Flash在写入之前需要先擦除，即全部都搞成1，因为Flash写入的过程就是写0的过程。

例程1：以1B、2B或者4B的方式写入FlashB信息块。
```c

//*****************************************************************************
//!   Dummy calibration data is written to infoB.
//!   16 locations are written with char data, 8 locations with int data and
//!   4 locations with word data.  LED toggles upon completion.
//!
//!   Check infoB location @ 0x1900 on execution of program.
//!
//!   Tested On: MSP430F5529
//!             -----------------
//!         /|\|                 |
//!          | |             P1.0|-LED
//!          --|RST              |
//!            |                 |
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - Flash module
//! - GPIO Port peripheral
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - None.
//********************************************************************************
#include "driverlib.h"

//*****************************************************************************
//
//INFOB address in flash into which calibration data would be written
//
//*****************************************************************************
#define INFOB_START   (0x1900)

//*****************************************************************************
//
//Dummy char array of 'calibration data' - to be stored in flash
//
//*****************************************************************************
uint8_t calibration_data_char[16] = { 0x00,
                                      0x01,
                                      0x02,
                                      0x03,
                                      0x04,
                                      0x05,
                                      0x06,
                                      0x07,
                                      0x08,
                                      0x09,
                                      0x10,
                                      0x11,
                                      0x12,
                                      0x13,
                                      0x14,
                                      0x15 };
//*****************************************************************************
//
//Dummy int array of 'calibration data' - to be stored in flash
//
//*****************************************************************************
uint16_t calibration_data_int[8] = { 0x1617,
                                     0x1819,
                                     0x2021,
                                     0x2223,
                                     0x2425,
                                     0x2627,
                                     0x2829,
                                     0x3031 };
//*****************************************************************************
//
//Dummy long array of 'calibration data' - to be stored in flash
//
//*****************************************************************************
uint32_t calibration_data_long[4] = { 0x35343332,
                                      0x39383736,
                                      0x43424140,
                                      0x47464544 };

void main(void)
{
        uint16_t status;

        //关闭看门狗
        WDT_A_hold(WDT_A_BASE);

        //设置 P1.0 为输出
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //擦除 INFOB 的128 Bytes 地址
        do {
                FLASH_segmentErase((uint8_t*)INFOB_START);
                status = FLASH_eraseCheck((uint8_t*)INFOB_START,
                                          128
                                          );
        } while (status == STATUS_FAIL);

        //往 INFOB 中写入数据：1B、2B或者4B的方式均可
        FLASH_write8(calibration_data_char,
                     (uint8_t*)INFOB_START,
                     16
                     );
        FLASH_write16(calibration_data_int,
                      (uint16_t*)(INFOB_START + 16),
                      8
                      );
        FLASH_write32(calibration_data_long,
                      (uint32_t*)(INFOB_START + 32),
                      4
                      );
        FLASH_memoryFill32(0xBEEFBEEF,
                           (uint32_t*)(INFOB_START + 48),
                           (128 - 48) >> 2
                           );

        while (1) {
                //翻转 P1.0
                GPIO_toggleOutputOnPin(
                        GPIO_PORT_P1,
                        GPIO_PIN0
                        );

                //延时
                __delay_cycles(1000000);
        }
}

```


扩展：同理可以扩展到A~D区均可，只是地址需要我们去datasheet查一下。
```c
#define INFOA_START   (0x1980)
#define INFOB_START   (0x1900)
#define INFOC_START   (0x1880)
#define INFOD_START   (0x1800)
```


例程2：这里再看一个不同Flash区块之间的操作吧，其实过程是一样的。

```c
//*****************************************************************************
//!  This program first erases flash seg C, then it increments all
//!  values in seg C, then it erases seg D, then copies seg C to seg D. LED
//!  toggles upon completion.  Starting addresses of segments defined
//!  in this code: Seg C-0x1880, Seg D-0x1800.
//!  ACLK = REFO = 32kHz, MCLK = SMCLK = default DCO 1048576Hz
//!
//!  Tested On: MSP430F5529
//!            -----------------
//!        /|\|                 |
//!         | |             P1.0|-LED
//!         --|RST              |
//!           |                 |
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - Flash module
//! - GPIO Port peripheral
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - None.
//*****************************************************************************
#include "driverlib.h"
//*****************************************************************************
//
//INFO address in flash from which data is copied
//
//*****************************************************************************
#define INFOC_START   (0x1880)
//*****************************************************************************
//
//INFO address in flash to which data is copied into
//
//*****************************************************************************
#define INFOD_START   (0x1800)

//*****************************************************************************
//
//Number of bytes being copied
//
//*****************************************************************************
#define NUMBER_OF_BYTES   128

//*****************************************************************************
//
//Dummy array of 'calibration data' - to be stored in flash
//
//*****************************************************************************
uint8_t calibration_data[NUMBER_OF_BYTES];

//*****************************************************************************
//
//Delay cycles
//
//*****************************************************************************
#define DELAY_TIME 1000000

//*****************************************************************************
//
//Function prototypes
//
//*****************************************************************************
void write_SegC(void);
void copy_C2D(void);

void main(void)
{
        volatile uint16_t i;
        uint8_t value = 0;

        //关闭看门狗
        WDT_A_hold(WDT_A_BASE);

        //设置 P1.0 为输出
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        //初始化要写入的数据
        for (i = 0; i < NUMBER_OF_BYTES; i++)
                calibration_data[i] = value++;

        //将上面的数据写入C区
        write_SegC();

        //将C区的数据复制到D区
        copy_C2D();

        //无限循环
        while (1) {
                //翻转 P1.0
                GPIO_toggleOutputOnPin(
                        GPIO_PORT_P1,
                        GPIO_PIN0
                        );

                //延时
                __delay_cycles(DELAY_TIME);
        }
}

//------------------------------------------------------------------------------
//将内存中的数据写入到C区
//------------------------------------------------------------------------------
void write_SegC()
{
        uint16_t status;

        //擦除 INFOC
        do {
                FLASH_segmentErase((uint8_t*)INFOC_START);
                status = FLASH_eraseCheck((uint8_t*)INFOC_START,
                                          NUMBER_OF_BYTES
                                          );
        } while (status == STATUS_FAIL);

        //写入C区Flash
        FLASH_write8(calibration_data,
                     (uint8_t*)INFOC_START,
                     NUMBER_OF_BYTES
                     );
}

//------------------------------------------------------------------------------
//复制C区数据到D区
//------------------------------------------------------------------------------
void copy_C2D(void)
{
        char *FLASH_ptrC;
        char *FLASH_ptrD;

        uint16_t status;

        //擦除 INFOD
        do {
                FLASH_segmentErase((uint8_t*)INFOD_START);
                status = FLASH_eraseCheck((uint8_t*)INFOD_START,
                                          NUMBER_OF_BYTES
                                          );
        } while (status == STATUS_FAIL);

        //初始化C区指针
        FLASH_ptrC = (char*)INFOC_START;

        //初始化D区指针
        FLASH_ptrD = (char*)INFOD_START;

        //将C区数据写入到D区
        FLASH_write8((uint8_t*)FLASH_ptrC,
                     (uint8_t*)FLASH_ptrD,
                     NUMBER_OF_BYTES
                     );
}

```

我们看：
```c
        //将C区数据写入到D区
        FLASH_write8((uint8_t*)FLASH_ptrC,
                     (uint8_t*)FLASH_ptrD,
                     NUMBER_OF_BYTES
                     );

```
这个过程，与从内存里面获取是一致的。


#### ADC

[to be continued...]

#### DAC
[to be continued...]

### 通信篇

>一切的连接技术只不过让我们越发的明白：万事万物于我们竟是如此的陌生。  
> ——希瑟 . 多纳约（Heather Dnaohue）

#### UART
在单片机的调试工具中，串口是最具有性价比的。有了串口，就像有了`printf`一样，我们可以看到变量的值。要是能将`putchar`重映射下，就真有了`printf`，那酸爽！！！


```c
//******************************************************************************
//! This example shows how to configure the UART module as the loopback to
//! verify that received data is sent data.
//!
//!               MSP430F510
//!             -----------------
//!       RST -|     P4.4/UCA1TXD|----|
//!            |                 |    |
//!            |                 |    |
//!            |     P4.5/UCA1RXD|----|
//!            |                 |
//!
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - UART peripheral
//! - GPIO Port peripheral (for UART pins)
//! - UCA1TXD
//! - UCA1RXD
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - USCI_A1_VECTOR.
//******************************************************************************
#include "driverlib.h"

//*****************************************************************************
//
//选择波特率，需要我们去手册找到相应波特率需要寄存器设置的值
//
//*****************************************************************************
#define BAUD_RATE                               115200
//*****************************************************************************
//
//Initialize received data
//
//*****************************************************************************
uint8_t receivedData = 0x00;
//*****************************************************************************
//
//Initialize trasnmit data
//
//*****************************************************************************
uint8_t transmitData = 0x00;

uint8_t check = 0;

void main(void)
{
        //关闭看门狗
        WDT_A_hold(WDT_A_BASE);

        //P4.4,5 = USCI_A1 TXD/RXD
        GPIO_setAsPeripheralModuleFunctionInputPin(
                GPIO_PORT_P4,
                GPIO_PIN4 + GPIO_PIN5
                );

        //Baudrate = 9600, clock freq = 1.048MHz
        //UCBRx = 109, UCBRFx = 0, UCBRSx = 2, UCOS16 = 0
        //Baudrate = 115200, clock freq = 1.048MHz
        //UCBRx = 9, UCBRFx = 0, UCBRSx = 1, UCOS16 = 0
        if ( STATUS_FAIL == USCI_A_UART_initAdvance(USCI_A1_BASE,
                                                    USCI_A_UART_CLOCKSOURCE_SMCLK,
                                                    9,
                                                    0,
                                                    1,
                                                    USCI_A_UART_NO_PARITY,
                                                    USCI_A_UART_LSB_FIRST,
                                                    USCI_A_UART_ONE_STOP_BIT,
                                                    USCI_A_UART_MODE,
                                                    USCI_A_UART_LOW_FREQUENCY_BAUDRATE_GENERATION ))
                return;

        //使能 UART
        USCI_A_UART_enable(USCI_A1_BASE);

        //开启接收中断
        USCI_A_UART_clearInterruptFlag(USCI_A1_BASE,
                                       USCI_A_UART_RECEIVE_INTERRUPT);
        USCI_A_UART_enableInterrupt(USCI_A1_BASE,
                                    USCI_A_UART_RECEIVE_INTERRUPT);

        //开全局中断，切记，勿忘！否则你会发现进不去串口接收中断函数。
        __enable_interrupt();

        while (1) {
                transmitData = transmitData + 1;            // 自增+1
                // 发送数据
                USCI_A_UART_transmitData(USCI_A1_BASE,
                                         transmitData);
                while (check != 1) ;
                check = 0;
        }
}

//******************************************************************************
//
//This is the USCI_A1 interrupt vector service routine.
//
//******************************************************************************
#pragma vector=USCI_A1_VECTOR
__interrupt
void USCI_A1_ISR(void)
{
        switch (__even_in_range(UCA1IV, 4)) {
        //Vector 2 - RXIFG
        case 2:
                receivedData = USCI_A_UART_receiveData(USCI_A1_BASE);
                // 检查收到的是否就是刚才发出去的
                if (!(receivedData == transmitData))

                        while (1) ;
                check = 1;
                break;
        default: break;
        }
}
```

**扩展**：将`A1`换成`A0`，然后换下I/O口就可以了。

在实践部分，我将会将其发给蓝牙透传模块，实现无线蓝牙串口透传的功能。

**再扩展**：如何实现通过重映射`putchar`来完成`printf`？

首先，按照[Printf support for MSP430 CCSTUDIO compiler
](http://processors.wiki.ti.com/index.php/Printf_support_for_MSP430_CCSTUDIO_compiler)设置我们的CCS环境，设置完成之后，我们就可以在`Console`看到我们打印输出的信息了。
其次，如若想让其重映射到真实的串口（UART_A1）上，我们需要添加以下的代码：

声明部分，放在`main`函数前面：
```c
#include <stdio.h>
#include <string.h>

//开宏：输出到真实串口UART_A1上
//关宏：输出到控制台Console上
#define UART_PRINTF         

#ifdef UART_PRINTF
int fputc(int _c, register FILE *_fp);
int fputs(const char *_ptr, register FILE *_fp);
#endif
```

定义部分，一般放在`main`函数后面：
```c
#ifdef UART_PRINTF
int fputc(int _c, register FILE *_fp)
{
  while(!(UCA1IFG&UCTXIFG));
  UCA1TXBUF = (unsigned char) _c;

  return((unsigned char)_c);
}

int fputs(const char *_ptr, register FILE *_fp)
{
  unsigned int i, len;

  len = strlen(_ptr);

  for(i=0 ; i<len ; i++)
  {
    while(!(UCA1IFG&UCTXIFG));
    UCA1TXBUF = (unsigned char) _ptr[i];
  }

  return len;
}
#endif
```


#### IIC
[to be continued...]



#### SPI
[to be continued...]




#### USB
[to be continued...]

#### SDIO
[to be continued...]

### 其他篇

#### CRC
[to be continued...]

#### AES
[to be continued...]

#### MLP
[to be continued...]

## 实践

### 显示屏(OLED)

**通信模块：IIC**

### 重力传感器(LIS3DH/H3LIS331DL)

**通信模块：IIC**

### 外部Flash(MX66L51235F)

**通信模块：SPI**

### 蓝牙透传(CC2540)

**通信模块：UART**

## RTOS


### PT
[to be continued...]


### μC/OS
[to be continued...]





[1]: http://www.ti.com/tool/ccstudio-msp430
[2]: http://www.ti.com/tool/msp430driverlib
[3]: http://study-note.qiniudn.com/msp430lib-MSP430驱动库目录.png
[4]: http://study-note.qiniudn.com/msp430lib-NewCCSProject.png
[5]: http://study-note.qiniudn.com/msp430lib-工程目录.png
[6]: http://study-note.qiniudn.com/msp430lib-关闭编译优化.png
[7]: http://study-note.qiniudn.com/msp430lib-添加库文件路径.png
[8]: http://study-note.qiniudn.com/msp430lib-MSP430F5510芯片引脚图.png
[9]: http://study-note.qiniudn.com/msp430lib-MSP430时钟源.png
[10]: http://wenku.baidu.com/view/32a4cf6e011ca300a6c39098.html
[11]: http://study-note.qiniudn.com/msp430lib-编译结果.png
[12]: http://study-note.qiniudn.com/msp430lib-ULPAdvisor.png