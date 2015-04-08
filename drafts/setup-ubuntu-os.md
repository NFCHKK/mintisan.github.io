

## 添加PD的安装包

切换到安装文件路径并安装
```

```



## 更新源

```
sudo gedit /etc/apt/sources.list
```

添加国内的一些14.10的源，速度相对比较快
```
#USTC
deb http://mirrors.ustc.edu.cn/ubuntu/ utopic main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu/ utopic-security main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu/ utopic-updates main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu/ utopic-proposed main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu/ utopic-backports main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ utopic main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ utopic-security main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ utopic-updates main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ utopic-proposed main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ utopic-backports main restricted universe multiverse


#163
deb http://mirrors.163.com/ubuntu/ utopic main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ utopic-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ utopic-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ utopic-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ utopic-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ utopic main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ utopic-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ utopic-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ utopic-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ utopic-backports main restricted universe multiverse

# ali
deb http://mirrors.aliyun.com/ubuntu/ utopic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ utopic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ utopic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ utopic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ utopic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ utopic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ utopic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ utopic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ utopic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ utopic-backports main restricted universe multiverse

#sohu
deb http://mirrors.sohu.com/ubuntu/ utopic main restricted universe multiverse
deb http://mirrors.sohu.com/ubuntu/ utopic-security main restricted universe multiverse
deb http://mirrors.sohu.com/ubuntu/ utopic-updates main restricted universe multiverse
deb http://mirrors.sohu.com/ubuntu/ utopic-proposed main restricted universe multiverse
deb http://mirrors.sohu.com/ubuntu/ utopic-backports main restricted universe multiverse
deb-src http://mirrors.sohu.com/ubuntu/ utopic main restricted universe multiverse
deb-src http://mirrors.sohu.com/ubuntu/ utopic-security main restricted universe multiverse
deb-src http://mirrors.sohu.com/ubuntu/ utopic-updates main restricted universe multiverse
deb-src http://mirrors.sohu.com/ubuntu/ utopic-proposed main restricted universe multiverse
deb-src http://mirrors.sohu.com/ubuntu/ utopic-backports main restricted universe multiverse
```
更新
```
sudo apt-get update
sudo apt-get upgrade
```



## 开发环境

### Sublime

### Gvim

### Git
```
sudo apt-get install git
```

### Go

```
sudo apt-get install gccgo-go
```

### Python

## 软件

- 7-zip
- sougou
- wps
- vlc
- extras
- chromium


## 参考资料
http://www.maketecheasier.com/installing-ubuntu-14-10-in-virtualbox/
http://muzi.info/2014/2393/7-things-ubuntu-14-10.html