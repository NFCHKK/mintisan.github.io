# 一个最具性价比的启发式优化算法的实现

[TOC]

**启发式优化算法**，是属于优化算法的一种，所谓优化算法，即寻找最优解的过程即为优化的过程。最常用的优化算法当属牛顿的梯度下降法，每次沿着梯度下降最快的方向前进，就会找到一个“最优解”，但是这个“最优解”是局部的，牛顿的梯度下降法没有**全局寻优**的能力，所以启发式优化算法就来了。

那么启发式优化算法是不是每一次都能找到最优的解呢？当然不是了，怎么会有那么强大的算法，但是可以**以极大的概率找到全局最优解**，也就是说我不能保证每次找到的都是全局最优的，但是极有可能是，那么你需不需要试试呢。

那么其全局寻优的能力来自哪里呢？
1. 随即因子：启发式优化算法每一次都是随机的，也就是说这一次无法确定下一次，但是我们要相信大方向是朝着最优解前进的，即使期间可能出现更坏的解。（什么真随机啊，伪随机啊，随便上）
2. 搜索策略：启发式这个词代表着`meta-`前缀的意思，也就是设计算法的之上的思想，就目前来看的这些思想，也就是我们的搜索策略大都来自于我们的大自然，如遗传算法，人工蚁群算法，人工蜂群算法等等。

如果以上两个方面定下来的话，一个启发式算法的主题久定下来了。接下来就是赋予其中参数的意义，然后加上一些参数的自适应算法啊，与其他的优化算法结合结合啊，就可以看到我们的曲线会陡峭一点，然后就可以发文章了～（走远了，--|）

本处采用最简单的均匀随机分布，每次选取随机个体的随机维度进行更新，然后择优选择。
1. 个体：不是一般启发式都是来自于大自然么，比如蚂蚁，那么一个个个体在搜索空间寻找最优解就等价于让蚂蚁们去三维空间去寻找两点之间的最短距离。
2. 维度：就是我们求得解事(x),(x,y)，还是(x,y,...,z)。

好了，下面采用C语言和Python语言来实现一个简单高效的启发式优化算法（HO），比较两者方式的差异和优劣。

## Python实现篇

```python

import random as r
# -*- coding: utf-8 -*-

N = 1000	# 最大迭代次数
Dim = 3 	# 搜索维度
Num = 5 	# 种群个数
LB = -100	# 下界
UB = 100	# 上界

# 测试函数
def get_fit(x):
	tmp = 0
	for i in range(0,Dim):
		tmp += (x[i] - 0.1*i)*(x[i] - 0.1*i);
	return tmp

# 个体变量
sol = [[0 for col in range(Dim)] for row in range(Num)]
fit = [0 for col in range(Num)]

# 1. 初始化
for i in range(0,Num):
	for j in range(0,Dim):
		sol[i][j] = r.uniform(LB, UB)
	fit[i] = get_fit(sol[i])

# 2. 进行迭代
n = 0
while n < N:

	# 2.1 select random particles
	r0  = r.randint(0, Num-1)		# 随即个体i
	r1 = r.randint(0, Num-1)		# 随机个体r0（不同于i）
	while r0 == r1:
		r1 = r.randint(0, Num-1)
	rj = r.randint(0, Dim-1)			# 随即维度j

	# 2.2 generate new_sol particle from sol via slice
	new_sol = sol[r0][:]
	new_sol[rj] = sol[r0][rj] + r.uniform(-1, 1)*(sol[r0][rj] - sol[r1][rj])

	# 2.3 greedy select
	if get_fit(new_sol) < get_fit(sol[r0]):
		for j in range(0,Dim):
			sol[r0][j] = new_sol[j]
		fit[r0] = get_fit(new_sol)

	n += 1


# 3. 结果输出
gb = 0		# 最小是硬度值下标
for i in range(1,Num):
	if fit[gb] > fit[i]:
		gb = i
print("=====================================")
print(gb)
print(sol[gb])
print(fit[gb])
print("=====================================")


```
**注意**：如果采用的Python3.3则需要添加`# -*- coding: utf-8 -*-`，即本源文件中的编码申明，
否则不识别中文，会出现`SyntaxError: Non-ASCII character '\xe6' in file D:\workplace\python\SE-DE.py on line 4, but no encoding declared; see http://www.python.org/peps/pep-0263.html for details`的错误。但是在2.7中无须申明也可执行，为了规范，还是统一加上为好。

**结果**：还是能比较快的找到最优解的。
```
=====================================
0
[-1.9321427619522523e-09, 0.10000000845157161, 0.19999968561863254]
9.89108064485e-14
=====================================
[Finished in 0.1s]
```

## C实现篇

```c

#include "stdio.h"
#include "stdlib.h"
#include "time.h"

#define PI			3.1415926535897932384626433832795029
#define E			2.7182818284590452353602874713526625
#define RAND			((double)rand()/((double)RAND_MAX+1))
#define RAND1			((RAND-0.5)*2)

#define N  	1000	    // 最大迭代次数
#define Dim  	3 	    // 搜索维度
#define Num  	5 	    // 种群个数
#define LB  	-100        // 下界
#define UB  	100	    // 上界

//测试函数
double get_fit(double x[])
{
	double tmp = 0;
	int j;
	for (j= 0; j< Dim; ++j)
	{
		tmp += (x[j] - 0.1*j)*(x[j] - 0.1*j);
	}

	return tmp;
}

//个体变量
double sol[Num][Dim];
double fit[Num];

int main(int argc, char const *argv[])
{
	int i,j;
	int n;
	int r0,r1;
	int rj;
	int gb;
	double new_sol[Dim];

	srand((unsigned int)time(NULL));

	// 1. 初始化
	for (i = 0; i < Num; ++i)
	{
		for (j = 0; j < Dim; ++j)
		{
			sol[i][j] = RAND *(UB - LB) + LB;
		}
	}

	//2. 进行迭代
	n = 0;
	while(n < N)
	{
		//2.1 select random particles
		r0 = (int)(RAND*Num);		//随即个体r0
		do{r1=(int)(RAND*Num);} while (r0==r1);	//随机个体r1（不同于r0）
		rj = (int)(RAND*Dim);

		//2.2 generate new_sol particle from sol
		for (j = 0; j < Dim; ++j)
		{
			new_sol[j] = sol[r0][j];
		}
		new_sol[rj] = sol[r0][rj] + RAND1 * (sol[r0][rj] - sol[r1][rj]);

		//2.3 greedy select
		if (get_fit(new_sol) < get_fit(sol[r0]))
		{
			sol[r0][rj] = new_sol[rj];
			fit[r0] = get_fit(new_sol);
		}

		n++;
	}

	//3. 结果输出
	gb = 0;
	for (i = 1; i < Num; ++i)
	{
		if (fit[i] < fit[gb])
			gb = i;
	}
	printf("=====================================\n");
	printf("gb = %d \n",gb);
	for (j = 0; j < Dim; ++j)
	{
		printf("%f ",sol[gb][j]);
	}
	puts("\n");
	
	printf("%.5e \n",fit[gb]);
	printf("=====================================\n");
	return 0;
}


```
**比较**：相比较于Python版本的实现，C确实要繁琐不少，主要在变量的声明，格式化输出和一些随机数的产生。


**结果**：相比于Python的实现版本，结果相差不大，最主要的区别应该在随机数的算法产生。但是诡异的是C语言的执行时间比Python版还要多，最大的可能是在Python在`for`循环上采用更好的策略，如类似于C语言中的memcpy的一块一块的来，别的步骤基本一致，执行时间上应该相差不大。
```
=====================================
gb = 4 
-0.000000 0.100000 0.200000 

3.57825e-015 
=====================================
[Finished in 1.0s]
```

## Matlab实现篇
```matlab
To Be Continued...
```

## 总结

在简单的数值计算上，整体的C实现相比于Python实现并无多大的时间上的优势，因为一些如循环模块，随机数的产生上，Python的内置方式可能更加的高效。此外，还没有算上Python的那些`plot`第三方的库，绝对的完胜。

建议：采用Python来完成算法原型的实现，如果效率不够，关键部分用C补充。
