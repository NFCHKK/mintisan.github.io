# STM32 学习笔记

[TOC]


## 时钟树

## 定时器（TIMER1，8，2～7）

### PWM

- [STM32入门篇之通用定时器彻底研究](http://www.amobbs.com/thread-3959178-1-1.html)
- [STM32 F103基础学习笔记05（定时器 和 PWM）](http://www.amobbs.com/thread-5579264-1-1.html)

## 滴答时钟（SystemTick）



```c

/* Systick */

void SysTick_Init(void)
{
    //1ms per INT
    if( SysTick_Config(SystemCoreClock / 1000) )
    {
        while(1);
    }
}

void SysTick_Enable(void)
{
    SysTick->CTRL |= SysTick_CTRL_ENABLE_Msk;
}

void SysTick_Disable(void)
{
    SysTick->CTRL &= ~SysTick_CTRL_ENABLE_Msk;
}

uint32_t SysTick_GetTimeStamp(void)
{
    return g_time_stamp;
}
```


```c
#ifdef GLOBAL_VAR
#define GLOBAL
#else
#define GLOBAL extern
#endif

GLOBAL volatile uint32_t g_time_stamp;

void SysTick_Handler(void)
{
    g_time_stamp++;
}
```
