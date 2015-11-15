# [Linux Device Drivers Series](http://opensourceforu.efytimes.com/tag/linux-device-drivers-series/)

[TOC]

> The author is a freelance trainer in Linux internals, Linux device drivers, embedded Linux and related topics. Prior to this, he had worked at Intel and Nvidia. He has been exploring Linux since 1994. A gold medallist from the Indian Institute of Science, Linux and knowledge-sharing are two of his many passions.


## Device Drivers, Part 1: Linux Device Drivers for Your Girl Friend

By Anil Kumar Pugalia on November 1, 2010 in Concepts, Developers, Overview · 26 Comments

> This series on Linux device drivers aims to present the usually technical topic in a way that is more interesting to a wider cross-section of readers.

-------

“After a week of hard work, we finally got our driver working,” were Pugs’ first words when he met his girlfriend, Shweta.

“Why? What was your driver up to? Was he sick? And what hard work did you do?” asked Shweta. Confused, Pugs responded, “What are you talking about?”

Now it was Shweta’s turn to look puzzled, as she replied, “Why ask me? You tell me — which of your drivers are you talking about?”

When understanding dawned on him, Pugs groaned, “Ah c’mon! Not my car drivers — I am talking about a device driver on my computer.”

“I know about car and bus drivers, pilots, and even screwdrivers; but what is this ‘device driver’?” queried Shweta, puzzled.

That was all it took to launch Pugs into a passionate explanation of device drivers for the newbie — in particular, Linux device drivers, which he had been working on for many years.

### Of drivers and buses

A driver drives, manages, controls, directs and monitors the entity under its command. What a bus driver does with a bus, a device driver does with a computer device (any piece of hardware connected to a computer) like a mouse, keyboard, monitor, hard disk, Web-camera, clock, and more.

Further, a “pilot” could be a person or even an automatic system monitored by a person (an auto-pilot system in airliners, for example). Similarly, a specific piece of hardware could be controlled by a piece of software (a device driver), or could be controlled by another hardware device, which in turn could be managed by a software device driver. In the latter case, such a controlling device is commonly called a device controller. This, being a device itself, often also needs a driver, which is commonly referred to as a bus driver.

General examples of device controllers include hard disk controllers, display controllers, and audio controllers that in turn manage devices connected to them. More technical examples would be an IDE controller, PCI controller, USB controller, SPI controller, I2C controller, etc. Pictorially, this whole concept can be depicted as in Figure 1.

![Device and driver interaction](http://www.opensourceforu.efytimes.com/wp-content/uploads/2010/11/ldd1.jpg)
Figure 1: Device and driver interaction

Device controllers are typically connected to the CPU through their respectively named buses (collection of physical lines) — for example, the PCI bus, the IDE bus, etc. In today’s embedded world, we encounter more micro-controllers than CPUs; these are the CPU plus various device controllers built onto a single chip. This effective embedding of device controllers primarily reduces cost and space, making it suitable for embedded systems. In such cases, the buses are integrated into the chip itself. Does this change anything for the drivers, or more generically, on the software front?

The answer is, not much — except that the bus drivers corresponding to the embedded device controllers are now developed under the architecture-specific umbrella.

### Drivers have two parts

Bus drivers provide hardware-specific interfaces for the corresponding hardware protocols, and are the bottom-most horizontal software layers of an operating system (OS). Over these sit the actual device drivers. These operate on the underlying devices using the horizontal layer interfaces, and hence are device-specific. However, the whole idea of writing these drivers is to provide an abstraction to the user, and so, at the other “end”, these do provide an interface (which varies from OS to OS). In short, a device driver has two parts, which are: a) device-specific, and b) OS-specific. Refer to Figure 2.

![Linux device driver partition](http://www.opensourceforu.efytimes.com/wp-content/uploads/2010/11/ldd2.jpg)
Figure 2: Linux device driver partition

The device-specific portion of a device driver remains the same across all operating systems, and is more about understanding and decoding the device data sheets than software programming. A data sheet for a device is a document with technical details of the device, including its operation, performance, programming, etc. — in short a device user manual.

Later, I shall show some examples of decoding data sheets as well. However, the OS-specific portion is the one that is tightly coupled with the OS mechanisms of user interfaces, and thus differentiates a Linux device driver from a Windows device driver and from a MacOS device driver.

### Verticals

In Linux, a device driver provides a “system call” interface to the user; this is the boundary line between the so-called kernel space and user-space of Linux, as shown in Figure 2. Figure 3 provides further classification.

![Linux kernel overview](http://www.opensourceforu.efytimes.com/wp-content/uploads/2010/11/ldd3.jpg)
Figure 3: Linux kernel overview

Based on the OS-specific interface of a driver, in Linux, a driver is broadly classified into three verticals:

- Packet-oriented or the network vertical
- Block-oriented or the storage vertical
- Byte-oriented or the character vertical

The CPU vertical and memory vertical, taken together with the other three verticals, give the complete overview of the Linux kernel, like any textbook definition of an OS: “An OS performs 5 management functions: CPU/process, memory, network, storage, device I/O.” Though these two verticals could be classified as device drivers, where CPU and memory are the respective devices, they are treated differently, for many reasons.

These are the core functionalities of any OS, be it a micro-kernel or a monolithic kernel. More often than not, adding code in these areas is mainly a Linux porting effort, which is typically done for a new CPU or architecture. Moreover, the code in these two verticals cannot be loaded or unloaded on the fly, unlike the other three verticals. Henceforth, when we talk about Linux device drivers, we mean to talk only about the latter three verticals in Figure 3.

Let’s get a little deeper into these three verticals. The network vertical consists of two parts: a) the network protocol stack, and b)the network interface card (NIC) device drivers, or simply network device drivers, which could be for Ethernet, Wi-Fi, or any other network horizontals. Storage, again, consists of two parts: a) File-system drivers, to decode the various formats on different partitions, and b) Block device drivers for various storage (hardware) protocols, i.e., horizontals like IDE, SCSI, MTD, etc.

With this, you may wonder if that is the only set of devices for which you need drivers (or for which Linux has drivers). Hold on a moment; you certainly need drivers for the whole lot of devices that interface with the system, and Linux does have drivers for them. However, their byte-oriented cessibility puts all of them under the character vertical — this is, in reality, the majority bucket. In fact, because of the vast number of drivers in this vertical, character drivers have been further sub-classified — so you have tty drivers, input drivers, console drivers, frame-buffer drivers, sound drivers, etc. The typical horizontals here would be RS232, PS/2, VGA, I2C, I2S, SPI, etc.

### Multiple-vertical drivers

One final note on the complete picture (placement of all the drivers in the Linux driver ecosystem): the horizontals like USB, PCI, etc, span below multiple verticals. Why is that?

Simple — you already know that you can have a USB Wi-Fi dongle, a USB pen drive, and a USB-to-serial converter — all are USB, but come under three different verticals!

In Linux, bus drivers or the horizontals, are often split into two parts, or even two drivers: a) device controller-specific, and b) an abstraction layer over that for the verticals to interface, commonly called cores. A classic example would be the USB controller drivers ohci, ehci, etc., and the USB abstraction, usbcore.

### Summing up

So, to conclude, a device driver is a piece of software that drives a device, though there are so many classifications. In case it drives only another piece of software, we call it just a driver. Examples are file-system drivers, usbcore, etc. Hence, all device drivers are drivers, but all drivers are not device drivers.

“Hey, Pugs, hold on; we’re getting late for class, and you know what kind of trouble we can get into. Let’s continue from here, later,” exclaimed Shweta.

Jumping up, Pugs finished his explanation: “Okay. This is the basic theory about device drivers. If you’re interested, later, I can show you the code, and all that we have been doing for the various kinds of drivers.” And they hurried towards their classroom.
MeasureMeasure

### Related Posts:

- [Extend Wireless Router Capabilities Using a Netbook or…](http://opensourceforu.efytimes.com/2014/01/extend-wireless-router-capabilities-using-netbook-laptop/)
- [Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
- [Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
- [The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
- [“Linux interoperability has been enabled through work…](http://opensourceforu.efytimes.com/2014/03/linux-interoperability-enabled-work-across-microsoft/)


## Device Drivers, Part 2: Writing Your First Linux Driver in the Classroom

By Anil Kumar Pugalia on December 1, 2010 in Coding, Developers · 39 Comments

> This article, which is part of the series on Linux device drivers, deals with the concept of dynamically loading drivers, first writing a Linux driver, before building and then loading it.

Shweta and Pugs reached their classroom late, to find their professor already in the middle of a lecture. Shweta sheepishly asked for his permission to enter. An annoyed Professor Gopi responded, “Come on! You guys are late again; what is your excuse, today?”

Pugs hurriedly replied that they had been discussing the very topic for that day’s class — device drivers in Linux. Pugs was more than happy when the professor said, “Good! Then explain about dynamic loading in Linux. If you get it right, the two of you are excused!” Pugs knew that one way to make his professor happy was to criticise Windows.

He explained, “As we know, a typical driver installation on Windows needs a reboot for it to get activated. That is really not acceptable; suppose we need to do it on a server? That’s where Linux wins. In Linux, we can load or unload a driver on the fly, and it is active for use instantly after loading. Also, it is instantly disabled when unloaded. This is called dynamic loading and unloading of drivers in Linux.”

This impressed the professor. “Okay! Take your seats, but make sure you are not late again.” The professor continued to the class, “Now you already know what is meant by dynamic loading and unloading of drivers, so I’ll show you how to do it, before we move on to write our first Linux driver.”

### Dynamically loading drivers

These dynamically loadable drivers are more commonly called modules and built into individual files with a `.ko` (kernel object) extension. Every Linux system has a standard place under the root of the file system (`/`) for all the pre-built modules. They are organised similar to the kernel source tree structure, under `/lib/modules/<kernel_version>/kernel`, where `<kernel_version>` would be the output of the command `uname -r` on the system, as shown in Figure 1.

![Linux pre-built modules](http://www.opensourceforu.efytimes.com/wp-content/uploads/2010/12/figure_4_linux_modules.png)
Figure 1: Linux pre-built modules

To dynamically load or unload a driver, use these commands, which reside in the `/sbin` directory, and must be executed with root privileges:

- `lsmod` — lists currently loaded modules
- `insmod <module_file>` — inserts/loads the specified module file
- `modprobe <module>` — inserts/loads the module, along with any dependencies
- `rmmod <module>` — removes/unloads the module

Let’s look at the FAT filesystem-related drivers as an example. Figure 2 demonstrates this complete process of experimentation. The module files would be `fat.ko`, `vfat.ko`, etc., in the fat (`vfat` for older kernels) directory under `/lib/modules/'uname -r'/kernel/fs`. If they are in compressed `.gz` format, you need to uncompress them with `gunzip`, before you can `insmod` them.

![Linux module operations](http://www.opensourceforu.efytimes.com/wp-content/uploads/2010/12/figure_5_linux_module_operations.png)
Figure 2: Linux module operations

The `vfat` module depends on the `fat` module, so `fat.ko` needs to be loaded first. To automatically perform decompression and dependency loading, use `modprobe` instead. Note that you shouldn’t specify the `.ko` extension to the module’s name, when using the `modprobe` command. `rmmod` is used to unload the modules.

### Our first Linux driver

Before we write our first driver, let’s go over some concepts. A driver never runs by itself. It is similar to a library that is loaded for its functions to be invoked by a running application. It is written in C, but lacks a `main()` function. Moreover, it will be loaded/linked with the kernel, so it needs to be compiled in a similar way to the kernel, and the header files you can use are only those from the kernel sources, not from the standard `/usr/include`.

One interesting fact about the kernel is that it is an object-oriented implementation in C, as we will observe even with our first driver. Any Linux driver has a constructor and a destructor. The module’s constructor is called when the module is successfully loaded into the kernel, and the destructor when `rmmod` succeeds in unloading the module. These two are like normal functions in the driver, except that they are specified as the init and exit functions, respectively, by the macros `module_init()` and `module_exit()`, which are defined in the kernel header `module.h`.

```
/* ofd.c – Our First Driver code */
#include <linux/module.h>
#include <linux/version.h>
#include <linux/kernel.h>
static int __init ofd_init(void) /* Constructor */
{
printk(KERN_INFO "Namaskar: ofd registered");
return 0;
}
static void __exit ofd_exit(void) /* Destructor */
{
printk(KERN_INFO "Alvida: ofd unregistered");
}
module_init(ofd_init);
module_exit(ofd_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("Our First Driver");
```

Given above is the complete code for our first driver; let’s call it `ofd.c`. Note that there is no `stdio.h` (a user-space header); instead, we use the analogous `kernel.h` (a kernel space header). `printk()` is the equivalent of `printf()`. Additionally, version.h is included for the module version to be compatible with the kernel into which it is going to be loaded. The `MODULE_*` macros populate module-related information, which acts like the module’s “signature”.

### Building our first Linux driver

Once we have the C code, it is time to compile it and create the module file `ofd.ko`. We use the kernel build system to do this. The following `Makefile` invokes the kernel’s build system from the kernel source, and the kernel’s `Makefile` will, in turn, invoke our first driver’s `Makefile` to build our first driver.

To build a Linux driver, you need to have the kernel source (or, at least, the kernel headers) installed on your system. The kernel source is assumed to be installed at `/usr/src/linux`. If it’s at any other location on your system, specify the location in the `KERNEL_SOURCE` variable in this `Makefile`.

```
# Makefile – makefile of our first driver
# if KERNELRELEASE is defined, we've been invoked from the
# kernel build system and can use its language.
ifneq (${KERNELRELEASE},)
obj-m := ofd.o
# Otherwise we were called directly from the command line.
# Invoke the kernel build system.
else
KERNEL_SOURCE := /usr/src/linux
PWD := $(shell pwd)
default:
${MAKE} -C ${KERNEL_SOURCE} SUBDIRS=${PWD} modules
clean:
${MAKE} -C ${KERNEL_SOURCE} SUBDIRS=${PWD} clean
endif
```

With the C code (`ofd.c`) and `Makefile` ready, all we need to do is invoke `make` to build our first driver (`ofd.ko`).

```
$ make
make -C /usr/src/linux SUBDIRS=... modules
make[1]: Entering directory `/usr/src/linux'
CC [M]  .../ofd.o
Building modules, stage 2.
MODPOST 1 modules
CC      .../ofd.mod.o
LD [M]  .../ofd.ko
make[1]: Leaving directory `/usr/src/linux'
```

### Summing up

Once we have the `ofd.ko` file, perform the usual steps as the root user, or with `sudo`.

```
# su
# insmod ofd.ko
# lsmod | head -10
```

`lsmod` should show you the ofd driver loaded.

While the students were trying their first module, the bell rang, marking the end of the session. Professor Gopi concluded, “Currently, you may not be able to observe anything other than the `lsmod` listing showing the driver has loaded. Where’s the `printk` output gone? Find that out for yourselves, in the lab session, and update me with your findings. Also note that our first driver is a template for any driver you would write in Linux. Writing a specialised driver is just a matter of what gets filled into its constructor and destructor. So, our further learning will be to enhance this driver to achieve specific driver functionalities.”
MeasureMeasure

### Related Posts:
[Jumpstart Linux Kernel Module Programming](http://opensourceforu.efytimes.com/2014/03/jumpstart-linux-kernel-module-programming/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)
[A Simple guide to building your own Linux Kernel](http://opensourceforu.efytimes.com/2013/05/a-simple-guide-to-building-your-own-linux-kernel/)
[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)


## Device Drivers, Part 3: Kernel C Extras in a Linux Driver

By Anil Kumar Pugalia on January 1, 2011 in Concepts, Developers, Overview · 34 Comments

> This article in the series on Linux device drivers deals with the kernel’s message logging, and kernel-specific GCC extensions.


Enthused by how Pugs impressed their professor in the last class, Shweta wanted to do so too. And there was soon an opportunity: finding out where the output of `printk` had gone. So, as soon as she entered the lab, she grabbed the best system, logged in, and began work. Knowing her professor well, she realised that he would have dropped a hint about the possible solution in the previous class itself. Going over what had been taught, she remembered the error output demonstration from `insmod vfat.ko` — running `dmesg | tail`. She immediately tried that, and found the `printk` output there.

But how did it come to be here? A tap on her shoulder roused her from her thoughts. “Shall we go for a coffee?” proposed Pugs.

“But I need to –“.

“I know what you’re thinking about,” interrupted Pugs. “Let’s go, I’ll explain you all about dmesg.”

### Kernel message logging

Over coffee, Pugs began his explanation.

As far as parameters are concerned, `printf` and `printk` are the same, except that when programming for the kernel, we don’t bother about the float formats `%f`, `%lf` and the like. However, unlike `printf`, `printk` is not designed to dump its output to some console.

In fact, it cannot do so; it is something in the background, and executes like a library, only when triggered either from hardware-space or user-space. All `printk` calls put their output into the (log) ring buffer of the kernel. Then, the `syslog` daemon running in user-space picks them up for final processing and redirection to various devices, as configured in the configuration file `/etc/syslog.conf`.

You must have observed the out-of-place macro `KERN_INFO`, in the `printk` calls, in the [last article](http://www.opensourceforu.efytimes.com/2010/12/writing-your-first-linux-driver/). That is actually a constant string, which gets concatenated with the format string after it, into a single string. Note that there is no comma (,) between them; they are not two separate arguments. There are eight such macros defined in `linux/kernel.h` in the kernel source, namely:

```
#define KERN_EMERG "<0>"   /* system is unusable                */
#define KERN_ALERT "<1>"   /* action must be taken immediately    */
#define KERN_CRIT "<2>"    /* critical conditions     */
#define KERN_ERR "<3>"     /* error conditions            */
#define KERN_WARNING "<4>" /* warning conditions      */
#define KERN_NOTICE "<5>"  /* normal but significant condition    */
#define KERN_INFO "<6>"    /* informational           */
#define KERN_DEBUG "<7>"   /* debug-level messages        */
```

Now depending on these log levels (i.e., the first three characters in the format string), the `syslog` user-space daemon redirects the corresponding messages to their configured locations. A typical destination is the log file `/var/log/messages`, for all log levels. Hence, all the `printk` outputs are, by default, in that file. However, they can be configured differently — to a serial port (like `/dev/ttyS0`), for instance, or to all consoles, like what typically happens for `KERN_EMERG`.

Now, `/var/log/messages` is buffered, and contains messages not only from the kernel, but also from various daemons running in user-space. Moreover, this file is often not readable by a normal user. Hence, a user-space utility, `dmesg`, is provided to directly parse the kernel ring buffer, and dump it to standard output. Figure 1 shows snippets from the two.

![Kernel’s message logging](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/01/figure_6_linuxDriver-kernels_message_logging.png)
Figure 1: Kernel’s message logging

### Kernel-specific GCC extensions

Shweta, frustrated since she could no longer show off as having discovered all these on her own, retorted, “Since you have explained all about printing in the kernel, why don’t you also tell me about the weird C in the driver as well — the special keywords `__init`, `__exit`, etc.”

These are not special keywords. Kernel C is not “weird C”, but just standard C with some additional extensions from the C compiler, GCC. Macros `__init` and `__exit` are just two of these extensions. However, these do not have any relevance in case we are using them for a dynamically loadable driver, but only when the same code gets built into the kernel. All functions marked with `__init` get placed inside the `init` section of the kernel image automatically, by GCC, during kernel compilation; and all functions marked with `__exit` are placed in the `exit` section of the kernel image.

What is the benefit of this? All functions with `__init` are supposed to be executed only once during bootup (and not executed again till the next bootup). So, once they are executed during bootup, the kernel frees up RAM by removing them (by freeing the `init` section). Similarly, all functions in the `exit` section are supposed to be called during system shutdown.

Now, if the system is shutting down anyway, why do you need to do any cleaning up? Hence, the `exit` section is not even loaded into the kernel — another cool optimisation. This is a beautiful example of how the kernel and GCC work hand-in-hand to achieve a lot of optimisation, and many other tricks that we will see as we go along. And that is why the Linux kernel can only be compiled using GCC-based compilers — a closely knit bond.

### The kernel function’s return guidelines

While returning from coffee, Pugs kept praising OSS and the community that’s grown around it. Do you know why different individuals are able to come together and contribute excellently without any conflicts, and in a project as huge as Linux, at that? There are many reasons, but most important amongst them is that they all follow and abide by inherent coding guidelines.

Take, for example, the kernel programming guideline for returning values from a function. Any kernel function needing error handling, typically returns an integer-like type — and the return value again follows a guideline. For an error, we return a negative number: a minus sign appended with a macro that is available through the kernel header `linux/errno.h`, that includes the various error number headers under the kernel sources — namely, `asm/errno.h`, `asm-generic/errno.h`, `asm-generic/errno-base.h`.

For success, zero is the most common return value, unless there is some additional information to be provided. In that case, a positive value is returned, the value indicating the information, such as the number of bytes transferred by the function.

### Kernel C = pure C

Once back in the lab, Shweta remembered their professor mentioning that no `/usr/include` headers can be used for kernel programming. But Pugs had said that kernel C is just standard C with some GCC extensions. Why this conflict?

Actually this is not a conflict. Standard C is pure C — just the language. The headers are not part of it. Those are part of the standard libraries built in for C programmers, based on the concept of reusing code.

Does that mean that all standard libraries, and hence, all ANSI standard functions, are not part of “pure” C? Yes, that’s right. Then, was it really tough coding the kernel?

Well, not for this reason. In reality, kernel developers have evolved their own set of required functions, which are all part of the kernel code. The `printk` function is just one of them. Similarly, many string functions, memory functions, and more, are all part of the kernel source, under various directories like `kernel`, `ipc`, `lib`, and so on, along with the corresponding headers under the `include/linux` directory.

“Oh yes! That is why we need to have the kernel source to build a driver,” agreed Shweta.

“If not the complete source, at least the headers are a must. And that is why we have separate packages to install the complete kernel source, or just the kernel headers,” added Pugs.

“In the lab, all the sources are set up. But if I want to try out drivers on my Linux system in my hostel room, how do I go about it?” asked Shweta.

“Our lab has Fedora, where the kernel sources are typically installed under `/usr/src/kernels/<kernel-version>`, unlike the standard `/usr/src/linux`. Lab administrators must have installed it using the command-line `yum install kernel-devel`. I use Mandriva, and installed the kernel sources using `urpmi kernel-source`,” replied Pugs.

“But I have Ubuntu,” Shweta said.

“Okay! For that, just use `apt-get` utility to fetch the source — possibly `apt-get install linux-source`,” replied Pugs.

### Summing up

The lab session was almost over when Shweta suddenly asked, out of curiosity, “Hey Pugs, what’s the next topic we are going to learn in our Linux device drivers class?”

“Hmm… most probably character drivers,” threw back Pugs.

With this information, Shweta hurriedly packed her bag and headed towards her room to set up the kernel sources, and try out the next driver on her own. “In case you get stuck, just give me a call,” smiled Pugs.
MeasureMeasure

### Related Posts:

[Jumpstart Linux Kernel Module Programming](http://opensourceforu.efytimes.com/2014/03/jumpstart-linux-kernel-module-programming/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[A Simple guide to building your own Linux Kernel](http://opensourceforu.efytimes.com/2013/05/a-simple-guide-to-building-your-own-linux-kernel/)
[Linux Kernel 4.2 RC8 Now Available For Download!](http://opensourceforu.efytimes.com/2015/08/linux-kernel-4-2-rc8-now-available-for-download/)



## Device Drivers, Part 4: Linux Character Drivers

By Anil Kumar Pugalia on February 1, 2011 in Concepts, Developers, Overview · 12 Comments

> This article, which is part of the series on Linux device drivers, deals with the various concepts related to character drivers and their implementation.

Shweta, at her PC in her hostel room, was all set to explore the characters of Linux character drivers, before it was taught in class. She recalled the following lines from professor Gopi’s class: “… today’s first driver would be the template for any driver you write in Linux. Writing any specialised/advanced driver is just a matter of what gets filled into its constructor and destructor…”

With that, she took out the first driver’s code, and pulled out various reference books, to start writing a character driver on her own. She also downloaded the [online book](http://lwn.net/Kernel/LDD3/), Linux Device Drivers by Jonathan Corbet, Alessandro Rubini, and Greg Kroah-Hartman. Here is the summary of what she learnt.

### W’s of character drivers

We already know what drivers are, and why we need them. What is so special about character drivers? If we write drivers for byte-oriented operations (or, in C lingo, character-oriented operations), then we refer to them as character drivers. Since the majority of devices are byte-oriented, the majority of device drivers are character device drivers.

Take, for example, serial drivers, audio drivers, video drivers, camera drivers, and basic I/O drivers. In fact, all device drivers that are neither storage nor network device drivers are some type of a character driver. Let’s look into the commonalities of these character drivers, and how Shweta wrote one of them.

### The complete connection

![Character driver overview](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/02/figure_7_character_driver_overview.png)
Figure 1: Character driver overview

As shown in Figure 1, for any user-space application to operate on a byte-oriented device (in hardware space), it should use the corresponding character device driver (in kernel space). Character driver usage is done through the corresponding character device file(s), linked to it through the virtual file system (VFS). What this means is that an application does the usual file operations on the character device file. Those operations are translated to the corresponding functions in the linked character device driver by the VFS. Those functions then do the final low-level access to the actual device to achieve the desired results.

Note that though the application does the usual file operations, their outcome may not be the usual ones. Rather, they would be as driven by the corresponding functions in the device driver. For example, a write followed by a read may not fetch what has just been written to the character device file, unlike for regular files. Remember that this is the usual expected behaviour for device files. Let’s take an audio device file as an example. What we write into it is the audio data we want to play back, say through a speaker. However, the read would get us audio data that we are recording, say through a microphone. The recorded data need not be the played-back data.

In this complete connection from the application to the device, there are four major entities involved:

- Application
- Character device file
- Character device driver
- Character device

The interesting thing is that all of these can exist independently on a system, without the other being present. The mere existence of these on a system doesn’t mean they are linked to form the complete connection. Rather, they need to be explicitly connected. An application gets connected to a device file by invoking the open system call on the device file.

Device file(s) are linked to the device driver by specific registrations done by the driver. The driver is linked to a device by its device-specific low-level operations. Thus we form the complete connection. With this, note that the character device file is not the actual device, but just a place-holder for the actual device.

### Major and minor numbers

The connection between the application and the device file is based on the name of the device file. However, the connection between the device file and the device driver is based on the number of the device file, not the name. This allows a user-space application to have any name for the device file, and enables the kernel-space to have a trivial index-based linkage between the device file and the device driver. This device file number is more commonly referred to as the `<major, minor>` pair, or the major and minor numbers of the device file.

Earlier (till kernel 2.4), one major number was for one driver, and the minor number used to represent the sub-functionalities of the driver. With kernel 2.6, this distinction is no longer mandatory; there could be multiple drivers under the same major number, but obviously, with different minor number ranges.

However, this is more common with the non-reserved major numbers, and standard major numbers are typically preserved for single drivers. For example, 4 for serial interfaces, 13 for mice, 14 for audio devices, and so on. The following command would list the various character device files on your system:

```
$ ls -l /dev/ | grep "^c"
```

### `<major, minor>` related support in kernel 2.6

Type (defined in kernel header `linux/types.h`):

- `dev_t` contains both major and minor numbers


Macros (defined in kernel header `linux/kdev_t.h`):

- `MAJOR(dev_t dev)` extracts the major number from `dev`
- `MINOR(dev_t dev)` extracts the minor number from `dev`
- `MKDEV(int major, int minor)` creates the `dev` from `major and minor`.

Connecting the device file with the device driver involves two steps:

- Registering for the `<major, minor>` range of device files.
- Linking the device file operations to the device driver functions.

The first step is achieved using either of the following two APIs, defined in the kernel header `linux/fs.h`:

```
+ int register_chrdev_region(dev_t first, unsigned int cnt, char *name);
+ int alloc_chrdev_region(dev_t *first, unsigned int firstminor, unsigned int cnt, char *name);
```

The first API registers the cnt number of device file numbers, starting from first, with the given name. The second API dynamically figures out a free major number, and registers the cnt number of device file numbers starting from `<the free major, firstminor>`, with the given name. In either case, the `/proc/devices` kernel window lists the name with the registered major number. With this information, Shweta added the following into the first driver code:

```
#include <linux/types.h>
#include <linux/kdev_t.h>
#include <linux/fs.h>
static dev_t first; // Global variable for the first device number
```

In the constructor, she added:

```
if (alloc_chrdev_region(&first, 0, 3, "Shweta") < 0)
{
return -1;
}
printk(KERN_INFO "<Major, Minor>: <%d, %d>\n", MAJOR(first), MINOR(first));
```

In the destructor, she added:

```
unregister_chrdev_region(first, 3);
```

It’s all put together, as follows:

```
#include <linux/module.h>
#include <linux/version.h>
#include <linux/kernel.h>
#include <linux/types.h>
#include <linux/kdev_t.h>
#include <linux/fs.h>
static dev_t first; // Global variable for the first device number
static int __init ofcd_init(void) /* Constructor */
{
printk(KERN_INFO "Namaskar: ofcd registered");
if (alloc_chrdev_region(&first, 0, 3, "Shweta") < 0)
{
return -1;
}
printk(KERN_INFO "<Major, Minor>: <%d, %d>\n", MAJOR(first), MINOR(first));
return 0;
}
static void __exit ofcd_exit(void) /* Destructor */
{
unregister_chrdev_region(first, 3);
printk(KERN_INFO "Alvida: ofcd unregistered");
}
module_init(ofcd_init);
module_exit(ofcd_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("Our First Character Driver");
```

Then, Shweta repeated the usual steps that she’d learnt for the first driver:

- Build the driver (`.ko` file) by running `make`.
- Load the driver using `insmod`.
- List the loaded modules using `lsmod`.
- Unload the driver using `rmmod`.

### Summing up

Additionally, before unloading the driver, she peeped into the `/proc/devices` kernel window to look for the registered major number with the name “Shweta”, using `cat /proc/devices`. It was right there. However, she couldn’t find any device file created under `/dev` with the same major number, so she created them by hand, using `mknod`, and then tried reading and writing those. Figure 2 shows all these steps.

![Character device file experiments](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/02/figure_8_char_dev_file_experiments.png)
Figure 2: Character device file experiments

Please note that the major number `250` may vary from system to system, based on availability. Figure 2 also shows the results Shweta got from reading and writing one of the device files. That reminded her that the second step to connect the device file with the device driver — which is linking the device file operations to the device driver functions — was not yet done. She realised that she needed to dig around for more information to complete this step, and also to figure out the reason for the missing device files under `/dev`.

We will deal with her further learning in our next article.

### Related Posts:
[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)
[Extend Wireless Router Capabilities Using a Netbook or…](http://opensourceforu.efytimes.com/2014/01/extend-wireless-router-capabilities-using-netbook-laptop/)

## Device Drivers, Part 5: Character Device Files — Creation & Operations

By Anil Kumar Pugalia on April 1, 2011 in Coding, Developers · 7 Comments

>This article is a continuation of the series on Linux device drivers, and carries on the discussion on character drivers and their implementation.

In my [previous article](http://www.opensourceforu.efytimes.com/2011/02/linux-character-drivers/), I had mentioned that even with the registration for the `<major, minor>` device range, the device files were not created under `/dev` — instead, Shweta had to create them manually, using `mknod`. However, on further study, Shweta figured out a way to automatically create the device files, using the `udev` daemon. She also learnt the second step to connect the device file with the device driver — linking the device file operations to the device driver functions. Here is what she learnt.

### Automatic creation of device files

Earlier, in kernel 2.4, the automatic creation of device files was done by the kernel itself, by calling the appropriate APIs of `devfs`. However, as the kernel evolved, kernel developers realised that device files were more related to user-space and hence, as a policy, that is where they ought to be dealt with, not at the kernel. Based on this idea, the kernel now only populates the appropriate device class and device information into the `/sys` window, for the device under consideration. User-space then needs to interpret it and take appropriate action. In most Linux desktop systems, the `udev` daemon picks up that information, and accordingly creates the device files.

`udev` can be further configured via its configuration files to tune the device file names, their permissions, their types, etc. So, as far as the driver is concerned, the appropriate `/sys` entries need to be populated using the Linux device model APIs declared in `<linux/device.h>`. The rest should be handled by `udev`. The device class is created as follows:

```
struct class *cl = class_create(THIS_MODULE, "<device class name>");
```

Then, the device info (`<major, minor>``) under this class is populated by:

```
device_create(cl, NULL, first, NULL, "<device name format>", ...);
```

Here, the first is `dev_t` with the corresponding `<major, minor>`. The corresponding complementary or the inverse calls, which should be called in chronologically reverse order, are as follows:

```
device_destroy(cl, first);
class_destroy(cl);
```

Refer to Figure 1 for the `/sys` entries created using chardrv as the `<device class name>` and mynull as the `<device name format>`. That also shows the device file, created by udev, based on the `<major>:<minor>` entry in the `dev` file.

![Automatic device file creation](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/04/figure_1_auto_dev_file_creation.png)
Figure 1: Automatic device file creation

In case of multiple minors, the `device_create()` and `device_destroy()` APIs may be put in the for loop, and the `<device name format>` string could be useful. For example, the `device_create()` call in a for loop indexed by `i` could be as follows:

```
device_create(cl, NULL, MKNOD(MAJOR(first), MINOR(first) + i), NULL, "mynull%d", i);
```

### File operations

Whatever system calls (or, more commonly, file operations) we talk of on a regular file, are applicable to device files as well. That’s what we say: a file is a file, and in Linux, almost everything is a file from the user-space perspective. The difference lies in the kernel space, where the virtual file system (VFS) decodes the file type and transfers the file operations to the appropriate channel, like a filesystem module in case of a regular file or directory, and the corresponding device driver in case of a device file. Our discussion focuses on the second case.

Now, for VFS to pass the device file operations onto the driver, it should have been informed about it. And yes, that is what is called registering the file operations by the driver with the VFS. This involves two steps. (The parenthesised code refers to the “null driver” code below.)

First, let’s fill in a file operations structure (`struct file_operations pugs_fops`) with the desired file operations (`my_open`, `my_close`, `my_read`, `my_write`, …) and initialise the character device structure (`struct cdev c_dev`) with that, `using cdev_init()`.

Then, hand this structure to the VFS using the call `cdev_add()`. Both `cdev_init()` and `cdev_add()` are declared in `<linux/cdev.h>`. Obviously, the actual file operations (`my_open`, `my_close`, `my_read`, `my_write`) also had to be coded.

So, to start with, let’s keep them as simple as possible — let’s say, as easy as the “null driver”.

### The null driver

Following these steps, Shweta put the pieces together, attempting her first character device driver. Let’s see what the outcome was. Here’s the complete code — `ofcd.c`:

```
#include <linux/module.h>
#include <linux/version.h>
#include <linux/kernel.h>
#include <linux/types.h>
#include <linux/kdev_t.h>
#include <linux/fs.h>
#include <linux/device.h>
#include <linux/cdev.h>
static dev_t first; // Global variable for the first device number
static struct cdev c_dev; // Global variable for the character device structure
static struct class *cl; // Global variable for the device class
static int my_open(struct inode *i, struct file *f)
{
printk(KERN_INFO "Driver: open()\n");
return 0;
}
static int my_close(struct inode *i, struct file *f)
{
printk(KERN_INFO "Driver: close()\n");
return 0;
}
static ssize_t my_read(struct file *f, char __user *buf, size_t
len, loff_t *off)
{
printk(KERN_INFO "Driver: read()\n");
return 0;
}
static ssize_t my_write(struct file *f, const char __user *buf,
size_t len, loff_t *off)
{
printk(KERN_INFO "Driver: write()\n");
return len;
}
static struct file_operations pugs_fops =
{
.owner = THIS_MODULE,
.open = my_open,
.release = my_close,
.read = my_read,
.write = my_write
};
static int __init ofcd_init(void) /* Constructor */
{
printk(KERN_INFO "Namaskar: ofcd registered");
if (alloc_chrdev_region(&first, 0, 1, "Shweta") < 0)
{
return -1;
}
if ((cl = class_create(THIS_MODULE, "chardrv")) == NULL)
{
unregister_chrdev_region(first, 1);
return -1;
}
if (device_create(cl, NULL, first, NULL, "mynull") == NULL)
{
class_destroy(cl);
unregister_chrdev_region(first, 1);
return -1;
}
cdev_init(&c_dev, &pugs_fops);
if (cdev_add(&c_dev, first, 1) == -1)
{
device_destroy(cl, first);
class_destroy(cl);
unregister_chrdev_region(first, 1);
return -1;
}
return 0;
}
static void __exit ofcd_exit(void) /* Destructor */
{
cdev_del(&c_dev);
device_destroy(cl, first);
class_destroy(cl);
unregister_chrdev_region(first, 1);
printk(KERN_INFO "Alvida: ofcd unregistered");
}
module_init(ofcd_init);
module_exit(ofcd_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("Our First Character Driver");
```

Shweta repeated the usual build process, with some new test steps, as follows:

- Build the driver (`.ko` file) by running `make`.
- Load the driver using `insmod`.
- List the loaded modules using `lsmod`.
- List the major number allocated, using `cat /proc/devices`.
- “null driver”-specific experiments (refer to Figure 2 for details).
- Unload the driver using `rmmod`.

!['null driver' experiments](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/04/figure_2_null_driver_experiments.png)
Figure 2: 'null driver' experiments


### Summing up

Shweta was certainly happy; all on her own, she’d got a character driver written, which works the same as the standard `/dev/null` device file. To understand what this means, check the `<major, minor>` tuple for `/dev/null`, and similarly, also try out the `echo` and `cat` commands with it.

However, one thing began to bother Shweta. She had got her own calls (`my_open`, `my_close`, `my_read`, `my_write`) in her driver, but wondered why they worked so unusually, unlike any regular file system calls. What was unusual? Whatever was written, she got nothing when reading — unusual, at least from the regular file operations’ perspective. How would she crack this problem? Watch out for the next article.
MeasureMeasure

### Related Posts:

[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[File Systems A Semester Project-II, Part-19](http://opensourceforu.efytimes.com/2013/01/file-systems-a-semester-project-ii-part-19/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)



## Device Drivers, Part 6: Decoding Character Device File Operations

By Anil Kumar Pugalia on May 1, 2011 in Coding, Developers · 19 Comments

![Gearing up for character drivers](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/05/Drivers_Gears_Opener-590x268.jpg)

>This article, which is part of the series on Linux device drivers, continues to cover the various concepts of character drivers and their implementation, which was dealt with in the previous two articles [[1](http://www.opensourceforu.efytimes.com/2011/02/linux-character-drivers/), [2](http://www.opensourceforu.efytimes.com/2011/04/character-device-files-creation-operations/)].

So, what was your guess on how Shweta would crack the problem? Obviously, with the help of Pugs. Wasn’t it obvious? In our [previous article](http://www.opensourceforu.efytimes.com/2011/04/character-device-files-creation-operations/), we saw how Shweta was puzzled by not being able to read any data, even after writing into the `/dev/mynull` character device file. Suddenly, a bell rang — not inside her head, but a real one at the door. And for sure, there was Pugs.

“How come you’re here?” exclaimed Shweta.

“I saw your tweet. It’s cool that you cracked your first character driver all on your own. That’s amazing. So, what are you up to now?” asked Pugs.

“I’ll tell you, on the condition that you do not play spoil sport,” replied Shweta.

Pugs smiled, “Okay, I’ll only give you advice.”

“And that too, only if I ask for it! I am trying to understand character device file operations,” said Shweta.

Pugs perked up, saying, “I have an idea. Why don’t you decode and then explain what you’ve understood about it?”

Shweta felt that was a good idea. She `tail`‘ed the `dmesg` log to observe the `printk` output from her driver. Alongside, she opened her null driver code on her console, specifically observing the device file operations `my_open`, `my_close`, `my_read`, and `my_write`.

```
static int my_open(struct inode *i, struct file *f)
{
printk(KERN_INFO "Driver: open()\n");
return 0;
}
static int my_close(struct inode *i, struct file *f)
{
printk(KERN_INFO "Driver: close()\n");
return 0;
}
static ssize_t my_read(struct file *f, char __user *buf, size_t len, loff_t *off)
{
printk(KERN_INFO "Driver: read()\n");
return 0;
}
static ssize_t my_write(struct file *f, const char __user *buf, size_t len, loff_t *off)
{
printk(KERN_INFO "Driver: write()\n");
return len;
}
```

Based on the earlier understanding of the return value of the functions in the kernel, `my_open()` and `my_close()` are trivial, their return types being int, and both of them returning zero, means success.

However, the return types of both `my_read()` and `my_write()` are not int, rather, it is `ssize_t`. On further digging through kernel headers, that turns out to be a signed word. So, returning a negative number would be a usual error. But a non-negative return value would have additional meaning. For the read operation, it would be the number of bytes read, and for the write operation, it would be the number of bytes written.

### Reading the device file

To understand this in detail, the complete flow has to be given a relook. Let’s take the read operation first. When the user does a read from the device file `/dev/mynull`, that system call comes to the virtual file system (VFS) layer in the kernel. VFS decodes the `<major, minor>` tuple, and figures out that it needs to redirect it to the driver’s function `my_read()`, that’s registered with it. So from that angle, `my_read()` is invoked as a request to read, from us — the device-driver writers. And hence, its return value would indicate to the requesters (i.e., the users), how many bytes they are getting from the read request.

In our null driver example, we returned zero — which meant no bytes available, or in other words, the end of the file. And hence, when the device file is being read, the result is always nothing, independent of what is written into it.

“Hmmm… So, if I change it to 1, would it start giving me some data?” asked Pugs, by way of verifying.

Shweta paused for a while, looked at the parameters of the function `my_read()` and answered in the affirmative, but with a caveat — the data sent would be some junk data, since `my_read()` is not really populating data into buf (the buffer variable that is the second parameter of my_read(), provided by the user). In fact, `my_read()` should write data into buf, according to len (the third parameter to the function), the count in bytes requested by the user.

To be more specific, it should write less than, or equal to, `len` bytes of data into `buf`, and the number of bytes written should be passed back as the return value. No, this is not a typo — in the read operation, device-driver writers “write” into the user-supplied buffer. We read the data from (possibly) an underlying device, and then write that data into the user buffer, so that the user can read it. “That’s really smart of you,” said Pugs, sarcastically.

### Writing into the device file

The write operation is the reverse. The user provides `len` (the third parameter of `my_write()`) bytes of data to be written, in `buf` (the second parameter of `my_write()`). The `my_write()` function would read that data and possibly write it to an underlying device, and return the number of bytes that have been successfully written.

“Aha!! That’s why all my writes into `/dev/` mynull have been successful, without actually doing any read or write,” exclaimed Shweta, filled with happiness at understanding the complete flow of device file operations.

### Preserving the last character

With Shweta not giving Pugs any chance to correct her, he came up with a challenge. “Okay. Seems like you are thoroughly clear with the read/write fundamentals; so, here’s a question for you. Can you modify these `my_read()` and `my_write()` functions such that whenever I read` /dev/mynull`, I get the last character written into` /dev/mynull`?”

Confidently, Shweta took on the challenge, and modified `my_read()` and `my_write()` as follows, adding a static global character variable:

```
static char c;
static ssize_t my_read(struct file *f, char __user *buf, size_t len, loff_t *off)
{
printk(KERN_INFO "Driver: read()\n");
buf[0] = c;
return 1;
}
static ssize_t my_write(struct file *f, const char __user *buf, size_t len, loff_t *off)
{
printk(KERN_INFO "Driver: write()\n");
c = buf[len – 1];
return len;
}
```

“Almost there, but what if the user has provided an invalid buffer, or if the user buffer is swapped out. Wouldn’t this direct access of the user-space `buf` just crash and oops the kernel?” pounced Pugs.

Shweta, refusing to be intimidated, dived into her collated material and figured out that there are two APIs just to ensure that user-space buffers are safe to access, and then updated them. With the complete understanding of the APIs, she rewrote the above code snippet as follows:

```
static char c;
static ssize_t my_read(struct file *f, char __user *buf, size_t len, loff_t *off)
{
printk(KERN_INFO "Driver: read()\n");
if (copy_to_user(buf, &c, 1) != 0)
return -EFAULT;
else
return 1;
}
static ssize_t my_write(struct file *f, const char __user *buf, size_t len, loff_t *off)
{
printk(KERN_INFO "Driver: write()\n");
if (copy_from_user(&c, buf + len – 1, 1) != 0)
return -EFAULT;
else
return len;
}
```

Then Shweta repeated the usual build-and-test steps as follows:

- Build the modified “null” driver (`.ko` file) by running `make`.
- Load the driver using `insmod`.
- Write into` /dev/mynull`, say, using `echo -n "Pugs" > /dev/ mynull`
- Read from` /dev/mynull` using cat` /dev/mynull` (stop by using Ctrl+C)
- Unload the driver using `rmmod`.

On `cat`‘ing` /dev/mynull`, the output was a non-stop infinite sequence of `s`, as `my_read()` gives the last one character forever. So, Pugs intervened and pressed Ctrl+C to stop the infinite read, and tried to explain, “If this is to be changed to ‘the last character only once’, `my_read()` needs to return 1 the first time, and zero from the second time onwards. This can be achieved using off (the fourth parameter of `my_read()`).”

Shweta nodded her head obligingly, just to bolster Pugs’ ego.

### Related Posts:

[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[File Systems A Semester Project-II, Part-19](http://opensourceforu.efytimes.com/2013/01/file-systems-a-semester-project-ii-part-19/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)

## Device Drivers, Part 7: Generic Hardware Access in Linux

By Anil Kumar Pugalia on June 1, 2011 in Coding, Developers · 5 Comments

![Accessing hardware in Linux](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/06/Main.jpg)

>This article, which is part of the series on Linux device drivers, talks about accessing hardware in Linux.

Shweta was all jubilant about her character driver achievements, as she entered the Linux device drivers laboratory on the second floor of her college. Many of her classmates had already read her blog and commented on her expertise. And today was a chance to show off at another level. Till now, it was all software — but today’s lab was on accessing hardware in Linux.

In the lab, students are expected to learn “by experiment” how to access different kinds of hardware in Linux, on various architectures, over multiple lab sessions. Members of the lab staff are usually reluctant to let students work on the hardware straight away without any experience — so they had prepared some presentations for the students (available [here](http://profession.sarika-pugs.com/index.php?pagefile=linux_drivers)).

### Generic hardware interfacing

As every one settled down in the laboratory, lab expert Priti started with an introduction to hardware interfacing in Linux. Skipping the theoretical details, the first interesting slide was about generic architecture-transparent hardware interfacing (see Figure 1).

![Hardware mapping](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/06/figure_11_hardware_mapping.jpg)
Figure 1: Hardware mapping

The basic assumption is that the architecture is 32-bit. For others, the memory map would change accordingly. For a 32-bit address bus, the address/memory map ranges from 0 (`0x00000000`) to “232 – 1″ (`0xFFFFFFFF`). An architecture-independent layout of this memory map would be like what’s shown in Figure 1 — memory (RAM) and device regions (registers and memories of devices) mapped in an interleaved fashion. These addresses actually are architecture-dependent. For example, in an x86 architecture, the initial 3 GB (`0x00000000` to `0xBFFFFFFF`) is typically for RAM, and the later 1GB (0xC0000000 to `0xFFFFFFFF`) for device maps. However, if the RAM is less, say 2GB, device maps could start from 2GB (`0x80000000`).

Run `cat /proc/iomem` to list the memory map on your system. Run `cat /proc/meminfo` to get the approximate RAM size on your system. Refer to Figure 2 for a snapshot.

![Physical and bus addresses on an x86 system](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/06/figure_12_phys_n_bus_addresses.jpg)
Figure 2: Physical and bus addresses on an x86 system

Irrespective of the actual values, the addresses referring to RAM are termed as physical addresses, and those referring to device maps as bus addresses, since these devices are always mapped through some architecture-specific bus — for example, the PCI bus in the x86 architecture, the AMBA bus in ARM architectures, the SuperHyway bus in SuperH architectures, etc.

All the architecture-dependent values of these physical and bus addresses are either dynamically configurable, or are to be obtained from the data-sheets (i.e., hardware manuals) of the corresponding architecture processors/controllers. The interesting part is that in Linux, none of these are directly accessible, but are to be mapped to virtual addresses and then accessed through them — thus making the RAM and device accesses generic enough. The corresponding APIs (prototyped in `<asm/io.h>`) for mapping and unmapping the device bus addresses to virtual addresses are:

```
void *ioremap(unsigned long device_bus_address, unsigned long device_region_size);
void iounmap(void *virt_addr);
```

Once mapped to virtual addresses, it depends on the device datasheet as to which set of device registers and/or device memory to read from or write into, by adding their offsets to the virtual address returned by `ioremap()`. For that, the following are the APIs (also prototyped in `<asm/io.h>`):

```
unsigned int ioread8(void *virt_addr);
unsigned int ioread16(void *virt_addr);
unsigned int ioread32(void *virt_addr);
unsigned int iowrite8(u8 value, void *virt_addr);
unsigned int iowrite16(u16 value, void *virt_addr);
unsigned int iowrite32(u32 value, void *virt_addr);
```

### Accessing the video RAM of ‘DOS’ days

After this first set of information, students were directed for the live experiments. The suggested initial experiment was with the video RAM of “DOS” days, to understand the usage of the above APIs.

Shweta got onto the system and went through `/proc/iomem` (as in Figure 2) and got the video RAM address, ranging from `0x000A0000` to `0x000BFFFF`. She added the above APIs, with appropriate parameters, into the constructor and destructor of her existing “null” driver, to convert it into a “vram” driver. Then she added the user access to the video RAM through read and write calls of the “vram” driver; here’s her new file — `video_ram.c`:

```
#include <linux/module.h>
#include <linux/version.h>
#include <linux/kernel.h>
#include <linux/types.h>
#include <linux/kdev_t.h>
#include <linux/fs.h>
#include <linux/device.h>
#include <linux/cdev.h>
#include <linux/uaccess.h>
#include <asm/io.h>
#define VRAM_BASE 0x000A0000
#define VRAM_SIZE 0x00020000
static void __iomem *vram;
static dev_t first;
static struct cdev c_dev;
static struct class *cl;
static int my_open(struct inode *i, struct file *f)
{
return 0;
}
static int my_close(struct inode *i, struct file *f)
{
return 0;
}
static ssize_t my_read(struct file *f, char __user *buf, size_t len, loff_t *off)
{
int i;
u8 byte;
if (*off >= VRAM_SIZE)
{
return 0;
}
if (*off + len > VRAM_SIZE)
{
len = VRAM_SIZE - *off;
}
for (i = 0; i < len; i++)
{
byte = ioread8((u8 *)vram + *off + i);
if (copy_to_user(buf + i, &byte, 1))
{
return -EFAULT;
}
}
*off += len;
return len;
}
static ssize_t my_write(struct file *f, const char __user *buf, size_t len, loff_t *off)
{
int i;
u8 byte;
if (*off >= VRAM_SIZE)
{
return 0;
}
if (*off + len > VRAM_SIZE)
{
len = VRAM_SIZE - *off;
}
for (i = 0; i < len; i++)
{
if (copy_from_user(&byte, buf + i, 1))
{
return -EFAULT;
}
iowrite8(byte, (u8 *)vram + *off + i);
}
*off += len;
return len;
}
static struct file_operations vram_fops =
{
.owner = THIS_MODULE,
.open = my_open,
.release = my_close,
.read = my_read,
.write = my_write
};
static int __init vram_init(void) /* Constructor */
{
if ((vram = ioremap(VRAM_BASE, VRAM_SIZE)) == NULL)
{
printk(KERN_ERR "Mapping video RAM failed\n");
return -1;
}
if (alloc_chrdev_region(&first, 0, 1, "vram") < 0)
{
return -1;
}
if ((cl = class_create(THIS_MODULE, "chardrv")) == NULL)
{
unregister_chrdev_region(first, 1);
return -1;
}
if (device_create(cl, NULL, first, NULL, "vram") == NULL)
{
class_destroy(cl);
unregister_chrdev_region(first, 1);
return -1;
}
cdev_init(&c_dev, &vram_fops);
if (cdev_add(&c_dev, first, 1) == -1)
{
device_destroy(cl, first);
class_destroy(cl);
unregister_chrdev_region(first, 1);
return -1;
}
return 0;
}
static void __exit vram_exit(void) /* Destructor */
{
cdev_del(&c_dev);
device_destroy(cl, first);
class_destroy(cl);
unregister_chrdev_region(first, 1);
iounmap(vram);
}
module_init(vram_init);
module_exit(vram_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("Video RAM Driver");
```

### Summing up

Shweta then repeated the usual steps:

- Build the “vram” driver (`video_ram.ko` file) by running `make` with a changed `Makefile`.
- Load the driver using `insmod video_ram.ko`.
- Write into `/dev/vram`, say, using `echo -n "0123456789" > /dev/vram`.
- Read the `/dev/vram` contents using `od -t x1 -v /dev/vram | less`. (The usual `cat /dev/vram` can also be used, but that would give all the binary content. `od -t x1` shows it as hexadecimal. For more details, run `man od`.)
- Unload the driver using `rmmod video_ram`.

With half an hour still left for the end of the practical class, Shweta decided to walk around and possibly help somebody else with their experiments.


### Related Posts:

[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[File Systems A Semester Project-II, Part-19](http://opensourceforu.efytimes.com/2013/01/file-systems-a-semester-project-ii-part-19/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)

## Device Drivers, Part 8: Accessing x86-Specific I/O-Mapped Hardware

By Anil Kumar Pugalia on July 1, 2011 in Coding, Developers · 18 Comments

![Hardware access kit](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/07/opener-590x293.jpg)

The second day in the Linux device drivers’ laboratory was expected to be quite different from the typical software-oriented class. Apart from accessing and programming architecture-specific I/O mapped hardware in x86, it had a lot to offer first-timers with regard to reading hardware device manuals (commonly called data sheets) and how to understand them to write device drivers. In contrast, the [previous session about generic architecture-transparent hardware interfacing](http://www.opensourceforu.efytimes.com/2011/06/generic-hardware-access-in-linux/) was about mapping and accessing memory-mapped devices in Linux without any device-specific details.

### x86-specific hardware interfacing

Unlike most other architectures, x86 has an additional hardware accessing mechanism, through direct I/O mapping. It is a direct 16-bit addressing scheme, and doesn’t need mapping to a virtual address for access. These addresses are referred to as port addresses, or ports. Since this is an additional access mechanism, it has an additional set of x86 (assembly/machine code) instructions. And yes, there are the input instructions `inb`, `inw`, and `inl` for reading an 8-bit byte, a 16-bit word, and a 32-bit long word, respectively, from I/O mapped devices, through ports. The corresponding output instructions are `outb`, `outw` and `outl`, respectively. The equivalent C functions/macros (available through the header `<asm/io.h>`) are as follows:

```
u8 inb(unsigned long port);
u16 inw(unsigned long port);
u32 inl(unsigned long port);
void outb(u8 value, unsigned long port);
void outw(u16 value, unsigned long port);
void outl(u32 value, unsigned long port);
```

The basic question that may arise relates to which devices are I/O mapped and what the port addresses of these devices are. The answer is pretty simple. As per x86-standard, all these devices and their mappings are predefined. Figure 1 shows a snippet of these mappings through the kernel window `/proc/ioports`. The listing includes predefined DMA, the timer and RTC, apart from serial, parallel and PCI bus interfaces, to name a few.

![x86-specific I/O ports](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/07/figure_13_x86_specific_io_ports.png)
Figure 1: x86-specific I/O ports

### Simplest: serial port on x86

For example, the first serial port is always I/O mapped from `0x3F8` to `0x3FF`. But what does this mapping mean? What do we do with this? How does it help us to use the serial port? That is where a data-sheet of the corresponding device needs to be looked up.

A serial port is controlled by the serial controller device, commonly known as an UART (Universal Asynchronous Receiver/Transmitter) or at times a USART (Universal Synchronous/Asynchronous Receiver/Transmitter). On PCs, the typical UART used is the PC16550D. The ~~[data-sheet for this [PDF]](http://www.national.com/ds/PC/PC16550D.pdf)~~ can be downloaded as part of the ~~[self-extracting package [BIN file]](http://esrijan.com/DDK/LDDK-Package)~~ used for the Linux device driver kit, available at [lddk.esrijan.com](http://esrijan.com/index.php?pagefile=lddk).

Generally speaking, from where, and how, does one get these device data sheets? Typically, an online search with the corresponding device number should yield their data-sheet links. Then, how does one get the device number? Simple… by having a look at the device. If it is inside a desktop, open it up and check it out. Yes, this is the least you may have to do to get going with the hardware, in order to write device drivers. Assuming all this has been done, it is time to peep into the data sheet of the PC16550D UART.

Device driver writers need to understand the details of the registers of the device, as it is these registers that writers need to program, to use the device. Page 14 of the data sheet (also shown in Figure 2) shows the complete table of all the twelve 8-bit registers present in the UART PC16550D.

![Registers of UART PC16550D](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/07/figure_14_uart_pc16550d_registers.png)
Figure 2: Registers of UART PC16550D

Each of the eight rows corresponds to the respective bit of the registers. Also, note that the register addresses start from 0 and goes up to 7. The interesting thing about this is that a data sheet always gives the register offsets, which then needs to be added to the base address of the device, to get the actual register addresses.

Who decides the base address and where is it obtained from? Base addresses are typically board/platform specific, unless they are dynamically configurable like in the case of PCI devices. In this case, i.e., a serial device on x86, it is dictated by the x86 architecture—and that precisely was the starting serial port address mentioned above—0x3F8.

Thus, the eight register offsets, 0 to 7, exactly map to the eight port addresses 0x3F8 to 0x3FF. So, these are the actual addresses to be read or written, for reading or writing the corresponding serial registers, to achieve the desired serial operations, as per the register descriptions.

All the serial register offsets and the register bit masks are defined in the header `<linux/serial_reg.h>`. So, rather than hard-coding these values from the data sheet, the corresponding macros could be used instead. All the following code uses these macros, along with the following:

```
#define SERIAL_PORT_BASE 0x3F8
```

Operating on the device registers

To summarise the decoding of the PC16550D UART data sheet, here are a few examples of how to do read and write operations of the serial registers and their bits.

Reading and writing the ‘Line Control Register (LCR)':

```
u8 val;
val = inb(SERIAL_PORT_BASE + UART_LCR /* 3 */);
outb(val, SERIAL_PORT_BASE + UART_LCR /* 3 */);
```

Setting and clearing the ‘Divisor Latch Access Bit (DLAB)’ in LCR:

```
u8 val;
val = inb(SERIAL_PORT_BASE + UART_LCR /* 3 */);
/* Setting DLAB */
val |= UART_LCR_DLAB /* 0x80 */;
outb(val, SERIAL_PORT_BASE + UART_LCR /* 3 */);
/* Clearing DLAB */
val &= ~UART_LCR_DLAB /* 0x80 */;
outb(val, SERIAL_PORT_BASE + UART_LCR /* 3 */);
```

Reading and writing the ‘Divisor Latch':

```
u8 dlab;
u16 val;
dlab = inb(SERIAL_PORT_BASE + UART_LCR);
dlab |= UART_LCR_DLAB; // Setting DLAB to access Divisor Latch
outb(dlab, SERIAL_PORT_BASE + UART_LCR);
val = inw(SERIAL_PORT_BASE + UART_DLL /* 0 */);
outw(val, SERIAL_PORT_BASE + UART_DLL /* 0 */);
```

### Blinking an LED

To get a real experience of low-level hardware access and Linux device drivers, the best way would be to play with the Linux device driver kit (LDDK) mentioned above. However, just for a feel of low-level hardware access, a blinking light emitting diode (LED) may be tried, as follows:

Connect a light-emitting diode (LED) with a 330 ohm resistor in series across Pin 3 (Tx) and Pin 5 (Gnd) of the DB9 connector of your PC.

Pull up and down the transmit (Tx) line with a 500 ms delay, by loading and unloading the `blink_led` driver, using insmod `blink_led.ko` and rmmod `blink_led`, respectively.

Driver file `blink_led.ko` can be created from its source file `blink_led.c` by running `make` with the usual driver `Makefile`. Given below is the complete `blink_led.c`:

```
#include <linux/module.h>
#include <linux/version.h>
#include <linux/types.h>
#include <linux/delay.h>
#include <asm/io.h>
#include <linux/serial_reg.h>
#define SERIAL_PORT_BASE 0x3F8
int __init init_module()
{
int i;
u8 data;
data = inb(SERIAL_PORT_BASE + UART_LCR);
for (i = 0; i < 5; i++)
{
/* Pulling the Tx line low */
data |= UART_LCR_SBC;
outb(data, SERIAL_PORT_BASE + UART_LCR);
msleep(500);
/* Defaulting the Tx line high */
data &= ~UART_LCR_SBC;
outb(data, SERIAL_PORT_BASE + UART_LCR);
msleep(500);
}
return 0;
}
void __exit cleanup_module()
{
}
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("Blinking LED Hack");
```

### Looking ahead

You might have wondered why Shweta is missing from this article? She bunked all the classes! Watch out for the [next article](http://www.opensourceforu.efytimes.com/2011/08/io-control-in-linux/) to find out why.


### Related Posts:
[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Heterogeneous Parallel Programming: Dive into the World of…](http://opensourceforu.efytimes.com/2013/12/heterogeneous-parallel-programming-dive-world-cuda/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)

## Device Drivers, Part 9: I/O Control in Linux

By Anil Kumar Pugalia on August 1, 2011 in Coding, Developers · 11 Comments

![Input/Output](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/08/device-drivers-9-590x349.jpg)

>This article, which is part of the series on Linux device drivers, talks about the typical ioctl() implementation and usage in Linux.

“Get me a laptop, and tell me about the x86 hardware interfacing experiments in the last Linux device drivers’ lab session, and also about what’s planned for the next session,” cried Shweta, exasperated at being confined to bed due to food poisoning at a friend’s party.

Shweta’s friends summarised the session, and told her that they didn’t know what the upcoming sessions, though related to hardware, would be about. When the doctor requested them to leave, they took the opportunity to plan and talk about the most common hardware-controlling operation, `ioctl()`.

### Introducing `ioctl()`

Input/Output Control (ioctl, in short) is a common operation, or system call, available in most driver categories. It is a one-bill-fits-all kind of system call. If there is no other system call that meets a particular requirement, then `ioctl()` is the one to use.

Practical examples include volume control for an audio device, display configuration for a video device, reading device registers, and so on — basically, anything to do with device input/output, or device-specific operations, yet versatile enough for any kind of operation (for example, for debugging a driver by querying driver data structures).

The question is: how can all this be achieved by a single function prototype? The trick lies in using its two key parameters: command and argument. The command is a number representing an operation. The argument command is the corresponding parameter for the operation. The `ioctl()` function implementation does a switch … case over the commmand to implement the corresponding functionality. The following has been its prototype in the Linux kernel for quite some time:

```
int ioctl(struct inode *i, struct file *f, unsigned int cmd, unsigned long arg);
```

However, from kernel 2.6.35, it changed to:

```
long ioctl(struct file *f, unsigned int cmd, unsigned long arg);
```

If there is a need for more arguments, all of them are put in a structure, and a pointer to the structure becomes the ‘one’ command argument. Whether integer or pointer, the argument is taken as a long integer in kernel-space, and accordingly type-cast and processed.

`ioctl() `is typically implemented as part of the corresponding driver, and then an appropriate function pointer is initialised with it, exactly as in other system calls like `open()`, `read()`, etc. For example, in character drivers, it is the ioctl or unlocked_ioctl (since kernel 2.6.35) function pointer field in the `struct file_operations` that is to be initialised.

Again, like other system calls, it can be equivalently invoked from user-space using the `ioctl() `system call, prototyped in `<sys/ioctl.h>` as:

```
int ioctl(int fd, int cmd, ...);
```

Here, `cmd` is the same as what is implemented in the driver’s `ioctl()`, and the variable argument construct (`...`) is a hack to be able to pass any type of argument (though only one) to the driver’s `ioctl()`. Other parameters will be ignored.

Note that both the command and command argument type definitions need to be shared across the driver (in kernel-space) and the application (in user-space). Thus, these definitions are commonly put into header files for each space.

### Querying driver-internal variables

To better understand the boring theory explained above, here’s the code set for the “debugging a driver” example mentioned earlier. This driver has three static global variables: `status`, `dignity`, and `ego`, which need to be queried and possibly operated from an application. The header file `query_ioctl.h` defines the corresponding commands and command argument type. A listing follows:

```
#ifndef QUERY_IOCTL_H
#define QUERY_IOCTL_H
#include <linux/ioctl.h>
typedef struct
{
int status, dignity, ego;
} query_arg_t;
#define QUERY_GET_VARIABLES _IOR('q', 1, query_arg_t *)
#define QUERY_CLR_VARIABLES _IO('q', 2)
#define QUERY_SET_VARIABLES _IOW('q', 3, query_arg_t *)
#endif
```

Using these, the driver’s `ioctl()` implementation in `query_ioctl.c` would be as follows:

```
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/version.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/device.h>
#include <linux/errno.h>
#include <asm/uaccess.h>
#include "query_ioctl.h"
#define FIRST_MINOR 0
#define MINOR_CNT 1
static dev_t dev;
static struct cdev c_dev;
static struct class *cl;
static int status = 1, dignity = 3, ego = 5;
static int my_open(struct inode *i, struct file *f)
{
return 0;
}
static int my_close(struct inode *i, struct file *f)
{
return 0;
}
#if (LINUX_VERSION_CODE < KERNEL_VERSION(2,6,35))
static int my_ioctl(struct inode *i, struct file *f, unsigned int cmd, unsigned long arg)
#else
static long my_ioctl(struct file *f, unsigned int cmd, unsigned long arg)
#endif
{
query_arg_t q;
switch (cmd)
{
case QUERY_GET_VARIABLES:
q.status = status;
q.dignity = dignity;
q.ego = ego;
if (copy_to_user((query_arg_t *)arg, &q, sizeof(query_arg_t)))
{
return -EACCES;
}
break;
case QUERY_CLR_VARIABLES:
status = 0;
dignity = 0;
ego = 0;
break;
case QUERY_SET_VARIABLES:
if (copy_from_user(&q, (query_arg_t *)arg, sizeof(query_arg_t)))
{
return -EACCES;
}
status = q.status;
dignity = q.dignity;
ego = q.ego;
break;
default:
return -EINVAL;
}
return 0;
}
static struct file_operations query_fops =
{
.owner = THIS_MODULE,
.open = my_open,
.release = my_close,
#if (LINUX_VERSION_CODE < KERNEL_VERSION(2,6,35))
.ioctl = my_ioctl
#else
.unlocked_ioctl = my_ioctl
#endif
};
static int __init query_ioctl_init(void)
{
int ret;
struct device *dev_ret;
if ((ret = alloc_chrdev_region(&dev, FIRST_MINOR, MINOR_CNT, "query_ioctl")) < 0)
{
return ret;
}
cdev_init(&c_dev, &query_fops);
if ((ret = cdev_add(&c_dev, dev, MINOR_CNT)) < 0)
{
return ret;
}
if (IS_ERR(cl = class_create(THIS_MODULE, "char")))
{
cdev_del(&c_dev);
unregister_chrdev_region(dev, MINOR_CNT);
return PTR_ERR(cl);
}
if (IS_ERR(dev_ret = device_create(cl, NULL, dev, NULL, "query")))
{
class_destroy(cl);
cdev_del(&c_dev);
unregister_chrdev_region(dev, MINOR_CNT);
return PTR_ERR(dev_ret);
}
return 0;
}
static void __exit query_ioctl_exit(void)
{
device_destroy(cl, dev);
class_destroy(cl);
cdev_del(&c_dev);
unregister_chrdev_region(dev, MINOR_CNT);
}
module_init(query_ioctl_init);
module_exit(query_ioctl_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("Query ioctl() Char Driver");
```

And finally, the corresponding invocation functions from the application `query_app.c` would be as follows:

```
#include <stdio.h>
#include <sys/types.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>
#include <sys/ioctl.h>
#include "query_ioctl.h"
void get_vars(int fd)
{
query_arg_t q;
if (ioctl(fd, QUERY_GET_VARIABLES, &q) == -1)
{
perror("query_apps ioctl get");
}
else
{
printf("Status : %d\n", q.status);
printf("Dignity: %d\n", q.dignity);
printf("Ego    : %d\n", q.ego);
}
}
void clr_vars(int fd)
{
if (ioctl(fd, QUERY_CLR_VARIABLES) == -1)
{
perror("query_apps ioctl clr");
}
}
void set_vars(int fd)
{
int v;
query_arg_t q;
printf("Enter Status: ");
scanf("%d", &v);
getchar();
q.status = v;
printf("Enter Dignity: ");
scanf("%d", &v);
getchar();
q.dignity = v;
printf("Enter Ego: ");
scanf("%d", &v);
getchar();
q.ego = v;
if (ioctl(fd, QUERY_SET_VARIABLES, &q) == -1)
{
perror("query_apps ioctl set");
}
}
int main(int argc, char *argv[])
{
char *file_name = "/dev/query";
int fd;
enum
{
e_get,
e_clr,
e_set
} option;
if (argc == 1)
{
option = e_get;
}
else if (argc == 2)
{
if (strcmp(argv[1], "-g") == 0)
{
option = e_get;
}
else if (strcmp(argv[1], "-c") == 0)
{
option = e_clr;
}
else if (strcmp(argv[1], "-s") == 0)
{
option = e_set;
}
else
{
fprintf(stderr, "Usage: %s [-g | -c | -s]\n", argv[0]);
return 1;
}
}
else
{
fprintf(stderr, "Usage: %s [-g | -c | -s]\n", argv[0]);
return 1;
}
fd = open(file_name, O_RDWR);
if (fd == -1)
{
perror("query_apps open");
return 2;
}
switch (option)
{
case e_get:
get_vars(fd);
break;
case e_clr:
clr_vars(fd);
break;
case e_set:
set_vars(fd);
break;
default:
break;
}
close (fd);
return 0;
}
```

Now try out `query_app.c` and `query_ioctl.c` with the following operations:

Build the `query_ioctl` driver (`query_ioctl.ko` file) and the application (`query_app` file) by running `make`, using the following `Makefile`:

```
# If called directly from the command line, invoke the kernel build system.
ifeq ($(KERNELRELEASE),)
KERNEL_SOURCE := /usr/src/linux
PWD := $(shell pwd)
default: module query_app
module:
$(MAKE) -C $(KERNEL_SOURCE) SUBDIRS=$(PWD) modules
clean:
$(MAKE) -C $(KERNEL_SOURCE) SUBDIRS=$(PWD) clean
${RM} query_app
# Otherwise KERNELRELEASE is defined; we've been invoked from the
# kernel build system and can use its language.
else
obj-m := query_ioctl.o
endif
```

Load the driver using `insmod query_ioctl.ko`.
With appropriate privileges and command-line arguments, run the application `query_app`:

-` ./query_app` — to display the driver variables
-` ./query_app -c` — to clear the driver variables
-` ./query_app -g` — to display the driver variables
-` ./query_app -s` — to set the driver variables (not mentioned above)

Unload the driver using `rmmod query_ioctl`.

### Defining the `ioctl()` commands

“Visiting time is over,” yelled the security guard. Shweta thanked her friends since she could understand most of the code now, including the need for `copy_to_user()`, as learnt earlier. But she wondered about `_IOR`, `_IO`, etc., which were used in defining commands in `query_ioctl.h`. These are usual numbers only, as mentioned earlier for an `ioctl()` command. Just that, now additionally, some useful command related information is also encoded as part of these numbers using various macros, as per the POSIX standard for `ioctl`. The standard talks about the 32-bit command numbers, formed of four components embedded into the [31:0] bits:

- The direction of command operation [bits 31:30] — read, write, both, or none — filled by the corresponding macro (`_IOR`, `_IOW`, `_IOWR`, `_IO`).
- The size of the command argument [bits 29:16] — computed using `sizeof()` with the command argument’s type — the third argument to these macros.
- The 8-bit magic number [bits 15:8] — to render the commands unique enough — typically an ASCII character (the first argument to these macros).
- The original command number [bits 7:0] — the actual command number (1, 2, 3, …), defined as per our requirement — the second argument to these macros.

Check out the header `<asm-generic/ioctl.h>` for implementation details.


### Related Posts:
[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[File Systems A Semester Project-II, Part-19](http://opensourceforu.efytimes.com/2013/01/file-systems-a-semester-project-ii-part-19/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)


## Device Drivers, Part 10: Kernel-Space Debuggers in Linux

By Anil Kumar Pugalia on September 1, 2011 in Coding, Developers · 0 Comments

![Debug that!](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/09/kernel-debugger-10-350x248.jpg)

>This article, which is part of the series on Linux device drivers, talks about kernel-space debugging in Linux.

Shweta, back from hospital, was relaxing in the library, reading various books. Ever since she learned of the `ioctl` way of debugging, she was impatient to find out more about debugging in kernel-space. She was curious about how and where to run the kernel-space debugger, if there was any. This was in contrast with application/user-space debugging, where we have the OS running underneath, and a shell or a GUI over it to run the debugger (like `gdb`, and the data display debugger, `ddd`). Then she came across this interesting kernel-space debugging mechanism using `kgdb`, provided as part of the kernel itself, since kernel 2.6.26.

### The debugger challenge in kernel-space

As we need some interface to be up to run a debugger to debug anything, a kernel debugger could be visualised in two possible ways:

- Put the debugger into the kernel itself, accessible via the usual console. For example, in the case of `kdb`, which was not official until kernel 2.6.35, one had to download source code (two sets of patches — one architecture-dependent, one architecture-independent) from [this FTP address](ftp://oss.sgi.com/projects/kdb/download/) and then patch these into the kernel source. However, since kernel 2.6.35, the majority of it is in the officially released kernel source. In either case, `kdb` support needs to be enabled in kernel source, with the kernel compiled, installed and booted with. The boot screen itself would give the `kdb` debugging interface.
- Put a minimal debugging server into the kernel; a client would connect to it from a remote host or local user-space over some interface (say serial or Ethernet). This is `kgdb`, the kernel’s `gdb` server, to be used with `gdb` as its client. Since kernel 2.6.26, its serial interface is part of the official kernel release. However, if you’re interested in a network interface, you still need to patch with one of the releases from the [kgdb project page](http://sourceforge.net/projects/kgdb/). In either case, you need to enable `kgdb` support in the kernel, recompile, install and boot the new kernel.

Please note that in both the above cases, the complete kernel source for the kernel to be debugged is needed, unlike for building modules, where just headers are sufficient. Here is how to play around with `kgdb` over the serial interface.

### Setting up the Linux kernel with `kgdb`

Here are the prerequisites: Either the kernel source package for the running kernel should be installed on your system, or a corresponding kernel source release should have been downloaded from [kernel.org](http://kernel.org/).

First of all, the kernel to be debugged needs to have `kgdb` enabled and built into it. To achieve that, the kernel source has to be configured with `CONFIG_KGDB=y`. Additionally, for `kgdb` over serial, `CONFIG_KGDB_SERIAL_CONSOLE=y` needs to be configured. And CONFIG_DEBUG_INFO is preferred for symbolic data to be built into the kernel, to make debugging with `gdb` more meaningful. CONFIG_FRAME_POINTER=y enables frame pointers in the kernel, allowing `gdb` to construct more accurate stack back-traces. All these options are available under “Kernel hacking” in the menu obtained in the kernel source directory (preferably as root, or using `sudo`), by issuing the following command:

```
$ make mrproper      # To clean up properly
$ make oldconfig     # Configure the kernel same as the current running one
$ make menuconfig    # Start the ncurses based menu for further configuration
```

![Configuring kernel options for kgdb](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/09/figure_15_configuring_kernel_with_kgdb.png)
Figure 1: Configuring kernel options for kgdb

See the highlighted selections in Figure 1, for how and where these options would be:

- “KGDB: kernel debugging with remote gdb” –> `CONFIG_KGDB`
- “KGDB: use kgdb over the serial console” –> `CONFIG_KGDB_SERIAL_CONSOLE`
- “Compile the kernel with debug info” –> `CONFIG_DEBUG_INFO`
- “Compile the kernel with frame pointers” –> `CONFIG_FRAME_POINTER`

Once configuration is saved, build the kernel (run `make`), and then a `make install` to install it, along with adding an entry for the installed kernel in the GRUB configuration file. Depending on the distribution, the GRUB configuration file may be `/boot/grub/menu.lst`, `/etc/grub.cfg`, or something similar. Once installed, the `kgdb-related` kernel boot parameters need to be added to this new entry, as shown in the highlighted text in Figure 2.

![GRUB configuration for kgdb](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/09/figure_16_grub_config_for_kernel_with_kgdb.png)
Figure 2: GRUB configuration for kgdb

`kgdboc` is for `gdb` connecting over the console, and the basic format is `kgdboc= <serial_device>`, `<baud-rate>` where:

- `<serial_device>` is the serial device file (port) on the system running the kernel to be debugged
- `<baud-rate>` is the baud rate of this serial port

`kgdbwait` tells the kernel to delay booting till a `gdb` client connects to it; this parameter should be given only after `kgdboc`.

With this, we’re ready to begin. Make a copy of the `vmlinux` kernel image for use on the `gdb` client system. Reboot, and at the GRUB menu, choose the new kernel, and then it will wait for `gdb` to connect over the serial port.

All the above snapshots are with kernel version 2.6.33.14. The same should work for any 2.6.3x release of the kernel source. Also, the snapshots for kgdb are captured over the serial device file `/dev/ttyS0`, i.e., the first serial port.

### Setting up `gdb` on another system

Following are the prerequisites:

- Serial ports of the system to be debugged, and the other system to run `gdb`, should be connected using a null modem (i.e., a cross-over serial) cable.
- The vmlinux kernel image built, with `kgdb` enabled, needs to be copied from the system to be debugged, into the working directory on the system where `gdb` is going to be run.

To get `gdb` to connect to the waiting kernel, launch `gdb` from the shell and run these commands:

```
(gdb) file vmlinux
(gdb) set remote interrupt-sequence Ctrl-C
(gdb) set remotebaud 115200
(gdb) target remote /dev/ttyS0
(gdb) continue
```

In the above commands, `vmlinux` is the kernel image copied from the system to be debugged.

### Debugging using `gdb` with `kgdb`

After this, it is all like debugging an application from `gdb`. One may stop execution using `Ctrl+C`, add break points using `b`[reak], stop execution using `s`[tep] or `n`[ext] … — the usual `gdb` way. There are enough `GDB` tutorials available online, if you need them. In fact, if you are not comfortable with text-based `GDB`, use any of the standard GUI tools over `gdb`, like ddd, Eclipse, etc.

### Summing up

By now, Shweta was excited about wanting to try out `kgdb`. Since she needed two systems to try it out, she went to the Linux device drivers’ lab. There, she set up the systems and ran `gdb` as described above.


### Related Posts:
[A Simple guide to building your own Linux Kernel](http://opensourceforu.efytimes.com/2013/05/a-simple-guide-to-building-your-own-linux-kernel/)
[Linux Kernel 4.2 RC8 Now Available For Download!](http://opensourceforu.efytimes.com/2015/08/linux-kernel-4-2-rc8-now-available-for-download/)
[Playing Hide and Seek with Passwords](http://opensourceforu.efytimes.com/2013/03/playing-hide-and-seek-with-passwords/)
[Learn the Art of Linux Troubleshooting](http://opensourceforu.efytimes.com/2013/04/learn-the-art-of-linux-troubleshooting/)
[Jumpstart Linux Kernel Module Programming](http://opensourceforu.efytimes.com/2014/03/jumpstart-linux-kernel-module-programming/)


## Device Drivers, Part 11: USB Drivers in Linux

By Anil Kumar Pugalia on October 1, 2011 in Coding, Developers · 13 Comments

![Let's ride the USB](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/device-driver-11-350x322.jpg)

>This article, which is part of the series on Linux device drivers, gets you started with writing your first USB driver in Linux.

Pugs’ pen drive was the device Shweta was playing with, when both of them sat down to explore the world of USB drivers in Linux. The fastest way to get the hang of it, and Pugs’ usual way, was to pick up a USB device, and write a driver for it, to experiment with. So they chose a pen drive (a.k.a. USB stick) that was at hand — a JetFlash from Transcend, with vendor ID `0x058f` and product ID `0x6387`.

### USB device detection in Linux

Whether a driver for a USB device is there or not on a Linux system, a valid USB device will always be detected at the hardware and kernel spaces of a USB-enabled Linux system, since it is designed (and detected) as per the USB protocol specifications. Hardware-space detection is done by the USB host controller — typically a native bus device, like a PCI device on x86 systems. The corresponding host controller driver would pick and translate the low-level physical layer information into higher-level USB protocol-specific information. The USB protocol formatted information about the USB device is then populated into the generic USB core layer (the usbcore driver) in kernel-space, thus enabling the detection of a USB device in kernel-space, even without having its specific driver.

After this, it is up to various drivers, interfaces, and applications (which are dependent on the various Linux distributions), to have the user-space view of the detected devices. Figure 1 shows a top-to-bottom view of the USB subsystem in Linux.

![USB subsystem in Linux](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/figure_17_usb_subsystem_in_linux.png)
Figure 1: USB subsystem in Linux

A basic listing of all detected USB devices can be obtained using the `lsusb` command, as root. Figure 2 shows this, with and without the pen drive plugged in. A `-v` option to `lsusb` provides detailed information.

![Output of lsusb](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/figure_18_lsusb_output.png)
Figure 2: Output of lsusb

In many Linux distributions like Mandriva, Fedora,… the `usbfs` driver is loaded as part of the default configuration. This enables the detected USB device details to be viewed in a more techno-friendly way through the `ß` window, using cat `/proc/bus/usb/devices`. Figure 3 shows a typical snippet of the same, clipped around the pen drive-specific section. The listing basically contains one such section for each valid USB device detected on the system.

![USB's proc window snippet](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/figure_19_usb_proc_window_snippet.png)
Figure 3: USB's proc window snippet

### Decoding a USB device section

To further decode these sections, a valid USB device needs to be understood first. All valid USB devices contain one or more configurations. A configuration of a USB device is like a profile, where the default one is the commonly used one. As such, Linux supports only one configuration per device — the default one. For every configuration, the device may have one or more interfaces. An interface corresponds to a function provided by the device.

There would be as many interfaces as the number of functions provided by the device. So, say an MFD (multi-function device) USB printer can do printing, scanning and faxing, then it most likely would have at least three interfaces, one for each of the functions. So, unlike other device drivers, a USB device driver is typically associated/written per interface, rather than the device as a whole — meaning that one USB device may have multiple device drivers, and different device interfaces may have the same driver — though, of course, one interface can have a maximum of one driver only.

It is okay and fairly common to have a single USB device driver for all the interfaces of a USB device. The `Driver=...` entry in the `proc` window output (Figure 3) shows the interface to driver mapping — a (`none`) indicating no associated driver.

For every interface, there would be one or more end-points. An end-point is like a pipe for transferring information either into or from the interface of the device, depending on the functionality. Based on the type of information, the endpoints have four types: Control, Interrupt, Bulk and Isochronous.

As per the USB protocol specification, all valid USB devices have an implicit special control end-point zero, the only bi-directional end-point. Figure 4 shows the complete pictorial representation of a valid USB device, based on the above explanation.

![USB device overview](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/figure_20_usb_device_overview.png)
Figure 4: USB device overview

Coming back to the USB device sections (Figure 3), the first letter on each line represents the various parts of the USB device specification just explained. For example, D for device, C for configuration, I for interface, E for endpoint, etc. Details about these and various others are available in the kernel source, in `Documentation/usb/proc_usb_info.txt`.

### The USB pen drive driver registration

“Seems like there are so many things to know about the USB protocol, to be able to write the first USB driver itself — device configuration, interfaces, transfer pipes, their four types, and so many other symbols like T, B, S, … under a USB device specification,” sighed Shweta.

“Yes, but don’t you worry — all of that can be covered in detail later. Let’s do first things first — get the pen drive’s interface associated with our USB device driver (`pen_register.ko`),” consoled Pugs.

Like any other Linux device driver, here, too, the constructor and the destructor are required — basically the same driver template that has been used for all the drivers. However, the content would vary, as this is a hardware protocol layer driver, i.e., a horizontal driver, unlike a character driver, which was one of the vertical drivers discussed earlier. The difference would be that instead of registering with and unregistering from VFS, here this would be done with the corresponding protocol layer — the USB core in this case; instead of providing a user-space interface like a device file, it would get connected with the actual device in hardware-space.

The USB core APIs for the same are as follows (prototyped in `<linux/usb.h>`):

```
int usb_register(struct usb_driver *driver);
void usb_deregister(struct usb_driver *);
```

As part of the `usb_driver` structure, the fields to be provided are the driver’s name, ID table for auto-detecting the particular device, and the two callback functions to be invoked by the USB core during a hot plugging and a hot removal of the device, respectively.

Putting it all together, `pen_register.c` would look like what follows:

```
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/usb.h>
static int pen_probe(struct usb_interface *interface, const struct usb_device_id *id)
{
printk(KERN_INFO "Pen drive (%04X:%04X) plugged\n", id->idVendor, id->idProduct);
return 0;
}
static void pen_disconnect(struct usb_interface *interface)
{
printk(KERN_INFO "Pen drive removed\n");
}
static struct usb_device_id pen_table[] =
{
{ USB_DEVICE(0x058F, 0x6387) },
{} /* Terminating entry */
};
MODULE_DEVICE_TABLE (usb, pen_table);
static struct usb_driver pen_driver =
{
.name = "pen_driver",
.id_table = pen_table,
.probe = pen_probe,
.disconnect = pen_disconnect,
};
static int __init pen_init(void)
{
return usb_register(&pen_driver);
}
static void __exit pen_exit(void)
{
usb_deregister(&pen_driver);
}
module_init(pen_init);
module_exit(pen_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("USB Pen Registration Driver");
```

Then, the usual steps for any Linux device driver may be repeated:

- Build the driver (`.ko` file) by running `make`.
- Load the driver using `insmod`.
- List the loaded modules using `lsmod`.
- Unload the driver using `rmmod`.

But surprisingly, the results wouldn’t be as expected. Check `dmesg` and the `proc` window to see the various logs and details. This is not because a USB driver is different from a character driver — but there’s a catch. Figure 3 shows that the pen drive has one interface (numbered 0), which is already associated with the usual usb-storage driver.

Now, in order to get our driver associated with that interface, we need to unload the usb-storage driver (i.e., `rmmod usb-storage`) and replug the pen drive. Once that’s done, the results would be as expected. Figure 5 shows a glimpse of the possible logs and a `proc` window snippet. Repeat hot-plugging in and hot-plugging out the pen drive to observe the probe and disconnect calls in action.

![Pen driver in action](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/figure_21_pen_driver.png)
Figure 5: Pen driver in action

###Summing up

“Finally! Something in action!” a relieved Shweta said. “But it seems like there are so many things (like the device ID table, probe, disconnect, etc.), yet to be understood to get a complete USB device driver in place.”

“Yes, you are right. Let’s take them up, one by one, with breaks,” replied Pugs, taking a break himself.


### Related Posts:

[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[Extend Wireless Router Capabilities Using a Netbook or…](http://opensourceforu.efytimes.com/2014/01/extend-wireless-router-capabilities-using-netbook-laptop/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)

## Device Drivers, Part 12: USB Drivers in Linux Continued

By Anil Kumar Pugalia on November 1, 2011 in Coding, Developers · 27 Comments

![USB Devices in Linux](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/usb-devices-2.jpg)

>The 12th part of the series on Linux device drivers takes you further along the path to writing your first USB driver in Linux — a continuation from the previous article.

Pugs continued, “Let’s build upon the USB device driver coded in our previous session, using the same
handy JetFlash pen drive from Transcend, with the vendor ID 0x058f and product ID 0x6387. For that, let’s dig further into the USB protocol, and then convert our learning into code.”

### USB endpoints and their types

Depending on the type and attributes of information to be transferred, a USB device may have one or more endpoints, each belonging to one of the following four categories:

- Control — to transfer control information. Examples include resetting the device, querying information about the device, etc. All USB devices always have the default control endpoint point as zero.
- Interrupt — for small and fast data transfers, typically of up to 8 bytes. Examples include data transfer for serial ports, human interface devices (HIDs) like keyboards, mouse, etc.
- Bulk — for big but comparatively slower data transfers. A typical example is data transfers for mass-storage devices.
- Isochronous — for big data transfers with a bandwidth guarantee, though data integrity may not be guaranteed. Typical practical usage examples include transfers of time-sensitive data like audio, video, etc.

Additionally, all but control endpoints could be “in” or “out”, indicating the direction of data transfer; “in” indicates data flow from the USB device to the host machine, and “out”, the other way.

Technically, an endpoint is identified using an 8-bit number, the most significant bit (MSB) of which indicates the direction — 0 means “out”, and 1 means “in”. Control endpoints are bi-directional, and the MSB is ignored.

Figure 1 shows a typical snippet of USB device specifications for devices connected on a system.

![USB's proc window snippet](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/usb-dd-2-figure_1_usb_proc_window_snippet.png)
Figure 1: USB's proc window snippet (click for larger view)

To be specific, the `E:` lines in the figure show examples of an interrupt endpoint of a UHCI Host Controller, and two bulk endpoints of the pen drive under consideration. Also, the endpoint numbers (in hex) are, respectively, `0x81`, `0x01` and `0x82` — the MSB of the first and third being `1`, indicating ‘in’ endpoints, represented by (`I`) in the figure; the second is an (`O`) or ‘out’ endpoint. `MxPS` specifies the maximum packet size, i.e., the data size that can be transferred in a single go. Again, as expected, for the interrupt endpoint, it is `2 (<=8)`, and `64` for the bulk endpoints. `Ivl` specifies the interval in milliseconds to be given between two consecutive data packet transfers for proper transfer, and is more significant for the interrupt endpoints.

### Decoding a USB device section

As we have just discussed regarding the `E:` line, it is the right time to decode the relevant fields of others as well. In short, these lines in a USB device section give a complete overview of the device as per the USB specifications, as [discussed in our previous article](http://www.opensourceforu.efytimes.com/2011/10/usb-drivers-in-linux-1/).

Refer back to Figure 1. The first letter of the first line of every device section is a `T`, indicating the position of the device in the USB tree, uniquely identified by the triplet `<usb bus number, usb tree level, usb port>`. `D` represents the device descriptor, containing at least the device version, device class/category, and the number of configurations available for this device.

There would be as many `C` lines as the number of configurations, though typically, it is one. `C`, the configuration descriptor, contains its index, the device attributes in this configuration, the maximum power (actually, current) the device would draw in this configuration, and the number of interfaces under this configuration.

Depending on this, there would be at least that many `I` lines. There could be more in case of an interface having alternates, i.e., the same interface number but with different properties — a typical scenario for Web-cams.

`I` represents the interface descriptor with its index, alternate number, the functionality class/category of this interface, the driver associated with this interface, and the number of endpoints under this interface.

The interface class may or may not be the same as that of the device class. And
depending on the number of endpoints, there would be as many `E` lines, details of which have already been discussed earlier.

The `*` after the `C` and `I` represents the currently active configuration and interface, respectively. The `P` line provides the vendor ID, product ID, and the product revision. `S` lines are string descriptors showing up some vendor-specific descriptive information about the device.

“Peeping into `cat /proc/bus/usb/devices` is good in order to figure out whether a device has been detected or not, and possibly to get the first-cut overview of the device. But most probably this information would be required to write the driver for the device as well. So, is there a way to access it using `C` code?” Shweta asked.

“Yes, definitely; that’s what I am going to tell you about, next. Do you remember that as soon as a USB device is plugged into the system, the USB host controller driver populates its information into the generic USB core layer? To be precise, it puts that into a set of structures embedded into one another, exactly as per the USB specifications,” Pugs replied.

The following are the exact data structures defined in `<linux/usb.h>`, ordered here in reverse, for flow clarity:

```
struct usb_device
{
…
struct usb_device_descriptor descriptor;
struct usb_host_config *config, *actconfig;
…
};
struct usb_host_config
{
struct usb_config_descriptor desc;
…
struct usb_interface *interface[USB_MAXINTERFACES];
…
};
struct usb_interface
{
struct usb_host_interface *altsetting /* array */, *cur_altsetting;
…
};
struct usb_host_interface
{
struct usb_interface_descriptor desc;
struct usb_host_endpoint *endpoint /* array */;
…
};
struct usb_host_endpoint
{
struct usb_endpoint_descriptor desc;
…
};
```

So, with access to the `struct usb_device` handle for a specific device, all the USB-specific information about the device can be decoded, as shown through the `/proc` window. But how does one get the device handle?

In fact, the device handle is not available directly in a driver; rather, the per-interface handles (pointers to `struct usb_interface`) are available, as USB drivers are written for device interfaces rather than the device as a whole.

Recall that the probe and disconnect callbacks, which are invoked by the USB core for every interface of the registered device, have the corresponding interface handle as their first parameter. Refer to the prototypes below:

```
int (*probe)(struct usb_interface *interface, const struct usb_device_id *id);
void (*disconnect)(struct usb_interface *interface);
```

So, with the interface pointer, all information about the corresponding interface can be accessed — and to get the container device handle, the following macro comes to the rescue:

```
struct usb_device device = interface_to_usbdev(interface);
```

Adding this new learning into last month’s registration-only driver gets the following code listing (`pen_info.c`):

```
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/usb.h>
static struct usb_device *device;
static int pen_probe(struct usb_interface *interface, const struct usb_device_id *id)
{
struct usb_host_interface *iface_desc;
struct usb_endpoint_descriptor *endpoint;
int i;
iface_desc = interface->cur_altsetting;
printk(KERN_INFO "Pen i/f %d now probed: (%04X:%04X)\n",
iface_desc->desc.bInterfaceNumber, id->idVendor, id->idProduct);
printk(KERN_INFO "ID->bNumEndpoints: %02X\n",
iface_desc->desc.bNumEndpoints);
printk(KERN_INFO "ID->bInterfaceClass: %02X\n",
iface_desc->desc.bInterfaceClass);
for (i = 0; i < iface_desc->desc.bNumEndpoints; i++)
{
endpoint = &iface_desc->endpoint[i].desc;
printk(KERN_INFO "ED[%d]->bEndpointAddress: 0x%02X\n",
i, endpoint->bEndpointAddress);
printk(KERN_INFO "ED[%d]->bmAttributes: 0x%02X\n",
i, endpoint->bmAttributes);
printk(KERN_INFO "ED[%d]->wMaxPacketSize: 0x%04X (%d)\n",
i, endpoint->wMaxPacketSize, endpoint->wMaxPacketSize);
}
device = interface_to_usbdev(interface);
return 0;
}
static void pen_disconnect(struct usb_interface *interface)
{
printk(KERN_INFO "Pen i/f %d now disconnected\n",
interface->cur_altsetting->desc.bInterfaceNumber);
}
static struct usb_device_id pen_table[] =
{
{ USB_DEVICE(0x058F, 0x6387) },
{} /* Terminating entry */
};
MODULE_DEVICE_TABLE (usb, pen_table);
static struct usb_driver pen_driver =
{
.name = "pen_driver",
.probe = pen_probe,
.disconnect = pen_disconnect,
.id_table = pen_table,
};
static int __init pen_init(void)
{
return usb_register(&pen_driver);
}
static void __exit pen_exit(void)
{
usb_deregister(&pen_driver);
}
module_init(pen_init);
module_exit(pen_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email@sarika-pugs.com>");
MODULE_DESCRIPTION("USB Pen Info Driver");
```

Then, the usual steps for any Linux device driver may be repeated, along with the pen drive steps:

- Build the driver (`pen_info.ko` file) by running make.
- Load the driver using insmod `pen_info.ko`.
- Plug in the pen drive (after making sure that the usb-storage driver is not already loaded).
- Unplug the pen drive.
- Check the output of `dmesg` for the logs.
- Unload the driver using `rmmod pen_info`.

Figure 2 shows a snippet of the above steps on Pugs’ system. Remember to ensure (in the output of `cat /proc/bus/usb/devices`) that the usual `usb-storage` driver is not the one associated with the pen drive interface, but rather the `pen_info` driver.

![Output of dmesg](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/11/figure_22_dmesg_log.png)
Figure 2: Output of dmesg

### Summing up

Before taking another break, Pugs shared two of the many mechanisms for a driver to specify its device to the USB core, using the `struct usb_device_id` table. The first one is by specifying the `<vendor id, product id>` pair using the `USB_DEVICE()` macro (as done above). The second one is by specifying the device class/category using the `USB_DEVICE_INFO()` macro. In fact, many more macros are available in `<linux/usb.h>` for various combinations. Moreover, multiple of these macros could be specified in the `usb_device_id` table (terminated by a null entry), for matching with any one of the criteria, enabling to write a single driver for possibly many devices.

“Earlier, you mentioned writing multiple drivers for a single device, as well. Basically, how do we selectively register or not register a particular interface of a USB device?”, queried Shweta. “Sure. That’s next in line of our discussion, along with the ultimate task in any device driver — the data-transfer mechanisms,” replied Pugs.

### Related Posts:

[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[Analyse Your Network Packets with LibPCAP](http://opensourceforu.efytimes.com/2014/02/analyse-network-packets-libpcap/)
[Extend Wireless Router Capabilities Using a Netbook or…](http://opensourceforu.efytimes.com/2014/01/extend-wireless-router-capabilities-using-netbook-laptop/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)

## Device Drivers, Part 13: Data Transfer to and from USB Devices

By Anil Kumar Pugalia on December 29, 2011 in Coding, Developers · 34 Comments

![USB device drivers](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/12/usb-device-drivers-3-590x341.jpg)

>This article, which is part of the series on Linux device drivers, continues from the previous two articles. It details the ultimate step of data transfer to and from a USB device, using your first USB driver in Linux.

Pugs continued, “To answer your question about how a driver selectively registers or skips a particular interface of a USB device, you need to understand the significance of the return value of the `probe()` callback.” Note that the USB core would invoke probe for all the interfaces of a detected device, except the ones which are already registered — thus, while doing it for the first time, it will probe for all interfaces. Now, if the probe returns 0, it means the driver has registered for that interface. Returning an error code indicates not registering for it. That’s all. “That was simple,” commented Shweta.

“Now, let’s talk about the ultimate — data transfers to and from a USB device,” continued Pugs.

“But before that, tell me, what is this MODULE_DEVICE_TABLE? This has been bothering me since you explained the USB device ID table macros,” asked Shweta, urging Pugs to slow down.

“That’s trivial stuff. It is mainly for the user-space `depmod`,” he said. ‘Module’ is another term for a driver, which can be dynamically loaded/unloaded. The macro `MODULE_DEVICE_TABLE` generates two variables in a module’s read-only section, which is extracted by `depmod` and stored in global map files under `/lib/modules/<kernel_version>`. Two such files are `modules.usbmap` and `modules.pcimap`, for USB and PCI device drivers, respectively. This enables auto-loading of these drivers, as we saw the usb-storage driver getting auto-loaded.

### USB data transfer

“Time for USB data transfers. Let’s build upon the USB device driver coded in our previous sessions, using the same handy JetFlash pen drive from Transcend, with vendor ID `0x058f` and product ID `0x6387`,” said Pugs, enthusiastically.

USB, being a hardware protocol, forms the usual horizontal layer in the kernel space. And hence, for it to provide an interface to user-space, it has to connect through one of the vertical layers. As the character (driver) vertical has already been discussed, it is the current preferred choice for the connection with the USB horizontal, in order to understand the complete data transfer flow.

Also, we do not need to get a free unreserved character major number, but can use the character major number 180, reserved for USB-based character device files. Moreover, to achieve this complete character driver logic with the USB horizontal in one go, the following are the APIs declared in `<linux/usb.h>`:

```
int usb_register_dev(struct usb_interface *intf, struct usb_class_driver *class_driver);
void usb_deregister_dev(struct usb_interface *intf, struct usb_class_driver *class_driver);
```

Usually, we would expect these functions to be invoked in the constructor and the destructor of a module, respectively. However, to achieve the hot-plug-n-play behaviour for the (character) device files corresponding to USB devices, these are instead invoked in the probe and disconnect callbacks, respectively.

The first parameter in the above functions is the interface pointer received as the first parameter in both probe and disconnect. The second parameter, `struct usb_class_driver`, needs to be populated with the suggested device file name and the set of device file operations, before invoking `usb_register_dev`. For the actual usage, refer to the functions `pen_probe` and `pen_disconnect` in the code listing of `pen_driver.c` below.

Moreover, as the file operations (write, read, etc.,) are now provided, that is exactly where we need to do the data transfers to and from the USB device. So, `pen_write` and `pen_read` below show the possible calls to `usb_bulk_msg()` (prototyped in `<linux/usb.h>`) to do the transfers over the pen drive’s bulk end-points 0x01 and 0x82, respectively. Refer to the ‘E’ lines of the middle section in Figure 1 for the endpoint number listings of our pen drive.

![USB specifications for the pen drive](http://www.opensourceforu.efytimes.com/wp-content/uploads/2011/12/figure_19_usb_proc_window_snippet.png)
Figure 1: USB specifications for the pen drive

Refer to the header file `<linux/usb.h>` under kernel sources, for the complete list of USB core API prototypes for other endpoint-specific data transfer functions like `usb_control_msg()`, `usb_interrupt_msg()`, etc. `usb_rcvbulkpipe()`, `usb_sndbulkpipe()`, and many such other macros, also defined in `<linux/usb.h>`, compute the actual endpoint bit-mask to be passed to the various USB core APIs.

Note that a pen drive belongs to a USB mass storage class, which expects a set of SCSI-like commands to be transacted over the bulk endpoints. So, a raw read/write as shown in the code listing below may not really do a data transfer as expected, unless the data is appropriately formatted. But still, this summarises the overall code flow of a USB driver. To get a feel of a real working USB data transfer in a simple and elegant way, one would need some kind of custom USB device, something like the one available [here](http://lddk.esrijan.com/).

```
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/usb.h>
#define MIN(a,b) (((a) <= (b)) ? (a) : (b))
#define BULK_EP_OUT 0x01
#define BULK_EP_IN 0x82
#define MAX_PKT_SIZE 512
static struct usb_device *device;
static struct usb_class_driver class;
static unsigned char bulk_buf[MAX_PKT_SIZE];
static int pen_open(struct inode *i, struct file *f)
{
return 0;
}
static int pen_close(struct inode *i, struct file *f)
{
return 0;
}
static ssize_t pen_read(struct file *f, char __user *buf, size_t cnt, loff_t *off)
{
int retval;
int read_cnt;
/* Read the data from the bulk endpoint */
retval = usb_bulk_msg(device, usb_rcvbulkpipe(device, BULK_EP_IN),
bulk_buf, MAX_PKT_SIZE, &read_cnt, 5000);
if (retval)
{
printk(KERN_ERR "Bulk message returned %d\n", retval);
return retval;
}
if (copy_to_user(buf, bulk_buf, MIN(cnt, read_cnt)))
{
return -EFAULT;
}
return MIN(cnt, read_cnt);
}
static ssize_t pen_write(struct file *f, const char __user *buf, size_t cnt, loff_t *off)
{
int retval;
int wrote_cnt = MIN(cnt, MAX_PKT_SIZE);
if (copy_from_user(bulk_buf, buf, MIN(cnt, MAX_PKT_SIZE)))
{
return -EFAULT;
}
/* Write the data into the bulk endpoint */
retval = usb_bulk_msg(device, usb_sndbulkpipe(device, BULK_EP_OUT),
bulk_buf, MIN(cnt, MAX_PKT_SIZE), &wrote_cnt, 5000);
if (retval)
{
printk(KERN_ERR "Bulk message returned %d\n", retval);
return retval;
}
return wrote_cnt;
}
static struct file_operations fops =
{
.open = pen_open,
.release = pen_close,
.read = pen_read,
.write = pen_write,
};
static int pen_probe(struct usb_interface *interface, const struct usb_device_id *id)
{
int retval;
device = interface_to_usbdev(interface);
class.name = "usb/pen%d";
class.fops = &fops;
if ((retval = usb_register_dev(interface, &class)) < 0)
{
/* Something prevented us from registering this driver */
err("Not able to get a minor for this device.");
}
else
{
printk(KERN_INFO "Minor obtained: %d\n", interface->minor);
}
return retval;
}
static void pen_disconnect(struct usb_interface *interface)
{
usb_deregister_dev(interface, &class);
}
/* Table of devices that work with this driver */
static struct usb_device_id pen_table[] =
{
{ USB_DEVICE(0x058F, 0x6387) },
{} /* Terminating entry */
};
MODULE_DEVICE_TABLE (usb, pen_table);
static struct usb_driver pen_driver =
{
.name = "pen_driver",
.probe = pen_probe,
.disconnect = pen_disconnect,
.id_table = pen_table,
};
static int __init pen_init(void)
{
int result;
/* Register this driver with the USB subsystem */
if ((result = usb_register(&pen_driver)))
{
err("usb_register failed. Error number %d", result);
}
return result;
}
static void __exit pen_exit(void)
{
/* Deregister this driver with the USB subsystem */
usb_deregister(&pen_driver);
}
module_init(pen_init);
module_exit(pen_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("USB Pen Device Driver");
```

As a reminder, the usual steps for any Linux device driver may be repeated with the above code, along with the following steps for the pen drive:

- Build the driver (`pen_driver.ko`) by running `make`.
- Load the driver using `insmod pen_driver.ko`.
- Plug in the pen drive (after making sure that the `usb-storage` driver is not already loaded).
- Check for the dynamic creation of `/dev/pen0` (0 being the minor number obtained — check `dmesg` logs for the value on your system).
- Possibly try some write/read on `/dev/pen0` (you most likely will get a connection timeout and/or broken pipe errors, because of non-conforming SCSI commands).
- Unplug the pen drive and look for `/dev/pen0` to be gone.
- Unload the driver using `rmmod pen_driver`.

Meanwhile, Pugs hooked up his first-of-its-kind creation — the Linux device driver kit (LDDK) — into his system for a live demonstration of the USB data transfers.

“Aha! Finally a cool complete working USB driver,” quipped Shweta, excited. “Want to have more fun? We could do a block driver over it…,” added Pugs. “Oh! Really?” asked Shweta, with glee. “Yes. But before that, we need to understand the partitioning mechanisms,” commented Pugs.


### Related Posts:

[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[Analyse Your Network Packets with LibPCAP](http://opensourceforu.efytimes.com/2014/02/analyse-network-packets-libpcap/)
[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)


## Device Drivers, Part 14: A Dive Inside the Hard Disk for Understanding Partitions

By Anil Kumar Pugalia on January 31, 2012 in Coding, Developers · 2 Comments

![Inside the hard drive](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/01/Hard-drive-opening-image.jpg)

>This article, which is part of the series on Linux device drivers, takes you on a tour inside a hard disk.

“Doesn’t it sound like a mechanical engineering subject: The design of the hard disk?” questioned Shweta. “Yes, it does. But understanding it gives us an insight into its programming aspect,” reasoned Pugs, while waiting for the commencement of the seminar on storage systems.

The seminar started with a few hard disks in the presenter’s hand and then a dive into her system, showing the output of `fdisk -l` (Figure 1).

![Partition listing by fdisk](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/01/figure_23_fdisk_listing.png)
Figure 1: Partition listing by fdisk

The first line shows the hard disk size in human-friendly format and in bytes. The second line mentions the number of logical heads, logical sectors per track, and the actual number of cylinders on the disk — together known as the geometry of the disk.

The 255 heads indicate the number of platters or disks, as one read-write head is needed per disk. Let’s number them, say D1, D2,  D255. Now, each disk would have the same number of concentric circular tracks, starting from the outside to the inside. In the above case, there are 60,801 such tracks per disk. Let’s number them, say T1, T2,  T60801. And a particular track number from all the disks forms a cylinder of the same number. For example, tracks T2 from D1, D2,  D255 will together form the cylinder C2. Now, each track has the same number of logical sectors — 63 in our case, say S1, S2,  S63. And each sector is typically 512 bytes. Given this data, one can actually compute the total usable hard disk size, using the following formula:

```
Usable hard disk size in bytes = (Number of heads or disks) * (Number of tracks per disk) * (Number of sectors per track) * (Number of bytes per sector, i.e. sector size)
```

For the disk under consideration, it would be: `255 * 60801 * 63 * 512 bytes = 500105249280 bytes`.

Note that this number may be slightly less than the actual hard disk (500107862016 bytes, in our case). The reason is that the formula doesn’t consider the bytes in the last partial or incomplete cylinder. The primary reason for that is the difference between today’s technology of organising the actual physical disk geometry and the traditional geometry representation using heads, cylinders and sectors.

Note that in the `fdisk` output, we referred to the heads and sectors per track as logical not physical. One may ask that if today’s disks don’t have such physical geometry concepts, then why still maintain them and represent them in a logical form? The main reason is to be able to continue with the same concepts of partitioning, and be able to maintain the same partition table formats, especially for the most prevalent DOS-type partition tables, which heavily depend on this simplistic geometry. Note the computation of cylinder size (`255 heads * 63 sectors / track * 512 bytes / sector = 8225280 bytes`) in the third line and then the demarcation of partitions in units of complete cylinders.

### DOS-type partition tables

This brings us to the next important topic: understanding DOS-type partition tables. But first, what is a partition, and why should we partition? A hard disk can be divided into one or more logical disks, each of which is called a partition. This is useful for organising different types of data separately, for example, different operating system data, user data, temporary data, etc.

So, partitions are basically logical divisions and need to be maintained by metadata, which is the partition table. A DOS-type partition table contains four partition entries, each a 16-byte entry. Each of these entries can be depicted by the following ‘C’ structure:

```
typedef struct
{
    unsigned char boot_type; // 0x00 - Inactive; 0x80 - Active (Bootable)
    unsigned char start_head;
    unsigned char start_sec:6;
    unsigned char start_cyl_hi:2;
    unsigned char start_cyl;
    unsigned char part_type;
    unsigned char end_head;
    unsigned char end_sec:6;
    unsigned char end_cyl_hi:2;
    unsigned char end_cyl;
    unsigned long abs_start_sec;
    unsigned long sec_in_part;
} PartEntry;
```

This partition table, followed by the two-byte signature `0xAA55`, resides at the end of the disk’s first sector, commonly known as the Master Boot Record (MBR). Hence, the starting offset of this partition table within the MBR is `512 - (4 * 16 + 2) = 446`. Also, a 4-byte disk signature is placed at offset 440.

The remaining top 440 bytes of the MBR are typically used to place the first piece of boot code, that is loaded by the BIOS to boot the system from the disk. The `part_info.c` listing contains these various definitions, along with code for parsing and printing a formatted output of the partition table.

From the partition table entry structure, it could be noted that the start and end cylinder fields are only 10 bits long, thus allowing a maximum of 1023 cylinders only. However, for today’s huge hard disks, this is in no way sufficient. Hence, in overflow cases, the corresponding `<head, cylinder, sector>` triplet in the partition table entry is set to the maximum value, and the actual value is computed using the last two fields: the absolute start sector number (abs_start_sec) and the number of sectors in this partition (`sec_in_part`).

The code for this too is in `part_info.c`:

```
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#define SECTOR_SIZE 512
#define MBR_SIZE SECTOR_SIZE
#define MBR_DISK_SIGNATURE_OFFSET 440
#define MBR_DISK_SIGNATURE_SIZE 4
#define PARTITION_TABLE_OFFSET 446
#define PARTITION_ENTRY_SIZE 16 // sizeof(PartEntry)
#define PARTITION_TABLE_SIZE 64 // sizeof(PartTable)
#define MBR_SIGNATURE_OFFSET 510
#define MBR_SIGNATURE_SIZE 2
#define MBR_SIGNATURE 0xAA55
#define BR_SIZE SECTOR_SIZE
#define BR_SIGNATURE_OFFSET 510
#define BR_SIGNATURE_SIZE 2
#define BR_SIGNATURE 0xAA55
typedef struct {
    unsigned char boot_type; // 0x00 - Inactive; 0x80 - Active (Bootable)
    unsigned char start_head;
    unsigned char start_sec:6;
    unsigned char start_cyl_hi:2;
    unsigned char start_cyl;
    unsigned char part_type;
    unsigned char end_head;
    unsigned char end_sec:6;
    unsigned char end_cyl_hi:2;
    unsigned char end_cyl;
    unsigned long abs_start_sec;
    unsigned long sec_in_part;
    } PartEntry;
typedef struct {
    unsigned char boot_code[MBR_DISK_SIGNATURE_OFFSET];
    unsigned long disk_signature;
    unsigned short pad;
    unsigned char pt[PARTITION_TABLE_SIZE];
    unsigned short signature;
} MBR;
void print_computed(unsigned long sector) {
    unsigned long heads, cyls, tracks, sectors;
    sectors = sector % 63 + 1 /* As indexed from 1 */;
    tracks = sector / 63;
    cyls = tracks / 255 + 1 /* As indexed from 1 */;
    heads = tracks % 255;
    printf("(%3d/%5d/%1d)", heads, cyls, sectors);
}
int main(int argc, char *argv[]) {
    char *dev_file = "/dev/sda";
    int fd, i, rd_val;
    MBR m;
    PartEntry *p = (PartEntry *)(m.pt);
    if (argc == 2) {
        dev_file = argv[1];
    }
    if ((fd = open(dev_file, O_RDONLY)) == -1) {
        fprintf(stderr, "Failed opening %s: ", dev_file);
        perror("");
        return 1;
    }
    if ((rd_val = read(fd, &m, sizeof(m))) != sizeof(m)) {
        fprintf(stderr, "Failed reading %s: ", dev_file);
        perror("");
        close(fd);
        return 2;
    }
    close(fd);
    printf("\nDOS type Partition Table of %s:\n", dev_file);
    printf("  B Start (H/C/S)   End (H/C/S) Type  StartSec    TotSec\n");
    for (i = 0; i < 4; i++) {
        printf("%d:%d (%3d/%4d/%2d) (%3d/%4d/%2d)  %02X %10d %9d\n",
        i + 1, !!(p[i].boot_type & 0x80),
        p[i].start_head,
        1 + ((p[i].start_cyl_hi << 8) | p[i].start_cyl),
        p[i].start_sec,
        p[i].end_head,
        1 + ((p[i].end_cyl_hi << 8) | p[i].end_cyl),
        p[i].end_sec,
        p[i].part_type,
        p[i].abs_start_sec, p[i].sec_in_part);
    }
    printf("\nRe-computed Partition Table of %s:\n", dev_file);
    printf("  B Start (H/C/S)   End (H/C/S) Type  StartSec    TotSec\n");
    for (i = 0; i < 4; i++) {
        printf("%d:%d ", i + 1, !!(p[i].boot_type & 0x80));
        print_computed(p[i].abs_start_sec);
        printf(" ");
        print_computed(p[i].abs_start_sec + p[i].sec_in_part - 1);
        printf(" %02X %10d %9d\n", p[i].part_type,
        p[i].abs_start_sec, p[i].sec_in_part);
    }
    printf("\n");
    return 0;
}
```

As the above is an application, compile it with `gcc part_info.c -o part_info`, and then run `./part_info /dev/sda` to check out your primary partitioning information on `/dev/sda`. Figure 2 shows the output of `./part_info` on the presenter’s system. Compare it with the `fdisk` output in Figure 1.

![Output of ./part_info](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/01/figure_24_part_info_output.png)
Figure 2: Output of ./part_info

### Partition types and boot records

Now, as this partition table is hard-coded to have four entries, that’s the maximum number of partitions you can have. These are called primary partitions, each having an associated type in the corresponding partition table entry. These types are typically coined by various OS vendors, and hence sort of map to various OSs like DOS, Minix, Linux, Solaris, BSD, FreeBSD, QNX, W95, Novell Netware, etc., to be used for/with the particular OS. However, this is more a formality than a real requirement.

Besides this, one of the four primary partitions can be labelled as something called an extended partition, which has a special significance. As the name suggests, it is used to further extend hard disk division, i.e., to have more partitions. These are called logical partitions and are created within the extended partition. The metadata of these is maintained in a linked-list format, allowing an unlimited number of logical partitions (at least theoretically).

For that, the first sector of the extended partition, commonly called the Boot Record (BR), is used like the MBR to store (the linked-list head of) the partition table for the logical partitions. Subsequent linked-list nodes are stored in the first sector of the subsequent logical partitions, referred to as the Logical Boot Record (LBR). Each linked-list node is a complete 4-entry partition table, though only the first two entries are used — the first for the linked-list data, namely, information about the immediate logical partition, and the second as the linked list’s next pointer, pointing to the list of remaining logical partitions.

To compare and understand the primary partitioning details on your system’s hard disk, follow the steps (as the root user — hence with care) given below:

```
./part_info /dev/sda ## Displays the partition table on /dev/sda
fdisk -l /dev/sda ## To display and compare the partition table entries with the above
```

In case you have multiple hard disks (`/dev/sdb`, …), hard disk device files with other names (`/dev/hda`, …), or an extended partition, you may try `./part_info <device_file_name>` on them as well. Trying on an extended partition would give you the information about the starting partition table of the logical partitions.

Right now, we have carefully and selectively played (read-only) with the system’s hard disk. Why carefully? Since otherwise, we may render our system non-bootable. But no learning is complete without a total exploration. Hence, in our next session, we will create a dummy disk in RAM and do destructive exploration on it.

### Related Posts:

[File Systems A Semester Project-II, Part-19](http://opensourceforu.efytimes.com/2013/01/file-systems-a-semester-project-ii-part-19/)
[Write Your Own conio.h for GNU/Linux](http://opensourceforu.efytimes.com/2014/03/write-conio-h-gnulinux/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[Be Cautious while using Bit Fields for Programming](http://opensourceforu.efytimes.com/2015/03/be-cautious-while-using-bit-fields-for-programming/)
[A Look at the Basics of LVM](http://opensourceforu.efytimes.com/2013/12/look-basics-lvm/)

## Device Drivers, Part 15: Disk on RAM — Playing with Block Drivers

By Anil Kumar Pugalia on February 28, 2012 in Coding, Developers · 21 Comments

![Disk on RAM?](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/02/DD-RAM-590x395.jpg)

>This article, which is part of the series on Linux device drivers, experiments with a dummy hard disk on RAM to demonstrate how block drivers work.

After a [delicious lunch](http://www.opensourceforu.efytimes.com/2012/01/device-drivers-partitions-hard-disk/), theory makes the audience sleepy. So, let’s start with the code itself.

### Disk On RAM source code

Let’s us create a directory called DiskOnRAM which holds the following six files — three ‘C’ source files, two ‘C’ headers, and one Makefile.

partition.h

```
#ifndef PARTITION_H
#define PARTITION_H
#include <linux/types.h>
extern void copy_mbr_n_br(u8 *disk);
#endif
```

partition.c

```
#include <linux/string.h>
#include "partition.h"
#define ARRAY_SIZE(a) (sizeof(a) / sizeof(*a))
#define SECTOR_SIZE 512
#define MBR_SIZE SECTOR_SIZE
#define MBR_DISK_SIGNATURE_OFFSET 440
#define MBR_DISK_SIGNATURE_SIZE 4
#define PARTITION_TABLE_OFFSET 446
#define PARTITION_ENTRY_SIZE 16 // sizeof(PartEntry)
#define PARTITION_TABLE_SIZE 64 // sizeof(PartTable)
#define MBR_SIGNATURE_OFFSET 510
#define MBR_SIGNATURE_SIZE 2
#define MBR_SIGNATURE 0xAA55
#define BR_SIZE SECTOR_SIZE
#define BR_SIGNATURE_OFFSET 510
#define BR_SIGNATURE_SIZE 2
#define BR_SIGNATURE 0xAA55
typedef struct
{
unsigned char boot_type; // 0x00 - Inactive; 0x80 - Active (Bootable)
unsigned char start_head;
unsigned char start_sec:6;
unsigned char start_cyl_hi:2;
unsigned char start_cyl;
unsigned char part_type;
unsigned char end_head;
unsigned char end_sec:6;
unsigned char end_cyl_hi:2;
unsigned char end_cyl;
unsigned long abs_start_sec;
unsigned long sec_in_part;
} PartEntry;
typedef PartEntry PartTable[4];
static PartTable def_part_table =
{
{
boot_type: 0x00,
start_head: 0x00,
start_sec: 0x2,
start_cyl: 0x00,
part_type: 0x83,
end_head: 0x00,
end_sec: 0x20,
end_cyl: 0x09,
abs_start_sec: 0x00000001,
sec_in_part: 0x0000013F
},
{
boot_type: 0x00,
start_head: 0x00,
start_sec: 0x1,
start_cyl: 0x0A, // extended partition start cylinder (BR location)
part_type: 0x05,
end_head: 0x00,
end_sec: 0x20,
end_cyl: 0x13,
abs_start_sec: 0x00000140,
sec_in_part: 0x00000140
},
{
boot_type: 0x00,
start_head: 0x00,
start_sec: 0x1,
start_cyl: 0x14,
part_type: 0x83,
end_head: 0x00,
end_sec: 0x20,
end_cyl: 0x1F,
abs_start_sec: 0x00000280,
sec_in_part: 0x00000180
},
{
}
};
static unsigned int def_log_part_br_cyl[] = {0x0A, 0x0E, 0x12};
static const PartTable def_log_part_table[] =
{
{
{
boot_type: 0x00,
start_head: 0x00,
start_sec: 0x2,
start_cyl: 0x0A,
part_type: 0x83,
end_head: 0x00,
end_sec: 0x20,
end_cyl: 0x0D,
abs_start_sec: 0x00000001,
sec_in_part: 0x0000007F
},
{
boot_type: 0x00,
start_head: 0x00,
start_sec: 0x1,
start_cyl: 0x0E,
part_type: 0x05,
end_head: 0x00,
end_sec: 0x20,
end_cyl: 0x11,
abs_start_sec: 0x00000080,
sec_in_part: 0x00000080
},
},
{
{
boot_type: 0x00,
start_head: 0x00,
start_sec: 0x2,
start_cyl: 0x0E,
part_type: 0x83,
end_head: 0x00,
end_sec: 0x20,
end_cyl: 0x11,
abs_start_sec: 0x00000001,
sec_in_part: 0x0000007F
},
{
boot_type: 0x00,
start_head: 0x00,
start_sec: 0x1,
start_cyl: 0x12,
part_type: 0x05,
end_head: 0x00,
end_sec: 0x20,
end_cyl: 0x13,
abs_start_sec: 0x00000100,
sec_in_part: 0x00000040
},
},
{
{
boot_type: 0x00,
start_head: 0x00,
start_sec: 0x2,
start_cyl: 0x12,
part_type: 0x83,
end_head: 0x00,
end_sec: 0x20,
end_cyl: 0x13,
abs_start_sec: 0x00000001,
sec_in_part: 0x0000003F
},
}
};
static void copy_mbr(u8 *disk)
{
memset(disk, 0x0, MBR_SIZE);
*(unsigned long *)(disk + MBR_DISK_SIGNATURE_OFFSET) = 0x36E5756D;
memcpy(disk + PARTITION_TABLE_OFFSET, &def_part_table, PARTITION_TABLE_SIZE);
*(unsigned short *)(disk + MBR_SIGNATURE_OFFSET) = MBR_SIGNATURE;
}
static void copy_br(u8 *disk, int start_cylinder, const PartTable *part_table)
{
disk += (start_cylinder * 32 /* sectors / cyl */ * SECTOR_SIZE);
memset(disk, 0x0, BR_SIZE);
memcpy(disk + PARTITION_TABLE_OFFSET, part_table,
PARTITION_TABLE_SIZE);
*(unsigned short *)(disk + BR_SIGNATURE_OFFSET) = BR_SIGNATURE;
}
void copy_mbr_n_br(u8 *disk)
{
int i;
copy_mbr(disk);
for (i = 0; i < ARRAY_SIZE(def_log_part_table); i++)
{
copy_br(disk, def_log_part_br_cyl[i], &def_log_part_table[i]);
}
}
```

ram_device.h

```
#ifndef RAMDEVICE_H
#define RAMDEVICE_H
#define RB_SECTOR_SIZE 512
extern int ramdevice_init(void);
extern void ramdevice_cleanup(void);
extern void ramdevice_write(sector_t sector_off, u8 *buffer, unsigned int sectors);
extern void ramdevice_read(sector_t sector_off, u8 *buffer, unsigned int sectors);
#endif
```


ram_device.c

```
#include <linux/types.h>
#include <linux/vmalloc.h>
#include <linux/string.h>
#include "ram_device.h"
#include "partition.h"
#define RB_DEVICE_SIZE 1024 /* sectors */
/* So, total device size = 1024 * 512 bytes = 512 KiB */
/* Array where the disk stores its data */
static u8 *dev_data;
int ramdevice_init(void)
{
dev_data = vmalloc(RB_DEVICE_SIZE * RB_SECTOR_SIZE);
if (dev_data == NULL)
return -ENOMEM;
/* Setup its partition table */
copy_mbr_n_br(dev_data);
return RB_DEVICE_SIZE;
}
void ramdevice_cleanup(void)
{
vfree(dev_data);
}
void ramdevice_write(sector_t sector_off, u8 *buffer, unsigned int sectors)
{
memcpy(dev_data + sector_off * RB_SECTOR_SIZE, buffer,
sectors * RB_SECTOR_SIZE);
}
void ramdevice_read(sector_t sector_off, u8 *buffer, unsigned int sectors)
{
memcpy(buffer, dev_data + sector_off * RB_SECTOR_SIZE,
sectors * RB_SECTOR_SIZE);
}
```

ram_block.c

```
/* Disk on RAM Driver */
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/types.h>
#include <linux/genhd.h>
#include <linux/blkdev.h>
#include <linux/errno.h>
#include "ram_device.h"
#define RB_FIRST_MINOR 0
#define RB_MINOR_CNT 16
static u_int rb_major = 0;
/*
* The internal structure representation of our Device
*/
static struct rb_device
{
/* Size is the size of the device (in sectors) */
unsigned int size;
/* For exclusive access to our request queue */
spinlock_t lock;
/* Our request queue */
struct request_queue *rb_queue;
/* This is kernel's representation of an individual disk device */
struct gendisk *rb_disk;
} rb_dev;
static int rb_open(struct block_device *bdev, fmode_t mode)
{
unsigned unit = iminor(bdev->bd_inode);
printk(KERN_INFO "rb: Device is opened\n");
printk(KERN_INFO "rb: Inode number is %d\n", unit);
if (unit > RB_MINOR_CNT)
return -ENODEV;
return 0;
}
static int rb_close(struct gendisk *disk, fmode_t mode)
{
printk(KERN_INFO "rb: Device is closed\n");
return 0;
}
/*
* Actual Data transfer
*/
static int rb_transfer(struct request *req)
{
//struct rb_device *dev = (struct rb_device *)(req->rq_disk->private_data);
int dir = rq_data_dir(req);
sector_t start_sector = blk_rq_pos(req);
unsigned int sector_cnt = blk_rq_sectors(req);
struct bio_vec *bv;
struct req_iterator iter;
sector_t sector_offset;
unsigned int sectors;
u8 *buffer;
int ret = 0;
//printk(KERN_DEBUG "rb: Dir:%d; Sec:%lld; Cnt:%d\n", dir, start_sector, sector_cnt);
sector_offset = 0;
rq_for_each_segment(bv, req, iter)
{
buffer = page_address(bv->bv_page) + bv->bv_offset;
if (bv->bv_len % RB_SECTOR_SIZE != 0)
{
printk(KERN_ERR "rb: Should never happen: "
"bio size (%d) is not a multiple of RB_SECTOR_SIZE (%d).\n"
"This may lead to data truncation.\n",
bv->bv_len, RB_SECTOR_SIZE);
ret = -EIO;
}
sectors = bv->bv_len / RB_SECTOR_SIZE;
printk(KERN_DEBUG "rb: Sector Offset: %lld; Buffer: %p; Length: %d sectors\n",
sector_offset, buffer, sectors);
if (dir == WRITE) /* Write to the device */
{
ramdevice_write(start_sector + sector_offset, buffer, sectors);
}
else /* Read from the device */
{
ramdevice_read(start_sector + sector_offset, buffer, sectors);
}
sector_offset += sectors;
}
if (sector_offset != sector_cnt)
{
printk(KERN_ERR "rb: bio info doesn't match with the request info");
ret = -EIO;
}
return ret;
}
/*
* Represents a block I/O request for us to execute
*/
static void rb_request(struct request_queue *q)
{
struct request *req;
int ret;
/* Gets the current request from the dispatch queue */
while ((req = blk_fetch_request(q)) != NULL)
{
#if 0
/*
* This function tells us whether we are looking at a filesystem request
* - one that moves block of data
*/
if (!blk_fs_request(req))
{
printk(KERN_NOTICE "rb: Skip non-fs request\n");
/* We pass 0 to indicate that we successfully completed the request */
__blk_end_request_all(req, 0);
//__blk_end_request(req, 0, blk_rq_bytes(req));
continue;
}
#endif
ret = rb_transfer(req);
__blk_end_request_all(req, ret);
//__blk_end_request(req, ret, blk_rq_bytes(req));
}
}
/*
* These are the file operations that performed on the ram block device
*/
static struct block_device_operations rb_fops =
{
.owner = THIS_MODULE,
.open = rb_open,
.release = rb_close,
};
/*
* This is the registration and initialization section of the ram block device
* driver
*/
static int __init rb_init(void)
{
int ret;
/* Set up our RAM Device */
if ((ret = ramdevice_init()) < 0)
{
return ret;
}
rb_dev.size = ret;
/* Get Registered */
rb_major = register_blkdev(rb_major, "rb");
if (rb_major <= 0)
{
printk(KERN_ERR "rb: Unable to get Major Number\n");
ramdevice_cleanup();
return -EBUSY;
}
/* Get a request queue (here queue is created) */
spin_lock_init(&rb_dev.lock);
rb_dev.rb_queue = blk_init_queue(rb_request, &rb_dev.lock);
if (rb_dev.rb_queue == NULL)
{
printk(KERN_ERR "rb: blk_init_queue failure\n");
unregister_blkdev(rb_major, "rb");
ramdevice_cleanup();
return -ENOMEM;
}
/*
* Add the gendisk structure
* By using this memory allocation is involved,
* the minor number we need to pass bcz the device
* will support this much partitions
*/
rb_dev.rb_disk = alloc_disk(RB_MINOR_CNT);
if (!rb_dev.rb_disk)
{
printk(KERN_ERR "rb: alloc_disk failure\n");
blk_cleanup_queue(rb_dev.rb_queue);
unregister_blkdev(rb_major, "rb");
ramdevice_cleanup();
return -ENOMEM;
}
/* Setting the major number */
rb_dev.rb_disk->major = rb_major;
/* Setting the first mior number */
rb_dev.rb_disk->first_minor = RB_FIRST_MINOR;
/* Initializing the device operations */
rb_dev.rb_disk->fops = &rb_fops;
/* Driver-specific own internal data */
rb_dev.rb_disk->private_data = &rb_dev;
rb_dev.rb_disk->queue = rb_dev.rb_queue;
/*
* You do not want partition information to show up in
* cat /proc/partitions set this flags
*/
//rb_dev.rb_disk->flags = GENHD_FL_SUPPRESS_PARTITION_INFO;
sprintf(rb_dev.rb_disk->disk_name, "rb");
/* Setting the capacity of the device in its gendisk structure */
set_capacity(rb_dev.rb_disk, rb_dev.size);
/* Adding the disk to the system */
add_disk(rb_dev.rb_disk);
/* Now the disk is "live" */
printk(KERN_INFO "rb: Ram Block driver initialised (%d sectors; %d bytes)\n",
rb_dev.size, rb_dev.size * RB_SECTOR_SIZE);
return 0;
}
/*
* This is the unregistration and uninitialization section of the ram block
* device driver
*/
static void __exit rb_cleanup(void)
{
del_gendisk(rb_dev.rb_disk);
put_disk(rb_dev.rb_disk);
blk_cleanup_queue(rb_dev.rb_queue);
unregister_blkdev(rb_major, "rb");
ramdevice_cleanup();
}
module_init(rb_init);
module_exit(rb_cleanup);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email@sarika-pugs.com>");
MODULE_DESCRIPTION("Ram Block Driver");
MODULE_ALIAS_BLOCKDEV_MAJOR(rb_major);
```

You can also [download the code demonstrated from here](http://www.opensourceforu.efytimes.com/article_source_code/feb12/device_driver.zip).

As usual, executing `make` will build the ‘Disk on RAM’ driver (`dor.ko`), combining the three ‘C’ files. Check out the Makefile to see how.

### Makefile

```
# If called directly from the command line, invoke the kernel build system.
ifeq ($(KERNELRELEASE),)
KERNEL_SOURCE := /usr/src/linux
PWD := $(shell pwd)
default: module
module:
$(MAKE) -C $(KERNEL_SOURCE) SUBDIRS=$(PWD) modules
clean:
$(MAKE) -C $(KERNEL_SOURCE) SUBDIRS=$(PWD) clean
# Otherwise KERNELRELEASE is defined; we've been invoked from the
# kernel build system and can use its language.
else
obj-m := dor.o
dor-y := ram_block.o ram_device.o partition.o
endif
```

To clean the built files, run the usual `make clean`.

Once built, the following are the experimental steps (refer to Figures 1 to 3).

![](http://opensourceforu.efytimes.com/wp-content/uploads/2012/02/DD-1-Playing-with-Disk-on-RAM-driver-150x150.png)
Figure 1: Playing with the ‘Disk on RAM’ driver
![](http://opensourceforu.efytimes.com/wp-content/uploads/2012/02/DD-2-xxd-showing-initial-data-on-first-partition.png)
Figure 2: xxd showing the initial data on the first partition (/dev/rb1)
![](http://opensourceforu.efytimes.com/wp-content/uploads/2012/02/DD-3-Formatting-third-partition.png)
Figure 3: Formatting the third partition (/dev/rb3)

Please note that all these need to be executed with root privileges:

- Load the driver `dor.ko` using insmod. This would create the block device files representing the disk on 512 KiB of RAM, with three primary and three logical partitions.
- Check out the automatically created block device files (`/dev/rb*`). `/dev/rb` is the entire disk, which is 512 KiB in size. `rb1`, `rb2` and `rb3` are the primary partitions, with `rb2` being the extended partition and containing three logical partitions `rb5`, `rb6` and `rb7`.
- Read the entire disk (`/dev/rb`) using the disk dump utility `dd`.
- Zero out the first sector of the disk’s first partition (`/dev/rb1`), again using dd.
- Write some text into the disk’s first partition (`/dev/rb1`) using `cat`.
- Display the initial contents of the first partition (`/dev/rb1`) using the `xxd` utility. See Figure 2 for `xxd` output.
- Display the partition information for the disk using `fdisk`. See Figure 3 for fdisk output.
- Quick-format the third primary partition (`/dev/rb3`) as a vfat filesystem (like your pen drive), using `mkfs.vfat` (Figure 3).
- Mount the newly formatted partition using mount, say at `/mnt` (Figure 3).
- The disk usage utility df would now show this partition mounted at `/mnt` (Figure 3). You may go ahead and store files there, but remember that this is a disk on RAM, and so is non-persistent.
- Unload the driver using `rmmod dor` after unmounting the partition using `umount /mnt`. All data on the disk will be lost.

### Now let’s learn the rules

We have just played around with the disk on RAM (DOR), but without actually knowing the rules, i.e., the internal details of the game. So, let’s dig into the nitty-gritty to decode the rules. Each of the three `.c` files represent a specific part of the driver; `ram_device.c` and `ram_device.h` abstract the underlying RAM operations like `vmalloc/vfree`, `memcpy`, etc., providing disk operation APIs like `init/cleanup`, `read/write`, etc.

`partition.c` and `partition.h` provide the functionality to emulate the various partition tables on the DOR. Recall the `pre-lunch session (i.e., the previous article)](http://www.opensourceforu.efytimes.com/2012/01/device-drivers-partitions-hard-disk/) to understand the details of partitioning.

The code in this is responsible for the partition information like the number, type, size, etc., that is shown using `fdisk`. The `ram_block.c` file is the core block driver implementation, exposing the DOR as the block device files (`/dev/rb*`) to user-space. In other words, four of the five files `ram_device.*` and `partition.*` form the horizontal layer of the device driver, and `ram_block.c` forms the vertical (block) layer of the device driver. So, let’s understand that in detail.

### The block driver basics

Conceptually, the block drivers are very similar to character drivers, especially with regards to the following:

- Usage of device files
- Major and minor numbers
- Device file operations
- Concept of device registration

So, if you already know character driver implementation, it would be easy to understand block drivers.

However, they are definitely not identical. The key differences are as follows:

- Abstraction for block-oriented versus byte-oriented devices.
- Block drivers are designed to be used by I/O schedulers, for optimal performance. Compare that with character drivers that are to be used by VFS.
- Block drivers are designed to be integrated with the Linux buffer cache mechanism for efficient data access. Character drivers are pass-through drivers, accessing the hardware directly.

And these cause the implementation differences. Let’s analyse the key code snippets from `ram_block.c`, starting at the driver’s constructor `rb_init()`.

The first step is to register for an 8-bit (block) major number (which implicitly means registering for all 256 8-bit minor numbers associated with it). The function for that is as follows:

```
int register_blkdev(unsigned int major, const char *name);
```

Here, `major` is the major number to be registered, and name is a registration label displayed under the kernel window `/proc/devices`. Interestingly, `register_blkdev()` tries to allocate and register a freely available major number, when 0 is passed for its first parameter `major`; on success, the allocated major number is returned. The corresponding de-registration function is as follows:

```
void unregister_blkdev(unsigned int major, const char *name);
```

Both these are prototyped in `<linux/fs.h>`.

The second step is to provide the device file operations, through the struct `block_device_operations` (prototyped in `<linux/blkdev.h>`) for the registered major number device files.

However, these operations are too few compared to the character device file operations, and mostly insignificant. To elaborate, there are no operations even to read and write, which is surprising. But as we already know that block drivers need to integrate with the I/O schedulers, the read-write implementation is achieved through something called request queues. So, along with providing the device file operations, the following need to be provided:

- The request queue for queuing the read/write requests
- The spin lock associated with the request queue to protect its concurrent access
- The request function to process the requests in the request queue

Also, there is no separate interface for block device file creations, so the following are also provided:

- The device file name prefix, commonly referred to as `disk_name` (`rb` in the `dor` driver)
- The starting minor number for the device files, commonly referred to as `first_minor`.

Finally, two block-device-specific things are also provided, namely:

- The maximum number of partitions supported for this block device, by specifying the total minors.
- The underlying device size in units of 512-byte sectors, for the logical block access abstraction.

All these are registered through the `struct gendisk` using the following function:

```
void add_disk(struct gendisk *disk);
```

The corresponding `delete` function is as follows:

```
void del_gendisk(struct gendisk *disk);
```

Prior `to add_disk()`, the various fields of `struct gendisk` need to initialised, either directly or using various macros/functions like `set_capacity()`. `major`, `first_minor`, `fops`, `queue`, `disk_name` are the minimal fields to be initialised directly. And even before the initialisation of these fields, the `struct gendisk` needs to be allocated, using the function given below:

```
struct gendisk *alloc_disk(int minors);
```

Here, `minors` is the total number of partitions supported for this disk. And the corresponding inverse function would be:

```
void put_disk(struct gendisk *disk);
```

All these are prototyped in `<linux/genhd.h>`.

### Request queue and the request function

The request queue also needs to be initialised and set up into the `struct gendisk`, before `add_disk()`. The request queue is initialised by calling:

```
struct request_queue *blk_init_queue(request_fn_proc *, spinlock_t *);
```

We provide the request-processing function and the initialised concurrency protection spin-lock as parameters. The corresponding queue clean-up function is given below:

```
void blk_cleanup_queue(struct request_queue *);
```

The request (processing) function should be defined with the following prototype:

```
void request_fn(struct request_queue *q);
```

It should be coded to fetch a request from its parameter q, for instance, by using the following:

```
struct request *blk_fetch_request(struct request_queue *q);
```

Then it should either process it, or initiate processing. Whatever it does should be non-blocking, as this request function is called from a non-process context, and also after taking the queue’s spin-lock. Moreover, only functions not releasing or taking the queue’s spin-lock should be used within the request function.

A typical example of request processing, as demonstrated by the function `rb_request()` in `ram_block.c` is given below:

```
while ((req = blk_fetch_request(q)) != NULL) /* Fetching a request */
{
/* Processing the request: the actual data transfer */
ret = rb_transfer(req); /* Our custom function */
/* Informing that the request has been processed with return of ret */
__blk_end_request_all(req, ret);
}
```

### Requests and their processing

Our key function is `rb_transfer()`, which parses a `struct request` and accordingly does the actual data transfer. The struct request primarily contains the direction of data transfer, the starting sector for the data transfer, the total number of sectors for the data transfer, and the scatter-gather buffer for the data transfer. The various macros to extract these from the `struct request` are as follows:

```
rq_data_dir(req); /* Operation type: 0 - read from device; otherwise - write to device */
blk_req_pos(req); /* Starting sector to process */
blk_req_sectors(req); /* Total sectors to process */
rq_for_each_segment(bv, req, iter) /* Iterator to extract individual buffers */
```

`rq_for_each_segment()` is the special one which iterates over the `struct request (req)` using `iter`, and extracting the individual buffer information into the `struct bio_vec (bv: basic input/output vector)` on each iteration. And then, on each extraction, the appropriate data transfer is done, based on the operation type, invoking one of the following APIs from `ram_device.c`:

```
void ramdevice_write(sector_t sector_off, u8 *buffer, unsigned int sectors);
void ramdevice_read(sector_t sector_off, u8 *buffer, unsigned int sectors);
```

Check out the complete code of `rb_transfer()` in `ram_block.c`.

### Summing up

With that, we have actually learnt the beautiful block drivers by traversing through the design of a hard disk and playing around with partitioning, formatting and various other raw operations on a hard disk. Thanks for patiently listening. Now, the session is open for questions — please feel free to leave your queries as comments.

Feature image courtesy: materod. Reused under the terms of CC-BY-NC-ND 2.0 License.

### Related Posts:

[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[Analyse Your Network Packets with LibPCAP](http://opensourceforu.efytimes.com/2014/02/analyse-network-packets-libpcap/)
[Write Your Own conio.h for GNU/Linux](http://opensourceforu.efytimes.com/2014/03/write-conio-h-gnulinux/)

## Device Drivers, Part 16: Kernel Window — Peeping through /proc

By Anil Kumar Pugalia on March 26, 2012 in Coding, Developers · 4 Comments

![The virtual FS](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/03/vfs-access1.jpg)

>This article, which is part of the series on Linux device drivers, demonstrates the creation and usage of files under the /proc virtual filesystem.

After many months, Shweta and Pugs got together for some peaceful technical romancing. All through, they had been using all kinds of kernel windows, especially through the `/proc` virtual filesystem (using `cat`), to help them decode various details of Linux device drivers. Here’s a non-exhaustive summary listing:

- `/proc/modules` — dynamically loaded modules
- `/proc/devices` — registered character and block major numbers
- `/proc/iomem` — on-system physical RAM and bus device addresses
- `/proc/ioports` — on-system I/O port addresses (especially for x86 systems)
- `/proc/interrupts` — registered interrupt request numbers
- `/proc/softirqs` — registered soft IRQs
- `/proc/kallsyms` — running kernel symbols, including from loaded modules
- `/proc/partitions` — currently connected block devices and their partitions
- `/proc/filesystems` — currently active filesystem drivers
- `/proc/swaps` — currently active swaps
- `/proc/cpuinfo` — information about the CPU(s) on the system
- `/proc/meminfo` — information about the memory on the system, viz., RAM, swap, …

### Custom kernel windows

“Yes, these have been really helpful in understanding and debugging Linux device drivers. But is it possible for us to also provide some help? Yes, I mean can we create one such kernel window through `/proc`?” asked Shweta.

“Why just one? You can have as many as you want. And it’s simple — just use the right set of APIs, and there you go.”

“For you, everything is simple,” Shweta grumbled.

“No yaar, this is seriously simple,” smiled Pugs. “Just watch me creating one for you,” he added.
And in a jiffy, Pugs created the `proc_window.c` file below:

```
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/jiffies.h>
static struct proc_dir_entry *parent, *file, *link;
static int state = 0;
int time_read(char *page, char **start, off_t off, int count, int *eof, void *data) {
int len, val;
unsigned long act_jiffies;
len = sprintf(page, "state = %d\n", state);
act_jiffies = jiffies - INITIAL_JIFFIES;
val = jiffies_to_msecs(act_jiffies);
switch (state) {   
case 0:
len += sprintf(page + len, "time = %ld jiffies\n", act_jiffies);
break;
case 1:
len += sprintf(page + len, "time = %d msecs\n", val);
break;
case 2:
len += sprintf(page + len, "time = %ds %dms\n",
val / 1000, val % 1000);
break;
case 3:
val /= 1000;
len += sprintf(page + len, "time = %02d:%02d:%02d\n",
val / 3600, (val / 60) % 60, val % 60);
break;
default:
len += sprintf(page + len, "<not implemented>\n");
break;
}
len += sprintf(page + len, "{offset = %ld; count = %d;}\n", off, count);
return len;
}
int time_write(struct file *file, const char __user *buffer, unsigned long count, void *data) {
if (count > 2)
return count;
if ((count == 2) && (buffer[1] != '\n'))
return count;
if ((buffer[0] < '0') || ('9' < buffer[0]))
return count;
state = buffer[0] - '0';
return count;
}
static int __init proc_win_init(void) {
if ((parent = proc_mkdir("anil", NULL)) == NULL) {
return -1;
}
if ((file = create_proc_entry("rel_time", 0666, parent)) == NULL) {
remove_proc_entry("anil", NULL);
return -1;
}
file->read_proc = time_read;
file->write_proc = time_write;
if ((link = proc_symlink("rel_time_l", parent, "rel_time")) == NULL) {
remove_proc_entry("rel_time", parent);
remove_proc_entry("anil", NULL);
return -1;
}
link->uid = 0;
link->gid = 100;
return 0;
}
static void __exit proc_win_exit(void) {
remove_proc_entry("rel_time_l", parent);
remove_proc_entry("rel_time", parent);
remove_proc_entry("anil", NULL);
}
module_init(proc_win_init);
module_exit(proc_win_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs_dot_com>");
MODULE_DESCRIPTION("Kernel window /proc Demonstration Driver");
```

And then Pugs did the following:

- Built the driver file (`proc_window.ko`) using the usual driver’s `Makefile`.
- Loaded the driver using `insmod`.
- Showed various experiments using the newly created proc windows. (Refer to Figure 1.)
- And finally, unloaded the driver using `rmmod`.

![Peeping through /proc](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/03/Figure1-Peeping-through-proc.png)
Figure 1: Peeping through /proc

### Demystifying the details

Starting from the constructor `proc_win_init()`, three proc entries have been created:

- Directory `anil` under `/proc` (i.e., NULL parent) with default permissions 0755, using `proc_mkdir()`
- Regular file `rel_time` in the above directory, with permissions 0666, using `create_proc_entry()`
- Soft link `rel_time_l` to the file `rel_time`, in the same directory, using `proc_symlink()`

The corresponding removal of these is done with `remove_proc_entry()` in the destructor, `proc_win_exit()`, in chronological reverse order.

For every entry created under `/proc`, a corresponding `struct proc_dir_entry` is created. For each, many of its fields could be further updated as needed:

- mode — Permissions of the file
- uid — User ID of the file
- gid — Group ID of the file

Additionally, for a regular file, the following two function pointers for reading and writing over the file could be provided, respectively:

```
int (*read_proc)(char *page, char **start, off_t off, int count, int *eof, void *data)
int (*write_proc)(struct file *file, const char __user *buffer, unsigned long count, void *data)
```

`write_proc()` is very similar to the character driver’s file operation `write()`. The above implementation lets the user write a digit from 0 to 9, and accordingly sets the internal state. `read_proc()` in the above implementation provides the current state, and the time since the system has been booted up — in different units, based on the current state. These are jiffies in state 0; milliseconds in state 1; seconds and milliseconds in state 2; hours, minutes and seconds in state 3; and <not implemented> in other states.

And to check the computation accuracy, Figure 2 highlights the system uptime in the output of top. `read_proc`‘s page parameter is a page-sized buffer, typically to be filled up with count bytes from offset off. But more often than not (because of less content), just the page is filled up, ignoring all other parameters.

![Comparison with top’s output](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/03/Figure2-Comparison-with-top-output.png)
Figure 2: Comparison with top’s output

All the `/proc`-related structure definitions and function declarations are available through `<linux/proc_fs.h>`. The jiffies-related function declarations and macro definitions are in `<linux/jiffies.h>`. As a special note, the actual jiffies are calculated by subtracting `INITIAL_JIFFIES`, since on boot-up, jiffies is initialised to `INITIAL_JIFFIES` instead of zero.

### Summing up

“Hey Pugs! Why did you set the folder name to `anil`? Who is this Anil? You could have used my name, or maybe yours,” suggested Shweta. “Ha! That’s a surprise. My real name is Anil; it’s just that everyone in college knows me as Pugs,” smiled Pugs.

Watch out for further technical romancing from Pugs a.k.a Anil.

### Related Posts:

[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[Shell Scripts you will love to use](http://opensourceforu.efytimes.com/2015/07/shell-scripts-you-will-love-to-use/)
[Linux Firewall: Executing Iprules Using PHP](http://opensourceforu.efytimes.com/2013/12/linux-firewall-executing-iprules-using-php/)
[A Peek Into GNU debugger GDB](http://opensourceforu.efytimes.com/2014/02/peek-gnu-debugger-gdb/)
[Analyse Your Network Packets with LibPCAP](http://opensourceforu.efytimes.com/2014/02/analyse-network-packets-libpcap/)


## Device Drivers, Part 17: Module Interactions

By Anil Kumar Pugalia on May 3, 2012 in Coding, Developers · 3 Comments

![Module interractions](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/05/diskless-large-590x297.jpg)

>This article, which is part of the series on Linux device drivers, demonstrates various interactions with a Linux module.

As Shweta and Pugs gear up for their final semester’s project on Linux drivers, they’re closing in on some final titbits of technical romancing. This mainly includes the various communications with a Linux module (dynamically loadable and unloadable driver) like accessing its variables, calling its functions, and passing parameters to it.

### Global variables and functions

One might wonder what the big deal is about accessing a module’s variables and functions from outside it. Just make them global, declare them extern in a header, include the header and access, right? In the general application development paradigm, it’s this simple — but in kernel development, it isn’t despite of recommendations to make everything static, by default there always have been cases where non-static globals may be needed.

A simple example could be a driver spanning multiple files, with function(s) from one file needing to be called in the other. Now, to avoid any kernel name-space collisions even with such cases, every module is embodied in its own namespace. And we know that two modules with the same name cannot be loaded at the same time. Thus, by default, zero collision is achieved. However, this also implies that, by default, nothing from a module can be made really global throughout the kernel, even if we want to. And so, for exactly such scenarios, the `<linux/module.h>` header defines the
following macros:

```
EXPORT_SYMBOL(sym)
EXPORT_SYMBOL_GPL(sym)
EXPORT_SYMBOL_GPL_FUTURE(sym)
```

Each of these exports the symbol passed as their parameter, additionally putting them in one of the default, `_gpl` or `_gpl_future` sections, respectively. Hence, only one of them needs to be used for a particular symbol — though the symbol could be either a variable name or a function name. Here’s the complete code (`our_glob_syms.c`) to demonstrate this:

```
#include <linux/module.h>
#include <linux/device.h>
static struct class *cool_cl;
static struct class *get_cool_cl(void)
{
return cool_cl;
}
EXPORT_SYMBOL(cool_cl);
EXPORT_SYMBOL_GPL(get_cool_cl);
static int __init glob_sym_init(void)
{
if (IS_ERR(cool_cl = class_create(THIS_MODULE, "cool")))
/* Creates /sys/class/cool/ */
{
return PTR_ERR(cool_cl);
}
return 0;
}
static void __exit glob_sym_exit(void)
{
/* Removes /sys/class/cool/ */
class_destroy(cool_cl);
}
module_init(glob_sym_init);
module_exit(glob_sym_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email_at_sarika-pugs.com>");
MODULE_DESCRIPTION("Global Symbols exporting Driver");
```

Each exported symbol also has a corresponding structure placed into (each of) the kernel symbol table (`__ksymtab`), kernel string table (`__kstrtab`), and kernel CRC table (`__kcrctab`) sections, marking it to be globally accessible.

Figure 1 shows a filtered snippet of the `/proc/kallsyms` kernel window, before and after loading the module `our_glob_syms.ko`, which has been compiled using the usual driver `Makefile`.

![Our global symbols module](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/05/figure_30_our_glob_syms.png)
Figure 1: Our global symbols module

The following code shows the supporting header file (`our_glob_syms.h`), to be included by modules using the exported symbols `cool_cl` and `get_cool_cl`:

```
#ifndef OUR_GLOB_SYMS_H
#define OUR_GLOB_SYMS_H
#ifdef __KERNEL__
#include <linux/device.h>
extern struct class *cool_cl;
extern struct class *get_cool_cl(void);
#endif
#endif
```

Figure 1 also shows the file `Module.symvers`, generated by compiling the module `our_glob_syms`. This contains the various details of all the exported symbols in its directory. Apart from including the above header file, modules using the exported symbols should possibly have this file `Module.symvers` in their build directory.

Note that the `<linux/device.h>` header in the above examples is being included for the various class-related declarations and definitions, which have already been covered in the earlier discussion on character drivers.

### Module parameters

Being aware of passing command-line arguments to an application, it would be natural to ask if something similar can be done with a module — and the answer is, yes, it can. Parameters can be passed to a module while loading it, for instance, when using `insmod`. Interestingly enough, and in contrast to the command-line arguments to an application, these can be modified even later, through `sysfs` interactions.

The module parameters are set up using the following macro (defined in `<linux/moduleparam.h>`, included through `<linux/module.h>`):

```
module_param(name, type, perm)
```

Here, name is the parameter name, type is the type of the parameter, and perm refers to the permissions of the `sysfs` file corresponding to this parameter. The supported type values are: byte, short, ushort, int, uint, long, ulong, charp (character pointer), bool or invbool (inverted Boolean).

The following module code (`module_param.c`) demonstrates a module parameter:

```
#include <linux/module.h>
#include <linux/kernel.h>
static int cfg_value = 3;
module_param(cfg_value, int, 0764);
static int __init mod_par_init(void)
{
printk(KERN_INFO "Loaded with %d\n", cfg_value);
return 0;
}
static void __exit mod_par_exit(void)
{
printk(KERN_INFO "Unloaded cfg value: %d\n", cfg_value);
}
module_init(mod_par_init);
module_exit(mod_par_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Anil Kumar Pugalia <email@sarika-pugs.com>");
MODULE_DESCRIPTION("Module Parameter demonstration Driver");
```

![Experiments with the module parameter](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/05/figure_31_module_param.png)
Figure 2: Experiments with the module parameter

![Experiments with the module parameter (as root)](http://www.opensourceforu.efytimes.com/wp-content/uploads/2012/05/figure_32_module_param_as_root.png)
Figure 3: Experiments with the module parameter (as root)

Note that before the parameter setup, a variable of the same name and compatible type needs to be defined. Subsequently, the following steps and experiments are shown in Figures 2 and 3:

- Building the driver (`module_param.ko` file) using the usual driver `Makefile`
- Loading the driver using `insmod` (with and without parameters)
- Various experiments through the corresponding `/sys` entries

And finally, unloading the driver using `rmmod`.

Note the following:

- Initial value (3) of `cfg_value` becomes its default value when `insmod` is done without any parameters.
- Permission 0764 gives `rwx` to the user, `rw-` to the group, and `r--` for the others on the file `cfg_value` under the parameters of `module_param` under `/sys/module/`.

Check for yourself:

- The output of `dmesg`/`tail` on every `insmod` and `rmmod`, for the `printk` outputs.
- Try writing into the `/sys/module/module_param/parameters/cfg_value` file as a normal (non-root) user.

### Summing up

With this, the duo have a fairly good understanding of Linux drivers, and are all set to start working on their final semester project. Any guesses what their project is about? Hint: They have picked up one of the most daunting Linux driver topics. Let us see how they fare with it next month.

### Related Posts:

[An Introduction to the Linux Kernel](http://opensourceforu.efytimes.com/2015/06/an-introduction-to-the-linux-kernel/)
[Jumpstart Linux Kernel Module Programming](http://opensourceforu.efytimes.com/2014/03/jumpstart-linux-kernel-module-programming/)
[Writing a Basic Framebuffer Driver](http://opensourceforu.efytimes.com/2015/05/writing-a-basic-framebuffer-driver/)
[Talking to the Kernel through Sysfs](http://opensourceforu.efytimes.com/2015/05/talking-to-the-kernel-through-sysfs/)
[The Semester Project-IV File Systems: Formatting a Pen…](http://opensourceforu.efytimes.com/2013/03/the-semester-project-iv-file-systems-formatting-a-pen-drive/)












