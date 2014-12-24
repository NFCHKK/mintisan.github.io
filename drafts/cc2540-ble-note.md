# CC2540 BLE学习笔记


## 开发环境
1. CC2540硬件开发板
2. CC-Debuger仿真器
3. USB Dongle
4. USB-串口转接板
5. [IAR-EW8051][1]
6. [BLE-CC254x-1.3.2.exe][2]
7. [SmartRF Protocol Packet Sniffer][3]

## BLE简介


Bluetooth 的一个很重要特性，就是所有的 Bluetooth 产品都无须实现全部的Bluetooth 规范，你可根据所需要的产品实现需要的Profile，不必给开发带来更大的开销。


## OSAL框架





## 串口透传

上电之后，从机将检查自身的状态，如果未处于连接状态，则将周期性的发送广播幸好，等待主机的连接；主机完成扫描，发起主动连接的工作。



本测试方案中，为了排除串口的影响因素，将其波特率设置为115200bps，即近10KB/s。假设串口部分不构成瓶颈，以下将对蓝牙部分进行参数调节，测试其在不丢包情况下的最大速度。

BLE物理层调制的最大速度是1Mbps。

根据TI[官方的测试结果](http://processors.wiki.ti.com/index.php/CC2540_Data_Throughput)表明，CC2540可以在3.35s内发送1000*20B的数据，计算可得的单向通信速率最大可为为5.9KB/s。原文阐述如下：
> This is example modification of CC2540 SimpleBLEPeripheral application to measure user data throughput. Initial testing shows we can reach 5.9K bytes per second. This is using a 10ms connection interval and 20 user data bytes sent in GATT notifications. 4 notifications are sent every 7ms, based on an OSAL timer. When sending the notifications, a check is made to see if a buffer is available. In all, 1000 notifications are sent. This is 20K bytes, which are sent over 3.35 seconds. 

看起来不错的样子。





## 参考资料

- Getting Started with Bluetooth Low Energy.pdf
- CC254x Bluetooth Low Energy Software Developer’s Guide (Rev. F).pdf
- CC254x Bluetooth Low Energy Sample Application Guide (Rev. C).pdf
- [TI Bluetooth LE Wiki-page](http://www.ti.com/ble-wiki)
- [Latest stack download](http://www.ti.com/ble-stack)
- [Support forum](http://www.ti.com/ble-forum)





[1]: http://www.iar.com/Products/IAR-Embedded-Workbench/8051/
[2]: http://www.ti.com/tool/ble-stack
[3]: http://www.ti.com/tool/packet-sniffer



