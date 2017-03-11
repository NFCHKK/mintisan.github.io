
# 树莓派环境设置

[TOC]

## IP 地址获取

一般网络使用自动分配 IP 地址，所以下一次登录后的树莓派 IP 可能发生变换，可以根据如下的计算机名字来寻找。

```
➜  ~ ping raspberrypi.local
PING raspberrypi.local (192.168.1.130): 56 data bytes
64 bytes from 192.168.1.130: icmp_seq=0 ttl=64 time=5.932 ms
64 bytes from 192.168.1.130: icmp_seq=1 ttl=64 time=6.181 ms
^C
--- raspberrypi.local ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 5.932/6.056/6.181/0.125 ms
```

注：也可以通过 [nmap](http://raspberrypi.stackexchange.com/questions/12440/ssh-into-raspberry-pi-without-knowing-ip-address) 或者 [PiFinder](http://ivanx.com/raspberrypi/) 来寻找。

## SSH 连接

```
➜  ~ ssh pi@192.168.1.130
pi@192.168.1.130's password: 

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sun Feb  5 15:33:35 2017 from 192.168.1.102
➜  ~ pwd
/home/pi
➜  ~ exit
Connection to 192.168.1.130 closed.
```


## 屏幕共享

树莓派端安装并启动 VNC Server

```
sudo apt-get install tightvncserver
vncserver :1 -geometry 1280x720 -depth 24
```

本地启动 VNC Viewer，并输入树莓派的服务器地址

![](http://mint-blog.qiniudn.com/raspberry-pi-vnc-viewer-server.png)

注：后面带个 **1**。

**locale 设置问题**:


```
➜  ~ vncserver :1 -geometry 1280x720 -depth 24
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
    LANGUAGE = "en_US.UTF-8",
    LC_ALL = "en.UTF-8",
    LC_CTYPE = "UTF-8",
    LANG = "en_US.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").

New 'X' desktop is raspberrypi:1

Starting applications specified in /home/pi/.vnc/xstartup
Log file is /home/pi/.vnc/raspberrypi:1.log
```

设置如下，并将其添加到 `.zshrc` 中去

```
➜ sudo export LANGUAGE=en_US.UTF-8
➜ sudo export LANG=en_US.UTF-8
➜ sudo export LC_ALL=en_US.UTF-8
➜ sudo locale-gen en_US.UTF-8
➜ sudo dpkg-reconfigure locales
```

![](http://mint-blog.qiniudn.com/raspberry-pi-locale-en-utf8.png)

**zsh 显示乱码问题**:

不知问啥，bash 无问题，oh-my-zsh 就由如下问题

![](http://mint-blog.qiniudn.com/raspberry-pi-locale-unset.png)


## 文件共享


**安装 `netatalk`**

```
sudo apt-get update
sudo apt-get install netatalk
```

注：如果更新较慢，可以更换为国内的[阿里源](http://mirrors.aliyun.com/help/raspbian)。

**启动，修改，停止**

```
## stop server
sudo /etc/init.d/netatalk stop

## config name
sudo nano /etc/netatalk/AppleVolumes.default

## start server
sudo /etc/init.d/netatalk start
```

**连接**

在 Finder 中打开 `Connect As...` 输入树莓派的账户和密码即可

![](http://mint-blog.qiniudn.com/raspberry-pi-netatalk-connect.png)

## 问题

1. 获取 Mac 地址
```
$ cat /sys/class/net/eth0/address
# 有线网卡地址
$ cat /sys/class/net/wlan0/address
# 无线网卡地址
# http://www.raspberrypi-spy.co.uk/2012/06/finding-the-mac-address-of-a-raspberry-pi/
$ sudo ifconfig
# 必须加 **sudo** 命令，否则找不到命令
$ sudo ip addr show
# 加 sudo 命令不是必须
# http://raspberrypi.stackexchange.com/questions/1409/easiest-way-to-show-my-ip-address
```

## 参考链接

- [Official RaspbianMirrors](http://www.raspbian.org/RaspbianMirrors)
- [Installing Raspbian on the Raspberry Pi & using SSH and VNC to remotely connect to the Raspberry Pi](http://hertaville.com/raspbian-raspberry-pi.html)
- [VNC Viewer for macOS](https://www.realvnc.com/download/viewer/macosx/)
- [How to share files between Mac OSX and Raspberry Pi](http://www.instructables.com/id/How-to-share-files-between-Mac-OSX-and-Raspberry-P/?ALLSTEPS)
- [How to fix Perl warning setting locale failed on Raspbian](http://daker.me/2014/10/how-to-fix-perl-warning-setting-locale-failed-in-raspbian.html)
