

# [Google Cloud Platform](https://cloud.google.com/) Note

[TOC]


Reqirement: a PC or laptop which can acess Google.

## Shadowsock Server for GFW

1.Create Project

![](http://mint-blog.qiniudn.com/132505.jpg)


2.Compute Engine -> VM instances -> Create

![](http://mint-blog.qiniudn.com/132805.jpg)


3.Create an instance

just select the cheapest is enough

![](http://mint-blog.qiniudn.com/133138.jpg)

so as to be used as a server, static IP addresss is something needed.

![](http://mint-blog.qiniudn.com/133246.jpg)

4.Setup Shadowsocks

4.1 Open SSH Web Shell:

![](http://mint-blog.qiniudn.com/133752.jpg)

4.2 Setup pip & shadowsocks packge
```
sudo apt-get install python-pip python-m2crypto -y
sudo pip install shadowsocks
```

4.3 Create a configuration file

it's a json type file
```
sudo vim /etc/shadowsocks.json
```

and copy the text below into it
```
{
  "server":"0.0.0.0",
  "server_port":8000,
  "local_port":1080,
  "password":"your_passwd",
  "timeout":600,
  "method":"aes-256-cfb"
}
```

4.4 start ss server 

```
fovwin@shadowsocks:~$ sudo ssserver -c /etc/shadowsocks.json -d start
INFO: loading config from /etc/shadowsocks.json
2017-03-11 13:46:04 INFO     loading libcrypto from libcrypto.so.1.0.0
started
```

and see its port and log to check it works or not

```
fovwin@shadowsocks:~$ netstat -tuplen
(No info could be read for "-p": geteuid()=1001 but you should be root.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       User       Inode       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      0          9796        -               
tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      0          17287       -               
tcp6       0      0 :::22                   :::*                    LISTEN      0          9805        -               
udp        0      0 0.0.0.0:68              0.0.0.0:*                           0          9014        -               
udp        0      0 10.140.0.2:123          0.0.0.0:*                           0          9556        -               
udp        0      0 127.0.0.1:123           0.0.0.0:*                           0          9555        -               
udp        0      0 0.0.0.0:123             0.0.0.0:*                           0          9546        -               
udp        0      0 0.0.0.0:49287           0.0.0.0:*                           0          8983        -               
udp        0      0 0.0.0.0:8000            0.0.0.0:*                           0          17288       -               
udp6       0      0 :::45488                :::*                                0          8984        -               
udp6       0      0 ::1:123                 :::*                                0          9557        -               
udp6       0      0 :::123                  :::*                                0          9547        -               
fovwin@shadowsocks:~$ cat /var/log/shadowsocks.log
2017-03-11 13:46:04 INFO     starting server at 0.0.0.0:8000
```

or if we want to stop ss server
```
sudo ssserver -d stop
```

or maybe want to rereset ss server after modifying the configuration file

```
sudo ssserver -c /etc/shadowsocks.json -d restart
```

or maybe we want to automatically start on system boot

add text below to `/etc/rc.local` above `exit 0` line:

```
/usr/bin/python /usr/local/bin/ssserver -c /etc/shadowsocks.json -d start
```


4.5 enbale firewall rules

![](http://mint-blog.qiniudn.com/135653.jpg)

and check ss's log, done!

```
fovwin@shadowsocks:~$ cat /var/log/shadowsocks.log
2017-03-11 13:46:04 INFO     starting server at 0.0.0.0:8000
2017-03-11 13:52:16 INFO     starting server at 0.0.0.0:8000
fovwin@shadowsocks:~$ cat /var/log/shadowsocks.log
2017-03-11 13:46:04 INFO     starting server at 0.0.0.0:8000
2017-03-11 13:52:16 INFO     starting server at 0.0.0.0:8000
2017-03-11 13:57:43 INFO     connecting www.farbox.com:80 from 116.24.99.79:36776
2017-03-11 13:57:43 INFO     connecting www.google.com.hk:80 from 116.24.99.79:36777
2017-03-11 13:57:43 INFO     connecting www.google.com.hk:443 from 116.24.99.79:36778
2017-03-11 13:57:44 INFO     connecting fonts.googleapis.com:443 from 116.24.99.79:36779
2017-03-11 13:57:44 INFO     connecting www.google.com.hk:443 from 116.24.99.79:36780
2017-03-11 13:57:45 INFO     connecting www.google.com:443 from 116.24.99.79:36781
2017-03-11 13:57:45 INFO     connecting www.google.com.hk:443 from 116.24.99.79:36782
2017-03-11 13:57:45 INFO     connecting ssl.gstatic.com:443 from 116.24.99.79:36783
fovwin@shadowsocks:~$ 
```


Note: it should be fine now, but if can't be accessed, just enable firewall rule manually as beloe:
```
sudo iptables -I INPUT -p tcp --dport 8000 -j ACCEPT
```


## Blog with Web Server

1.Setup Apache Web Server
```
sudo apt-get update && sudo apt-get install apache2 -y
```

and write a simple HTML at its root directory

```
echo '<!doctype html><html><body><h1>Hello World!</h1></body></html>' | sudo tee /var/www/html/index.html
```


2.Allow HTTP traffic
![](http://mint-blog.qiniudn.com/150349.jpg)

3.just see it


![](http://mint-blog.qiniudn.com/150611.jpg)

4.SSH GCP

Compute Engine -> Metadata -> SSH Key

![](http://mint-blog.qiniudn.com/151129.jpg)

**Note**: replace your own email with Google username email, or you will be permission denied[public key]

```
Invalid key. Required format: <protocol> <key-blob> <username@example.com> or <protocol> <key-blob> google-ssh {"userName":"<username@example.com>","expireOn":"<date>"}
```

then ss to GCP:
```
ssh user-name@ip-address
```

## Reference

- [Setup Your Own Shadowsocks Server On Debian, Ubuntu, CentOS](https://www.linuxbabe.com/linux-server/setup-your-own-shadowsocks-server-on-debian-ubuntu-centos)
- [Quickstart Using a Linux VM](https://cloud.google.com/compute/docs/quickstart-linux)
- [Running a basic Apache web server](https://cloud.google.com/compute/docs/tutorials/basic-webserver-apache)
- [Connecting to Linux Instances](https://cloud.google.com/compute/docs/instances/connecting-to-instance)

