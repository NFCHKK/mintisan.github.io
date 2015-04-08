# 真心不懂 C 啊

[from](http://kukuruku.co/hub/programming/i-do-not-know-c)

The purpose of this article is to make everyone (especially C programmers) say: “I do not know C”.

I want to show that the dark corners of C are much closer than it seems, and even trivial code lines may contain undefined behavior.

The article is organized as a set of questions and answers. All the examples are separate files of the source code.

1.
```c
int i;
int i = 10;
```

Q: Is this code correct? (Will there occur an error related to the fact that the variable is defined twice? Reminding you that it’s a separate source file and not a part of the function body or compound statement)

Answer

2.

```c
extern void bar(void);
void foo(int *x)
{
  int y = *x;  /* (1) */
  if(!x)       /* (2) */
  {
    return;    /* (3) */
  }
  bar();
  return;
}
```

Q: Turns out, bar() is invoked even when x is the null pointer (and the program does not crash). Is it the optimizer’s error, or is everything correct?

Answer

3.
There was a function:

```
#define ZP_COUNT 10
void func_original(int *xp, int *yp, int *zp)
{
  int i;
  for(i = 0; i < ZP_COUNT; i++)
  {
    *zp++ = *xp + *yp;
  }
}
```

They wanted to optimize it this way:

```c
void func_optimized(int *xp, int *yp, int *zp)
{
  int tmp = *xp + *yp;
  int i;
  for(i = 0; i < ZP_COUNT; i++)
  {
    *zp++ = tmp;
  }
}
```

Q: Is it possible to call the original function and the optimized one, so as to obtain different results in zp?

Answer

4.

```c
double f(double x)
{
  assert(x != 0.);
  return 1. / x;
}
```

Q: Can this function return inf? Assume that floating-point numbers are implemented according to IEEE 754 (most machines), and assert is enabled (NDEBUG is not defined).

Answer

5.
```c
int my_strlen(const char *x)
{
  int res = 0;
  while(*x)
  {
    res++;
    x++;
  }
  return res;
}
```

Q: The provided above function should return the length of the null-terminated line. Find a bug.

Answer
6.
```c
#include <stdio.h>
#include <string.h>
int main()
{
  const char *str = "hello";
  size_t length = strlen(str);
  size_t i;
  for(i = length - 1; i >= 0; i--)
  {
    putchar(str[i]);
  }
  putchar('\n');
  return 0;
}
```
Q: The loop is infinite. How come?

Answer
7.
```c
#include <stdio.h>
void f(int *i, long *l)
{
  printf("1. v=%ld\n", *l); /* (1) */
  *i = 11;                  /* (2) */
  printf("2. v=%ld\n", *l); /* (3) */
}
int main()
{
  long a = 10;
  f((int *) &a, &a);
  printf("3. v=%ld\n", a);
  return 0;
}
```
This program is compiled by two different compilers and run on a little-endian machine. Two different results were obtained:

1. v=10    2. v=11    3. v=11
1. v=10    2. v=10    3. v=11
Q: How can you explain the second result?

Answer

8.
```c
#include <stdio.h>
int main()
{
  int array[] = { 0, 1, 2 };
  printf("%d %d %d\n", 10, (5, array[1, 2]), 10);
}
```
Q: Is this code correct? If there is no undefined behavior, what does it print then?

Answer
9.
```c
unsigned int add(unsigned int a, unsigned int b)
{
  return a + b;
}
```
Q: What is the result of `add(UINT_MAX, 1)`?

Answer
10.

```c
int add(int a, int b)
{
  return a + b;
}
```

Q: What is the result of `add(INT_MAX, 1)`?

Answer
11.

```c
int neg(int a)
{
  return -a;
}
```

Q: Is undefined behavior possible here? If so, under what arguments?

Answer

A: neg(INT_MIN). If the ECM represents negative numbers in the additional code (two's complement), the absolute value of INT_MIN is more by one than the absolute values of INT_MAX. In this case, -INT_MIN invokes the signed overflow, which is the undefined behavior.

12.

```c
int div(int a, int b)
{
  assert(b != 0);
  return a / b;
}
```

Q: Is undefined behavior possible here? If so, under what arguments?

Answer
A: If the ECM represents negative numbers in the additional code, then div(INT_MIN, -1) – refer to the previous question.

— Dmitri Gribenko <gribozavr@gmail.com>



This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
