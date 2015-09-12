# Linux 驱动开发环境搭建（Tiny  4412）

[TOC]

## 编译内核

先去[友善之臂](http://www.arm9home.net/)下载开发板对应的光盘资源，如[FriendlyARM-4412-DVD-20150716](http://www.arm9home.net/read.php?tid-80883.html)。

解压之后的目录如下：
```
.
├── Disk-A
│   ├── Android
│   ├── Datasheet
│   ├── Linux                                   # Linux内核源代码所在目录
│   ├── SamsungAP
│   ├── Schematic-PCB
│   ├── Tiny4412 Android硬件开发指南.pdf
│   ├── Tiny4412 Linux&Android内核驱动位置.pdf
│   ├── Tiny4412用户手册.pdf                     # 常用操作指南
│   ├── tools
│   ├── uboot
│   ├── UbuntuCore
│   ├── UbuntuDesktop
│   └── 友善之臂Ubuntu使用手册.pdf
└── Disk-B
    └── images                                  # 刷机文件夹
        ├── Android
        ├── Android4.1.2
        ├── Android4.2.2                        # 本文所用的版本
        ├── Firmware
        ├── FriendlyARM.ini                     # 配置文件
        ├── Linux
        ├── Superboot4412.bin
        └── UbuntuCore
```

根据 Android 版本来选择对应的 Linux 内核，如 Android 4.2.2 需要用 Linux 3.5 版本的内核。

进入 `linux-3.5-20150121.tgz` 所在的目录 `/Disk-A/Linux/`

1.解压并进入如内核文件夹,waiting for a while...
```
➜  Linux  tar zxvf linux-3.5-20150121.tgz
➜  Linux  cd linux-3.5
```

2.复制一份配置文件并自定义配置
```
# 因为要用 Android 开发环境
➜  linux-3.5  cp tiny4412_android_defconfig .config
# 启动自定义配置界面，当然也可以直接修改.config
➜  linux-3.5  make menuconfig
```

启动如下的配置界面，以选择启动一个SPI为例
![](http://mint-blog.qiniudn.com/ld-env-menuconfig.png)

“Device Dirver”
![](http://mint-blog.qiniudn.com/ld-env-devicedrivers.png)

"SPI support"
![](http://mint-blog.qiniudn.com/ld-env-spisupport.png)

按`Y`选择SPI 0，"Samsung S3C66XX Channel 0 Support"
![](http://mint-blog.qiniudn.com/ld-env-samsungs3c64xxchannel0support.png)

不停的安`ESC`直到退出，"exit & save"
![](http://mint-blog.qiniudn.com/ld-env-save.png)

其它IIC的也是如此。

注：确保内核文件在 Linux 自己的盘上，不要在 Windows 下面挂在的盘符，否则会出现如下错误：（不小心暴露了双系统，不然也不会碰到这个问题，，，）
```
  HOSTCC  scripts/basic/fixdep
/bin/sh: 1: scripts/basic/fixdep: Permission denied
make[1]: *** [scripts/basic/fixdep] Error 126
make: *** [scripts_basic] Error 2
```

3.配置编译器`arm-linux-gcc`路径，否则会提示`/bin/sh: 1: arm-linux-gcc: not found`
修改配置文件`.config`第36行：
```
CONFIG_CROSS_COMPILE="arm-linux-"
```

为自已工具链所在的文件路径，如将其放到`opt`路径下
```
CONFIG_CROSS_COMPILE="/opt/FriendlyARM/toolschain/4.5.1/bin/arm-linux-"
```


4.编译内核，waiting for a while...
```
# 如果是多核的话，4核
make -j4
```

显示如下日志表示成功
```
......
 OBJCOPY arch/arm/boot/zImage
  Kernel: arch/arm/boot/zImage is ready
➜  linux-3.5  
```

5.到`linux-3.5/arch/arm/boot`路径下复制出内核文件`zImage`，放到`image`的`Disk-B/images/Android4.2.2`路径下，然后将`image`下`FriendlyARM.ini`配置文件中的 Android 4.2.2 选项全部打开，其他全部注释掉即可，如下所示。然后就可以愉快的去刷机了。
```
################### Android 4.2.2 ####################
#This line cannot be removed. by FriendlyARM(www.arm9.net)

CheckOneButton=No
Action = Install
OS = Android

LowFormat = Yes
VerifyNandWrite = No

LCD-Mode = No
CheckCRC32=No

StatusType = Beeper | LED

################### Android 5 ####################
# Android-BootLoader = Superboot4412.bin
# Android-Kernel = Android/zImage
# Android-CommandLine = console=ttySAC0,115200n8 androidboot.console=ttySAC0 ctp=2 skipcali=y vmalloc=384m ethmac=1C:6F:65:34:51:7E androidboot.selinux=permissive
# Android-RamDisk =Android/ramdisk-u.img
# Android-RootFs-InstallImage = Android/system.img
# Android-UserData-4G = Android/userdata-4g.img
# Android-UserData-8G = Android/userdata-8g.img
# Android-UserData-16G = Android/userdata-16g.img
# Android-UserData = Android/userdata.img

################### UbuntuCore ####################
# Ubuntu-BootLoader = Superboot4412.bin
# Ubuntu-Kernel = UbuntuCore/zImage
# Ubuntu-CommandLine = root=/dev/mmcblk0p1 rootfstype=ext4 console=ttySAC0,115200n8 bootdev=EMMC ethmac=FC:09:D1:00:00:04
# Ubuntu-RamDisk = UbuntuCore/ramdisk-u.img
# Ubuntu-RootFs-InstallImage = UbuntuCore/rootfs_ubuntucore.img

################### Android 4.1.2 ####################
# Android-BootLoader = Superboot4412.bin
# Android-Kernel = Android4.1.2/zImage
# Android-CommandLine = console=ttySAC0,115200n8 androidboot.console=ttySAC0 ctp=2 skipcali=y vmalloc=384m ethmac=1C:6F:65:34:51:7E
# Android-RamDisk =Android4.1.2/ramdisk-u.img
# Android-RootFs-InstallImage = Android4.1.2/system.img
# Android-UserData-4G = Android4.1.2/userdata-4g.img
# Android-UserData-8G = Android4.1.2/userdata-8g.img
# Android-UserData-16G = Android4.1.2/userdata-16g.img
# Android-UserData = Android4.1.2/userdata.img

################### Android 4.2.2 ####################
Android-BootLoader = Superboot4412.bin
Android-Kernel = Android4.2.2/zImage
Android-CommandLine = console=ttySAC0,115200n8 androidboot.console=ttySAC0 ctp=2 skipcali=y vmalloc=384m ethmac=1C:6F:65:34:51:7E
Android-RamDisk =Android4.2.2/ramdisk-u.img
Android-RootFs-InstallImage = Android4.2.2/system.img
Android-UserData-4G = Android4.2.2/userdata-4g.img
Android-UserData-8G = Android4.2.2/userdata-8g.img
Android-UserData-16G = Android4.2.2/userdata-16g.img
Android-UserData = Android4.2.2/userdata.img

################### Linux ####################
# Linux-BootLoader = Superboot4412.bin
# Linux-Kernel = Linux/zImage
# Linux-CommandLine = root=/dev/mmcblk0p1 rootfstype=ext4 console=ttySAC0,115200 init=/linuxrc ctp=2 skipcali=y ethmac=1C:6F:65:34:51:7E
# Linux-RamDisk = Linux/ramdisk-u.img
# Linux-RootFs-InstallImage = Linux/rootfs_qtopia_qt4.img
```

## 编译驱动

刷完了机就可以写hello world驱动了。

1.新建Makefile文件

```
# 编译完的内核路径
KERNELDIR = ~/workplace/work/linux-3.5

# 交叉工具链路径
PWD := $(shell pwd)
CROSS_COMPILE = /opt/FriendlyARM/toolschain/4.5.1/bin/arm-linux-
CC    = $(CROSS_COMPILE)gcc

# 目标文件
gf-objs := hello.o
obj-m := hello.o

modules:
    $(MAKE) -C $(KERNELDIR) M=$(PWD) modules
clean:
    rm -rf *.o *~ core .depend .*.cmd *.ko *.mod.c .tmp_versions
.PHONY: modules clean

```

2.新建`hello.c`[^1]，并`make`


```c
#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>

MODULE_LICENSE("Dual BSD/GPL");

static int hello_init(void) {
  printk("<1> Hello world!\n");
  return 0;
}

static void hello_exit(void) {
  printk("<1> Bye, cruel world\n");
}

module_init(hello_init);
module_exit(hello_exit);
```


3.将驱动下发到开发板

```
# 让开发板可以写入数据，否则，，，
➜  dirver  adb remount
remount succeeded
➜  dirver  
➜  dirver  
# 将驱动下发到开发板的任何目录
➜  dirver  adb push hello.ko /system
```

否则会遇到如下无法写入的情况：
```
➜  dirver  adb push hello.ko /system
failed to copy 'hello.ko' to '/system/hello.ko': Read-only file system
```

进入adb shell，并insmod hello.ko
```
# 进入adb shell环境
➜  adb shell
root@android:/
# 进入驱动所在目录
root@android:/ # cd system/      
# 加载hello驱动                                              
root@android:/system # insmod hello.ko 
# 显示内核打印信息                                        
root@android:/system # dmesg
<1>[ 4785.065000]  Hello world!
# 列出当前加载的驱动
root@android:/system # lsmod 
hello 801 0 - Live 0x00000000 (O)
# 卸载hello驱动
root@android:/system # rmmod hello
# 打印卸载驱动时的log
root@android:/system # dmesg
<1>[ 4785.065000]  Hello world!
<1>[ 4967.540000]  Bye, cruel world

```

注：需要安装 adb工具，如下所述。

## ADB 使用

在从主机将驱动下发到开发板的时候，用了adb工具，其安装和主要使用如下。

1.安装
```
➜  sudo add-apt-repository ppa:nilarimogard/webupd8
➜  sudo apt-get update
➜  sudo apt-get install android-tools-adb android-tools-fastboot
```

确认下 `adb` 版本
```
➜  adb version
Android Debug Bridge version 1.0.31
```


2.使用
```
# adb 设备
adb devices
# 关闭adb服务
adb kill-server
# 开启adb服务
adb start-server
# 重启开发板
adb reboot
# 开发板可写入
adb remount
# 进入shell幻镜
adb shell
# 下发到开发
adb push
# 上载到主机端
adb pull
# 查看驱动信息
adb shell cat /proc/kmsg
# 查看上层信息
adb logcat -v time 

```

如果需要刷新内核，则需要fastboot
```
# 进入fastboot模式
adb reboot bootloader
# 下发内核
fastboot flash boot <boot name>
# 重启内核
fastboot reboot
```

当然，如果支持Wifi，可以在开发板上下载一个`ADB Konnect`的APK，通过无线来adb是比较安逸的。
![](http://mint-blog.qiniudn.com/ld-env-adb-konnect.jpg)

注：需要对手机进行Root。


```
➜  adb connect <ip>
➜  adb shell
```

如果遇到 adb `error: insufficient permissions for device`错误如下，则需要将当前手机的vendor id手动过添加到规则表中，步骤如下：

a.连接手机，并 `lsusb` 来查看 待添加手机的vendor id。

![](http://mint-blog.qiniudn.com/ld-env-lsusb.png)

b.将手机添加到规则表

```shell
➜  sudo vi /etc/udev/rules.d/51-android.rules  
```

![](http://mint-blog.qiniudn.com/ld-env-idvendor-idproduct.jpg)

c.保存并重启 adb 服务

```shell
➜  chmod 777 /etc/udev/rules.d/51-android.rules
➜  adb kill-server
➜  adb start-server
➜  adb devices
```


## log 信息过滤

由于 adb 输出的 log 信息 非常多，需要将其过滤，只输出或者高亮我们需要的关键字。

其实，字符处理向来是 Linux 工具的强项，只不过都是 CLI 的，需要有一定的学习成本
。如 [grep](https://en.wikipedia.org/wiki/Grep)， [awk](https://en.wikipedia.org/wiki/AWK) 或者[colout](http://nojhan.github.io/colout/)。

### colout

> colout is a simple command to add colors to a text stream in your terminal.


在 Windows 下用过 [PowerCMD](http://www.powercmd.com/) 的都知道它有一个很简单粗暴的功能：**高亮关键字**。当然，多标签，分栏，可选复制文字，保存log文件和显示行号等等都是蛮不错的[功能](http://www.powercmd.com/features.php)，比自带的CMD强多了。

![](http://mint-blog.qiniudn.com/ld-env-FeatureHighlight.jpg)


a.其实使用 colout 单个关键字非常简单，比如将驱动信息中包含 `foo` 关键字高亮为红色。

```
➜  adb shell cat /proc/kmsg | colout "foo" red
```


b. 比如高亮包含并加粗关键字 `foo` 的所在行为红色。
```
➜  adb shell cat /proc/kmsg | colout "^.*foo.*$" red bold
```

c.再比如高亮多个关键字为不同的颜色

多关键字高亮可以参考本人在其 [Issue 77](https://github.com/nojhan/colout/issues/77) 上的提问答案：

可以使用 `|` 来连接

```
➜  adb shell cat /proc/kmsg | colout "foo" red | colout "bar" yellow
```


也可以使用更高效率的正则表达式方式

```
➜  adb shell cat /proc/kmsg  | colout "(foo).*(bar)" red,yellow
```


以上简单的使用可以应付绝大多数场合，如果想让 log 显示的更加酷炫，查询 `colout -h`来查看其他命令，也可以参考[官方的使用指南](http://nojhan.github.io/colout/)。

### grep



### awk




好了，整个驱动开发的环境搭建完成，可以开启驱动学习之路了。

[^1]: [Writing device drivers in Linux: A brief tutorial](http://www.freesoftwaremagazine.com/articles/drivers_linux)
