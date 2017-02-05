
# Platform IO 上手

[TOC]


## mbed 篇

### 准备材料

- 支持 mbed 的开发板子一块
- mbed 开发者账号一个
- 可连接互联网的机子一台（Windows/Linux/ macOS）
- Atom 及 Platform IO 开发环境 
- 各种外设硬件若干

### 新建工程

待环境安装完成，按照如下步骤可新建一个跑马灯的工程：

![](http://mint-blog.qiniudn.com/platformio_tutorial_create_new.png)

![](http://mint-blog.qiniudn.com/platformio_tutorial_create_blink_project_0.png)

![](http://mint-blog.qiniudn.com/platformio_tutorial_create_blink_project.png)


![](http://mint-blog.qiniudn.com/platformio_tutorial_create_blink_project_sucess_hint.png)


点击 `Process` 之后，Platform IO 会自动根据所选择的平台下载编译环境和所需要的库，如此处分别为 `arm-gcc` 和 `mbed` 库文件，将其保存到 `~/.platformio` 文件夹下:

```
➜  .platformio tree -d . -L 3
.
└── packages
    ├── framework-mbed
    │   ├── libs
    │   └── variant
    ├── ldscripts
    ├── tool-scons
    │   ├── engine
    │   └── script
    ├── tool-stlink
    └── toolchain-gccarmnoneeabi
        ├── arm-none-eabi
        ├── bin
        ├── lib
        └── share
```

然后，新建工程目录结构如下：

```
➜  blink tree .
.
├── lib
│   └── readme.txt
├── platformio.ini
└── src
```

此时，在 `src` 中添加 `main.cpp`：

```
#include "mbed.h"

DigitalOut myled(LED1);

int main() {
        while(1) {
                myled = 1; // LED is ON
                wait(0.2); // 200 ms
                myled = 0; // LED is OFF
                wait(1.0); // 1 sec
        }
}
```

编译之后，显示如下错误，但成功生成可执行文件：

![](http://mint-blog.qiniudn.com/platformio_tutorial_compile_error_stm32f4xx_hal_gpio_not_found.png)

放狗一搜，同样有人碰到[此问题](https://github.com/platformio/platformio-core/issues/621)，需要重新建立工程索引`PlatformIO > Rebuild C/C++ Project Index (Autocomplete, Linter)`：

![](http://mint-blog.qiniudn.com/platformio_tutorial_rebuild_index.png)

重新编译后，完美通过~

![](http://mint-blog.qiniudn.com/platformio_tutorial_compile_sucess_after_reindex.png)

点击上传可以将编译完成的`elf`上传到板子上，值得一提的是 Platform IO会自动寻找是否有支持 mbed 的板子，并将程序上传到板子上。

![](http://mint-blog.qiniudn.com/platformio_tutorial_auto_upload.png)

如果你不想 Platform IO 自己去找，也可以手动指定，修改 `platformio.ini`，增加`upload_port`板子的路径，如下：

```
#
# PlatformIO Project Configuration File
#
# Please make sure to read documentation with examples first
# http://docs.platformio.org/en/stable/projectconf.html
#
[env:nucleo_f401re]
platform = ststm32
framework = mbed
board = nucleo_f401re

upload_port = /Volumes/NUCLEO

```

注：在下载程序的过程中，还不小心遇到了`SWD error`的问题，重新插拔 USB 线后恢复正常。

新建工程可以通过菜单栏来，也可以直接手动新建如上的工程结构，然后编译的是否 Platform IO 同样会自动寻找依赖并安装，显示如下：

![](http://mint-blog.qiniudn.com/platformio_tutorial_auto_download_env.png)




### 例程

#### 基础例程

##### 串口

串口是调试的利器，特别在没有仿真器的时候。

在写串口模块程序前，先看看是否已经连接上，方法如下：`Platform IO`->`List Serial Ports`


![](http://mint-blog.qiniudn.com/platformio_tutorial_list_serial.png)

mbed 的串口程序非常简单，实例化一个 Serial 的实例即可，默认配置为波特率9600

```
#include "mbed.h"

//------------------------------------
// Hyperterminal configuration
// 9600 bauds, 8-bit data, no parity
//------------------------------------

Serial pc(SERIAL_TX, SERIAL_RX);

DigitalOut myled(LED1);

int main() {
        int i = 1;
        pc.printf("Hello World !\n");
        while(1) {
                wait(1);
                pc.printf("This program runs since %d seconds.\n", i++);
                myled = !myled;
        }
}
```

更新程序后，点击左侧的串口标志按钮，自动调出串口窗口如下：

![](http://mint-blog.qiniudn.com/platformio_tutorial_serial_default_config.png)

按照默认配置即可：

![](http://mint-blog.qiniudn.com/platformio_tutorial_serial_msg_show.png)

#### mbed-os

mbed-os 版本的跑马灯

```
#include "mbed.h"
#include "rtos.h"

/*
 * The stack size is defined in cmsis_os.h mainly dependent on the underlying toolchain and
 * the C standard library. For GCC, ARM_STD and IAR it is defined with a size of 2048 bytes
 * and for ARM_MICRO 512. Because of reduce RAM size some targets need a reduced stacksize.
 */
#if defined(TARGET_STM32L053R8) || defined(TARGET_STM32L053C8)
#define STACK_SIZE DEFAULT_STACK_SIZE/4
#else
#define STACK_SIZE DEFAULT_STACK_SIZE
#endif

void print_char(char c = '*') {
        printf("%c", c);
        fflush(stdout);
}

DigitalOut led1(LED1);
DigitalOut led2(LED2);

void led2_thread(void const *argument) {
        while (true) {
                led2 = !led2;
                Thread::wait(1000);
                print_char();
        }
}

int main() {
        Thread thread(led2_thread, NULL, osPriorityNormal, STACK_SIZE);

        while (true) {
                led1 = !led1;
                Thread::wait(500);
        }
}
```

#### 外设库

![](http://mint-blog.qiniudn.com/platformio_tutorial_install_pkg_118.png)

### 参考链接


## [NodeMCU](http://nodemcu.com/) 篇

### 安装驱动

由于购买时，那时还不晓得 NodeMCU 还有版本的不同，结果商家发的老版本的 v0.9 版本的，同学们购买时需要擦亮眼睛了。如下图中，左侧的是 v0.9 （有蓝色的和黄色的区别），右侧的是 v1.0 版本的：

![](http://mint-blog.qiniudn.com/nodemcu-v0.9-vs-nodemcu-v1.0.jpg)

注：其硬件上的主要区别在于，前者的 USB-Serial 采用 CH340；后者采用 CP2102 。买新不买旧么。

macOS EI Caption 及以上的驱动，请下载[此处](https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver)。

安装后重启就可以找到如下的 USB 转串口的端口：

![](http://mint-blog.qiniudn.com/nodemcu-ch34h-usb-serial.png)

### 新建工程

新建一个跑马灯工程如下，初次使用时可能要等一会。

![](http://mint-blog.qiniudn.com/nodemcu-board-setting.png)

由于 NodeMCU 是 Arduino 兼容的，所以可以直接使用按照 Arduino 的方式来对 NodeMCU 进行直接操作。

![](http://mint-blog.qiniudn.com/nodemcu-v0.9-pinout.png)

Platform 官方也提供了一些例子，但是[官方代码](https://github.com/platformio/platformio-examples/blob/develop/espressif/esp32-arduino-blink/src/Blink.cpp)好像是针对的 `v1.0` 的，用的 13 pin，但 `v0.9` 的 LED-Pin 引脚为16，不过对 Arduino 来说都是 `D0`，所以修改后兼容性更好了，修改后如下所示：

```
/*
 * Blink
 * Turns on an LED on for one second,
 * then off for one second, repeatedly.
 */

#include <Arduino.h>

#define LED_BUILTIN D0

void setup()
{
  // initialize LED digital pin as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
  // turn the LED on (HIGH is the voltage level)
  digitalWrite(LED_BUILTIN, HIGH);
  // wait for a second
  delay(1000);
  // turn the LED off by making the voltage LOW
  digitalWrite(LED_BUILTIN, LOW);
   // wait for a second
  delay(1000);
}
```

编译提示如下：

![](http://mint-blog.qiniudn.com/nodemcu-compile-success.png)

然后上传到板子上：

![](http://mint-blog.qiniudn.com/nodemcu-upload-success.png)

板子上的小蓝灯就闪起来了。

### 例程

#### 串口

直接上代码吧：

```
#include <Arduino.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
  delay(1000);
  Serial.println("Hello World!");
}
```

编译上传成功之后，需要先设置下串口如下：

![](http://mint-blog.qiniudn.com/nodemcu-serial-setting.png)


然后，打开串口窗口显示如下：

![](http://mint-blog.qiniudn.com/nodemcu-helloworld.png)

#### HomeKit

安装 [Homebridge](https://github.com/nfarina/homebridge) 和 [homebridge-http](https://github.com/rudders/homebridge-http)：前者是模拟 HomeKit API 的一个模拟器，后者是将开关信息放在 URL 中的方式。

注：在这里，你可能会遇到无法下载，此时你需要翻墙；或者下载速度极其缓慢，此时你需要设置国内的 NPM 源；或者你可能会遇到版本过低，亦或是版本不兼容的问题，此时你需要去其 GiHub Issue 或者 Google 搜搜看。

惯例，用 `--version` 来确认是否安装成功。

```
➜  ~ homebridge --version
0.4.16
➜  ~ 
```

然后，设置 `~/.homebridge/config.json`如下：

```
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:30",
        "port": 51826,
        "pin": "031-45-154"
    },

    "description": "Config file with just lockitron",

    "accessories": [
        {
            "accessory": "Http",
            "name": "NodeMCU1.0 LED",
            "http_method": "GET",
            "on_url":      "http://192.168.1.122/ledon",
            "off_url":     "http://192.168.1.122/ledoff",
            "service": "Light"
       },
        {
            "accessory": "Http",
            "name": "NodeMCU0.9 LED",
            "http_method": "GET",
            "on_url":      "http://192.168.1.120/ledon",
            "off_url":     "http://192.168.1.120/ledoff",
            "service": "Light"
       }
    ]
}
```

注：其中的`http://192.168.1.120`需自行替换为实际的局域网 IP 地址；这里放两个是因为我有两块板子，实际按需放就好了。

最后，启动 `homebridge`  就可以了：

```
➜  ~ homebridge 
[1/2/2017, 9:00:20 PM] Loaded plugin: homebridge-http
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-http.Http'
[1/2/2017, 9:00:20 PM] ---
[1/2/2017, 9:00:20 PM] Loaded plugin: homebridge-httptemperaturehumidity
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-httptemperaturehumidity.HttpTemphum'
[1/2/2017, 9:00:20 PM] ---
[1/2/2017, 9:00:20 PM] Loaded plugin: homebridge-legacy-plugins
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.AD2USB'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.Carwings'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.ELKM1'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.FileSensor'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.GenericRS232Device'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.HomeMatic'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.HomeMaticThermo'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.HomeMaticWindow'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.HttpGarageDoorOpener'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.HttpHygrometer'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.HttpThermometer'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.Tesla'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.X10'
[1/2/2017, 9:00:20 PM] Registering accessory 'homebridge-legacy-plugins.mpdclient'
[1/2/2017, 9:00:20 PM] Registering platform 'homebridge-legacy-plugins.Domoticz'
[1/2/2017, 9:00:20 PM] Registering platform 'homebridge-legacy-plugins.HomeAssistant'
[1/2/2017, 9:00:20 PM] Registering platform 'homebridge-legacy-plugins.HomeSeer'
[1/2/2017, 9:00:20 PM] Registering platform 'homebridge-legacy-plugins.ISY'
[1/2/2017, 9:00:20 PM] Registering platform 'homebridge-legacy-plugins.LIFx'
[1/2/2017, 9:00:20 PM] Registering platform 'homebridge-legacy-plugins.SmartThings'
[1/2/2017, 9:00:20 PM] Registering platform 'homebridge-legacy-plugins.TelldusLive'
[1/2/2017, 9:00:20 PM] Registering platform 'homebridge-legacy-plugins.ZWayServer'
[1/2/2017, 9:00:20 PM] ---
[1/2/2017, 9:00:21 PM] Loaded plugin: homebridge-lockitron
[1/2/2017, 9:00:21 PM] Registering accessory 'homebridge-lockitron.Lockitron'
[1/2/2017, 9:00:21 PM] ---
[1/2/2017, 9:00:21 PM] Loaded plugin: homebridge-mqttswitch
[1/2/2017, 9:00:21 PM] Registering accessory 'homebridge-mqttswitch.mqttswitch'
[1/2/2017, 9:00:21 PM] ---
[1/2/2017, 9:00:21 PM] Loaded config.json with 2 accessories and 0 platforms.
[1/2/2017, 9:00:21 PM] ---
[1/2/2017, 9:00:21 PM] Loading 2 accessories...
[1/2/2017, 9:00:21 PM] [NodeMCU1.0 LED] Initializing Http accessory...
[1/2/2017, 9:00:21 PM] [NodeMCU0.9 LED] Initializing Http accessory...
Scan this code with your HomeKit App on your iOS device to pair with Homebridge:
                       
    ┌────────────┐     
    │ 031-45-154 │     
    └────────────┘     
                       
[1/2/2017, 9:00:21 PM] Homebridge is running on port 51826.
```

此时，打开 iPhone 或者 iPad （iOS10+）的 Home 应用，就会显示如下的两个按钮：

![](http://mint-blog.qiniudn.com/platform_tutorial_homebridge_home.png)

至于，NodeMCU 端的代码，在官方版本的 [WebServer](https://github.com/platformio/platformio-examples/blob/develop/espressif/esp8266-webserver/src/HelloServer.ino)基础上进行如下稍微修改即可：

```

void led_on(void) {
        digitalWrite(led, 0);
        server.send(200, "text/plain", "on");
}

void led_off(void) {
        digitalWrite(led, 1);
        server.send(200, "text/plain", "off");
}

  ...
void setup(void){
        server.on("/", handleRoot);

        // for HomkeKit post
        server.on("/ledon", led_on);
        server.on("/ledoff",led_off);
      }
  ...
```

编译，下载后，就可以通过 Home 界面的按钮来进行控制了。

![](http://mint-blog.qiniudn.com/platform_tutorial_homekit_switch.GIF)

终端输出的信息如下：

```
                       
    ┌────────────┐     
    │ 031-45-154 │     
    └────────────┘     
                       
[1/2/2017, 9:32:12 PM] Homebridge is running on port 51826.
[1/2/2017, 9:32:20 PM] [NodeMCU1.0 LED] Setting power state to on
[1/2/2017, 9:32:20 PM] [NodeMCU1.0 LED] HTTP set power function succeeded!


[1/2/2017, 9:32:23 PM] [NodeMCU1.0 LED] Setting power state to off
[1/2/2017, 9:32:24 PM] [NodeMCU1.0 LED] HTTP set power function succeeded!
```

### 更新固件

### 参考链接

- [platformio-examples-espressif](https://github.com/platformio/platformio-examples/tree/develop/espressif)
- [CH340G CH34G CH34X Mac OS X driver](https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver)
- [CH340 CH341 serial adapters fix for El Capitan OS X](https://tzapu.com/making-ch340-ch341-serial-adapters-work-under-el-capitan-os-x/)
- [Getting Started on OSX](https://github.com/nodemcu/nodemcu-devkit/wiki/Getting-Started-on-OSX)
- [GETTING STARTED WITH PLATFORMIO AND ESP8266 NODEMCU](https://www.losant.com/blog/getting-started-with-platformio-esp8266-nodemcu)
- [nodemcu-firmware](https://github.com/nodemcu/nodemcu-firmware): A Lua based firmware for ESP8266 WiFi SOC
- [Getting Started: NodeMCU ESP8266 Development Board](http://learn.acrobotic.com/tutorials/post/esp8266-getting-started)
- [Getting Started with NodeMCU Board Powered by ESP8266 WiSoC](http://www.cnx-software.com/2015/10/29/getting-started-with-nodemcu-board-powered-by-esp8266-wisoc/)


## Arduino 篇


![from https://lynx2015.files.wordpress.com/2015/08/arduino-mega-pinout-diagram.png](http://mint-blog.qiniudn.com/arduino-mega-2560-pinout-diagram.png)

![](http://mint-blog.qiniudn.com/platformio_tutorial_auto_download_env_arduino.png)




### 参考链接

- [Arduino MEGA 2560 & Genuino MEGA 2560](https://www.arduino.cc/en/Main/arduinoBoardMega2560)
- [Start with Arduino Mega 2560](http://www.arduino.org/learning/getting-started/getting-started-with-arduino-mega-2560)
- [ATmega2560 datasheet](http://www.atmel.com/Images/Atmel-2549-8-bit-AVR-Microcontroller-ATmega640-1280-1281-2560-2561_datasheet.pdf)


## 树莓派篇


## 总结

### 优点：集大成者

- 可以选择自己喜欢的编辑器，然后配置下插件环境即可，是原版在线和 IDE 的良好替代品，得益于 Atom 的好用和 Clang 的强大，比如
    + 好用的自动代码补全和定义跳转
    + 集成串口窗口，直接查看
    + 友好的错误和警告提示
- 同平台跨板子的支持很好，可以通过 `platformio.ini` 配置好，然后编译即可完成， Platform IO 就会自动下载相关依赖，这也得益于 Arduino 和 mbed 的良好抽象架构
- 方便使用各种库，包括 Arduino 和 mbed


## 不足

- 无法在线单步调试，只能通过串口打印来
- 需要单片机板子支持 Arduino 或者 mbed


另外，Platform IO 和 mbed-os 都处在快速的迭代过程中（既是好事，也是不足），碰到问题直接放狗搜索，然后一般都会定位到官方的社区或者 GitHub Issue 中找到类似的解决方案。

不过，目前蛮多的解决方案也是比较粗暴的，比如遇到一个`NUCLEO_F401RE.eix not found`的问题，找到[类似](https://community.platformio.org/t/enabling-nucleo-f401re-in-platformio/670)，维护者的解决方案是直接把 Platform 的配置目录给全部删除，然后再重新下载。










