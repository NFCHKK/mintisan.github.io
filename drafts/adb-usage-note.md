# ADB 使用小记

## 概述


## 命令

adb devices
adb remount
adb push libhal.so /system/lib/
adb push driver_test /system/driver_test
adb shell chmod 777 /system/driver_test
adb push ESD_failed_fw.BIN /system/firmware_cur.bin
adb shell /system/driver_test -u /system/firmware_cur.bin
adb install FHSS.apk

    # 重新加载adb
    $ adb remount 
    # 将配置下发到手机系统目录下
    $ adb push test.cfg /system/gf66xx.cfg 
    # 进入adb shell
    $ adb shell
    # 删除test文件夹的任何东西
    $ rm -rf /data/system/test/*
    # 退出adb shell，如果处于adb shell模式下，那么现在处于windows的命令行模式下
    $ exit


adb reboot fastboot
fastboot flash kernel ./zImage
fastboot flash dtb ./m76.itb
fastboot reboot

## 注意


## 参考资料
- [Installing and using ADB from Mozilla](https://developer.mozilla.org/en-US/Firefox_OS/Debugging/Installing_ADB)
- [The Easiest Way to Install Android's ADB and Fastboot Tools on Any OS](http://lifehacker.com/the-easiest-way-to-install-androids-adb-and-fastboot-to-1586992378)
- [15 seconds ADB Installer v1.4.2](http://forum.xda-developers.com/showthread.php?t=2588979)
- http://wiki.cyanogenmod.org/w/Doc:_adb_intro/zh-cn
- http://developer.android.com/tools/help/adb.html
- http://adbdriver.com/
- http://adbshell.com/