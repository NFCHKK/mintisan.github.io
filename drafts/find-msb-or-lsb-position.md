

# 查找一个字的MSB的所在比特位

## 1.http://rosettacode.org/wiki/Find_first_and_last_set_bit_of_a_long_integer
二分法
```c
#include <stdio.h>
#include <stdint.h>
 
uint32_t msb32(uint32_t n)
{
    uint32_t b = 1;
    if (!n) return 0;
 
#define step(x) if (n >= ((uint32_t)1) << x) b <<= x, n >>= x
    step(16); step(8); step(4); step(2); step(1);
#undef step
    return b;
}
 
int msb32_idx(uint32_t n)
{
    int b = 0;
    if (!n) return -1;
 
#define step(x) if (n >= ((uint32_t)1) << x) b += x, n >>= x
    step(16); step(8); step(4); step(2); step(1);
#undef step
    return b;
}
 
#define lsb32(n) ( (uint32_t)(n) & -(int32_t)(n) )
 
/* finding the *position* of the least significant bit
   rarely makes sense, so we don't put much effort in it*/
inline int lsb32_idx(uint32_t n) { return msb32_idx(lsb32(n)); }
 
int main()
{
    int32_t n;
    int i;
 
    for (i = 0, n = 1; ; i++, n *= 42) {
        printf("42**%d = %10d(x%08x): M x%08x(%2d) L x%03x(%2d)\n",
            i, n, n,
            msb32(n), msb32_idx(n),
            lsb32(n), lsb32_idx(n));
 
        if (n >= INT32_MAX / 42) break;
    }
 
    return 0;
}
```

## 2. 移位
```c
unsigned int msb32(unsigned int x)
{
    char n = 0;
    if (x == 0)
    {
        return 0;
    }
    while (x)
    {
        x >>= 1;
        n++;
    }
    return n;
}
```

## 3.http://stackoverflow.com/questions/2589096/find-most-significant-bit-left-most-that-is-set-in-a-bit-array
查找表1
```c
unsigned int msb32(unsigned int x)
{
    static const unsigned int bval[] =
    {0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4};

    unsigned int r = 0;
    if (x & 0xFFFF0000) { r += 16/1; x >>= 16/1; }
    if (x & 0x0000FF00) { r += 16/2; x >>= 16/2; }
    if (x & 0x000000F0) { r += 16/4; x >>= 16/4; }
    return r + bval[x];
}
```

## 4.https://graphics.stanford.edu/~seander/bithacks.html
查找表2
```c
static const int MultiplyDeBruijnBitPosition[32] =
{
    0, 9, 1, 10, 13, 21, 2, 29, 11, 14, 16, 18, 22, 25, 3, 30,
    8, 12, 20, 28, 15, 17, 24, 7, 19, 27, 23, 6, 26, 5, 4, 31
};
unsigned int msb32(unsigned int x)
{
    int r;      // result goes here

    x |= x >> 1; // first round down to one less than a power of 2
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;

    r = MultiplyDeBruijnBitPosition[(uint32_t)(x * 0x07C4ACDDU) >> 27];

    return r;
}
```


## BitHacks
- http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-172-performance-engineering-of-software-systems-fall-2010/video-lectures/lecture-2-bit-hacks/MIT6_172F10_lec02.pdf
- http://www.catonmat.net/blog/low-level-bit-hacks-you-absolutely-must-know/
- http://www.homolog.us/blogs/blog/2014/12/04/the-entire-world-of-bit-twiddling-hacks/
- http://graphics.stanford.edu/~seander/bithacks.html
- http://bits.stephan-brumme.com/
- http://mingxinglai.com/cn/2014/10/operations-of-bits/
- http://realtimecollisiondetection.net/blog/?p=78
