#  如何编写Linux设备驱动程序

http://bbs.chinaunix.net/thread-2047152-1-1.html


Linux是Unix操作系统的一种变种，在Linux下编写驱动程序的原理和思想完全类似于其他的Unix系统，但它dos或window环境下的驱动程序有很大的区别。在Linux环境下设计驱动程序，思想简洁，操作方便，功能也很强大，但是支持函数少，只能依赖kernel中的函数，有些常用的操作要自己来编写，而且调试也不方便。

以下的一些文字主要来源于khg，johnsonm的Write linux device driver，Brennan's Guide to Inline Assembly，The Linux A-Z，还有清华BBS上的有关device driver的一些资料。


## 一、Linux device driver 的概念 

系统调用是操作系统内核和应用程序之间的接口，设备驱动程序是操作系统内核和机器硬件之间的接口。设备驱动程序为应用程序屏蔽了硬件的细节，这样在应用程序看来，硬件设备只是一个设备文件，应用程序可以象操作普通文件一样对硬件设备进行操作。设备驱动程序是内核的一部分，它完成以下的功能: 
　　1. 对设备初始化和释放。
　　2. 把数据从内核传送到硬件和从硬件读取数据。
　　3. 读取应用程序传送给设备文件的数据和回送应用程序请求的数据。
　　4. 检测和处理设备出现的错误。

在Linux操作系统下有三类主要的设备文件类型，一是字符设备，二是块设备，三是网络设备。字符设备和块设备的主要区别是:在对字符设备发出读/写请求时，实际的硬件I/O一般就紧接着发生了，块设备则不然，它利用一块系统内存作缓冲区，当用户进程对设备请求能满足用户的要求，就返回请求的数据，如果不能，就调用请求函数来进行实际的I/O操作。块设备是主要针对磁盘等慢速设备设计的，以免耗费过多的CPU时间来等待。

已经提到，用户进程是通过设备文件来与实际的硬件打交道。每个设备文件都都有其文件属性(c/b)，表示是字符设备还是块设备?另外每个文件都有两个设备号，第一个是主设备号，标识驱动程序，第二个是从设备号，标识使用同一个设备驱动程序的不同的硬件设备，比如有两个软盘，就可以用从设备号来区分他们。设备文件的的主设备号必须与设备驱动程序在登记时申请的主设备号一致，否则用户进程将无法访问到驱动程序。 

最后必须提到的是，在用户进程调用驱动程序时，系统进入核心态，这时不再是抢先式调度。也就是说，系统必须在你的驱动程序的子函数返回后才能进行其他的工作。如果你的驱动程序陷入死循环，不幸的是你只有重新启动机器了，然后就是漫长的fsck。

## 　　二、实例剖析 

我们来写一个最简单的字符设备驱动程序。虽然它什么也不做，但是通过它可以了解Linux的设备驱动程序的工作原理。把下面的C代码输入机器，你就会获得一个真正的设备驱动程序。

```c
#define  __NO_VERSION__ 
#include  <linux/modules.h> 
#include  <linux/version.h> 

char kernel_version [] = UTS_RELEASE; 
```


这一段定义了一些版本信息，虽然用处不是很大，但也必不可少。Johnsonm说所有的驱动程序的开头都要包含<linux/config.h>，一般来讲最好使用。 

由于用户进程是通过设备文件同硬件打交道，对设备文件的操作方式不外乎就是一些系统调用，如 open，read，write，close…， 注意，不是fopen， fread，但是如何把系统调用和驱动程序关联起来呢?这需要了解一个非常关键的数据结构： 

```c
struct file_operations 
{ 
    int (*seek) (struct inode * ，struct file *， off_t ，int); 
    int (*read) (struct inode * ，struct file *， char ，int); 
    int (*write) (struct inode * ，struct file *， off_t ，int); 
    int (*readdir) (struct inode * ，struct file *， struct dirent * ，int); 
    int (*select) (struct inode * ，struct file *， int ，select_table *); 
    int (*ioctl) (struct inode * ，struct file *， unsined int ，unsigned long); 
    int (*mmap) (struct inode * ，struct file *， struct vm_area_struct *); 
    int (*open) (struct inode * ，struct file *); 
    int (*release) (struct inode * ，struct file *); 
    int (*fsync) (struct inode * ，struct file *); 
    int (*fasync) (struct inode * ，struct file *，int); 
    int (*check_media_change) (struct inode * ，struct file *); 
    int (*revalidate) (dev_t dev); 
} 
```


这个结构的每一个成员的名字都对应着一个系统调用。用户进程利用系统调用在对设备文件进行诸如read/write操作时，系统调用通过设备文件的主设备号找到相应的设备驱动程序，然后读取这个数据结构相应的函数指针，接着把控制权交给该函数。这是linux的设备驱动程序工作的基本原理。既然是这样，则编写设备驱动程序的主要工作就是编写子函数，并填充file_operations的各个域。 

下面就开始写子程序。 

```c
#include <linux/types.h> 
#include <linux/fs.h> 
#include <linux/mm.h> 
#include <linux/errno.h> 
#include <asm/segment.h> 
unsigned int test_major = 0; 
static int read_test(struct inode *node，struct file *file，char *buf，int count)
{ 
    int left; 

    if (verify_area(VERIFY_WRITE，buf，count) == -EFAULT ) {
        return -EFAULT; 
    }
    for(left = count ; left > 0 ; left--) { 
        __put_user(1，buf，1); 
        buf++; 
    } 
    return count; 
} 
```

这个函数是为read调用准备的。当调用read时，read_test()被调用，它把用户的缓冲区全部写1。buf 是read调用的一个参数。它是用户进程空间的一个地址。但是在read_test被调用时，系统进入核心态。所以不能使用buf这个地址，必须用__put_user()，这是kernel提供的一个函数，用于向用户传送数据。另外还有很多类似功能的函数。请参考，在向用户空间拷贝数据之前，必须验证buf是否可用。这就用到函数verify_area。

```c
static int write_tibet(struct inode *inode，struct file *file，const char *buf，int count) 
{ 
    return count; 
} 

static int open_tibet(struct inode *inode，struct file *file ) 
{
    MOD_INC_USE_COUNT; 
    return 0; 
} 

static void release_tibet(struct inode *inode，struct file *file ) 
{ 
    MOD_DEC_USE_COUNT; 
} 
```

这几个函数都是空操作。实际调用发生时什么也不做，他们仅仅为下面的结构提供函数指针。 

```c
struct file_operations test_fops = { 
    NULL， 
    read_test， 
    write_test， 
    NULL， /* test_readdir */ 
    NULL， 
    NULL， /* test_ioctl */ 
    NULL， /* test_mmap */ 
    open_test， 
    release_test， 
    NULL， /* test_fsync */ 
    NULL， /* test_fasync */ 
    /* nothing more， fill with NULLs */ 
};  
```

设备驱动程序的主体可以说是写好了。现在要把驱动程序嵌入内核。驱动程序可以按照两种方式编译。一种是编译进kernel，另一种是编译成模块(modules)，如果编译进内核的话，会增加内核的大小，还要改动内核的源文件，而且不能动态的卸载，不利于调试，所以推荐使用模块方式。 

```c
int init_module(void) 
{ 
    int result; 
    result = register_chrdev(0， "test"， &test_fops); 
    if (result < 0) { 
        printk(KERN_INFO "test: can't get major number\n"); 
        return result; 
    } 
    if (test_major == 0) 
        test_major = result; /* dynamic */ 
    
    return 0; 
} 
```

在用insmod命令将编译好的模块调入内存时，init_module 函数被调用。在这里，init_module只做了一件事，就是向系统的字符设备表登记了一个字符设备。register_chrdev需要三个参数，参数一是希望获得的设备号，如果是零的话，系统将选择一个没有被占用的设备号返回。参数二是设备文件名，参数三用来登记驱动程序实际执行操作的函数的指针。 

如果登记成功，返回设备的主设备号，不成功，返回一个负值。 

```c
void cleanup_module(void) 
{ 
    unregister_chrdev(test_major，"test"); 
}  
```

在用rmmod卸载模块时，cleanup_module函数被调用，它释放字符设备test在系统字符设备表中占有的表项。 

一个极其简单的字符设备可以说写好了，文件名就叫test.c吧。 

下面编译 :
```shell
$ gcc -O2 -DMODULE -D__KERNEL__ -c test.c 
```

得到文件test.o就是一个设备驱动程序。 

如果设备驱动程序有多个文件，把每个文件按上面的命令行编译，然后 

```shell
$ ld  -r  file1.o  file2.o  -o  modulename。 
```

驱动程序已经编译好了，现在把它安装到系统中去。

```shell
　　$ insmod  –f  test.o 
```


如果安装成功，在/proc/devices文件中就可以看到设备test，并可以看到它的主设备号。要卸载的话，运行 :

```shell
$ rmmod test 
```

下一步要创建设备文件。 

```shell
$ mknod /dev/test c major minor 
```

c 是指字符设备，major是主设备号，就是在/proc/devices里看到的。 

用shell命令 

```shell
$ cat /proc/devices 
```

就可以获得主设备号，可以把上面的命令行加入你的shell script中去。 

minor是从设备号，设置成0就可以了。 

我们现在可以通过设备文件来访问我们的驱动程序。写一个小小的测试程序。 

```
#include <stdio.h> 
#include <sys/types.h> 
#include <sys/stat.h> 
#include <fcntl.h> 
main() 
{ 
    int testdev; 
    int i; 
    char buf[10]; 

    testdev = open("/dev/test"，O_RDWR); 

    if ( testdev == -1 ) 
    { 
        printf("Cann't open file \n"); 
        exit(0); 
    } 
    read(testdev，buf，10); 

    for (i = 0; i < 10;i++) 
        printf("%d\n"，buf[i]); 

    close(testdev); 
} 
```

编译运行，看看是不是打印出全1 ？ 

以上只是一个简单的演示。真正实用的驱动程序要复杂的多，要处理如中断，DMA，I/O port等问题。这些才是真正的难点。请看下节，实际情况的处理。 
如何编写Linux操作系统下的设备驱动程序 

## 三、设备驱动程序中的一些具体问题

　　1。 I/O Port。 
　　和硬件打交道离不开I/O Port，老的ISA设备经常是占用实际的I/O端口，在linux下，操作系统没有对I/O口屏蔽，也就是说，任何驱动程序都可对任意的I/O口操作，这样就很容易引起混乱。每个驱动程序应该自己避免误用端口。 
　　有两个重要的kernel函数可以保证驱动程序做到这一点。 
　　1）check_region(int io_port， int off_set) 
　　这个函数察看系统的I/O表，看是否有别的驱动程序占用某一段I/O口。 
　　参数1：io端口的基地址， 
　　参数2：io端口占用的范围。 
　　返回值：0 没有占用， 非0，已经被占用。 
　　2）request_region(int io_port， int off_set，char *devname) 
　　如果这段I/O端口没有被占用，在我们的驱动程序中就可以使用它。在使用之前，必须向系统登记，以防止被其他程序占用。登记后，在/proc/ioports文件中可以看到你登记的io口。 
　　参数1：io端口的基地址。 
　　参数2：io端口占用的范围。 
　　参数3：使用这段io地址的设备名。 
　　在对I/O口登记后，就可以放心地用inb()， outb()之类的函来访问了。 
在一些pci设备中，I/O端口被映射到一段内存中去，要访问这些端口就相当于访问一段内存。经常性的，我们要获得一块内存的物理地址。

　　2。内存操作 
　　在设备驱动程序中动态开辟内存，不是用malloc，而是kmalloc，或者用get_free_pages直接申请页。释放内存用的是kfree，或free_pages。 请注意，kmalloc等函数返回的是物理地址！ 
　　注意，kmalloc最大只能开辟128k-16，16个字节是被页描述符结构占用了。 
　　内存映射的I/O口，寄存器或者是硬件设备的RAM(如显存)一般占用F0000000以上的地址空间。在驱动程序中不能直接访问，要通过kernel函数vremap获得重新映射以后的地址。 
　　另外，很多硬件需要一块比较大的连续内存用作DMA传送。这块程序需要一直驻留在内存，不能被交换到文件中去。但是kmalloc最多只能开辟128k的内存。 
　　这可以通过牺牲一些系统内存的方法来解决。 
　　
　　3。中断处理 
　　同处理I/O端口一样，要使用一个中断，必须先向系统登记。 

```c
int request_irq(unsigned int irq ，void(*handle)(int，void *，struct pt_regs *)，
unsigned int long flags， const char *device); 
```

irq: 是要申请的中断。 
handle：中断处理函数指针。 
flags：SA_INTERRUPT 请求一个快速中断，0 正常中断。 
device：设备名。

　　如果登记成功，返回0，这时在/proc/interrupts文件中可以看你请求的中断。 

　　4。一些常见的问题。 
　　对硬件操作，有时时序很重要。但是如果用C语言写一些低级的硬件操作的话，gcc往往会对你的程序进行优化，这样时序会发生错误。如果用汇编写呢，gcc同样会对汇编代码进行优化，除非用volatile关键字修饰。最保险的办法是禁止优化。这当然只能对一部分你自己编写的代码。如果对所有的代码都不优化，你会发现驱动程序根本无法装载。这是因为在编译驱动程序时要用到gcc的一些扩展特性，而这些扩展特性必须在加了优化选项之后才能体现出来。
