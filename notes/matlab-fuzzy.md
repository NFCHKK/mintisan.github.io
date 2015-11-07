# 移植 Matlab 的底层模糊逻辑控制库


[TOC]

Matlab拥有很多好用的Toolbox，如遗传算法，模糊逻辑控制（Fuzzy Logic Control，FLC），神经网络等等，一般都是大神写的，然后提交给 Matlab 公司，接着审核之后加入到新的版本中，大致的看了下Toolbox文件夹下面的各个库代码，大部分是用 matlab 语言写的，但是有些是采用C语言写的（貌似 Matlab 程序本身就是采用 C/C++ 写的，所以 matlab 语言和C语言之间可以很好的调用来调用去的。）

虽然说 FLC 不是太复杂，自己写一个也不会太难，但是当我看了matlab下面的FLC库文件的C语言实现，我觉得还是算了，因为他（就是ANFIS的发明者——[Jyh-Shing Roger Jang（張智星）](http://neural.cs.nthu.edu.tw/jang/)，Zadeh的学生）在对模糊的理解之上写的相当的完备。

## Step 1. 进入Toolbox文件夹，找到如下两个C文件

![](http://mint-blog.qiniudn.com/matlab-fuzzy1.jpeg)

或者，点击[此处]([C文件](http://7xnvok.com1.z0.glb.clouddn.com/fuzzy.zip?attname=&e=1446969971&token=UXirvxOLbIB68QgtQjzLlmLcd3cg6twaGRWnhhPk:b4Xu8TKdioWNZcuTIb-PZUSLcf8))下载。

## Step 2. 移植原版`fismain.c`

 “fis.c”文件时FLC实现部分，一般不用动它。原版`fismain.c`如下：

```c
/*
 * Stand-alone codes for fuzzy inference systems.
 * J.-S. Roger Jang, 1994.
 * Copyright 1994-2002 The MathWorks, Inc.
 * $Revision: 1.12 $  $Date: 2002/06/17 12:47:24 $
 */

/* This part is for MACs only */
#if defined(applec) || defined(__MWERKS__) || defined (THINK_C) || defined(powerc)

#include <stdio.h>
#include <stdarg.h>

FILE    *output_file;

#define PRINTF macprintf

int macprintf(char* format, ...)    
{
    va_list arg;
    int     ret;
    
    va_start(arg, format);
    ret = vfprintf(output_file, format, arg);
    va_end(arg);
    
    return(ret);
}
#endif /* applec || __MWERKS__ || THINK_C || powerc */

/* Start of the regular fismain.c */
/* 这里要改，当然include还是展开，但是我们把它放在vs2008里面，方便管理，还是用.h头文件吧。 */
#include "fis.c"

/***********************************************************************
 Main routine 
 **********************************************************************/

int
main(int argc, char **argv)
{
    FIS *fis;
    int i, j;
    int debug = 0;

    DOUBLE **dataMatrix, **fisMatrix, **outputMatrix;
    char *fis_file, *data_file;
    int data_row_n, data_col_n, fis_row_n, fis_col_n;
/* 这里也要改，读取我们的配置文件——FLC有很多需要选择的参数以及方法 */
#if defined(applec) || defined(__MWERKS__) || defined (THINK_C) || defined(powerc)
    /* For MACs only */
    data_file = "fismain.in";
    fis_file = "fismain.fis";
    output_file = fisOpenFile("fismain.out","w");
#else
    /* input arguments checking */
    if (argc != 3) {
        PRINTF("Usage: %s data_file fis_file\n", argv[0]);
        exit(1);
    }
    data_file = argv[1];
    fis_file = argv[2];
#endif /* applec || __MWERKS__ || THINK_C || powerc */

    /* obtain data matrix and FIS matrix */
    dataMatrix = returnDataMatrix(data_file, &data_row_n, &data_col_n);
    fisMatrix = returnFismatrix(fis_file, &fis_row_n, &fis_col_n);

    /* build FIS data structure */
    fis = (FIS *)fisCalloc(1, sizeof(FIS));
    fisBuildFisNode(fis, fisMatrix, fis_col_n, MF_POINT_N);

    /* error checking */
    if (data_col_n < fis->in_n) {
        PRINTF("Given FIS is a %d-input %d-output system.\n",
            fis->in_n, fis->out_n);
        PRINTF("Given data file does not have enough input entries.\n");
        fisFreeMatrix((void **)dataMatrix, data_row_n);
        fisFreeMatrix((void **)fisMatrix, fis_row_n);
        fisFreeFisNode(fis);
        fisError("Exiting ...");
    }

    /* debugging */
    if (debug)
        fisPrintData(fis);

    /* create output matrix */
    outputMatrix = (DOUBLE **)fisCreateMatrix(data_row_n, fis->out_n, sizeof(DOUBLE));

    /* evaluate FIS on each input vector */
    for (i = 0; i < data_row_n; i++)
        getFisOutput(dataMatrix[i], fis, outputMatrix[i]);

    /* print output vector */
    for (i = 0; i < data_row_n; i++) {
        for (j = 0; j < fis->out_n; j++)
            PRINTF("%.12f ", outputMatrix[i][j]);
        PRINTF("\n");
    }

    /* clean up memory */
    fisFreeFisNode(fis);
    fisFreeMatrix((void **)dataMatrix, data_row_n);
    fisFreeMatrix((void **)fisMatrix, fis_row_n);
    fisFreeMatrix((void **)outputMatrix, data_row_n);
    exit(0);
}
```

大致需要改的，就是所指出来得两部分。很简单的，直接看修改后的代码。

```c
/*
 * Stand-alone codes for fuzzy inference systems.
 * J.-S. Roger Jang, 1994.
 * Copyright 1994-2002 The MathWorks, Inc.
 * $Revision: 1.12 $  $Date: 2002/06/17 12:47:24 $
 */
/* Start of the regular main.c */
#include "fis.h"

/***********************************************************************
 Main routine 
 **********************************************************************/
int main(int argc, char **argv)
{
    FIS *fis;
    int i, j;
    int debug = 1;

    double **dataMatrix, **fisMatrix, **outputMatrix;
    char *fis_file, *data_file;
    int data_row_n, data_col_n, fis_row_n, fis_col_n;

    data_file = "dataMatrixFile.txt";
    fis_file = "fisMatrixFile.txt";

    /* obtain data matrix and FIS matrix 从文件读入输入数据矩阵和模糊矩阵，将其放入二维矩阵中*/
    dataMatrix = returnDataMatrix(data_file, &data_row_n, &data_col_n);
    fisMatrix = returnFismatrix(fis_file, &fis_row_n, &fis_col_n);

    /* build FIS data structure 建立模糊数据结构*/
    fis = (FIS *)fisCalloc(1, sizeof(FIS));
    /*将fisMatrix中的数据导入到fis中*/
    fisBuildFisNode(fis, fisMatrix, fis_col_n, MF_POINT_N);

    /* error checking 错误检测*/
    if (data_col_n < fis->in_n) {
        printf("Given FIS is a %d-input %d-output system.\n",
            fis->in_n, fis->out_n);
        printf("Given data file does not have enough input entries.\n");
        fisFreeMatrix((void **)dataMatrix, data_row_n);
        fisFreeMatrix((void **)fisMatrix, fis_row_n);
        fisFreeFisNode(fis);
        fisError("Exiting ...");
    }

    /* fisDebugging 调试数据输出*/
    if (debug)
        fisPrintData(fis);

    /* create output matrix 创建输出矩阵5x1*/
    outputMatrix = (double **)fisCreateMatrix(data_row_n, fis->out_n, sizeof(double));

    /* evaluate FIS on each input vector 获取输入->开始模糊推理->输出矩阵*/
    for (i = 0; i < data_row_n; i++)
        getFisOutput(dataMatrix[i], fis, outputMatrix[i]);

    /* print output vector 得到输出并打印*/
    for (i = 0; i < data_row_n; i++) {
        for (j = 0; j < fis->out_n; j++)
            printf("%.12f ", outputMatrix[i][j]);
        printf("\n");
    }

    /* clean up memory 清理内存*/
    fisFreeFisNode(fis);
    fisFreeMatrix((void **)dataMatrix, data_row_n);
    fisFreeMatrix((void **)fisMatrix, fis_row_n);
    fisFreeMatrix((void **)outputMatrix, data_row_n);

    getchar();
    return 0;
}
```

当然还有我们的`fis.h`


```c
#ifndef __FIS_H__
# define __FIS_H__

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

/***********************************************************************
 Macros and definitions
 **********************************************************************/
/* Define portable printf and DOUBLE */
#if defined(MATLAB_MEX_FILE)
# define PRINTF mexPrintf
# define DOUBLE real_T
#elif defined(__SIMSTRUC__)
# define PRINTF ssPrintf
# define DOUBLE real_T
#else
# define PRINTF printf
# define DOUBLE double
#endif

#ifndef ABS
# define ABS(x)   ( (x) > (0) ? (x): (-(x)) )
#endif
#ifndef MAX
# define MAX(x,y) ( (x) > (y) ? (x) : (y) )
#endif
#ifndef MIN
# define MIN(x,y) ( (x) < (y) ? (x) : (y) )
#endif
#define MF_PARA_N 4
#define STR_LEN 500
#define MF_POINT_N 101

/* debugging macros */
/*
#define PRINT(expr) printf(#expr " = %g\n", (DOUBLE)expr)
#define PRINTMAT(mat,m,n) printf(#mat " = \n"); fisPrintMatrix(mat,m,n)
#define FREEMAT(mat,m) printf("Free " #mat " ...\n"); fisFreeMatrix(mat,m)
#define FREEARRAY(array) printf("Free " #array " ...\n"); free(array)
*/

#if (defined(MATLAB_MEX_FILE) && !defined(__SIMSTRUC__))
# define FREE mxFree
#else
# define FREE free
#endif

#define FREEMAT(mat,m) fisFreeMatrix(mat,m)
#define FREEARRAY(array) FREE(array)

/***********************************************************************
 Data types
 **********************************************************************/

typedef struct fis_node {
    int handle;
    int load_param;
    char name[STR_LEN];
    char type[STR_LEN];
    char andMethod[STR_LEN];
    char orMethod[STR_LEN];
    char impMethod[STR_LEN];
    char aggMethod[STR_LEN];
    char defuzzMethod[STR_LEN];
    int userDefinedAnd;
    int userDefinedOr;
    int userDefinedImp;
    int userDefinedAgg;
    int userDefinedDefuzz;
    int in_n;
    int out_n;
    int rule_n;
    int **rule_list;
    DOUBLE *rule_weight;
    int *and_or;    /* AND-OR indicator */
    DOUBLE *firing_strength;
    DOUBLE *rule_output;
    /* Sugeno: output for each rules */
    /* Mamdani: constrained output MF values of rules */
    struct io_node **input;
    struct io_node **output;
    DOUBLE (*andFcn)(DOUBLE, DOUBLE);
    DOUBLE (*orFcn)(DOUBLE, DOUBLE);
    DOUBLE (*impFcn)(DOUBLE, DOUBLE);
    DOUBLE (*aggFcn)(DOUBLE, DOUBLE);
    DOUBLE (*defuzzFcn)();
    DOUBLE *BigOutMfMatrix; /* used for Mamdani system only */
    DOUBLE *BigWeightMatrix;/* used for Mamdani system only */
    DOUBLE *mfs_of_rule;    /* MF values in a rule */

    DOUBLE *bias; /*bias, to be tuned when no rules are fired*/
    int isbias;

    struct fis_node *next;
} FIS;



typedef struct io_node {
    char name[STR_LEN];
    int mf_n;
    DOUBLE bound[2];
    DOUBLE value;
    struct mf_node **mf;
} IO;



typedef struct mf_node {
    char label[STR_LEN];    /* MF name */
    char type[STR_LEN];     /* MF type */
    int nparams;            /* length of params field */
    DOUBLE *params;         /* MF parameters */
    int userDefined;        /* 1 if the MF is user-defined */
    DOUBLE (*mfFcn)(DOUBLE, DOUBLE *); /* pointer to a mem. fcn */ 
    DOUBLE value;           /* for Sugeno only */
    DOUBLE *value_array;    /* for Mamdani only, array of MF values */
} MF;


/***********************************************************************
some redefinition universal functions 
 **********************************************************************/
/* display error message and exit */
void fisError(char *msg);

/* define a standard memory access function with error checking */
void *fisCalloc(int num_of_x, int size_of_x);

char **fisCreateMatrix(int row_n, int col_n, int element_size);
void fisFreeMatrix(void **matrix, int row_n);

/***********************************************************************
 Data structure: construction, printing, and destruction 
 **********************************************************************/

/* Build/Free FIS node and load parameter from fismatrix directly */
/* col_n is the number of columns of the fismatrix */
void fisBuildFisNode(FIS *fis, DOUBLE **fismatrix, int col_n, int numofpoints);
void fisFreeFisNode(FIS *fis);

void fisPrintData(FIS *fis);

/***********************************************************************
 Evaluate the constructed FIS based on given input vector 
 **********************************************************************/

/* given input vector and FIS data structure, return output */
/* this is a wrap-up on fisEvaluate() */  
void getFisOutput(DOUBLE *input, FIS *fis, DOUBLE *output);

/* return a FIS matrix with all information */
DOUBLE **returnFismatrix(char *fis_file, int *row_n_p, int *col_n_p);

/* return data matrix */
DOUBLE **returnDataMatrix(char *filename, int *row_n_p, int *col_n_p);

#endif /* __FIS__ */
```

## Step 3. 编写配置文件

我们另外还需要两个配置文件：

```
data_file = "dataMatrixFile.txt";   //输入数据 
fis_file = "fisMatrixFile.txt";    //方法及其参数选择
```

给一个示例如下：

`fisMatrixFile.txt`

```
[System]
Name='Fuzzy1'
Type='mamdani'
Version=2.0
NumInputs=3
NumOutputs=1
NumRules=27
AndMethod='min'
OrMethod='max'
ImpMethod='prod'
AggMethod='sum'
DefuzzMethod='mom'

[Input1]
Name='QueueLength'
Range=[0 20]
NumMFs=3
MF1='Low':'trapmf',[0 0 6 8]
MF2='Median':'trapmf',[6 8 12 14]
MF3='High':'trapmf',[12 14 20 20]

[Input2]
Name='RTime'
Range=[0 70]
NumMFs=3
MF1='Low':'trapmf',[0 0 20 30]
MF2='Median':'trapmf',[20 30 40 50]
MF3='High':'trapmf',[40 50 70 70]

[Input3]
Name='DownFlow'
Range=[0 80]
NumMFs=3
MF1='Small':'trapmf',[0 0 10 30]
MF2='Median':'trapmf',[10 30 50 70]
MF3='Large':'trapmf',[50 70 80 80]

[Output1]
Name='ppd'
Range=[0 1]
NumMFs=3
MF1='Small':'trapmf',[0 0 0.2 0.4]
MF2='Median':'trapmf',[0.2 0.4 0.6 0.8]
MF3='Large':'trapmf',[0.6 0.8 1 1]

[Rules]
1 1 1, 1 (1) : 1
1 1 2, 1 (1) : 1
1 1 3, 1 (1) : 1
1 2 1, 1 (1) : 1
1 2 2, 1 (1) : 1
1 2 3, 1 (1) : 1
1 3 1, 1 (1) : 1
1 3 2, 1 (1) : 1 
1 3 3, 1 (1) : 1
2 1 1, 2 (1) : 1
2 1 2, 2 (1) : 1
2 1 3, 2 (1) : 1
2 2 1, 2 (1) : 1
2 2 2, 2 (1) : 1
2 2 3, 2 (1) : 1
2 3 1, 2 (1) : 1
2 3 2, 2 (1) : 1
2 3 3, 2 (1) : 1
3 1 1, 3 (1) : 1
3 1 2, 3 (1) : 1
3 1 3, 3 (1) : 1
3 2 1, 3 (1) : 1
3 2 2, 3 (1) : 1
3 2 3, 3 (1) : 1
3 3 1, 3 (1) : 1
3 3 2, 3 (1) : 1
3 3 3, 3 (1) : 1
```

` dataMatrixFile.txt`

```
0 0 0
2 7 8
10 35 40
16 41 64
20 70 80
```

## Step 4. 新建工程并验证

![VS工程](http://mint-blog.qiniudn.com/matlab-fuzzy2.png)

dataMatrixFile.txt有四组输入，看结果如下：


![运算结果](http://mint-blog.qiniudn.com/matlab-fuzzy3.png)

看和我们手算的一不一样呢？结果是一致的。

![手动推导](http://mint-blog.qiniudn.com/matlab-fuzzy4.png)
