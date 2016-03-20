# TestDisk恢复DiskPart清除的数据
能看到这篇博文，说明你刚刚很可能执行`clean`了一个词盘，然后发现坑爹的微软，连个确认都没有就直接执行了，然后输出`DiskPart 成功地清除了磁盘。`，然后你回头一看，发现，咦，好像`select`错了磁盘，然后整个人都懵逼了。

这时候还是很幸运的，因为[微软](https://technet.microsoft.com/zh-cn/library/Cc766465(v=WS.10).aspx)说了，`clean`只是把MBR或者GPT修改了，真实的数据还是保留在硬盘上的。

> 从选中的磁盘中删除所有分区或卷格式。在主启动记录 (MBR) 磁盘中，只覆盖 MBR 分区信息和隐藏的扇区信息。在 GUID 分区表 (GPT) 磁盘上，会覆盖 GPT 分区信息，其中包括保护性 MBR。不存在任何隐藏扇区信息。

（啥，`clean`之后又格式化了，可能你需要试试[Renee Undeleter](http://www.reneelab.net/usb-format-rescure.html)或者[误删除或误格式化后的文件恢复](http://www.diskgenius.cn/help/restorefile.php)；后来又有新的数据覆盖过了，那就这篇文章就帮不了你了，赶快继续 Google 吧。。。）

可以按照如下的过程来让数据回到资源管理器中吧。

1. 假如有一个 `H`盘，里面有数据如下：
![U盘中的原始数据](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-5895513e0ce409b0.png)
2. 然后按照如下的步骤，用diskpart来把盘子清一清（为什么需要diskpart而用格式化是因为这家伙比格式化更彻底，可以把之前安装启动盘的MBR给删除，恢复出厂之后的状态。[U盘做启动盘后，如何恢复原始容量](http://blog.sina.com.cn/s/blog_68f6e8a901014cvs.html)）
  1. `Win+R`启动命令行：`cmd` 
  2. 启动磁盘管理工具：`diskpart`
![diskpart](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-4cefc0dbba15be6d.png)
  3. 确定 U 盘的盘号：`list disk`
![看看有哪些盘](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-011ecd942c3182b1.png)
  4. 选择 U 盘：`select disk x`（选错了，，，）
![假如本来想选0的，结果选成1了](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-4bffe8680b27c5f8.png)
  5. 清楚所有数据，包括制作启动盘时的 MBR：`clean`
![clean结束](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-cda3bd9ff1040f0d.png)
  6. 重新新建简单卷：“我的电脑”，选择“管理”选项，之后选择“磁盘管理”，最后“右键新建简单卷”即可完成（＝＝）
  7. 这时候，H盘在资源管理器中已经找不到了，去“管理”可以看到如下“未分配”的H盘
![原来的U盘已经变成了未分配](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-1f4a7df0cb2f2926.png)
  8. 是时候祭出[TestDisk](http://www.cgsecurity.org/wiki/TestDisk)，下载完直接解压后，打开`testdisk_win.exe`，出现命令行对话框，选择`Create`回车
![testdisk_win.exe](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-d5bc5f734ef45064.png)
  9. 选择被`clean`掉的所在盘，并回车
![](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-98ac3650fda967e8.png)
  10. 选择 `Intel/PC partition`，回车（除非你知道自己当初选择了EFI，否则绝大数情况下都选第1个即可）
![](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-c93b47c327e9185a.png)
  11. 选择`Analyse`来让它找回失去的MBR
![Analyse](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-c03402036d8df8f2.png)
  12. 选择`  Quick Search`进行查找
  ![Quick Search](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-76bbcca4b8a66bbb.png)
  13. 回车选择找到的Sectors
![Select Partition](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-e9f61b42932f9399.png)
  14. 一般情况下，在`Quick Search`后，`Write`写回即可
![Write](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-f8c4a13582a9ed04.png)
  15. 当然，也可以选择`Deeper Search`来看看具体它能找到啥
![Deeper Search](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-1cc7dd1852ccc327.png)
![Deeper Search 2](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-6db241f8d1a3d1bf.png)
![Deeper Search 3](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-1f15f576d9da0e70.png)
  16. 在找完之后，选择`Y`将找到的分区表写回
![选择Y](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-3edd1d92cd490945.png)
![OK](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-c743f22cf85d2bd7.png)
  17. 写完之后，重新插拔U盘，就可以看到U盘的数据又回来了
![重新插拔即可看到，失而复得了](http://mint-blog.qiniudn.com/testdisk-diskpart-26219-8bfc0104c857e691.png)


## 启动盘工具

- [LinuxLive USB Creator](http://www.linuxliveusb.com/): Persistence
- [UNetbootin](https://unetbootin.github.io/)
- [Universal USB Installer](http://www.pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/)
- [Rufus](https://rufus.akeo.ie/): Fast
- [Windows USB/DVD Download Tool
](http://wudt.codeplex.com/)
- [RMPrepUSB](http://www.rmprepusb.com/)
- [Mac Linux USB Loader](https://sevenbits.github.io/Mac-Linux-USB-Loader/): Persistence
- [WinSetupFromUSB](http://www.winsetupfromusb.com/): multiboot
- [ISO to USB](http://www.isotousb.com/): Only Windows Series
- [UltraISO](https://www.ezbsystems.com/ultraiso/)
- [老毛桃](http://www.laomaotao.org/)
- [大白菜](http://www.dabaicai.com/)
- [通用PE](http://www.tongyongpe.com/)
- [U 大师](http://www.udashi.com/)



## 参考

- [diskpart clean后恢复硬盘数据](http://blchen.com/data-recover-after-diskpart-clean/)
- [DiskPart 命令行选项](https://technet.microsoft.com/zh-cn/library/Cc766465(v=WS.10).aspx)
- [如何恢复遭diskpart clean清除的硬盘分区？](http://bbs.csdn.net/topics/190071473)
- [TestDisk Step By Step](http://www.cgsecurity.org/wiki/TestDisk_Step_By_Step#mw-head)
- [Master boot record](https://www.wikiwand.com/en/Master_boot_record)
- [GUID Partition Table](https://www.wikiwand.com/en/GUID_Partition_Table)
- [Basic Input/Output System](https://www.wikiwand.com/en/BIOS)
- [Unified Extensible Firmware Interface](https://www.wikiwand.com/en/Unified_Extensible_Firmware_Interface)
- [What’s the Difference Between GPT and MBR When Partitioning a Drive?](http://www.howtogeek.com/193669/whats-the-difference-between-gpt-and-mbr-when-partitioning-a-drive/)
- [Lesson 4: Understanding Hard Drive Partitioning with Disk Management](http://www.howtogeek.com/school/using-windows-admin-tools-like-a-pro/lesson4/)
- [在U盘上安装Ubuntu(Surface Pro3)](https://thatblstudio.github.io/blog/how-to-build-an-usb-Ubuntu-on-surface-pro-3/)
- [How to Install FULL Ubuntu on a Flash Drive](https://www.youtube.com/watch?v=fLYBXOVn6ow)
- [How to Create Persistent Bootable Linux USB Pen Drive](https://www.youtube.com/watch?v=NLCzGtHJXjU)
