title: Implement Simple Heuristic Optimization
date: 2014-04-15 10:53:23
categories: [机器学习]
tags: []
---


*采用C语言和Python语言来实现一个简单高效的启发式优化算法（HO），比较两者方式的差异和优劣。*

<!-- more -->


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
