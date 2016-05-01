# 移植 VPC 到 STM32 平台

> VCP 是虚拟串口（ Virtual COM Port Driver）的简称。通过它可以种将 USB 抽象当做串口使用，使主控端的实现非常简单，但是速度又是 USB 的速度。

[TOC]

## 环境搭建

硬件平台

- [STM32F10x](http://www.st.com/web/en/resource/technical/document/datasheet/CD00191185.pdf)
- [ULINK2](http://www2.keil.com/mdk5/ulink)

软件平台

- [Keil MDK 4.70](http://www.keil.com/arm/mdk.asp)
- [PC端虚拟串口驱动 1.3.1](http://www.stmcu.org/document/detail/index/id-214187)


库版本

- [STM32_USB-FS-Device_Lib_V4.0.0](http://www.st.com/web/en/catalog/tools/PF258157)
- [STM32F10x_StdPeriph_Lib_V3.5.0](https://my.st.com/public/STe2ecommunities/mcu/Lists/cortex_mx_stm32/Flat.aspx?RootFolder=%2fpublic%2fSTe2ecommunities%2fmcu%2fLists%2fcortex_mx_stm32%2fSTM32%20Legacy%20Firmware%20Libraries&FolderCTID=0x01200200770978C69A1141439FE559EB459D7580009C4E14902C3CDE46A77F0FFD06506F5B&TopicsView=https%3A%2F%2Fmy%2Est%2Ecom%2Fpublic%2FSTe2ecommunities%2Fmcu%2FLists%2Fcortex_mx_stm32%2FAllItems%2Easpx&currentviews=11077)


问题：

- 枚举主要做哪些事情？
> When the Host powers up it polls each of the Slave devices in turn (using the reserved address 0), it assigns each one a unique address and finds out from each device what its Speed is and the and type of data transfer it wishes to perform. This process is called **enumeration** and it also takes place whenever a device is plugged into an active network. 
(http://www.computer-solutions.co.uk/info/Embedded_tutorials/usb_tutorial.htm)
- 为什么USB每隔1ms就进一次中断，如 STM32 的`USB_LP_CAN1_RX0_IRQHandler`中断函数？
> he SOF packet consisting of an 11-bit frame number is sent by the host every 1ms ±  500ns on a full speed bus or every 125 µs ±  0.0625 µs on a high speed bus.
(http://www.beyondlogic.org/usbnutshell/usb3.shtml)
- 主控轮询从设备的时间是如何确定的？
- 在bulk传输方式中，如果传输的数据长度小于最大传输长度，需要用零补充么？会发生什么呢？
> If the data payload falls short of the maximum packet size, it doesn't need to be padded with zeros. A bulk transfer is considered complete when it has transferred the exact amount of data requested, transferred a packet less than the maximum endpoint size, or transferred a zero-length packet.
(http://www.beyondlogic.org/usbnutshell/usb4.shtml)
- 什么是pipe？什么是Endpoint？
- 如何确定使用哪个EndPoint？以及如何更改EP？
- 数据是什么时候写入Buffer？
- 写入Buffer之后，啥时候发出去？
- 为什么不管是PC还是STM32都需要在发完数据之后，再发送个全零帧？
- 为什么每次的数据大小是 64 字节？可以更改么？
- USB 2.0 Full Speed的最快速度是多少？
- 为什么调试器的断点不是调试USB的好方法？
> These timeout periods are quite acceptable for even the slowest of devices, but can be a restriction during debugging. 50mS doesn't provide for many debugging characters to be sent at 9600bps on an asynchronous serial port or for a In Circuit Debugger/Emulator to single step or to break execution to examine the internal Registers. As a result, USB requires some different debugging methods to that of other microcontroller projects.
http://www.beyondlogic.org/usbnutshell/usb6.shtml

参考：

- [usb wiki](https://github.com/mintisan/mintisan.github.io/wiki/USB)




## 新建工程

新建本地文件夹目录结构：

- 将`STM32F10x_StdPeriph_Lib_V3.5.0`的`Libraries`中的所有文件放到`BSP`下；
- 将 `STM32_USB-FS-Device_Lib_V4.0.0`库中的`Libraries\STM32_USB-FS-Device_Driver`中的所有文件放到`USBLib`下；
-  将 `STM32_USB-FS-Device_Lib_V4.0.0`库中的`Projects\Virtual_COM_Port\src`所有文件放到`USER`下；
- 新建`LISTING`用于存放临时生成的链接文件；
- 新建`OUTPUT`用于存放最终生成的BIN和HEX文件。

最终本地目录树如下：

```
├─BSP                     //STM32F10x_StdPeriph_Lib_V3.5.0/Libraries
│  ├─CMSIS                                   
│  │  ├─CM3                                  
│  │  │  ├─CoreSupport                       
│  │  │  └─DeviceSupport                     
│  │  │      └─ST                            
│  │  │          └─STM32F10x                 
│  │  │              └─startup               
│  │  │                  ├─arm               
│  │  │                  ├─gcc_ride7         
│  │  │                  ├─iar               
│  │  │                  └─TrueSTUDIO        
│  │  └─Documentation                        
│  └─STM32F10x_StdPeriph_Driver              
│      ├─inc                                 
│      └─src                                 
├─LISTING                                  //lst文件     
├─OUTPUT                          //输出文件，如BIN或者HEX           
├─USBLib                          //STM32_USB-FS-Device_Lib_V4.0.0/Libraries
│  ├─inc                                     
│  └─src                                     
└─USER                //STM32_USB-FS-Device_Lib_V4.0.0\Projects\Virtual_COM_Port               
    ├─inc                                
    └─src                                    
```

在`USER`根目录新建工程

![打开MDK，Create New Project](http://mint-blog.qiniudn.com/stm32-vpc-1.png)

选择芯片

![STM32F103RC](http://mint-blog.qiniudn.com/stm32-vpc-2.png)

无需将启动文件添加工程，稍后手动添加，以防止版本不对

![startup_stm32f10x_hd.s](http://mint-blog.qiniudn.com/stm32-vpc-3.png)

右键工程名，组织工程的目录结构，将工程目录与本地一一对应

![Components, Enviroment and Books](http://mint-blog.qiniudn.com/stm32-vpc-4.png)

最终工程目录树

![Project Tree](http://mint-blog.qiniudn.com/stm32-vpc-5.png)


点击`小魔术棒`设置`Output`

![Options for Output](http://mint-blog.qiniudn.com/stm32-vpc-6.png)

设置`Listings`

![Options for Listings](http://mint-blog.qiniudn.com/stm32-vpc-7.png)


设置预处理宏和头文件路径，还有一定要加上`--c99`这样就可以随处定义变量了！！！

![Options for C/C++ Header](http://mint-blog.qiniudn.com/stm32-vpc-8.png)



![Options for C/C++](http://mint-blog.qiniudn.com/stm32-vpc-9.png)


选择调试器和设置Flash的大小，勾选`Reset and Run`，这样每次下载完程序便可以自动运行，而不是手动复位一次再运行

![Flash Download](http://mint-blog.qiniudn.com/stm32-vpc-a.png)


## 移植代码

在之前，放在`USER`中的代码要么与平台相关，要么是可以修改的配置文件，需要针对特定情况进行修改。


先删除掉一些不需要的文件，由于目前针对STM32F1平台，故可以将F2，F3和L1平台的文件删除，如~~stm32f30x_conf.h，stm32l1xx_conf.h ，stm32f37x_conf.h ，system_stm32f30x.c，system_stm32l1xx.c  ， system_stm32f37x.c ~~。

删除完之后剩下如下文件，大致可以分成 USB 配置相关和平台硬件相关

**平台硬件相关**

- platform_config.h  ：USB控制引脚USB_DISCONNECT定义处
- stm32f10x_conf.h  ：STM32 库文件模块开关，无需修改
- hw_config.h / hw_config.c：USB引脚定义初始化和NVIC设定
-  stm32_it.h / stm32_it.c：打开USB中断`USB_LP_CAN1_RX0_IRQHandler`即可
- main.c ：工程入口，初始化USB，无需修改

**USB 配置相关**

- usb_conf.h：端点和对应回调函数选择处
- usb_desc.h / usb_desc.c ：设别描述符定义，无需修改
- usb_prop.h / usb_prop.c：过程正真执行的函数，注释掉USART相关即可
- usb_istr.h  / usb_istr.c：在中断的执行实体`USB_Istr`函数，无需修改
- usb_pwr.h / usb_pwr.c：低功耗以及电源模块，需要修改`Suspend`让设备不进入睡眠
-  usb_endp.c ：端点输入（EP1）/输出（EP3）回调函数的入口

**注**：不管Host还是Device的输入和输出均是站在Host的角度描述。

主要工作分为4部分：定义USB 控制脚引脚 USB_DISCONNECT，删除针对原评估板的USART相关代码，关掉USB进入低功耗相关和设置发送和接收实体。

1.注释原评估板的USE_DISCONNECT的GPIO定义，重新定义为开发板上的，如PA10：

```
#define USB_DISCONNECT                      GPIOA
#define USB_DISCONNECT_PIN                  GPIO_Pin_10
#define RCC_APB2Periph_GPIO_DISCONNECT      RCC_APB2Periph_GPIOA
```

注：每一款STM32F10x的USBDM为PA11，USBDP为PA12，CTRL为自行设定。

2.删除USART相关的有所有定义个调用，只要与以下函数的相关的初始化，定义和调用均注释掉

```
void USART_Config_Default(void);
bool USART_Config(void);
void USB_To_USART_Send_Data(uint8_t* data_buffer, uint8_t Nb_bytes);
void USART_To_USB_Send_Data(void);
```

3.注释掉Suspend函数中的所有内容，关掉睡眠

```

```

4.在`EP3_OUT_Callback`回调接收函数中设置缓存接收数据和发送数据，以下两种方式均可以。

```
static uint8_t USB_Tx_Buffer[VIRTUAL_COM_PORT_DATA_SIZE];

              /* style1 : */
//               while(GetEPTxStatus(ENDP1) != EP_TX_NAK);
//               {
//                   memset(USB_Tx_Buffer,_inc++,VIRTUAL_COM_PORT_DATA_SIZE);
//                   USB_Tx_Buffer[31] = 0xAA;
//                   USB_Tx_Buffer[VIRTUAL_COM_PORT_DATA_SIZE - 10] = 0xBB;
//                   USB_SIL_Write(EP1_IN, USB_Tx_Buffer, VIRTUAL_COM_PORT_DATA_SIZE);
//                   SetEPTxValid(ENDP1);
//               }
//               
//               while(GetEPTxStatus(ENDP1) != EP_TX_NAK);
//               {
//                   USB_SIL_Write(EP1_IN, USB_Tx_Buffer, 0);
//                   SetEPTxValid(ENDP1);
//               }
              
            /* style2 : http://bbs.21ic.com/icview-208240-1-1.html */
            while(GetEPTxStatus(ENDP1) != EP_TX_NAK);
            {
            memset(USB_Tx_Buffer,_inc++,VIRTUAL_COM_PORT_DATA_SIZE);
            USB_Tx_Buffer[3] = 2*_inc;
            UserToPMABufferCopy(USB_Tx_Buffer, ENDP1_TXADDR, VIRTUAL_COM_PORT_DATA_SIZE);
            SetEPTxCount(ENDP1,VIRTUAL_COM_PORT_DATA_SIZE);
            SetEPTxValid(ENDP1);
            }
            // over flag
            while(GetEPTxStatus(ENDP1) != EP_TX_NAK);
            {
            SetEPTxCount(ENDP1,0);
            SetEPTxValid(ENDP1);
            }
```

以下为对接收到数据进行解析，如果第一个数据位0x03，则回复相对应的数据，完成类似echo的过程，以下是[Bus Hound](http://perisoft.net/bushound/)的显示过程。


![bus hound](http://mint-blog.qiniudn.com/stm32-vpc-b.png)

注：USB会在以下三种情况下将bulk方式的数据发出：第一种是其长度小于64；另一种为发送完64长度数据之后发送一帧0长度的数据。以上为后一种。还有就是等驱动的缓冲区满，如2k的数据满了之后再发出。


## 枚举分析

[图解USB总线枚举过程](https://www.google.co.jp/search?q=%E5%9B%BE%E8%A7%A3USB%E6%80%BB%E7%BA%BF%E6%9E%9A%E4%B8%BE%E8%BF%87%E7%A8%8B&oq=%E5%9B%BE%E8%A7%A3USB%E6%80%BB%E7%BA%BF%E6%9E%9A%E4%B8%BE%E8%BF%87%E7%A8%8B&aqs=chrome..69i57&sourceid=chrome&es_sm=119&ie=UTF-8)


![Paste_Image.png](http://mint-blog.qiniudn.com/stm32-vpc-c.png)
1. 检测到USB设备后，对USB设备复位，使设备地址变为0x0。发80 06 01 00 00 40 00命令，读取设备描述符命令，由于不知道设备描述符的长度，暂时要求返回数据长度为0x40。
![Paste_Image.png](http://mint-blog.qiniudn.com/stm32-vpc-d.png)
2. 给这个新接上的设备分配地址。
![Paste_Image.png](http://mint-blog.qiniudn.com/stm32-vpc-e.png)
3. 设置地址成功后，对新地址发送获取设备描述符命令，此时已经知道了它的长度，直接按这个长度即可。
![Paste_Image.png](http://mint-blog.qiniudn.com/stm32-vpc-f.png)
4. 在得到设备描述符后，我们再发获取配置描述符命令。
![Paste_Image.png](http://mint-blog.qiniudn.com/stm32-vpc-10.png)
5. 从上一步，我们可以得到设备支持的接口数及端点数，此时再发一次得到配置描述符命令，把数据长度改大，数据长度我们可以从wTotallLength中读取，但我们一般在这里设为0xFF。
![Paste_Image.png](http://mint-blog.qiniudn.com/stm32-vpc-11.png)
6. 如果有字符串描述符，在这里可以发命令读取。接下来再一次发命令完整读取设备描述符和配置描述符
![Paste_Image.png](http://mint-blog.qiniudn.com/stm32-vpc-12.png)
7. 在这里发送设置配置命令，到此，我们已经完整地得到了设备的信息。枚举过程结束。
![Paste_Image.png](http://mint-blog.qiniudn.com/stm32-vpc-13.png)
