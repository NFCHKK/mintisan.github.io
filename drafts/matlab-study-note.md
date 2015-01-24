# Matlab 学习小记


## 快捷键
- `Ctrl + R` ：注释
- `Ctrl + T` ：取消注释



## 命令

### 
    clc;        % 清除命令行窗口
    clear;      % 清空变量空间

### 元素选取

    a(i,:)=[]   % 删除a矩阵的第i行
    a(:,j)=[]   % 删除a矩阵的第j列


    a(i,:)      % 取a矩阵的第i行元素
    a(:,j)      % 取a矩阵的第j列元素


### 随机数

    R = unidrnd(N);     % 产生一个最大值为N的随机正整数R，R为1到N之间
    R = randperm(N)     % 产生1~N的不重复的数序列


### 最值查找

    min_data = min(array);
    max_data = max(array);


### 矩阵均值

    mean_data = mean(mean(matrix));

### 画图

#### 多项式拟合

    a=[2.54187,2.59806,2.63624,2.71045,2.73394,2.74364,2.80134,2.8384,2.9201,2.92702,2.95163];                 %点纵坐标
    b=10:2:30;                      %点横坐标
    t=polyfit(b,a,2);               %求出二次多项式的系数
    r=linspace(10,30,500);          %选定拟合后的曲线采样点为500
    w=polyval(t,r);                 %求出500各点对应的该二次曲线的函数值，赋予w
    plot(b,a,'ro',r,w);             %同时绘出数据点和拟合曲线

#### figure

    figure(1);
    surf(raw_data);

#### plot & subplot



### 文件数据

    I=imread('1.bmp');      % 读取图像灰度值读取图像灰度值
    raw_data = csvread('1.csv');       % 读取cvs文件数据
    [row col] = size(raw_data);             % 获取行列大小

将数据文件存放在某一个文件夹下

    data_folder = '.\data\';        % 数据路径
    file_name = {'raw_data.csv'};
    raw_data = csvread(strcat(file_folder,file_name{1}));  % 读取cvs文件数据
    [row col] = size(raw_data);             % 获取行列大小

### 整数取整
    fix(x)             % 即朝零方向取整
    floor(x)           % 朝无穷方向取整
    ceil(x)            % 朝正无穷大方向取整
    round(x)           % 四舍五入到最近的整数

### 模仿三木运算符

    f mmin-3 > m+1
        m_b = mmin-3;
    else
        m_b = m+1;
    end

    m_b=(mmin-3>m+1)*(mmin-3)+(mmin-3 <= m+1)*(m+1);


### 函数调用



