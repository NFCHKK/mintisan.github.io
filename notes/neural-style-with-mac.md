# 用深度学习实现自定义滤镜效果

[TOC]

> 嗯，其实就是利用了深度学习的特征提取来做的一个超级滤镜提取器，妈妈再也不用担心滤镜不够用了:D 
> 还有就是终于知道了一种让 Mac 在秒级时间内变成暖手宝的方法了-_-||

## 缘起

最近在微博上看到德国的学生用深度学习实现了一个可以将名画风格提取出来，并将其移植任何其他图片上的好玩的东东。

![](http://mint-blog.qiniudn.com/neural-style-comment.png)
![](http://mint-blog.qiniudn.com/neural-style-weibo.jpg)


## 实现

1.用论文名 [A Neural Algorithm of Artistic Style](http://arxiv.org/abs/1508.06576) 去 Google 一把，发现已经 [GitHub](https://github.com/jcjohnson/neural-style) 上已经有人实现出来了，太赞了

![](http://mint-blog.qiniudn.com/neural-style-google.png)

2.参考 Readme 的 Setup 小节，需要 [torch7](https://github.com/torch/torch7) 和 [loadcaffe](https://github.com/szagoruyko/loadcaffe) ，前者是一个用 Lua 写的机器学习的算法框架，特点是采用英伟达的 GPU 并行计算架构 [CUDA](https://developer.nvidia.com/cuda-zone)。（那就意味着用 CPU 来跑的话，那酸爽，实现作者说在他机子上相差个20倍，，，）

3.参考 [torch7 官网](http://torch.ch/docs/getting-started.html#_)的方法，在Mac OS X 和 Ubuntu 12+的系统上

```shell
# in a terminal, run the commands
curl -s https://raw.githubusercontent.com/torch/ezinstall/master/install-deps | bash
git clone https://github.com/torch/distro.git ~/torch --recursive
cd ~/torch; ./install.sh
```

然后，刷新下配置文件，让它们生效
```shell
# On Linux
source ~/.bashrc
# On OSX
source ~/.profile
```

如果想卸载 torch7 ，执行下面两条命令即可

```
cd ~/torch; ./clean.sh
rm -rf ~/torch
```

接下来需要安装 LoadCaffe 的依赖
```shell
# On Ubuntu
sudo apt-get install libprotobuf-dev protobuf-compiler
# On Mac
brew install protobuf
```

否则，如果直接执行 `luarocks install loadcaffe`，会出现 `Could NOT dinf PROTOBUF(missing: PROTOBUF_LIBRARY PROTOBUF_INCLUDE_DIR)`，如下图所示

![](http://mint-blog.qiniudn.com/neural-style-protobuf-error.png)


4.安装完以上两个库，CUDA 的可选的，需要采用 NVIDIA 的显卡，并且支持，暂时不用。最后，就是 clone [neural-style](https://github.com/jcjohnson/neural-style)并安装 VGG 模型库。
```shell
git clone git@github.com:jcjohnson/neural-style.git
cd neural-style
sh models/download_models.sh
```

5.然后就是用了，参考 [Usage](https://github.com/jcjohnson/neural-style#usage) 即可。如果未使用 GPU ,一定要在参数中加 **`gpu -1`**，否则会出现 [Error when running without CUDA: No LuaRocks module found for cutorch #14](https://github.com/jcjohnson/neural-style/issues/14) 错误。

下面是根据星空来重新生成桂林山水的图片和原图，还是蛮有魔性的。

<img src="http://mint-blog.qiniudn.com/neural-style-guilin-starry-night-style.png" width="500px">

<img src="http://mint-blog.qiniudn.com/neural-style-guilin-origin.jpg" width="500px">

6.如果显卡支持 CUDA，那么就需要下载 [CUDA](http://docs.nvidia.com/cuda/cuda-getting-started-guide-for-mac-os-x/)  和 [CUDNN](https://s3-eu-west-1.amazonaws.com/christopherbourez/public/cudnn-6.5-osx-v2.tgz)

然后就可以从 40 分钟，华丽变成 2 分钟了，，，
