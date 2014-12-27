title: A LED Example with ProtoThreads
date: 2014-04-16 16:11:44
categories: [底层驱动]
tags: [协程]
---


跑马灯是嵌入式中“Hello World”，此处采用ProtoThreads(PT)来模拟两个LED交替闪烁。

<!-- more -->


## 关于并发



## 例程分析

### 代码
```c
#include "pt.h"
#include <stdio.h>
#include <windows.h>

typedef enum{
	ON,
	OFF
}bool_t;

struct timer { int start, interval; };
static int  timer_expired(struct timer *t);
static void timer_set(struct timer *t, int usecs);

static struct timer led0_timer,led1_timer;
#define LED0_ON_TIME	1000
#define LED0_OFF_TIME	5000
#define LED1_ON_TIME	700
#define LED1_OFF_TIME	900

static void led0(bool_t flag)
{
	if (flag == ON)
	{
		printf("LED0 is ON \n");
	} 
	else
	{
		printf("LED0 is OFF \n");
	}
}

static void led1(bool_t flag)
{
	if (flag == ON)
	{
		printf("LED1 is ON \n");
	} 
	else
	{
		printf("LED1 is OFF \n");
	}
}


static PT_THREAD(thread_led0(struct pt *pt))
{
	PT_BEGIN(pt);
	while(1)
	{
		timer_set(&led0_timer,LED0_ON_TIME);
		PT_WAIT_UNTIL(pt,timer_expired(&led0_timer));
		led0(ON);
		
		timer_set(&led0_timer,LED0_OFF_TIME);
		PT_WAIT_UNTIL(pt,timer_expired(&led0_timer));
		led0(OFF);
	}
	PT_END(pt);
}

static PT_THREAD(thread_led1(struct pt *pt))
{
	PT_BEGIN(pt);
	while(1)
	{
		timer_set(&led1_timer,LED1_ON_TIME);
		PT_WAIT_UNTIL(pt,timer_expired(&led1_timer));
		led1(ON);

		timer_set(&led1_timer,LED1_OFF_TIME);
		PT_WAIT_UNTIL(pt,timer_expired(&led1_timer));
		led1(OFF);
	}
	PT_END(pt);
}

/**
 * pt1 - var for PT_THREAD1
 * pt2 - var for PT_THREAD2
 */
static struct pt pt1,pt2;

/**
 * main entry contains two PT_THREAD
 * @param  argc [description]
 * @param  argv [description]
 * @return      0 - success
 */
int main(int argc, char **argv)
{
	PT_INIT(&pt1);
	PT_INIT(&pt2);
	
	while(1)
	{
		thread_led0(&pt1);
		thread_led1(&pt2);
	}
	return 0;
}

/*---------------------------------------------------------------------------*/
/*
 * Finally, the implementation of the simple timer library follows.
 */

static int clock_time(void)
{ return (int)GetTickCount(); }

static int timer_expired(struct timer *t)
{ return (int)(clock_time() - t->start) >= (int)t->interval; }

static void timer_set(struct timer *t, int interval)
{ t->interval = interval; t->start = clock_time(); }
/*---------------------------------------------------------------------------*/

```
### 结果

## 参考资料
1. [达夫设备]()
2. [Coroutines in C](http://www.chiark.greenend.org.uk/~sgtatham/coroutines.html)
3. [C协程](http://www.oschina.net/translate/coroutines-in-c)
4. [一个“蝇量级” C 语言协程库]()
5. [PT官网](http://dunkels.com/adam/pt)