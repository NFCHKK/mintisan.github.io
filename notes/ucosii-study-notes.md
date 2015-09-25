# μC/OS-II 使用笔记

[TOC]

## 实验一 任务的基本管理

实验通用代码描述：

![](http://mint-blog.qiniudn.com/ucos-task-1.png)

[实验代码模板](http://pan.baidu.com/share/link?shareid=3403658229&uk=2668446171)（MDK4.70）
注意：这里的app是最后一个实验的代码，按照下面描述的复制进去了ok了。也可以从[最后一个](http://blog.csdn.net/fovwin/article/details/10051171)开始。
涉及的μC/OS-II系统函数：
。。。

参考资料及配套代码：
- [uCOS-II 实验指导书](http://pan.baidu.com/share/link?shareid=3323350633&uk=2668446171)
- [ucos_Demo](http://pan.baidu.com/share/link?shareid=3321623914&uk=2668446171)

注意：是参考这个资料没错，但是好几个实验（几乎每个⊙﹏⊙b汗）的概念或者代码有问题，我在后面大都指出来（可能我的有的地方也错了），不清楚的可以下下来比较一下。
建议赋值代码到工程中，边调试变改，不同板子也可以，simulator的USART可以看到串口数据的输出。

实验代码：

应用任务代码

`app.c`

```c
void Task0(void* pdata)
{
    INT8U err;
    while(1)
    {
        printf("Application tasks switched %d times!\r\n",++count);
        printf("TASK_0 IS RUNNING.............................\r\n"); 
        printf("task_1 is suspended!\r\n"); 
        printf("***********************************************\r\n"); 
        err=OSTaskSuspend(OS_PRIO_SELF);        // suspend itself 
    }
}

void Task1(void* pdata)
{
    INT8U err;
    while(1)
    {
        OSTimeDly(1000); 
        printf("Application tasks switched %d times!\r\n",++count); 
        printf("task_0 is suspended!\r\n"); 
        printf("TASK_1 IS RUNNING..............................\r\n"); 
        printf("***********************************************\r\n"); 
        OSTimeDly(1000); 
        err=OSTaskResume(TASK0_TASK_PRIO);      /* resume task0            */ 
    }
}
```


`app.h`

```c
GLOBAL INT32U count;
```

`app_cfg.h`

```c
#define TASK0_STK_SIZE      64
#define TASK1_STK_SIZE      64

#define TASK0_TASK_PRIO     4
#define TASK1_TASK_PRIO     5

#ifdef GLOBAL_STASK_DEFINE
#define GLOBAL 
#else
#define GLOBAL extern
#endif

GLOBAL OS_STK   TASK_TASK0_STK[TASK0_STK_SIZE];
GLOBAL OS_STK   TASK_TASK1_STK[TASK1_STK_SIZE];

void Task0(void* pdata);
void Task1(void* pdata);
```


`main.c`

```c
//启动任务
static void TaskStart(void* pdata)
{
    pdata = pdata; 
    //APP Initialization
    //系统时钟必须在OSStart()之后调用
    Systick_Configuration();
    
#if(OS_TASK_STAT_EN > 0)
    OSStatInit();
#endif

    /* 实验一  任务的基本管理 */
    OSTaskCreate(Task0,(void*)&TaskData[0],(OS_STK*)&TASK_TASK0_STK[TASK0_STK_SIZE-1],TASK0_TASK_PRIO);
    OSTaskCreate(Task1,(void*)&TaskData[1],(OS_STK*)&TASK_TASK1_STK[TASK1_STK_SIZE-1],TASK1_TASK_PRIO);
    
    //创建其他任务之后删除自己
    OSTaskDel(OS_PRIO_SELF);
}
```


实验结果：

![](http://mint-blog.qiniudn.com/ucos-task-2.jpg)

注意：提供心脏跳动的Systick_Configuration必须在OSStart之后调用（最好放在启动任务的任务TaskStart中-好习惯），不然后果未知，因为在系统还没有启动之前你就把中断打开了，系统也不晓得咋办了。


## 实验二 优先级反转及解决方法


实验描述：
注意：占有资源的低优先级不能主动放弃CPU，不然优先级肯定反转。实验手册的实验是错的。

涉及的μC/OS-II系统函数：
。。。

实验代码：

`app.c`

```c
/* 任务 TA0 的优先级最高，它需要使用信号量 mutex */
void Task0(void* pdata)
{
    INT8U err;
    INT8U id;
    id = *(int *)pdata;
    while(1)
    {
        printf("Task_%d waitting for an EVENT\r\n",id); 
        OSTimeDly(1000);                          /* Delay 1000 clock tick        */ 
        printf("Task_%d's EVENT CAME!\r\n",id); 
        printf("Task_%d trying to GET MUTEX\r\n",id); 
        OSMutexPend(pmutex,0,&err);                           /* Acquire mutex */ 
        switch(err) 
        { 
            case OS_NO_ERR: 
                printf("Task_%d GOT mutex.\r\n",id); 
                break; 
            default: 
                printf("Task_%d CANNOT get mutex, has been SUSPENDED.\r\n",id); 
          } 
          OSTimeDly(1000);                            /* Delay 1000 clock tick        */ 
          printf("Task_%d RELEASE mutex\r\n",id); 
          OSMutexPost(pmutex);                          /* Release mutex          */ 
    }
}
/* 任务 TA1 具有中等优先级，它不使用信号量 */
void Task1(void* pdata)
{
    INT8U   id; 
    id=*(int *)pdata;
    while(1)
    {
        printf("Task_%d waitting for an EVENT\r\n",id); 
        OSTimeDly(500);                        /* Delay 500 clock tick        */ 
        printf("Task_%d's EVENT CAME!\r\n",id); 
        OSTimeDly(500); 
    }
}

/* 任务 TA2 的优先级最低，和高优先级任务 TA0 共用信号量 mutex */
void Task2(void* pdata)
{
    INT8U   err; 
    INT8U   id;  
    INT32U i;
    id=*(int *)pdata; 
    
    while(1)
    {
        printf("Task_%d trying to GET MUTEX\r\n",id); 
        OSMutexPend(pmutex,0,&err);                       /*  Acquire mutex */ 
        switch(err) 
        { 
            case OS_NO_ERR: 
                printf("Task_%d GOT mutex.\r\n",id); 
                /* 此时Task2占有资源和CPU，但是会被Task1抢占，发生优先级反转 */
                for(i=0;i<40000000;i++);
                break; 
            default : 
                printf("Task_%d CANNOT get mutex,  has been SUSPENDED.\r\n",id); 
                /* 此时Task2占有资源和CPU，但是会被Task1抢占，发生优先级反转 */
                for(i=0;i<40000000;i++);
                break; 
        } 
        printf("Task_%d RELEASE mutex\r\n",id); 
        OSMutexPost(pmutex);                       /* Releasemutex          */ 
    }
}
```


`app.h`

```c
GLOBAL OS_EVENT* psem;
GLOBAL OS_EVENT* pmutex;

#define N_TASKS     3
GLOBAL  INT8U TaskData[N_TASKS];
```

`app_cfg.h`

```c
#define TASK0_STK_SIZE      64
#define TASK1_STK_SIZE      64
#define TASK2_STK_SIZE      64

#define TASK0_TASK_PRIO     4
#define TASK1_TASK_PRIO     5
#define TASK2_TASK_PRIO     6

#ifdef GLOBAL_STASK_DEFINE
#define GLOBAL 
#else
#define GLOBAL extern
#endif

GLOBAL OS_STK   TASK_TASK0_STK[TASK0_STK_SIZE];
GLOBAL OS_STK   TASK_TASK1_STK[TASK1_STK_SIZE];
GLOBAL OS_STK   TASK_TASK2_STK[TASK2_STK_SIZE];

void Task0(void* pdata);
void Task1(void* pdata);
void Task2(void* pdata);
```

`main.c`

```c
//启动任务
static void TaskStart(void* pdata)
{
    INT8U err;
    INT8U   i;  
     for (i = 0; i <N_TASKS; i++)    // Create N_TASKS identical tasks 
     { 
        TaskData[i] = i; 
     } 
    pdata = pdata; 
    //APP Initialization
    //系统时钟必须在OSStart()之后调用
    Systick_Configuration();
    
#if(OS_TASK_STAT_EN > 0)
    OSStatInit();
#endif
#if OS_SEM_EN > 0 && OS_MAX_EVENTS > 0
    psem = OSSemCreate((INT16U)1);
#endif
#if OS_MUTEX_EN >0 && OS_MAX_EVENTS > 0
    pmutex = OSMutexCreate(1,&err);
#endif

    /* 实验二  优先级反转 */
    OSTaskCreate(Task0,(void*)&TaskData[0],(OS_STK*)&TASK_TASK0_STK[TASK0_STK_SIZE-1],TASK0_TASK_PRIO);
    OSTaskCreate(Task1,(void*)&TaskData[1],(OS_STK*)&TASK_TASK1_STK[TASK1_STK_SIZE-1],TASK1_TASK_PRIO);
    OSTaskCreate(Task2,(void*)&TaskData[2],(OS_STK*)&TASK_TASK2_STK[TASK2_STK_SIZE-1],TASK2_TASK_PRIO);
    
    //创建其他任务之后删除自己
    OSTaskDel(OS_PRIO_SELF);
}
```

若要switch分支发挥作用，则需修改os_sem.c中的OSSemPend函数：

不然，switch分支不起作用，其中的default分支表示的是在获得信号量的道路上有没有被打断过。
PS：为了方便观察，os_sem.c的文件未作修改。


实验结果：
此时使用二值信号量-Binary Semaphore，则再Task2的延时过程中，不断被Task1所打断，发生优先级反转。

![](http://mint-blog.qiniudn.com/ucos-priority-1.jpg)

注意：若将app.c中的任务中的信号量全部修改为互斥信号量-Mutex，并将其优先级提升自最高优先级，则Task2在延时过程中不会被Task1所打断，不会发生优先级反转。

![](http://mint-blog.qiniudn.com/ucos-priority-2.jpg)


## 实验三 信号量

实验描述：

五个哲学家任务（ph1、ph2、ph3、ph4、ph5）主要有两种过程：思考（即睡眠一段时间）和就餐。每个哲学家任务在就餐前必须申请并获得一左一右两支筷子，就餐完毕后释放这两支筷子。五个哲学家围成一圈，每两人之间有一支筷子。一共有五支筷子，在该实验中用了五个互斥信号量来代表。如下图所示：

![](http://mint-blog.qiniudn.com/ucos-phi-1.jpg)


实验手册的代码是错误的，看结果就晓得了，相邻的哲学家不可能一块吃饭。

涉及的μC/OS-II系统函数：
。。。


实验代码：


`app.c`

```c
void TaskPhiRepast(void* pdata)
{
    INT8U err;
    INT8U i,j;
    /* 第i个哲学家需要第i和j把筷子 */
    i = *(int*)pdata;
    j = (i+1) % N_TASKS;
    
    while(1)
    {
        printf("Philosopher %d is hungry... \r\n",i+1);
        OSTimeDly(500);
        
        OSSemPend(ChopStick[i],0,&err);
        OSSemPend(ChopStick[j],0,&err);
        
        printf("Philosopher %d is eating... \r\n",i+1);
        OSTimeDly(500);
        
        printf("Philosopher %d is thinking... \r\n",i+1);
        OSSemPost(ChopStick[i]);
        OSSemPost(ChopStick[j]);
    }
}
```

`app.h`

```c
GLOBAL OS_EVENT*    ChopStick[N_TASKS];
GLOBAL INT8U        TaskData[N_TASKS];
```


`app_cfg.h`

```c
#define PHI_REPAST_STK_SIZE 64
#define PHI_REPAST_TASK_Prio 3
#define     N_TASKS         5
GLOBAL OS_STK   TASK_PHI_REPAST[N_TASKS][PHI_REPAST_STK_SIZE];
void TaskPhiRepast(void* pdata);
```

`main.c`

```c
 int main(void)
 {
    INT8U i;
     
    BSP_Init();
    
    OSInit();
    for(i = 0;i < N_TASKS;i++)
    {
        TaskData[i] = i;
        ChopStick[i] = OSSemCreate(1);
        if(ChopStick[i] != (OS_EVENT*)0)
            printf("ChopStick %d is created no error \r\n",i);
    }
    OSTaskCreate( TaskStart,
                    (void *)0,  //parameter
                    (OS_STK *)&TASK_START_STK[START_STK_SIZE-1],
                    START_TASK_Prio );
    OSStart();
     
    return 0;    
 }
```


`main.c - TaskStart`

```c
/* 实验三  信号量：哲学家就餐问题的实现 */
for(i = 0; i < N_TASKS; i++)
{
    err = OSTaskCreate(TaskPhiRepast, (void *)&TaskData[i], (OS_STK *)&TASK_PHI_REPAST[i][PHI_REPAST_STK_SIZE - 1], PHI_REPAST_TASK_Prio + i);
    if(err == OS_NO_ERR)
    {
        printf("Philosophor %d is created no error \r\n", i);
    }
}
```


实验结果：

![](http://mint-blog.qiniudn.com/ucos-phi-2.jpg)

注意：如果将信号量的建立放在TaskStart中，则结果出错，出现以下情况，原因未知。

![](http://mint-blog.qiniudn.com/ucos-phi-3.jpg)

教训：最好将“事件”的建立放在“任务”的建立之前。
感受：多任务系统的调试真心难啊，到处乱跳，而且JLink对硬断点的设置个数有限制（貌似只有6个），一旦设置多了，MDK自动崩溃。（用仿真环境调试，其断点个数貌似没有限制，想设置多少设置多少，但是它不会触发中断和异常。）

## 实验四 消息队列

实验描述：
在本实验中，设计了 6 个普通应用任务：TA0（优先级为 20）、TA1（优先级为 21）、TA2（优先级为 22）、TA3（优先级为 23）、TA4（优先级为 25）、TA5（优先级为 26），以及一个控制任务 TaskCon（优先级为 19）。
uC/OS-II 中，等待消息的任务总是按照优先级的高低来决定获得消息的顺序的 等待消息的任务总是按照优先级的高低来决定获得消息的顺序的。
具体的设计思路为：

- 创建队列的功能：创建一个等待属性为 FIFO 的消息队列 1；创建一个等待属性为LIFO 的消息队列 2。
- 考察以 FIFO 方式释放消息的消息队列：由任务 TA0、TA1、TA2 等待队列 1 中的消息。TA0、TA1、TA2 使用相同的任务代码（Taskq1 函数）。
- 考察以 LIFO 方式释放消息的消息队列：由任务 TA3、TA4、TA5 等待队列 2 中的消息。TA3、TA4、TA5 使用相同的任务代码（Taskq2 函数）。
- 考察清空消息队列、查询消息队列的功能 查询消息队列的功能： TaskCon 任务向队列 2 中连续发送 6 条消息，然后查询消息数；清空该队列后再查询。

考察删除消息队列的安全性：在任务 TA3、TA4、TA5 等待队列 2 中的消息的过程中，让 TaskCon 删除队列 2；当队列 2 被删除后，检查任务 TA3、TA4、TA5 调用接收消息的函数是否返回错误码。

涉及的μC/OS-II系统函数：
。。。

实验代码：

`app.c`

```c
void TaskQueue1(void* pdata)
{
    INT8U err;
    INT8U id;
    void* msg;
    id = *(int*)pdata;
    
    while(1)
    {
        OSTimeDlyHMSM(0,0,1,0);
        msg = OSQPend(q1,0,&err);
        switch(err)
        {
            case OS_NO_ERR:
                /* If it is normally, just print the string.*/
                printf("Task_%d got %s \r\n", id, (char*)msg);
                OSTimeDlyHMSM(0,0,1,0);
                break;
            default:
                /* If the queue is empty or has been deleted, print another string.*/
                printf("Queue1 %d is empty! \r\n",id);
                OSTimeDlyHMSM(0,0,1,0);
                break;
        }
    }
}

void TaskQueue2(void* pdata)
{
    INT8U err;
    INT8U id;
    void* msg;
    id = *(int*)pdata;
    while(1)
    {
        OSTimeDlyHMSM(0,0,1,0);
        msg = OSQPend(q2,0,&err);
        switch(err)
        {
            case OS_NO_ERR:
                /* If it is normally, just print the string.*/
                printf("Task_%d got %s \r\n", id+N_TASKS, (char*)msg);
                OSTimeDlyHMSM(0,0,1,0);
                break;
            default:
                /* If the queue is empty or has been deleted, print another string.*/
                printf("Queue1 %d is empty! \r\n",id+N_TASKS);
                OSTimeDlyHMSM(0,0,1,0);
                break;
        }
    }
}


void TaskCon(void* pdata)
{
    INT8U  i,j;
    INT8U  err;
    INT8S  note=1;                                                      /* for flush the queue                  */
    INT8S  del=3;                                                       /* for delete the queue                 */
    OS_EVENT *q;
    OS_Q_DATA qdata;
    static char *queue1msg[MSG_SIZE]={                                  /* queue1's message                      */
                        "message0",
                        "message1",
                        "message2",
                        "message3",
                        "message4",
                        "message5"
                        };
    static char *queue2msg[MSG_SIZE]={                                  /* queue2's message                      */
                        "messageA",
                        "messageB",
                        "messageC",
                        "messageD",
                        "messageE",
                        "messageF"
                        };
    
    while(1)
    {
        printf("...........................ADD MESSAGE TO QUEUE_1..............................\r\n");
        for( i = 0 ; i < MSG_SIZE ; i++ )
        {
            err = OSQPostFront(q1,(void*)queue1msg[i]);                 /* post message to q1 LIFO                     */
            switch(err)
            {
                case OS_NO_ERR:
                    printf("Queue1 %d add %s\r\n",i,queue1msg[i]);
                    OSTimeDlyHMSM(0, 0, 0, 500);
                    break;
                case OS_Q_FULL:
                    printf("Queue1 is full, CANNOT add.\r\n");
                    OSTimeDlyHMSM(0, 0, 0, 500);
                    break;
                default :
                    break;
            }
        }
        if(del>=0)
        {
            printf("...........................ADD MESSAGE TO QUEUE_2..............................\r\n");
        }
            
        for( j = 0 ; j < MSG_SIZE ; j++ )
        {
            err = OSQPost(q2,(void*)queue2msg[j]);                  /* post message to q2 FIFO                     */
            switch(err)
            {
                case OS_NO_ERR:
                    printf("Queue2 %d add %s\r\n",j,queue2msg[j]);
                    OSTimeDlyHMSM(0, 0, 0, 500);
                    break;
                case OS_Q_FULL:
                    printf("Queue2 is full, CANNOT add. \r\n");
                    OSTimeDlyHMSM(0, 0, 0, 500);
                    break;
                default :
                    break;
            }
        }
            
        if(del>=0)
        {
            if(note==1)
            {
                OSQFlush(q2);
                printf("...........................ADD MESSAGE TO QUEUE_2..............................\r\n");
                printf("..............................CLEAR UP QUEUE_2.................................\r\n");
                note=0;
            }
            else
            {
                note=1;
            }
        }
            
        err=OSQQuery(q1,&qdata);                                        /* get the information about q1                 */
        if(err==OS_NO_ERR)
        {
            printf("\r\n");
            printf("Queue1'information:\r\n");
            printf("NextMsg:\t%s\r\nNumMsg:\t%d\r\nQSize:\t%d\r\n",(char *)qdata.OSMsg,qdata.OSNMsgs,qdata.OSQSize);
            printf("\r\n");
        }                                                           /* print the information about q1               */
        OSTimeDlyHMSM(0, 0, 0, 500);                                /* Wait 500 minisecond                          */
        if(del==0)
        {
            q=OSQDel(q2,OS_DEL_ALWAYS,&err);                        /* delete the  q2                               */
            if(q==(OS_EVENT *)0)
            {
                printf("DELETE Queue2 OK!\r\n");
            }
        }
        else
        {
            del--;
            printf( "DELETE Queue2 FAILED!\r\n");
        }
    }   
}
```


`app.h`

```c
GLOBAL INT8U TaskData[N_TASKS];
#define MSG_SIZE    6
GLOBAL void* msg1[MSG_SIZE];
GLOBAL void* msg2[MSG_SIZE];
GLOBAL OS_EVENT *q1;
GLOBAL OS_EVENT *q2;
```


`app_cfg.h`

```c
#define QUEUE1_STK_SIZE     64
#define QUEUE2_STK_SIZE     64
#define COM_STK_SIZE        64

#define QUEUE_TASK_Prio     20
#define COM_TASK_Prio       19

#define N_TASKS 3
GLOBAL OS_STK   TASK_QUEUE1_STK[N_TASKS][QUEUE1_STK_SIZE];
GLOBAL OS_STK   TASK_QUEUE2_STK[N_TASKS][QUEUE2_STK_SIZE];
GLOBAL OS_STK   TASK_COM_STK[COM_STK_SIZE];

void TaskQueue1(void* pdata);
void TaskQueue2(void* pdata);
void TaskCon(void* pdata);
```


`main.c`

```c
 int main(void)
 {
    BSP_Init();
    
    OSInit();
    q1 = OSQCreate(msg1,6);
    q2 = OSQCreate(msg2,6);

    OSTaskCreate( TaskStart,
                    (void *)0,  //parameter
                    (OS_STK *)&TASK_START_STK[START_STK_SIZE-1],
                    START_TASK_Prio );
    OSStart();
     
    return 0;    
 }
```


`main.c - TaskStart`

```c
/* 实验四  消息队列 */
for(i = 0; i < N_TASKS; i++)
{
    TaskData[i] = i;
    OSTaskCreate(TaskQueue1, (void *)&TaskData[i], (OS_STK *)&TASK_QUEUE1_STK[i][QUEUE1_STK_SIZE - 1], QUEUE_TASK_Prio + i);
    OSTaskCreate(TaskQueue2, (void *)&TaskData[i], (OS_STK *)&TASK_QUEUE2_STK[i][QUEUE2_STK_SIZE - 1], QUEUE_TASK_Prio + i + N_TASKS);
}
OSTaskCreate(TaskCon, (void *)0, (OS_STK *)&TASK_COM_STK[COM_STK_SIZE - 1], COM_TASK_Prio);
```

实验结果：
TaskCon任务不停的“喂”消息，TaskQueue1和TaskQueue2“吃”消息。并且前者每隔note次就flush一下q2，在del次数之后产出了q2消息队列。

![](http://mint-blog.qiniudn.com/ucos-msg-queue-1.jpg)

注意：在调用`OSQQuery`时，需要定义一个`OS_Q_DATA qdata`;不能`OS_Q_DATA *qdata`;然后`err=OSQQuery(q1,&qdata)`;要是按照后者调用方式：`err=OSQQuery(q1,qdata);`就会触发`void HardFault_Handler(void)`中断。

**原因**就是没有申请空间。

## 实验五 内存管理

实验描述：
。。。

涉及的μC/OS-II系统函数：
。。。

实验代码：


`app.c`

```c
static void ShowMemInfo(void)
{
    OS_MEM_DATA mem_data;
    OSMemQuery(pmem,&mem_data);
    
    printf( "Begining Address of memory:\t%X\r\n",(int)(mem_data.OSAddr));
    printf( "Block Size in the memory area:\t%d\r\n",(int)(mem_data.OSBlkSize));
    printf( "Free Blocks in the memory area:\t%d\r\n", (int)(mem_data.OSNFree));
    printf( "Used Blocks in the memory area:\t%d\r\n", (int)mem_data.OSNUsed);
    printf("\r\n\n");
    OSTimeDlyHMSM(0,0,2,0);
}
static void GetMem(INT8U i)
{
    INT8U err;
    
    //申请内存空间

    pmemmsg[i] = OSMemGet(pmem,&err);
    if(pmemmsg[i] != (void*)NULL && err == OS_NO_ERR)
    {
        printf("GOT memory_%d.\r\n",i);     //内存块已经分配
        ShowMemInfo();
    }
    else
        printf("NOT got memory_%d.\r\n",i);

}

static void PutMem(void* pmemmsg,INT8U i)
{
    INT8U err;
    //释放内存空间
    err = OSMemPut(pmem,pmemmsg);
    if(err == OS_NO_ERR)
    {
        printf("Released memory_%d.\r\n",i);    /* 释放内存块     */
        ShowMemInfo();
    }
    else
        printf("NOT Exist memory_%d.\r\n",i);
}

void TaskMem1(void* pdata)
{
    INT8U i;
    i = 0;
    
    while(1)
    {
        GetMem(i++ % MSGSIZE);
        OSTimeDlyHMSM(0,0,2,0);
    }
}

void TaskMem2(void* pdata)
{
    INT8U i;
    i = 0;
    
    while(1)
    {
        PutMem(pmemmsg[i++ % MSGSIZE],i++ % MSGSIZE);
        OSTimeDlyHMSM(0,0,2,0);
    }
}
```

`app.h`

```c
#define MSGSIZE         3
GLOBAL  OS_MEM *pmem;           //为OSMemCreate函数设置返回值存储
GLOBAL  void* pmemmsg[3];           //为OSMemGet函数设置返回值存储
GLOBAL  INT8U MemBuf[2][128];   //初始化内存分配的空间
```

`app_cfg.h`

```c
    
#define MEM1_STK_SIZE       64
#define MEM2_STK_SIZE       64

#define MEM1_TASK_PRIO      20
#define MEM2_TASK_PRIO      21

GLOBAL OS_STK TASK_MEM1_STK[MEM1_STK_SIZE];
GLOBAL OS_STK TASK_MEM2_STK[MEM2_STK_SIZE];

void TaskMem1(void* pdata);
void TaskMem2(void* pdata);
```


`main.c - TaskStart`

```
/* 实验五  内存管理 */
pmem = OSMemCreate(MemBuf, 2, 128, &err);

OSTaskCreate(TaskMem1, 0, (OS_STK *)&TASK_MEM1_STK[MEM1_STK_SIZE - 1], MEM1_TASK_PRIO);
OSTaskCreate(TaskMem2, 0, (OS_STK *)&TASK_MEM2_STK[MEM2_STK_SIZE - 1], MEM2_TASK_PRIO);
```

实验结果：

![](http://mint-blog.qiniudn.com/ucos-mem-1.jpg)

TaskMem1申请内存空间，TaskMem2释放内存空间。

注意：成功获取内存的条件是(pmemmsg[i] != (void*)NULL && err == OS_NO_ERR)。

## 任务调度算法分析

任务调度是一个操作系统最核心的部分，μC/OS-II 通过三步走来完成这个过程。
1. 从就绪表中获得就绪任务的最高优先级：`OSRdyTbl[]，OSRdyGrp，OSMapTbl[]，OSUnMapTbl[]`
2. 获取最高优先级就绪任务的任务控制块：`OSTCBHighRdy = OSTCBPrioTbl[OSPrioHighRdy]`
3. 启动任务切换：`OS_TASK_SW()`


第一步：在最经典的μC/OS-II版本（2.52）中，仅仅支持64个任务，并且其ID即为它的任务优先级prio。所以要首先找到最高任务优先级OSPrioHighRdy。与此相关的全局变量有四个：OSRdyTbl[]，OSRdyGrp，OSMapTbl[]，OSUnMapTbl[]，均为INT8U类型，分别介绍如下：
其中OSRdyTbl[]最大为8*8=64的bit的位置，分别表示64个任务的“坑”——就续表，这里简要介绍下对就续表的三大操作：设置，清除和寻优（找最高优先级）；而OSRdyGrp为辅助就续表用来快速查找最高优先级用（后面介绍），故此变量在设置和清除任务就续表时是不需要的，但是为了换取之后的快速找到最高任务优先级，这里牺牲一个1byte字节来空间来换取时间。具体解释参看《嵌入式实时系统μC/OS-II 》

```c
INT8U   OSRdyGrp;                        /* Ready list group */
INT8U   OSRdyTbl[OS_RDY_TBL_SIZE];       /* Table of tasks which are ready to run */

```

![](http://mint-blog.qiniudn.com/ucos-task-analysis-1.jpg)

PS1：引发就绪任务表的变化情况通常有以下几种情况：

- 当有新任务被创建，并且同时在就绪任务表中进行成功的登记
- 当有任务被执行删除操作时
- 当有处在等待状态的任务被某一事件或某一资源唤醒时
- 当有异步事件发生，有由中断服务程序激活的任务时
- 任务正在占用核心处理器，但因等待某一事件或某一资源进入等待状态
- 任务正在占用核心处理器，但因调用延时函数进入等待状态。
- 
通过上面的分析，我们可以得知，μC/OS-II 中，调度器执行发生在所有的系统调用的末尾及中断程序结束之前这个阶段。
PS2：这里大家可能想到使用以下三种结构来表示就续表：数组，链表和最大堆。但是前两者在设置和清除上面的时间复杂度为O(1)，但是寻优为O(n)；虽然最大堆在寻优的时间复杂度为O(1)，但是在设置和清除上面的时间复杂度为O(log n)。并且在实现 RTOS的时候，还不能使用动态内存分配，一方面是时间不确定，另一方面是要依赖别的实现库。我猜这也是μC/OS-II为什么会用一维数组的原因之一吧。
而仅仅靠这两个全局变量在寻优上面的时间复杂度还是O(n)的，所以需要另外的空间：OSMapTbl[]，OSUnMapTbl[]来换取寻优的时间，使其寻优的时间复杂度为O(1)，即与任务的多少没有关系。

优先级位掩码查找表如下：

```c
/*
*********************************************************************************************************
*                              MAPPING TABLE TO MAP BIT POSITION TO BIT MASK
*
* Note: Index into table is desired bit position, 0..7
*       Indexed value corresponds to bit mask
*********************************************************************************************************
*/

INT8U  const  OSMapTbl[8]   = {0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80};
```

| Index | Bit Mask |
|:----|:----|
| 0 | 00000001  |
| 1 | 00000010  |
| 2 | 00000100  |
| 3 | 00001000  |
| 4 | 00010000  |
| 5 | 00100000  |
| 6 | 01000000  |
| 7 | 10000000  |

优先级索引查找表

```c
/*
*********************************************************************************************************
*                                       PRIORITY RESOLUTION TABLE
*
* Note: Index into table is bit pattern to resolve highest priority
*       Indexed value corresponds to highest priority bit position (i.e. 0..7)
*********************************************************************************************************
*/

INT8U  const  OSUnMapTbl[256] = {
    0, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x00 to 0x0F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x10 to 0x1F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x20 to 0x2F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x30 to 0x3F                             */
    6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x40 to 0x4F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x50 to 0x5F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x60 to 0x6F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x70 to 0x7F                             */
    7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x80 to 0x8F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x90 to 0x9F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xA0 to 0xAF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xB0 to 0xBF                             */
    6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xC0 to 0xCF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xD0 to 0xDF                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xE0 to 0xEF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0        /* 0xF0 to 0xFF                             */
};
```

PS：OSUnMapTbl[]这个数组的生成原则：先把一个数用二进制表示，然后从低位往高位数，返回第一次碰到1的位置。比如：OSUnMapTbl[0x111100（60）] = 2。可以看到，如果要表示8位数的对应关系，则数组的大小为2^8=256,16位的话就是2^16 = 65536。这也是为什么OSRdyTbl[]，OSRdyGrp采用8位的原因。（当然可以通过一定的技巧来使其变为16位的，如掩位的技巧，后面通过扩展μC/OS-II支持的最大任务来说明这个技巧）
再从代码生成的角度看看是如何得到这个表的？

OSUnMapTbl[]数组生成程序

```c
#include <stdio.h>
int main(void)
{
    int i,t,n;
    int tab[256]={0};
    for(i=0;i<8;i++)
        for(t=1;(t<<i)<256;t++)
            tab[t<<i]=i;

    //output this tab
    for(n=0;n<=0xff;n++)
    {
        if(n%0x10==0)
            printf("\n");
        printf("%3d" , tab[n]);
    }
    printf("\n");   
}
```

好了，四个变量已经准备就绪了，来看看三大任务操作，程序清单如L1，L2和L3所示。

程序清单 L1. 将任务进入就绪态(置位操作)

```c
OSRdyGrp |= OSMapTbl[prio >> 3];
OSRdyTbl[prio >> 3] |= OSMapTbl[prio & 0x07];
```

先看第一行代码，把相应OSRdyGrp的值置为1。不妨假设prio的值为13-0x0000 1101, 即优先级为13， prio>>3 右移3位后值为0x0000 0001, 可以查OSMapTbl表找出 OSMapTbl[1] 的值为0x0000 0010. 再用0x0000 0010 和 OSRdyGrp 进行或运算，其结果：OSRdyGrp的bit2位必为1。

再看第二行代码，任务优先级13的低三位（0x0000 0101）用于确定是在OSRdyTbl[prio >> 3]数组的第几位。 “prio & 0x07”用于限制OSRdyTbl[]数组的元素下标在0到7之间（或者我们可以这样理解：任务的优先级在[0~63范围，共分为8组，每组8个任务，用6位二进制可以表示，其中任务优先级的高三位理解为优先级所在的组（prio >> 3），低三位理解为所在组中的偏移量（prio & 0x07））。本例中的结果：OSRdyTbl[5]的bit5必为1。

![](http://mint-blog.qiniudn.com/ucos-task-analysis-1.jpg)

程序清单 L2. 将任务从就绪态中删除(清零操作)

第一行先对OSRdyTbl[]中某数据的某一位清0，然后进行判断，如果OSRdyTbl[]中这个数据全为0（也主相当于这个数据的所有8位都已经清0了），再对OSRdyGrp的某位清0。简单就是说，现在就绪位置0，然后看OSRdyTbl[]组中是否都为0，如果是0就将OSRdyGrp也清0。在这里应当知道，只有OSRdyTbl[]任务组中的所有就绪位都为0时，OSRdyGrp相应的为才为0。因为OSRdyGrp中的每一bit记录着OSRdyTbl[]中每一byte的信息，故当后者发生变化时需要去前者看看记录的信息是否需要相应的变化。


--------------

 OSUnMapTbl[]数组主要是用于找出进入就绪态的优先级最高的任务。而这个地方也是我一开始没搞明白的，不明白OSUnMapTbl[]中的数值是怎么来的。

先脱离所有上下文关系来说说OSUnMapTbl[]的一般意义。这里用二进制比较方便说明问题。OSUnMapTbl[]共0xFF个元 素，0x00~0xFF为索引，而OSUnMapTbl[]里的值就是通过分析索引得到的。比如说，索引0x50, 二进制表示为0101 0000,然后从右边数，看第几位首先为1，则OSUnMapTbl[0x50]的值就为几。易知，0101 0000从右起，第4位首先为1，所以有OSUnMapTbl[0x50]=4。再比如0x51，二进制为0101 0001，右起第0位为1，所以OSUnMapTbl[0x51]=0。

那为什么要从右数起呢？这个和优先级表有关系，优先级的值越小，优先级就越高。再看上面那幅优先级的结构图，可见，优先级是从右至左，从上至下越来越低的，最低优先级给了空闲任务。

OSRdyTbl[]中每个字节的8位代表这一组的8个任务哪些进入就绪态，且低位的优先级高于高位。首先，利用OSRdyGrp查找OSUnMapTbl表可以得到就绪态中优先级最高任务所在的组；然后，再利用OSRdyTbl[OSUnMapTbl[OSRdyGrp]] 查找OSUnMapTbl表可以得到就绪态中优先级最高任务所在组中的偏移值，计算后就可以获得就绪态中最高优先级是多少。刚才的冗余空间OSRdyGrp在这里发挥作用了，这里可以简单的看成两级的关系，第一级为OSRdyGrp，第二级为OSRdyTbl[]，此处先找到8组（OSRdyGrp）里面最小的组，然后再在最小组（OSRdyTbl[OSUnMapTbl[OSRdyGrp]]）中寻找最小单元。代码如下：

程序清单 L3. 找出所有就绪态任务中的优先级最高的任务  

```c
y    = OSUnMapTbl[OSRdyGrp];
x    = OSUnMapTbl[OSRdyTbl[y]];
prio = (y << 3) + x;           /* 括号一定要加：优先级 */ 
```

 x、y的含义看上面的图就知道了：y是“高三位”，x是“低三位”。

找最高优先级任务的过程是这样的（解释OSUnMapTbl的作用，原理）：首先，查OSRdyGrp，看OSRdyGrp中右起的第几位首先为1，比如OSRdyGrp=0x56，0x56的二 进制为0101 0110,可见右起第1位首先为1，所以y=OSUnMapTbl[0x56]=1，然后再去OSRdyTbl[y]即OSRdyTbl[1]中查找（为什么是OSRdyTbl[y]，这个书上说得很明确，这个得清楚得了解OSRdyGrp和OSRdyTbl[]之间的关系），这里假设 OSRdyTbl[1]=0xD4，即1101 0100，同样找到OSRdyTbl[1]中右起的第2位首先为1，这样得到x=2，再通过第3行的移位运算就可以得到最高优先级的任务的优先级了。

OSUnMapTbl[]就绪表其实就是找出在OSRdyGrp中那个就绪的优先级最高，因为不止一个位就绪，所以OSRdyGrp的取值范围可以是0x00~0xff，这样每一值都有对应的优先级，同理在OSRdyTbl[]对应的组中，通过就续表可以找出在这组就绪任务中那个优先级最高。

PS：⊙﹏⊙b汗，讲的有点小啰嗦。

-----------


第二步：第二步和第三步其实都是任务调度器（OS_Sched）的工作，分开讲感觉逻辑上好理解一点。

找到了最高优先级（OSPrioHighRdy）之后，就可以通过最高最优先级定位到最高优先级TCB，靠的就是OSTCBPrioTbl[]这个全局变量，里面放着指向相对应优先级的TCB指针。

通过最高优先级获取最高优先级任务控制块（TCB）

```c
OSTCBHighRdy = OSTCBPrioTbl[OSPrioHighRdy];
```


![](http://mint-blog.qiniudn.com/ucos-task-analysis-2.jpg)

任务的TCB才是真正代表着一个任务的实体。因此，找到了TCB就意味着完全可以掌握这个任务了。为什么那么说呢，看下面那张图就一目了然了。

![](http://mint-blog.qiniudn.com/ucos-task-analysis-3.jpg)

任务的三大组成部分：任务控制块（TCB），任务堆栈，任务程序代码。而我们又可以通过TCB找到其它两个。

------------

第三步：既然找到了最高优先级的任务（假设它目前处于就续态），那么就需要切换任务了。执行OS_TASK_SW()宏：

```c
#define  OS_TASK_SW()         OSCtxSw()
```

而OSCtxSw()通过触发一个中断来完成真正的任务切换，不过后面的工作都是μC/OS-II 使用者在移植时需要的做的工作。参考Google搜索。
简要说明，任务的切换严格按照以下的步骤进行，它们不能进行执行顺序的颠倒。如果顺序颠倒，会引发系统的混乱。完成的工作如下：

1. 把当前正在执行的任务的断点指针保护到这个任务对应的任务堆栈中。
2. 把核心处理器中寄存器的内容保存到这个任务的任务堆栈中。
3. 获取当前的堆栈指针，并且该任务的任务控制块的地址，把前者的值保存到后者中。
4. 获得就绪任务的任务控制块，且是通过查表得出的最高优先级的任务。
5. 将最高优先级就绪任务的任务堆栈指针调入到核心处理器中。
6. 将最高优先级就绪任务的任务堆栈中各通用寄存器的内容保存到核心处理器的各通用寄存器中。
7. 将最高优先级就绪任务的断点指针调入核心处理器。

```c
//任务调度
//描述: uC/OS-II总是运行进入就绪态任务中优先级最高的那一个。确定哪个任务优先级最高，下面该哪
//      个任务运行了的工作是由调度器(Scheduler)完成的。任务级的调度是由函数OSSched()完成的。
//      中断级的调度是由另一个函数OSIntExt()完成的eduling).
//参数: none
//返回: none
//注意: 1) 这是一个uC/OS-II内部函数，你不能在应用程序中使用它
//      2) 给调度器上锁用于禁止任务调度 (查看 OSSchedLock()函数)
//说明: 1)任务切换很简单，由以下两步完成，将被挂起任务的微处理器寄存器推入堆栈，然后将较高优先
//      级的任务的寄存器值从栈中恢复到寄存器中。在uC/OS-II中，就绪任务的栈结构总是看起来跟刚
//      刚发生过中断一样，所有微处理器的寄存器都保存在栈中。换句话说，uC/OS-II运行就绪态的任
//      务所要做的一切，只是恢复所有的CPU寄存器并运行中断返回指令。为了做任务切换，运行
//      OS_TASK_SW(),人为模仿了一次中断。多数微处理器有软中断指令或者陷阱指令TRAP来实现上述操
//      作。中断服务子程序或陷阱处理(Trap hardler)，也称作事故处理(exception handler)，必须提
//      供中断向量给汇编语言函数OSCtxSw()。OSCtxSw()除了需要OS_TCBHighRdy指向即将被挂起的任务，
//      还需要让当前任务控制块OSTCBCur指向即将被挂起的任务，参见第8章，移植uC/OS-II，有关于
//      OSCtxSw()的更详尽的解释。
//      2) OSSched()的所有代码都属临界段代码。在寻找进入就绪态的优先级最高的任务过程中，为防止中
//      断服务子程序把一个或几个任务的就绪位置位，中断是被关掉的。为缩短切换时间，OSSched()全
//      部代码都可以用汇编语言写。为增加可读性，可移植性和将汇编语言代码最少化，OSSched()是用
//      C写的。


void  OS_Sched (void)
{
#if OS_CRITICAL_METHOD == 3                            /* Allocate storage for CPU status register     */
    OS_CPU_SR  cpu_sr;
#endif    
    INT8U      y;


    OS_ENTER_CRITICAL();
    //为实现任务切换，OSTCBHighRdy必须指向优先级最高的那个任务控制块OS_TCB，这是通过将
    if ((OSIntNesting == 0) && (OSLockNesting == 0)) { /* Sched. only if all ISRs done & not locked    */
    //如果函数不是在中断服务子程序中调用的，且调度允许的，则任务调度函数将找出进入就绪态的
    //最高优先级任务，进入就绪态的任务在就绪表中OSRdyTbl[ ]中相应位置位.
        y             = OSUnMapTbl[OSRdyGrp];          /* Get pointer to HPT ready to run              */
        OSPrioHighRdy = (INT8U)((y << 3) + OSUnMapTbl[OSRdyTbl[y]]);
        //找到最高优先级任务后，函数检查这个优先级最高的任务是否是当前正在运行的任务，以避免不
        //必要的任务调度，多花时间
       if (OSPrioHighRdy != OSPrioCur) {              /* No Ctx Sw if current task is highest rdy     */
        //为实现任务切换，OSTCBHighRdy必须指向优先级最高的那个任务控制块OS_TCB，这是通过将
        //以OSPrioHighRdy为下标的OSTCBPrioTbl[]数组中的那个元素赋给OSTCBHighRdy来实现的
            OSTCBHighRdy = OSTCBPrioTbl[OSPrioHighRdy];
            OSCtxSwCtr++;                              //统计计数器OSCtxSwCtr加1，以跟踪任务切换次数
            OS_TASK_SW();                              //最后宏调用OS_TASK_SW()来完成实际上的任务切换
        }
    }
    OS_EXIT_CRITICAL();
}
```


## 任务调度算法扩展之两种任务数扩充

μC/OS-II 只支持64个任务（2.52），下面采用两种方法来对其支持的最大任务数进行扩充，第一个支持512个任务，（可以扩展到4096）但是需要额外的如下表的空间；第二种扩展方法支持128个任务，其实还可以扩展到256，但是按此种方法扩展并不优雅，所以只实现了128任务的方法。在看完以上的基础上，再单步调试下面的代码，应该比较容易理解了。

当然，我晓得2.86支持256个任务（找个时间看下，它到底咋整的），μC/OS-III支持无限多个（看了下，原作者将任务调度算法简单化了，取消了OSMapTbl和OSUnMapTbl，直接从最小开始往上走，碰到最小的就为最高优先级，这个对任务的设置有点小要求，当然对任务的三个操作中，最后一个：取最高优先级的时间复杂度也就不是O(1)了，不过我猜原作者应该是做过大量实验的，对实时性的影响应该不太明显）。

本文将原版，改进版1，改进版2都从μC/OS-II中独立出来进行调试，只关心最最核心的部分，当然，如果想要真正的用起来，还需要修改一些杂七杂八的，这里就不讲了，可以参考cnki的一篇小论文《uC/OS-Ⅱ任务数扩充的理论与实现》，一个老工程师写的，很“真”，里面都是“干货”。

直接上代码。

```c
#include <stdio.h>
typedef unsigned char  INT8U;          /* Unsigned  8 bit quantity       */ 

INT8U            OSRdyGrp;
INT8U            OSRdyTbl[8];                      //即将要运行的任务列表

//OSMapTbl[]：就绪任务表；对应OSRdyGrp和OSRbyTbl[i]的位值(0~7)
INT8U  const  OSMapTbl[]   = {0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80};

//*******************************************************************************************************
//最高优先级任务查找表(PRIORITY RESOLUTION TABLE)
//注意: 变址索引表是位模式，找出就绪态最高优先级别任务，给定值应符合高优先级位位值(0~7)

//OSUnMapTbl[]：最高优先级任务查找表；对应OSRdy Grp和OSRbyTbl[i]的位值(0~7)
INT8U  const  OSUnMapTbl[] = {
    0, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x00 to 0x0F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x10 to 0x1F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x20 to 0x2F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x30 to 0x3F                             */
    6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x40 to 0x4F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x50 to 0x5F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x60 to 0x6F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x70 to 0x7F                             */
    7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x80 to 0x8F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x90 to 0x9F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xA0 to 0xAF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xB0 to 0xBF                             */
    6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xC0 to 0xCF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xD0 to 0xDF                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xE0 to 0xEF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0        /* 0xF0 to 0xFF                             */
};


int main(void)
{   
    INT8U x,y;
    INT8U prio;

    //使任务进入就绪状态
    prio = 5;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 15;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 25;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 35;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 45;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 5;
    //使任务脱离就绪状态
    if((OSRdyTbl[prio >> 3] &= ~OSMapTbl[prio & 0x07]) == 0)
        OSRdyGrp &= ~OSMapTbl[prio >> 3];

    y    = OSUnMapTbl[OSRdyGrp];
    x    = OSUnMapTbl[OSRdyTbl[y]];
    prio = (y << 3) + x;
 

    printf("High Priority = %d \n",prio);
    printf("x = %d \n",x);
    printf("y = %d \n",y);

    getchar();
    return 0;
}
```

![](http://mint-blog.qiniudn.com/ucos-task-enhanced-1.jpg)

--------

再看改进版1：


此方法需要额外的空间来换取时间，换取的比率大致是64倍（抛去固定项，即在原版本的基础之上的空间），即如果要支持512个任务，则需要额外8byte的字节空间；如果要支持4096个任务，则需要额外64个byte的空间。

而且必须8倍8倍的张，原因是此方法是在维度上面的扩充，原版本相当于2维空间，此处为3维空间，当然还可以在扩，但是实现比较复杂。


```c
#include <stdio.h>

typedef unsigned char  INT8U;           /* Unsigned  8 bit quantity       */

INT8U             OSRdyGrpX;
INT8U             OSRdyGrpY[8]; 
INT8U             OSRdyTbl[8][8];                       //即将要运行的任务列表

//OSMapTbl[]：就绪任务表；对应OSRdyGrp和OSRbyTbl[i]的位值(0~7)
INT8U  const  OSMapTbl[]   = {0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80};

//*******************************************************************************************************
//最高优先级任务查找表(PRIORITY RESOLUTION TABLE)
//注意: 变址索引表是位模式，找出就绪态最高优先级别任务，给定值应符合高优先级位位值(0~7)

//OSUnMapTbl[]：最高优先级任务查找表；对应OSRdy Grp和OSRbyTbl[i]的位值(0~7)
INT8U  const  OSUnMapTbl[] = {
    0, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x00 to 0x0F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x10 to 0x1F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x20 to 0x2F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x30 to 0x3F                             */
    6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x40 to 0x4F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x50 to 0x5F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x60 to 0x6F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x70 to 0x7F                             */
    7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x80 to 0x8F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x90 to 0x9F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xA0 to 0xAF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xB0 to 0xBF                             */
    6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xC0 to 0xCF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xD0 to 0xDF                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xE0 to 0xEF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0        /* 0xF0 to 0xFF                             */
};

#define t1 (prio >> 6)
#define t2 ((prio >> 3) & 0x07)
#define t3 (prio & 0x07)

int main(void)
{   
    INT8U x,y,z;
    int prio;

    //使任务进入就绪状态
    prio = 257;
    OSRdyGrpX |= OSMapTbl[t1];
    OSRdyGrpY[t1] |= OSMapTbl[t2];
    OSRdyTbl[t1][t2] |= OSMapTbl[t3];
    
    prio = 113;
    OSRdyGrpX |= OSMapTbl[t1];
    OSRdyGrpY[t1] |= OSMapTbl[t2];
    OSRdyTbl[t1][t2] |= OSMapTbl[t3];

    prio = 14;
    OSRdyGrpX |= OSMapTbl[t1];
    OSRdyGrpY[t1] |= OSMapTbl[t2];
    OSRdyTbl[t1][t2] |= OSMapTbl[t3];

    prio = 11;
    OSRdyGrpX |= OSMapTbl[t1];
    OSRdyGrpY[t1] |= OSMapTbl[t2];
    OSRdyTbl[t1][t2] |= OSMapTbl[t3];

    prio = 11;
    //使任务脱离就绪状态
    if((OSRdyTbl[t1][t2] &= ~OSMapTbl[t3]) == 0)
    {
        OSRdyGrpY[t2] &= ~OSMapTbl[t2];
        if((OSRdyGrpY[t1] &= ~OSMapTbl[t2]) == 0)
            OSRdyGrpX &= ~OSMapTbl[t1];
    }

    z = OSUnMapTbl[OSRdyGrpX];
    y = OSUnMapTbl[OSRdyGrpY[z]];
    x = OSUnMapTbl[OSRdyTbl[z][y]];
    prio = (z<<6)+(y<<3) + x;
    
    printf("High Priority = %d \n",prio);
    printf("x = %d \n",x);
    printf("y = %d \n",y);
    printf("z = %d \n",z);
    getchar();
    return 0;
}
```

![](http://mint-blog.qiniudn.com/ucos-task-enhanced-2.jpg)


---------------



再再看改进版2：

此方法为线性扩张，需要修改OSRdyGrp的类型和OSRdyTbl[]的长度，每增加64个任务，就增加一个判断分支，需要的额外空间没有改进版1多，实现较简单，但是扩张速度没有改进版1来得快，是线性的。


```
#include <stdio.h>
typedef unsigned char  INT8U;          /* Unsigned  8 bit quantity       */ 
typedef unsigned short  INT16U;

INT16U            OSRdyGrp;
INT8U            OSRdyTbl[16];                      //即将要运行的任务列表

//OSMapTbl[]：就绪任务表；对应OSRdyGrp和OSRbyTbl[i]的位值(0~7)
INT16U  const  OSMapTbl[]   = { 0x0001, 0x0002, 0x0004, 0x0008,
                                0x0010, 0x0020, 0x0040, 0x0080,
                                0x0100, 0x0200, 0x0400, 0x0800,
                                0x1000, 0x2000, 0x4000, 0x8000};

//*******************************************************************************************************
//最高优先级任务查找表(PRIORITY RESOLUTION TABLE)
//注意: 变址索引表是位模式，找出就绪态最高优先级别任务，给定值应符合高优先级位位值(0~7)

//OSUnMapTbl[]：最高优先级任务查找表；对应OSRdy Grp和OSRbyTbl[i]的位值(0~7)
INT8U  const  OSUnMapTbl[] = {
    0, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x00 to 0x0F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x10 to 0x1F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x20 to 0x2F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x30 to 0x3F                             */
    6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x40 to 0x4F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x50 to 0x5F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x60 to 0x6F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x70 to 0x7F                             */
    7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x80 to 0x8F                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0x90 to 0x9F                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xA0 to 0xAF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xB0 to 0xBF                             */
    6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xC0 to 0xCF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xD0 to 0xDF                             */
    5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,       /* 0xE0 to 0xEF                             */
    4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0        /* 0xF0 to 0xFF                             */
};


int main(void)
{   
    INT8U x,y;
    INT8U prio;

    //使任务进入就绪状态
    prio = 5;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 100;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 111;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 120;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 125;
    OSRdyGrp |= OSMapTbl[prio >> 3];
    OSRdyTbl[prio >>3] |= OSMapTbl[prio & 0x07];

    prio = 5;
    //使任务脱离就绪状态
    if((OSRdyTbl[prio >> 3] &= ~OSMapTbl[prio & 0x07]) == 0)
        OSRdyGrp &= ~OSMapTbl[prio >> 3];
    
    if((OSRdyGrp & 0xff) != 0)
    {
        y    = OSUnMapTbl[OSRdyGrp & 0xff];
        x    = OSUnMapTbl[OSRdyTbl[y]];
        prio = (y << 3) + x;
    }
    else
    {
        y    = OSUnMapTbl[OSRdyGrp >> 8];
        x    = OSUnMapTbl[OSRdyTbl[y + 8]];
        prio = 64 + (y << 3) + x;
    }

    printf("High Priority = %d \n",prio);
    printf("x = %d \n",x);
    printf("y = %d \n",y);

    getchar();
    return 0;
}
```


![](http://mint-blog.qiniudn.com/ucos-task-enhanced-3.jpg)


鱼与熊掌不可兼得。

