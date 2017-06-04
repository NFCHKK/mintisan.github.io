
# [ARM Assembly Basics](https://azeria-labs.com/writing-arm-assembly-part-1/)


[TOC]


## 1. Writing ARM Assembly

### INTRODUCTION TO ARM ASSEMBLY BASICS

Welcome to this tutorial series on ARM assembly basics. This is the preparation for the followup tutorial series on ARM exploit development (not published yet). Before we can dive into creating ARM shellcode and build ROP chains, we need to cover some ARM Assembly basics first.

The following topics will be covered step by step:

ARM Assembly Basics Tutorial Series:Part 
1: Introduction to ARM AssemblyPart 
2: Data Types RegistersPart 
3: ARM Instruction SetPart 
4: Memory Instructions: Loading and Storing DataPart 
5: Load and Store MultiplePart 
6: Conditional Execution and BranchingPart 
7: Stack and Functions

To follow along with the examples, you will need an ARM based lab environment. If you don’t have an ARM device (like Raspberry Pi), you can set up your own lab environment in a Virtual Machine using QEMU and the Raspberry Pi distro by [following this tutorial](https://azeria-labs.com/emulate-raspberry-pi-with-qemu/). If you are not familiar with basic debugging with GDB, you can [get the basics in this tutorial](https://azeria-labs.com/debugging-with-gdb-introduction/). In this tutorial, the focus will be on ARM 32-bit, and the examples are compiled on an ARMv6.

**Why ARM?**

This tutorial is generally for people who want to learn the basics of ARM assembly. Especially for those of you who are interested in exploit writing on the ARM platform. You might have already noticed that ARM processors are everywhere around you. When I look around me, I can count far more devices that feature an ARM processor in my house than Intel processors. This includes phones, routers, and not to forget the IoT devices that seem to explode in sales these days. That said, the ARM processor has become one of the most widespread CPU cores in the world. Which brings us to the fact that like PCs, IoT devices are susceptible to improper input validation abuse such as buffer overflows. Given the widespread usage of ARM based devices and the potential for misuse, attacks on these devices have become much more common.
Yet, we have more experts specialized in x86 security research than we have for ARM, although ARM assembly language is perhaps the easiest assembly language in widespread use. So, why aren’t more people focusing on ARM? Perhaps because there are more learning resources out there covering exploitation on Intel than there are for ARM. Just think about the great tutorials on Intel x86 Exploit writing by the [Corelan Team](https://www.corelan.be/index.php/2009/07/19/exploit-writing-tutorial-part-1-stack-based-overflows/) – Guidelines like these help people interested in this specific area to get practical knowledge and the inspiration to learn beyond what is covered in those tutorials. If you are interested in x86 exploit writing, the Corelan tutorials are your perfect starting point. In this tutorial series here, we will focus on assembly basics and exploit writing on ARM.

### ARM PROCESSOR VS. INTEL PROCESSOR

There are many differences between Intel and ARM, but the main difference is the instruction set. Intel is a CISC (Complex Instruction Set Computing) processor that has a larger and more feature-rich instruction set and allows many complex instructions to access memory. It therefore has more operations, addressing modes, but less registers than ARM. CISC processors are mainly used in normal PC’s, Workstations, and servers.

ARM is a RISC (Reduced instruction set Computing) processor and therefore has a simplified instruction set (100 instructions or less) and more general purpose registers than CISC. Unlike Intel, ARM uses instructions that operate only on registers and uses a Load/Store memory model for memory access, which means that only Load/Store instructions can access memory. This means that incrementing a 32-bit value at a particular memory address on ARM would require three types of instructions (load, increment and store) to first load the value at a particular address into a register, increment it within the register, and store it back to the memory from the register.

The reduced instruction set has its advantages and disadvantages. One of the advantages is that instructions can be executed more quickly, potentially allowing for greater speed (RISC systems shorten execution time by reducing the clock cycles per instruction). The downside is that less instructions means a greater emphasis on the efficient writing of software with the limited instructions that are available. Also important to note is that ARM has two modes, ARM mode and Thumb mode. Thumb instructions can be either 2 or 4 bytes (more on that in [Part 3: ARM Instruction set](https://azeria-labs.com/arm-instruction-set-part-3/)).

More differences between ARM and x86 are:

- In ARM, most instructions can be used for conditional execution.
- The Intel x86 and x86-64 series of processors use the **little-endian** format
- The ARM architecture was little-endian before version 3. Since then ARM processors became **BI-endian** and feature a setting which allows for *switchable* endianness.

There are not only differences between Intel and ARM, but also between different ARM version themselves. This tutorial series is intended to keep it as generic as possible so that you get a general understanding about how ARM works. Once you understand the fundamentals, it’s easy to learn the nuances for your chosen target ARM version. The examples in this tutorial were created on an 32-bit ARMv6 (Raspberry Pi 1), therefore the explanations are related to this exact version.

The naming of the [different ARM versions](https://en.wikipedia.org/wiki/List_of_ARM_microarchitectures) might also be confusing:


| ARM family |	ARM architecture |
|----|-----|
|ARM7	|ARM v4|
|ARM9	|ARM v5|
|ARM11	|ARM v6|
|Cortex-A	|ARM v7-A|
|Cortex-R	|ARM v7-R|
|Cortex-M	|ARM v7-M|


### WRITING ASSEMBLY

Before we can start diving into ARM exploit development we first need to understand the basics of Assembly language programming, which requires a little background knowledge before you can start to appreciate it. But why do we even need ARM Assembly, isn’t it enough to write our exploits in a “normal” programming / scripting language? It is not, if we want to be able to do Reverse Engineering and understand the program flow of ARM binaries, build our own ARM shellcode, craft ARM ROP chains, and debug ARM applications.

You don’t need to know every little detail of the Assembly language to be able to do Reverse Engineering and exploit development, yet some of it is required for understanding the bigger picture. The fundamentals will be covered in this tutorial series. If you want to learn more you can visit the links listed at the end of this chapter.

So what exactly is Assembly language? Assembly language is just a thin syntax layer on top of the machine code which is composed of instructions, that are encoded in binary representations (machine code), which is what our computer understands. So why don’t we just write machine code instead? Well, that would be a pain in the ass. For this reason, we will write assembly, ARM assembly, which is much easier for humans to understand. Our computer can’t run assembly code itself, because it needs machine code. The tool we will use to assemble the assembly code into machine code is a GNU Assembler from the [GNU Binutils](https://www.gnu.org/software/binutils/) project named ***as*** which works with source files having the *.s extension.

Once you wrote your assembly file with the extension *.s, you need to assemble it with [as](https://sourceware.org/binutils/docs/as/index.html#Top) and link it with [ld](https://sourceware.org/binutils/docs/ld/):


```
$ as program.s -o program.o
$ ld program.o -o program
```

![](https://azeria-labs.com/wp-content/uploads/2017/03/gif-assembly-to-machine-code.gif)


### ASSEMBLY UNDER THE HOOD

Let’s start at the very bottom and work our way up to the assembly language. At the lowest level, we have our electrical signals on our circuit. Signals are formed by switching the electrical voltage to one of two levels, say 0 volts (‘off’) or 5 volts (‘on’). Because just by looking we can’t easily tell what voltage the circuit is at, we choose to write patterns of on/off voltages using visual representations, the digits 0 and 1, to not only represent the idea of an absence or presence of a signal, but also because 0 and 1 are digits of the binary system. We then group the sequence of 0 and 1 to form a machine code instruction which is the smallest working unit of a computer processor. Here is an example of a machine language instruction:

```
1110 0001 1010 0000 0010 0000 0000 0001
```

So far so good, but we can’t remember what each of these patterns (of 0 and 1) mean.  For this reason, we use so called mnemonics, abbreviations to help us remember these binary patterns, where each machine code instruction is given a name. These mnemonics often consist of three letters, but this is not obligatory. We can write a program using these mnemonics as instructions. This program is called an Assembly language program, and the set of mnemonics that is used to represent a computer’s machine code is called the Assembly language of that computer. Therefore, Assembly language is the lowest level used by humans to program a computer. The operands of an instruction come after the mnemonic(s). Here is an example:

```
MOV R2, R1
```

Now that we know that an assembly program is made up of textual information called mnemonics, we need to get it converted into machine code. As mentioned above, in the case of ARM assembly, the [GNU Binutils](https://www.gnu.org/software/binutils/) project supplies us with a tool called **as**. The process of using an assembler like **as** to convert from (ARM) assembly language to (ARM) machine code is called assembling.

In summary, we learned that computers understand (respond to) the presence or absence of voltages (signals) and that we can represent multiple signals in a sequence of 0s and 1s (bits). We can use machine code (sequences of signals) to cause the computer to respond in some well-defined way. Because we can’t remember what all these sequences mean, we give them abbreviations – mnemonics, and use them to represent instructions. This set of mnemonics is the Assembly language of the computer and we use a program called Assembler to convert code from mnemonic representation to the computer-readable machine code, in the same way a compiler does for high-level languages.

### FURTHER READING

1. Whirlwind Tour of ARM Assembly.[https://www.coranac.com/tonc/text/asm.htm](https://www.coranac.com/tonc/text/asm.htm)
2. ARM assembler in Raspberry Pi.[http://thinkingeek.com/arm-assembler-raspberry-pi/](http://thinkingeek.com/arm-assembler-raspberry-pi/)
3. Practical Reverse Engineering: x86, x64, ARM, Windows Kernel, Reversing Tools, and Obfuscation by Bruce Dang, Alexandre Gazet, Elias Bachaalany and Sebastien Josse.
4. ARM Reference Manual.[http://infocenter.arm.com/help/topic/com.arm.doc.dui0068b/index.html](http://infocenter.arm.com/help/topic/com.arm.doc.dui0068b/index.html)
5. Assembler User Guide.[http://www.keil.com/support/man/docs/armasm/default.htm](http://www.keil.com/support/man/docs/armasm/default.htm)
























## 2. ARM Data Types and Registers


### DATA TYPES
This is part two of a series on learning ARM assembly basics, covering data types and registers.

Similar to high level languages, ARM supports operations on different datatypes.
The data types we can load (or store) can be signed and unsigned words, halfwords, or bytes. The extensions for these data types are: -h or -sh for halfwords, -b or -sb for bytes, and no extension for words. The difference between signed and unsigned data types is:

- Singed data types can hold both positive and negative values and are therefore lower in range.
- Unsigned data types can hold large positive values (including ‘Zero’) but cannot hold negative values and are therefore wider in range.

![](https://azeria-labs.com/wp-content/uploads/2017/03/data-types-1.png)

Here are some examples of how these data types can be used with the instructions Load and Store:

```
dr = Load Word
ldrh = Load unsigned Half Word
ldrsh = Load signed Half Word
ldrb = Load unsigned Byte
ldrsb = Load signed Bytes

str = Store Word
strh = Store unsigned Half Word
strsh = Store signed Half Word
strb = Store unsigned Byte
strsb = Store signed Byte
```


### ENDIANNESS

There are two basic ways of viewing bytes in memory: Little-Endian (LE) or Big-Endian (BE). The difference is the byte-order in which each byte of an object is stored in memory. 

![](https://azeria-labs.com/wp-content/uploads/2017/03/bi-endian.png)

On little-endian machines like Intel x86, the least-significant-byte ist stored at the lowest address (the address closest to zero). On big-endian machines the most-significant-byte is stored at the lowest address. The ARM architecture was little-endian before version 3, since then it is bi-endian, which means that it features a setting which allows for switchable endianness. On ARMv6 for example, instructions are [fixed little-endian and data accesses](http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.ddi0301h/Cdfbbchb.html) can be either little-endian or big-endian as controlled by bit 9, the E bit, of the Program Status Register (CPSR).

![](https://azeria-labs.com/wp-content/uploads/2017/03/big-little-endian-1.png)

### ARM REGISTERS

The amount of registers depends on the ARM version. According to the ARM Reference Manual, there are [30 general-purpose 32-bit registers](http://infocenter.arm.com/help/topic/com.arm.doc.dui0473c/Babdfiih.html), with the exception of ARMv6-M and ARMv7-M based processors. The first 16 registers are accessible in user-level mode, the additional registers are available in privileged software execution (with the exception of ARMv6-M and ARMv7-M). In this tutorial series we will work with the registers that are accessible in any privilege mode: r0-15. These 16 registers can be split into two groups: general purpose and special purpose registers.


| # | Alias | Purpose |
|---|-----|------|
|R0	|–|	 General purpose|
|R1	|–|	 General purpose|
|R2	|–|	 General purpose|
|R3	|–|	 General purpose|
|R4	|–|	 General purpose|
|R5	|–|	 General purpose|
|R6	|–|	 General purpose|
|R7	|–|	Holds Syscall Number|
|R8	|–|	 General purpose|
|R9	|–|	 General purpose|
|R10	|–|	 General purpose|
|R11	|FP|	Frame Pointer|
|R12	|IP|	Intra Procedural Call|
|R13	|SP|	Stack Pointer|
|R14	|LR|	Link Register|
|R15	|PC|	Program Counter|
|CPSR	|–|	Current Program Status Register|

The following table is just a quick glimpse into how the ARM registers could relate to those in Intel processors.


| ARM |	Description |	x86|
| --- |----|-----|
|R0	|General Purpose	|EAX|
|R1-R5	|General Purpose	|EBX, ECX, EDX, ESI, EDI|
|R6-R10	|General Purpose	|–|
|R11 |(FP)	Frame Pointer	|EBP|
|R12|	Intra Procedural Call	|–|
|R13 |(SP)	Stack Pointer	E|SP|
|R14 |(LR)	Link Register|	–|
|R15 |(PC)	<- Program Counter / Instruction Pointer ->|	EIP|
|CPSR	|Current Program State Register/Flags	|EFLAGS|


**R0-R12**: can be used during common operations to store temporary values, pointers (locations to memory), etc. R0, for example, can be referred as accumulator during the arithmetic operations or for storing the result of a previously called function. R7 becomes useful while working with syscalls as it stores the syscall number and R11 helps us to keep track of boundaries on the stack serving as the frame pointer (will be covered later). Moreover, the function calling convention on ARM specifies that the first four arguments of a function are stored in the registers r0-r3.

**R13: SP** (Stack Pointer). The Stack Pointer points to the top of the stack. The stack is an area of memory used for function-specific storage, which is reclaimed when the function returns. The stack pointer is therefore used for allocating space on the stack, by subtracting the value (in bytes) we want to allocate from the stack pointer. In other words, if we want to allocate a 32 bit value, we subtract 4 from the stack pointer.

**R14: LR** (Link Register). When a function call is made, the Link Register gets updated with a memory address referencing the next instruction where the function was initiated from. Doing this allows the program return to the “parent” function that initiated the “child” function call after the “child” function is finished.

**R15: PC** (Program Counter). The Program Counter is automatically incremented by the size of the instruction executed. This size is always 4 bytes in ARM state and 2 bytes in THUMB mode. When a branch instruction is being executed, the PC holds the destination address. During execution, PC stores the address of the current instruction plus 8 (two ARM instructions) in ARM state, and the current instruction plus 4 (two Thumb instructions) in Thumb(v1) state. This is different from x86 where PC always points to the next instruction to be executed.

Let’s look at how PC behaves in a debugger. We use the following program to store the address of pc into r0 and include two random instructions. Let’s see what happens.


```
.section .text
.global _start

_start:
 mov r0, pc
 mov r1, #2
 add r2, r1, r1
 bkpt
 ```


In GDB we set a breakpoint at _start and run it:

```
gef> br _start
Breakpoint 1 at 0x8054
gef> run

```

Here is a screenshot of the output we see first:

```
$r0 0x00000000   $r1 0x00000000   $r2 0x00000000   $r3 0x00000000 
$r4 0x00000000   $r5 0x00000000   $r6 0x00000000   $r7 0x00000000 
$r8 0x00000000   $r9 0x00000000   $r10 0x00000000  $r11 0x00000000 
$r12 0x00000000  $sp 0xbefff7e0   $lr 0x00000000   $pc 0x00008054 
$cpsr 0x00000010 

0x8054 <_start> mov r0, pc     <- $pc
0x8058 <_start+4> mov r0, #2
0x805c <_start+8> add r1, r0, r0
0x8060 <_start+12> bkpt 0x0000
0x8064 andeq r1, r0, r1, asr #10
0x8068 cmnvs r5, r0, lsl #2
0x806c tsteq r0, r2, ror #18
0x8070 andeq r0, r0, r11
0x8074 tsteq r8, r6, lsl #6
```
We can see that PC holds the address (0x8054) of the next instruction (mov r0, pc) that will be executed. Now let’s execute the next instruction after which R0 should hold the address of PC (0x8054), right?


```
$r0 0x0000805c   $r1 0x00000000   $r2 0x00000000   $r3 0x00000000 
$r4 0x00000000   $r5 0x00000000   $r6 0x00000000   $r7 0x00000000 
$r8 0x00000000   $r9 0x00000000   $r10 0x00000000  $r11 0x00000000 
$r12 0x00000000  $sp 0xbefff7e0   $lr 0x00000000   $pc 0x00008058 
$cpsr 0x00000010

0x8058 <_start+4> mov r0, #2       <- $pc
0x805c <_start+8> add r1, r0, r0
0x8060 <_start+12> bkpt 0x0000
0x8064 andeq r1, r0, r1, asr #10
0x8068 cmnvs r5, r0, lsl #2
0x806c tsteq r0, r2, ror #18
0x8070 andeq r0, r0, r11
0x8074 tsteq r8, r6, lsl #6
0x8078 adfcssp f0, f0, #4.0
```

…right? Wrong. Look at the address in R0. While we expected R0 to contain the previously read PC value (0x8054) it instead holds the value which is two instructions ahead of the PC we previously read (0x805c). From this example you can see that when we directly read PC it follows the definition that PC points to the next instruction; but when debugging, PC points two instructions ahead of the current PC value (0x8054 + 8 = 0x805C). This is because older ARM processors always fetched two instructions ahead of the currently executed instructions. The reason ARM retains this definition is to ensure compatibility with earlier processors.


### CURRENT PROGRAM STATUS REGISTER

When you debug an ARM binary with gdb, you see something called Flags: (this picture uses an old version of GEF. If you don’t see the flags, use the “flags” command to show the current status of the flags)

![](https://azeria-labs.com/wp-content/uploads/2017/03/cpsr.png)

The register $cpsr shows the value of the Current Program Status Register (CPSR) and under that you can see the Flags thumb, fast, interrupt, overflow, carry, zero, and negative. These flags represent certain bits in the CPSR register and are set according to the value of the CPSR and turn **bold** when activated. The N, Z, C, and V bits are identical to the SF, ZF, CF, and OF bits in the EFLAG register on x86. These bits are used to support conditional execution in conditionals and loops at the assembly level. We will cover condition codes used in [Part 6: Conditional Execution and Branching](https://azeria-labs.com/arm-conditional-execution-and-branching-part-6/).

![](https://azeria-labs.com/wp-content/uploads/2017/03/CPSR.png)

The picture above shows a layout of a 32-bit register (CPSR) where the left (<-) side holds most-significant-bits and the right (->) side the least-significant-bits. Every single cell (except for the GE and M section along with the blank ones) are of a size of one bit. These one bit sections define various properties of the program’s current state.

| Flag |	Description |
| ---- |-----|
|N |(Negative)	Enabled if result of the instruction yields a negative number.|
|Z | (Zero)	Enabled if result of the instruction yields a zero value.|
|C|(Carry)	Enabled if result of the instruction yields a value that requires a 33rd bit to be fully represented.|
|V|(Overflow)	Enabled if result of the instruction yields a value that cannot be represented in 32 bit two’s complement.|
|E|(Endian-bit)	ARM can operate either in little endian, or big endian. This bit is set to 0 for little endian, or 1 for big endian mode.|
|T|(Thumb-bit)	This bit is set if you are in Thumb state and is disabled when you are in ARM state.|
|M|(Mode-bits)	These bits specify the current privilege mode (USR, SVC, etc.).|
|J|(Jazelle)	Third execution state that allows some ARM processors to execute Java bytecode in hardware.|





Let’s assume we would use the CMP instruction to compare the numbers 1 and 2. The outcome would be ‘negative’ because 1 – 2 = -1. However, if we would compare 2 against 1 (the other way around) the C (carry) bit would be set because subtracting a larger number to a smaller one enables it. When we compare two equal numbers, like 2 against 2, the Z (zero) flag is set because 2 – 2 = 0. Keep in mind that the registers used with the CMP instruction won’t be modified, only the CPSR will be modified based on the result of comparing these registers against each other.

This is how it looks like in GDB (with GEF installed): In this example we compare the registers r1 and r0, where r1 = 4 and r0 = 2. This is how the flags look like after executing the cmp r1, r0 operation:

![](https://azeria-labs.com/wp-content/uploads/2017/03/cpsr2.png)

The Carry Flag is set because we use cmp r1, r0 to compare 4 against 2. Because we are subtracting a larger number to a smaller one, the Carry flag is enabled. In contrast, the Negative flag (N) is set if we use cmp r0, r1 to a smaller number (2) against a bigger number (4).









## 3. ARM Instruction set





## 4. Memory Instructions: Load and Store





## 5. Load and Store Multiple





## 6. Conditional Execution and Branching




## 7. Stack and Functions




