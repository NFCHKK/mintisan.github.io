
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


### ARM & THUMB

ARM processors have two main states they can operate in (let’s not count Jazelle here), ARM and Thumb. These states have nothing to do with privilege levels. For example, code running in SVC mode can be either ARM or Thumb. The main difference between these two states is the instruction set, where instructions in ARM state are always 32-bit, and  instructions in Thumb state are 16-bit (but can be 32-bit). Knowing when and how to use Thumb is especially important for our ARM exploit development purposes. When writing ARM shellcode, we need to get rid of NULL bytes and using 16-bit Thumb instructions instead of 32-bit ARM instructions reduces the chance of having them.

The calling conventions of ARM versions is more than confusing and not all ARM versions support the same Thumb instruction sets. At some point, ARM introduced an enhanced Thumb instruction set (pseudo name: Thumbv2) which allows 32-bit Thumb instructions and even conditional execution, which was not possible in the versions prior to that. In order to use conditional execution in Thumb state, the “it” instruction was introduced. However, this instruction got then removed in a later version and exchanged with something that was supposed to make things less complicated, but achieved the opposite. I don’t know all the different variations of ARM/Thumb instruction sets across all the different ARM versions, and I honestly don’t care. Neither should you. The only thing that you need to know is the ARM version of your target device and its specific Thumb support so that you can adjust your code. The ARM Infocenter should help you figure out the specifics of your ARM version ([http://infocenter.arm.com/help/index.jsp](http://infocenter.arm.com/help/index.jsp)).

As mentioned before, there are different Thumb versions. The different naming is just for the sake of differentiating them from each other (the processor itself will always refer to it as Thumb).

- Thumb-1 (16-bit instructions): was used in ARMv6 and earlier architectures.
- Thumb-2 (16-bit and 32-bit instructions): extents Thumb-1 by adding more instructions and allowing them to be either 16-bit or 32-bit wide (ARMv6T2, ARMv7).
- ThumbEE: includes some changes and additions aimed for dynamically generated code (code compiled on the device either shortly before or during execution).

Differences between ARM and Thumb:

- Conditional execution: All instructions in ARM state support conditional execution. Some ARM processor versions allow conditional execution in Thumb by using the IT instruction. Conditional execution leads to higher code density because it reduces the number of instructions to be executed and reduces the number of expensive branch instructions.
- 32-bit ARM and Thumb instructions: 32-bit Thumb instructions have a .w suffix.
- The barrel shifter is another unique ARM mode feature. It can be used to shrink multiple instructions into one. For example, instead of using two instructions for a multiply (multiplying register by 2 and using MOV to store result into another register), you can include the multiply inside a MOV instruction by using shift left by ` -> Mov  R1, R0, LSL #1      ; R1 = R0 * 2`

To switch the state in which the processor executes in, one of two conditions have to be met:

- We can use the branch instruction BX (branch and exchange) or BLX (branch, link, and exchange) and set the destination register’s least significant bit to 1. This can be achieved by adding 1 to an offset, like 0x5530 + 1. You might think that this would cause alignment issues, since instructions are either 2- or 4-byte aligned. This is not a problem because the processor will ignore the least significant bit. More details in [Part 6: Conditional Execution and Branching](https://azeria-labs.com/arm-conditional-execution-and-branching-part-6/).
- We know that we are in Thumb mode if the T bit in the current program status register is set.

### INTRODUCTION TO ARM INSTRUCTIONS

The purpose of this part is to briefly introduce into the ARM’s instruction set and it’s general use. It is crucial for us to understand how the smallest piece of the Assembly language operates, how they connect to each other, and what can be achieved by combining them.

As mentioned earlier, Assembly language is composed of instructions which are the main building blocks. ARM instructions are usually followed by one or two operands and generally use the following template:

```
MNEMONIC{S}{condition} {Rd}, Operand1, Operand2
Due to flexibility of the ARM instruction set, not all instructions use all of the fields provided in the template. Nevertheless, the purpose of fields in the template are described as follows:

MNEMONIC     - Short name (mnemonic) of the instruction
{S}          - An optional suffix. If S is specified, the condition flags are updated on the result of the operation
{condition}  - Condition that is needed to be met in order for the instruction to be executed
{Rd}         - Register (destination) for storing the result of the instruction
Operand1     - First operand. Either a register or an immediate value 
Operand2     - Second (flexible) operand. Can be an immediate value (number) or a register with an optional shift
```

While the MNEMONIC, S, Rd and Operand1 fields are straight forward, the condition and Operand2 fields require a bit more clarification. The condition field is closely tied to the CPSR register’s value, or to be precise, values of specific bits within the register. Operand2 is called a flexible operand, because we can use it in various forms – as immediate value (with limited set of values), register or register with a shift. For example, we can use these expressions as the Operand2:

```
#123                    - Immediate value (with limited set of values). 
Rx                      - Register x (like R1, R2, R3 ...)
Rx, ASR n               - Register x with arithmetic shift right by n bits (1 = n = 32)
Rx, LSL n               - Register x with logical shift left by n bits (0 = n = 31)
Rx, LSR n               - Register x with logical shift right by n bits (1 = n = 32)
Rx, ROR n               - Register x with rotate right by n bits (1 = n = 31)
Rx, RRX                 - Register x with rotate right by one bit, with extend
```

As a quick example of how different kind of instructions look like, let’s take a look at the following list.

```
ADD   R0, R1, R2         - Adds contents of R1 (Operand1) and R2 (Operand2 in a form of register) and stores the result into R0 (Rd)
ADD   R0, R1, #2         - Adds contents of R1 (Operand1) and the value 2 (Operand2 in a form of an immediate value) and stores the result into R0 (Rd)
MOVLE R0, #5             - Moves number 5 (Operand2, because the compiler treats it as MOVLE R0, R0, #5) to R0 (Rd) ONLY if the condition LE (Less Than or Equal) is satisfied
MOV   R0, R1, LSL #1     - Moves the contents of R1 (Operand2 in a form of register with logical shift left) shifted left by one bit to R0 (Rd). So if R1 had value 2, it gets shifted left by one bit and becomes 4. 4 is then moved to R0.
```

As a quick summary, let’s take a look at the most common instructions which we will use in future examples.


| Instruction|	Description|	Instruction|	Description|
|---|----|---|---|
|MOV	|Move data	|EOR|	Bitwise XOR|
|MVN	|Move 2’s complement	|LDR|	Load|
|ADD	|Addition	|STR|	Store|
|SUB	|Subtraction	|LDM|	Load Multiple|
|MUL	|Multiplication	|STM|	Store Multiple|
|LSL	|Logical Shift Left	|PUSH|	Push on Stack|
|LSR	|Logical Shift Right	|POP|	Pop off Stack|
|ASR	|Arithmetic Shift Right	|B|	Branch|
|ROR	|Rotate Right|	BL|	Branch with Link|
|CMP	|Compare	|BX	|Branch and eXchange|
|AND	|Bitwise AND	|BLX	|Branch with Link and eXchange|
|ORR	|Bitwise OR	|SWI/SVC|	System Call|


## 4. Memory Instructions: Load and Store

### MEMORY INSTRUCTIONS: LOAD AND STORE

ARM uses a load-store model for memory access which means that only load/store (LDR and STR) instructions can access memory. While on x86 most instructions are allowed to directly operate on data in memory, on ARM data must be moved from memory into registers before being operated on. This means that incrementing a 32-bit value at a particular memory address on ARM would require three types of instructions (load, increment, and store) to first load the value at a particular address into a register, increment it within the register, and store it back to the memory from the register.

To explain the fundamentals of Load and Store operations on ARM, we start with a basic example and continue with three basic offset forms with three different address modes for each offset form. For each example we will use the same piece of assembly code with a different LDR/STR offset form, to keep it simple. The best way to follow this part of the tutorial is to run the code examples in a debugger (GDB) on [your lab environment](https://azeria-labs.com/emulate-raspberry-pi-with-qemu/).

- Offset form**: Immediate** value as the offsetAddressing mode: Offset
  - Addressing mode: Pre-indexed
  - Addressing mode: Post-indexed
- Offset form: **Register** as the offsetAddressing mode: Offset
  - Addressing mode: Pre-indexed
  - Addressing mode: Post-indexed
- Offset form: **Scaled register** as the offsetAddressing mode: Offset
  - Addressing mode: Pre-indexed
  - Addressing mode: Post-indexed

First basic example

Generally, LDR is used to load something from memory into a register, and STR is used to store something from a register to a memory address.

```
LDR R2, [R0]   @ [R0] - origin address is the value found in R0.
STR R2, [R1]   @ [R1] - destination address is the value found in R1.
```
![](https://azeria-labs.com/wp-content/uploads/2017/04/ldr1-1.png)

LDR operation: loads the value at the address found in R0 to the destination register R2.

STR operation: stores the value found in R2 to the memory address found in R1.

This is how it would look like in a functional assembly program:

```
.data          /* the .data section is dynamically created and its addresses cannot be easily predicted */
var1: .word 3  /* variable 1 in memory */
var2: .word 4  /* variable 2 in memory */

.text          /* start of the text (code) section */ 
.global _start

_start:
    ldr r0, adr_var1  @ load the memory address of var1 via label adr_var1 into R0 
    ldr r1, adr_var2  @ load the memory address of var2 via label adr_var2 into R1 
    ldr r2, [r0]      @ load the value (0x03) at memory address found in R0 to register R2  
    str r2, [r1]      @ store the value found in R2 (0x03) to the memory address found in R1 
    bkpt             

adr_var1: .word var1  /* address to var1 stored here */
adr_var2: .word var2  /* address to var2 stored here */
```

At the bottom we have our Literal Pool (a memory area in the same code section to store constants, strings, or offsets that others can reference in a position-independent manner) where we store the memory addresses of var1 and var2 (defined in the data section at the top) using the labels adr_var1 and adr_var2. The first LDR loads the address of var1 into register R0. The second LDR does the same for var2 and loads it to R1. Then we load the value stored at the memory address found in R0 to R2, and store the value found in R2 to the memory address found in R1.

When we load something into a register, the brackets ([ ]) mean: the value found in the register between these brackets is a memory address we want to load something from.

When we store something to a memory location, the brackets ([ ]) mean: the value found in the register between these brackets is a memory address we want to store something to.

This sounds more complicated than it actually is, so here is a visual representation of what’s going on with the memory and the registers when executing the code above in a debugger:

![](https://azeria-labs.com/wp-content/uploads/2017/04/ldr1-gif2.gif)

Let’s look at the same code in a debugger.

```
gef> disassemble _start
Dump of assembler code for function _start:
 0x00008074 <+0>:      ldr  r0, [pc, #12]   ; 0x8088 <adr_var1>
 0x00008078 <+4>:      ldr  r1, [pc, #12]   ; 0x808c <adr_var2>
 0x0000807c <+8>:      ldr  r2, [r0]
 0x00008080 <+12>:     str  r2, [r1]
 0x00008084 <+16>:     bx   lr
End of assembler dump.
```

The labels we specified with the first two LDR operations changed to [pc, #12]. This is called PC-relative addressing. Because we used labels, the compiler calculated the location of our values specified in the Literal Pool (PC+12).  You can either calculate the location yourself using this exact approach, or you can use labels like we did previously. The only difference is that instead of using labels, you need to count the exact position of your value in the Literal Pool. In this case, it is 3 hops (4+4+4=12) away from the effective PC position. More about PC-relative addressing later in this chapter.

Side note: In case you forgot why the effective PC is located two instructions ahead of the current one, it is described in Part 2 [… During execution, PC stores the address of the current instruction plus 8 (two ARM instructions) in ARM state, and the current instruction plus 4 (two Thumb instructions) in Thumb state. This is different from x86 where PC always points to the next instruction to be executed…].

![](https://azeria-labs.com/wp-content/uploads/2017/04/pc-relative1-1.png)

### 1. Offset form: Immediate value as the offset

```
STR    Ra, [Rb, imm]
LDR    Ra, [Rc, imm]
```

Here we use an immediate (integer) as an offset. This value is added or subtracted from the base register (R1 in the example below) to access data at an offset known at compile time.

```
.data
var1: .word 3
var2: .word 4

.text
.global _start

_start:
    ldr r0, adr_var1  @ load the memory address of var1 via label adr_var1 into R0
    ldr r1, adr_var2  @ load the memory address of var2 via label adr_var2 into R1
    ldr r2, [r0]      @ load the value (0x03) at memory address found in R0 to register R2 
    str r2, [r1, #2]  @ address mode: offset. Store the value found in R2 (0x03) to the memory address found in R1 plus 2. Base register (R1) unmodified. 
    str r2, [r1, #4]! @ address mode: pre-indexed. Store the value found in R2 (0x03) to the memory address found in R1 plus 4. Base register (R1) modified: R1 = R1+4 
    ldr r3, [r1], #4  @ address mode: post-intexed. Load the value at memory address found in R1 to register R3 (not R3 plus 4). Base register (R1) modified: R1 = R1+4 
    bkpt

adr_var1: .word var1
adr_var2: .word var2
```

Let’s call this program ldr.s, compile it and run it in GDB to see what happens.

```
$ as ldr.s -o ldr.o
$ ld ldr.o -o ldr
$ gdb ldr
```

In GDB (with gef) we set a break point at _start and run the program.

```
gef> break _start
gef> run
...
gef> nexti 3     /* to run the next 3 instructions */
The registers on my system are now filled with the following values (keep in mind that these addresses might be different on your system):

$r0 : 0x00010090 -> 0x00000003
$r1 : 0x00010094 -> 0x00000004
$r2 : 0x00000003
$r3 : 0x00000000
$r4 : 0x00000000
$r5 : 0x00000000
$r6 : 0x00000000
$r7 : 0x00000000
$r8 : 0x00000000
$r9 : 0x00000000
$r10 : 0x00000000
$r11 : 0x00000000
$r12 : 0x00000000
$sp : 0xbefff7f0 -> 0x00000001
$lr : 0x00000000
$pc : 0x00008080 -> <_start+12> str r2, [r1]
$cpsr : 0x00000010
```

The next instruction that will be executed a STR operation with the offset address mode. It will store the value from R2 (0x00000003) to the memory address specified in R1 (0x0001009c) + the offset (#2) = 0x1009e.

```
gef> nexti
gef> x/w 0x1009e 
0x1009e <var2+2>: 0x3
```

The next STR operation uses the pre-indexed address mode. You can recognize this mode by the exclamation mark (!). The only difference is that the base register will be updated with the final memory address in which the value of R2 will be stored. This means, we store the value found in R2 (0x3) to the memory address specified in R1 (0x1009c) + the offset (#4) = 0x100A0, and update R1 with this exact address.

```
gef> nexti
gef> x/w 0x100A0
0x100a0: 0x3
gef> info register r1
r1     0x100a0     65696
```

The last LDR operation uses the post-indexed address mode. This means that the base register (R1) is used as the final address, then updated with the offset calculated with R1+4. In other words, it takes the value found in R1 (not R1+4), which is 0x100A0 and loads it into R3, then updates R1 to R1 (0x100A0) + offset (#4) =  0x100a4.

```
gef> info register r1
r1      0x100a4   65700
gef> info register r3
r3      0x3       3
```

Here is an abstract illustration of what’s happening:

![](https://azeria-labs.com/wp-content/uploads/2017/04/ldr1-1gif2.gif)

### 2. Offset form: Register as the offset.

```
STR    Ra, [Rb, Rc]
LDR    Ra, [Rb, Rc]
```

This offset form uses a register as an offset. An example usage of this offset form is when your code wants to access an array where the index is computed at run-time.

```
.data
var1: .word 3
var2: .word 4

.text
.global _start

_start:
    ldr r0, adr_var1  @ load the memory address of var1 via label adr_var1 to R0 
    ldr r1, adr_var2  @ load the memory address of var2 via label adr_var2 to R1 
    ldr r2, [r0]      @ load the value (0x03) at memory address found in R0 to R2
    str r2, [r1, r2]  @ address mode: offset. Store the value found in R2 (0x03) to the memory address found in R1 with the offset R2 (0x03). Base register unmodified.   
    str r2, [r1, r2]! @ address mode: pre-indexed. Store value found in R2 (0x03) to the memory address found in R1 with the offset R2 (0x03). Base register modified: R1 = R1+R2. 
    ldr r3, [r1], r2  @ address mode: post-indexed. Load value at memory address found in R1 to register R3. Then modify base register: R1 = R1+R2.
    bx lr

adr_var1: .word var1
adr_var2: .word var2
```

After executing the first STR operation with the offset address mode, the value of R2 (0x00000003) will be stored at memory address 0x0001009c + 0x00000003 = 0x0001009F.

```
gef> x/w 0x0001009F
 0x1009f <var2+3>: 0x00000003
```
 
The second STR operation with the pre-indexed address mode will do the same, with the difference that it will update the base register (R1) with the calculated memory address (R1+R2).

```
gef> info register r1
 r1     0x1009f      65695
 ```
 
The last LDR operation uses the post-indexed address mode and loads the value at the memory address found in R1 into the register R2, then updates the base register R1 (R1+R2 = 0x1009f + 0x3 = 0x100a2).

```
gef> info register r1
 r1      0x100a2     65698
gef> info register r3
 r3      0x3       3
```

![](https://azeria-labs.com/wp-content/uploads/2017/04/ldr-reg-gif1-1.gif)


### 3. Offset form: Scaled register as the offset

```
LDR    Ra, [Rb, Rc, <shifter>]
STR    Ra, [Rb, Rc, <shifter>]
```

The third offset form has a scaled register as the offset. In this case, Rb is the base register and Rc is an immediate offset (or a register containing an immediate value) left/right shifted (<shifter>) to scale the immediate. This means that the barrel shifter is used to scale the offset. An example usage of this offset form would be for loops to iterate over an array. Here is a simple example you can run in GDB:

```
.data
var1: .word 3
var2: .word 4

.text
.global _start

_start:
    ldr r0, adr_var1         @ load the memory address of var1 via label adr_var1 to R0
    ldr r1, adr_var2         @ load the memory address of var2 via label adr_var2 to R1
    ldr r2, [r0]             @ load the value (0x03) at memory address found in R0 to R2
    str r2, [r1, r2, LSL#2]  @ address mode: offset. Store the value found in R2 (0x03) to the memory address found in R1 with the offset R2 left-shifted by 2. Base register (R1) unmodified.
    str r2, [r1, r2, LSL#2]! @ address mode: pre-indexed. Store the value found in R2 (0x03) to the memory address found in R1 with the offset R2 left-shifted by 2. Base register modified: R1 = R1 + R2<<2
    ldr r3, [r1], r2, LSL#2  @ address mode: post-indexed. Load value at memory address found in R1 to the register R3. Then modifiy base register: R1 = R1 + R2<<2
    bkpt

adr_var1: .word var1
adr_var2: .word var2
```

The first STR operation uses the offset address mode and stores the value found in R2 at the memory location calculated from [r1, r2, LSL#2], which means that it takes the value in R1 as a base (in this case, R1 contains the memory address of var2), then it takes the value in R2 (0x3), and shifts it left by 2. The picture below is an attempt to visualize how the memory location is calculated with [r1, r2, LSL#2].

![](https://azeria-labs.com/wp-content/uploads/2017/04/ldr-shift1.png)

The second STR operation uses the pre-indexed address mode. This means, it performs the same action as the previous operation, with the difference that it updates the base register R1 with the calculated memory address afterwards. In other words, it will first store the value found at the memory address R1 (0x1009c) + the offset left shifted by #2 (0x03 LSL#2 = 0xC) = 0x100a8, and update R1 with 0x100a8.

```
gef> info register r1
r1      0x100a8      65704
```

The last LDR operation uses the post-indexed address mode. This means, it loads the value at the memory address found in R1 (0x100a8) into register R3, then updates the base register R1 with the value calculated with r2, LSL#2. In other words, R1 gets updated with the value R1 (0x100a8) + the offset R2 (0x3) left shifted by #2 (0xC) = 0x100b4.

```
gef> info register r1
r1      0x100b4      65716
```


**Summary**

Remember the three offset modes in LDR/STR:

- offset mode uses an immediate as offset
  - ldr   r3, [r1, #4]
- offset mode uses a register as offset
  - ldr   r3, [r1, r2]
- offset mode uses a scaled register as offset
  - ldr   r3, [r1, r2, LSL#2]

How to remember the different address modes in LDR/STR:

- If there is a !, it’s prefix address mode
  - ldr   r3, [r1, #4]!
  - ldr   r3, [r1, r2]!
  - ldr   r3, [r1, r2, LSL#2]!
- If the base register is in brackets by itself, it’s postfix address mode
  - ldr   r3, [r1], #4
  - ldr   r3, [r1], r2
  - ldr   r3, [r1], r2, LSL#2
- Anything else is offset address mode.
  - ldr   r3, [r1, #4]
  - ldr   r3, [r1, r2]
  - ldr   r3, [r1, r2, LSL#2]

### LDR FOR PC-RELATIVE ADDRESSING

LDR is not only used to load data from memory into a register. Sometimes you will see syntax like this:

```
.section .text
.global _start

_start:
   ldr r0, =jump        /* load the address of the function label jump into R0 */
   ldr r1, =0x68DB00AD  /* load the value 0x68DB00AD into R1 */
jump:
   ldr r2, =511         /* load the value 511 into R2 */ 
   bkpt
```

These instructions are technically called pseudo-instructions. We can use this syntax to reference data in the literal pool. The literal pool is a memory area in the same section (because the literal pool is part of the code) to store constants, strings, or offsets. In the example above we use these pseudo-instructions to reference an offset to a function, and to move a 32-bit constant into a register in one instruction. The reason why we sometimes need to use this syntax to move a 32-bit constant into a register in one instruction is because ARM can only load a 8-bit value in one go. What? To understand why, you need to know how immediate values are being handled on ARM.

### USING IMMEDIATE VALUES ON ARM

Loading immediate values in a register on ARM is not as straightforward as it is on x86. There are restrictions on which immediate values you can use. What these restrictions are and how to deal with them isn’t the most exciting part of ARM assembly, but bear with me, this is just for your understanding and there are tricks you can use to bypass these restrictions (hint: LDR).

We know that each ARM instruction is 32bit long, and all instructions are conditional. There are 16 condition codes which we can use and one condition code takes up 4 bits of the instruction. Then we need 2 bits for the destination register. 2 bits for the first operand register, and 1 bit for the set-status flag, plus an assorted number of bits for other matters like the actual opcodes. The point here is, that after assigning bits to instruction-type, registers, and other fields, there are only 12 bits left for immediate values, which will only allow for 4096 different values.

This means that the ARM instruction is only able to use a limited range of immediate values with MOV directly.  If a number can’t be used directly, it must be split into parts and pieced together from multiple smaller numbers.

But there is more. Instead of taking the 12 bits for a single integer, those 12 bits are split into an 8bit number (n) being able to load any 8-bit value in the range of 0-255, and a 4bit rotation field (r) being a right rotate in steps of 2 between 0 and 30. This means that the full immediate value v is given by the formula: v = n ror 2*r. In other words, the only valid immediate values are rotated bytes (values that can be reduced to a byte rotated by an even number).

Here are some examples of valid and invalid immediate values:

```
Valid values:
#256        // 1 ror 24 --> 256
#384        // 6 ror 26 --> 384
#484        // 121 ror 30 --> 484
#16384      // 1 ror 18 --> 16384
#2030043136 // 121 ror 8 --> 2030043136
#0x06000000 // 6 ror 8 --> 100663296 (0x06000000 in hex)

Invalid values:
#370        // 185 ror 31 --> 31 is not in range (0 – 30)
#511        // 1 1111 1111 --> bit-pattern can’t fit into one byte
#0x06010000 // 1 1000 0001.. --> bit-pattern can’t fit into one byte
```

This has the consequence that it is not possible to load a full 32bit address in one go. We can bypass this restrictions by using one of the following two options:

- Construct a larger value out of smaller parts
  - Instead of using MOV  r0, #511
  - Split 511 into two parts: MOV r0, #256, and ADD r0, #255
- Use a load construct ‘ldr r1,=value’ which the assembler will happily convert into a MOV, or a PC-relative load if that is not possible.
  - LDR r1, =511

If you try to load an invalid immediate value the assembler will complain and output an error saying: Error: invalid constant. If you encounter this error, you now know what it means and what to do about it.
Let’s say you want to load #511 into R0.

```
.section .text
.global _start

_start:
    mov     r0, #511
    bkpt
```

If you try to assemble this code, the assembler will throw an error:

```
azeria@labs:~$ as test.s -o test.o
test.s: Assembler messages:
test.s:5: Error: invalid constant (1ff) after fixup
```


You need to either split 511 in multiple parts or you use LDR as I described before.

```
.section .text
.global _start

_start:
 mov r0, #256   /* 1 ror 24 = 256, so it's valid */
 add r0, #255   /* 255 ror 0 = 255, valid. r0 = 256 + 255 = 511 */
 ldr r1, =511   /* load 511 from the literal pool using LDR */
 bkpt
```

If you need to figure out if a certain number can be used as a valid immediate value, you don’t need to calculate it yourself. You can use my little python script called [rotator.py](https://raw.githubusercontent.com/azeria-labs/rotator/master/rotator.py) which takes your number as an input and tells you if it can be used as a valid immediate number.

```
azeria@labs:~$ python rotator.py
Enter the value you want to check: 511

Sorry, 511 cannot be used as an immediate number and has to be split.

azeria@labs:~$ python rotator.py
Enter the value you want to check: 256

The number 256 can be used as a valid immediate number.
1 ror 24 --> 256
```








## 5. Load and Store Multiple

### LOAD/STORE MULTIPLE
Sometimes it is more efficient to load (or store) multiple values at once. For that purpose we use LDM (load multiple) and STM (store multiple). These instructions have variations which basically differ only by the way the initial address is accessed. This is the code we will use in this section. We will go through each instruction step by step.

```
.data

array_buff:
 .word 0x00000000             /* array_buff[0] */
 .word 0x00000000             /* array_buff[1] */
 .word 0x00000000             /* array_buff[2]. This element has a relative address of array_buff+8 */
 .word 0x00000000             /* array_buff[3] */
 .word 0x00000000             /* array_buff[4] */

.text
.global main

main:
 adr r0, words+12             /* address of words[3] -> r0 */
 ldr r1, array_buff_bridge    /* address of array_buff[0] -> r1 */
 ldr r2, array_buff_bridge+4  /* address of array_buff[2] -> r2 */
 ldm r0, {r4,r5}              /* words[3] -> r4 = 0x03; words[4] -> r5 = 0x04 */
 stm r1, {r4,r5}              /* r4 -> array_buff[0] = 0x03; r5 -> array_buff[1] = 0x04 */
 ldmia r0, {r4-r6}            /* words[3] -> r4 = 0x03, words[4] -> r5 = 0x04; words[5] -> r6 = 0x05; */
 stmia r1, {r4-r6}            /* r4 -> array_buff[0] = 0x03; r5 -> array_buff[1] = 0x04; r6 -> array_buff[2] = 0x05 */
 ldmib r0, {r4-r6}            /* words[4] -> r4 = 0x04; words[5] -> r5 = 0x05; words[6] -> r6 = 0x06 */
 stmib r1, {r4-r6}            /* r4 -> array_buff[1] = 0x04; r5 -> array_buff[2] = 0x05; r6 -> array_buff[3] = 0x06 */
 ldmda r0, {r4-r6}            /* words[3] -> r6 = 0x03; words[2] -> r5 = 0x02; words[1] -> r4 = 0x01 */
 ldmdb r0, {r4-r6}            /* words[2] -> r6 = 0x02; words[1] -> r5 = 0x01; words[0] -> r4 = 0x00 */
 stmda r2, {r4-r6}            /* r6 -> array_buff[2] = 0x02; r5 -> array_buff[1] = 0x01; r4 -> array_buff[0] = 0x00 */
 stmdb r2, {r4-r5}            /* r5 -> array_buff[1] = 0x01; r4 -> array_buff[0] = 0x00; */
 bx lr

words:
 .word 0x00000000             /* words[0] */
 .word 0x00000001             /* words[1] */
 .word 0x00000002             /* words[2] */
 .word 0x00000003             /* words[3] */
 .word 0x00000004             /* words[4] */
 .word 0x00000005             /* words[5] */
 .word 0x00000006             /* words[6] */

array_buff_bridge:
 .word array_buff             /* address of array_buff, or in other words - array_buff[0] */
 .word array_buff+8           /* address of array_buff[2] */
 ```
 
Before we start, keep in mind that a .word refers to a data (memory) block of 32 bits = 4 BYTES. This is important for understanding the offsetting. So the program consists of .data section where we allocate an empty array (array_buff) having 5 elements. We will use this as a writable memory location to STORE data. The .text section contains our code with the memory operation instructions and a read-only data pool containing two labels: one for an array having 7 elements, another for “bridging” .text and .data sections so that we can access the array_buff residing in the .data section.

```
adr r0, words+12             /* address of words[3] -> r0 */
```

We use ADR instruction (lazy approach) to get the address of the 4th (words[3]) element into the R0. We point to the middle of the words array because we will be operating forwards and backwards from there.

```
gef> break _start 
gef> run
gef> nexti
```

R0 now contains the address of word[3], which in this case is 0x80B8. This means, our array starts at the address of word[0]: 0x80AC (0x80B8 –  0xC).

```
gef> x/7w 0x00080AC
0x80ac <words>: 0x00000000 0x00000001 0x00000002 0x00000003
0x80bc <words+16>: 0x00000004 0x00000005 0x00000006
```

We prepare R1 and R2 with the addresses of the first (array_buff[0]) and third (array_buff[2]) elements of the array_buff array. Once the addresses are obtained, we can start operating on them.

```
ldr r1, array_buff_bridge    /* address of array_buff[0] -> r1 */
ldr r2, array_buff_bridge+4  /* address of array_buff[2] -> r2 */
```

After executing the two instructions above, R1 and R2 contain the addresses of array_buff[0] and array_buff[2].

```
gef> info register r1 r2
r1      0x100d0     65744
r2      0x100d8     65752
```

The next instruction uses LDM to load two word values from the memory pointed by R0. So because we made R0 point to words[3] element earlier, the words[3] value goes to R4 and the words[4] value goes to R5.

```
ldm r0, {r4,r5}              /* words[3] -> r4 = 0x03; words[4] -> r5 = 0x04 */
```

We loaded multiple (2 data blocks) with one command, which set R4 = 0x00000003 and R5 = 0x00000004.

```
gef> info registers r4 r5
r4      0x3      3
r5      0x4      4
```

So far so good. Now let’s perform the STM instruction to store multiple values to memory. The STM instruction in our code takes values (0x00000003 and 0x00000004) from registers R4 and R5 and stores these values to a memory location specified by R1. We previously set the R1 to point to the first array_buff element so after this operation the array_buff[0] = 0x00000003 and array_buff[1] = 0x00000004. If not specified otherwise, the LDM and STM opperate on a step of a word (32 bits = 4 byte).

```
stm r1, {r4,r5}              /* r4 -> array_buff[0] = 0x03; r5 -> array_buff[1] = 0x04 */
```

The values 0x3 and 0x4 should now be stored at the memory address 0x100D0 (from R1) and 0x100D8 (from R2).

```
gef> x/2w 0x000100D0
0x100d0 <array_buff>:  0x00000003   0x00000004
```


As mentioned before, LDM and STM have variations. The type of variation is defined by the suffix of the instruction. Suffixes used in the example are: -IA (increase after), -IB (increase before), -DA (decrease after), -DB (decrease before). These variations differ by the way how they access the memory specified by the first operand (the register storing the source or destination address). In practice, LDM is the same as LDMIA, which means that the address for the next element to be loaded is increased after each load. In this way we get a sequential (forward) data loading from the memory address specified by the first operand (register storing the source address).

```
ldmia r0, {r4-r6} /* words[3] -> r4 = 0x03, words[4] -> r5 = 0x04; words[5] -> r6 = 0x05; */ 
stmia r1, {r4-r6} /* r4 -> array_buff[0] = 0x03; r5 -> array_buff[1] = 0x04; r6 -> array_buff[2] = 0x05 */
```

After executing the two instructions above, the registers R4-R6 and the memory addresses 0x000100D0, 0x000100D4, and 0x000100D8 contain the values 0x3, 0x4, and 0x5.

```
gef> info registers r4 r5 r6
r4     0x3     3
r5     0x4     4
r6     0x5     5
gef> x/3w 0x000100D0
0x100d0 <array_buff>: 0x00000003  0x00000004  0x00000005
```

The LDMIB instruction first increases the source address by 4 bytes (one word value) and then performs the first load. In this way we still have a sequential (forward) loading of data, but the first element is with a 4 byte offset from the source address. That’s why in our example the first element to be loaded from the memory into the R4 by LDMIB instruction is 0x00000004 (the words[4]) and not the 0x00000003 (words[3]) as pointed by the R0.

```
ldmib r0, {r4-r6}            /* words[4] -> r4 = 0x04; words[5] -> r5 = 0x05; words[6] -> r6 = 0x06 */
stmib r1, {r4-r6}            /* r4 -> array_buff[1] = 0x04; r5 -> array_buff[2] = 0x05; r6 -> array_buff[3] = 0x06 */
```

After executing the two instructions above, the registers R4-R6 and the memory addresses 0x100D4, 0x100D8, and 0x100DC contain the values 0x4, 0x5, and 0x6.

```
gef> x/3w 0x100D4
0x100d4 <array_buff+4>: 0x00000004  0x00000005  0x00000006
gef> info register r4 r5 r6
r4     0x4    4
r5     0x5    5
r6     0x6    6
```

When we use the LDMDA instruction everything starts to operate backwards. R0 points to words[3]. When loading starts we move backwards and load the words[3], words[2] and words[1] into R6, R5, R4. Yes, registers are also loaded backwards. So after the instruction finishes R6 = 0x00000003, R5 = 0x00000002, R4 = 0x00000001. The logic here is that we move backwards because we Decrement the source address AFTER each load. The backward registry loading happens because with every load we decrement the memory address and thus decrement the registry number to keep up with the logic that higher memory addresses relate to higher registry number. Check out the LDMIA (or LDM) example, we loaded lower registry first because the source address was lower, and then loaded the higher registry because the source address increased.

Load multiple, decrement after:

```
ldmda r0, {r4-r6} /* words[3] -> r6 = 0x03; words[2] -> r5 = 0x02; words[1] -> r4 = 0x01 */
```

Registers R4, R5, and R6 after execution:

```
gef> info register r4 r5 r6
r4     0x1    1
r5     0x2    2
r6     0x3    3
```

Load multiple, decrement before:

```
ldmdb r0, {r4-r6} /* words[2] -> r6 = 0x02; words[1] -> r5 = 0x01; words[0] -> r4 = 0x00 */
```

Registers R4, R5, and R6 after execution:

```
gef> info register r4 r5 r6
r4 0x0 0
r5 0x1 1
r6 0x2 2
```

Store multiple, decrement after.

```
stmda r2, {r4-r6} /* r6 -> array_buff[2] = 0x02; r5 -> array_buff[1] = 0x01; r4 -> array_buff[0] = 0x00 */
```

Memory addresses of array_buff[2], array_buff[1], and array_buff[0] after execution:

```
gef> x/3w 0x100D0
0x100d0 <array_buff>: 0x00000000 0x00000001 0x00000002
```

Store multiple, decrement before:

```
stmdb r2, {r4-r5} /* r5 -> array_buff[1] = 0x01; r4 -> array_buff[0] = 0x00; */
```

Memory addresses of array_buff[1] and array_buff[0] after execution:

```
gef> x/2w 0x100D0
0x100d0 <array_buff>: 0x00000000 0x00000001
```

### PUSH AND POP

There is a memory location within the process called Stack. The Stack Pointer (SP) is a register which, under normal circumstances, will always point to an address wihin the Stack’s memory region. Applications often use Stack for temporary data storage. And As mentioned before, ARM uses a Load/Store model for memory access, which means that the instructions LDR / STR or their derivatives (LDM.. /STM..) are used for memory operations. In x86, we use PUSH and POP to load and store from and onto the Stack. In ARM, we can use these two instructions too:

When we PUSH something onto the Full Descending (more about Stack differences in [Part 7: Stack and Functions](https://azeria-labs.com/functions-and-the-stack-part-7/)) stack the following happens:

1. First, the address in SP gets DECREASED by 4.
2. Second, information gets stored to the new address pointed by SP.

When we POP something off the stack, the following happens:

1. The value at the current SP address is loaded into a certain register,
2. Address in SP gets INCREASED by 4.

In the following example we use both PUSH/POP and LDMIA/STMDB:

```
.text
.global _start

_start:
   mov r0, #3
   mov r1, #4
   push {r0, r1}
   pop {r2, r3}
   stmdb sp!, {r0, r1}
   ldmia sp!, {r4, r5}
   bkpt
```

Let’s look at the disassembly of this code.

azeria@labs:~$ as pushpop.s -o pushpop.o
azeria@labs:~$ ld pushpop.o -o pushpop
azeria@labs:~$ objdump -D pushpop
pushpop: file format elf32-littlearm

Disassembly of section .text:

```
00008054 <_start>:
 8054: e3a00003 mov r0, #3
 8058: e3a01004 mov r1, #4
 805c: e92d0003 push {r0, r1}
 8060: e8bd000c pop {r2, r3}
 8064: e92d0003 push {r0, r1}
 8068: e8bd0030 pop {r4, r5}
 806c: e1200070 bkpt 0x0000
```

As you can see, our LDMIA and STMDB instuctions got translated to PUSH and POP. That’s because PUSH is a synonym for STMDB sp!, reglist and POP is a synonym for LDMIA sp! reglist (see [ARM Manual](http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.dui0489e/Babefbce.html))

Let’s run this code in GDB.

```
gef> break _start
gef> run
gef> nexti 2
[...]
gef> x/w $sp
0xbefff7e0: 0x00000001
```

After running the first two instructions we quickly checked what memory address and value SP points to. The next PUSH instruction should decrease SP by 8, and store the value of R1 and R0 (in that order) onto the Stack.

```
gef> nexti
[...] ----- Stack -----
0xbefff7d8|+0x00: 0x3 <- $sp
0xbefff7dc|+0x04: 0x4
0xbefff7e0|+0x08: 0x1
[...] 
gef> x/w $sp
0xbefff7d8: 0x00000003
```

Next, these two values (0x3 and 0x4) are poped off the Stack into the registers, so that R2 = 0x3 and R3 = 0x4. SP is increased by 8:

```
gef> nexti
gef> info register r2 r3
r2     0x3    3
r3     0x4    4
gef> x/w $sp
0xbefff7e0: 0x00000001
```

## 6. Conditional Execution and Branching

### CONDITIONAL EXECUTION

We already briefly touched the conditions’ topic while discussing the CPSR register. We use conditions for controlling the program’s flow during it’s runtime usually by making jumps (branches) or executing some instruction only when a condition is met. The condition is described as the state of a specific bit in the CPSR register. Those bits change from time to time based on the outcome of some instructions. For example, when we compare two numbers and they turn out to be equal, we trigger the Zero bit (Z = 1), because under the hood the following happens: a – b = 0. In this case we have EQual condition. If the first number was bigger, we would have a Greater Than condition and in the opposite case – Lower Than. There are more conditions, like Lower or Equal (LE), Greater or Equal (GE) and so on.

The following table lists the available condition codes, their meanings, and the status of the flags that are tested.



| Condition Code	| Meaning (for cmp or subs)	| Status of Flags| 
| ---- |  ------| ------| 
| EQ	 | Equal	| Z==1 |
| NE	|Not Equal	|Z==0|
| GT	|Signed Greater Than|	(Z==0) && (N==V)|
| LT	|Signed Less Than|	N!=V|
| GE	|Signed Greater Than or Equal	|N==V|
| LE	|Signed Less Than or Equal	|(Z==1) \|\| (N!=V)|
| CS |or HS	Unsigned Higher or Same (or Carry Set)	|C==1|
| CC |or LO	Unsigned Lower (or Carry Clear)	|C==0|
| MI	|Negative (or Minus)	|N==1|
| PL	|Positive (or Plus)	|N==0|
| AL	 |Always executed	 |–|
| NV	 |Never executed	 |–|
| VS	 |Signed Overflow	 |V==1|
| VC	 |No signed Overflow	 |V==0|
| HI	 |Unsigned Higher	|(C==1) && (Z==0)|
| LS	 |Unsigned Lower or same	 |(C==0) \|\| (Z==0)|

We can use the following piece of code to look into a practical use case of conditions where we perform conditional addition.

```
.global main

main:
        mov     r0, #2     /* setting up initial variable */
        cmp     r0, #3     /* comparing r0 to number 3. Negative bit get's set to 1 */
        addlt   r0, r0, #1 /* increasing r0 IF it was determined that it is smaller (lower than) number 3 */
        cmp     r0, #3     /* comparing r0 to number 3 again. Zero bit gets set to 1. Negative bit is set to 0 */
        addlt   r0, r0, #1 /* increasing r0 IF it was determined that it is smaller (lower than) number 3 */
        bx      lr
```


The first CMP instruction in the code above triggers Negative bit to be set (2 – 3 = -1) indicating that the value in r0 is Lower Than number 3. Subsequently, the ADDLT instruction is executed because LT condition is full filled when V != N (values of overflow and negative bits in the CPSR are different). Before we execute second CMP, our r0 = 3. That’s why second CMP clears out Negative bit (because 3 – 3 = 0, no need to set the negative flag) and sets the Zero flag (Z = 1). Now we have V = 0 and N = 0 which results in LT condition to fail. As a result, the second ADDLT is not executed and r0 remains unmodified. The program exits with the result 3.



### CONDITIONAL EXECUTION IN THUMB

In the Instruction Set chapter we talked about the fact that there are different Thumb versions. Specifically, the Thumb version which allows conditional execution (Thumb-2). Some ARM processor versions support the “IT” instruction that allows up to 4 instructions to be executed conditionally in Thumb state.

Reference: http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.dui0552a/BABIJDIC.html

Syntax: `IT{x{y{z}}} `cond

cond specifies the condition for the first instruction in the IT block
- x specifies the condition switch for the second instruction in the IT block
- y specifies the condition switch for the third instruction in the IT block
- z specifies the condition switch for the fourth instruction in the IT block

The structure of the IT instruction is “IF-Then-(Else)” and the syntax is a construct of the two letters T and E:

- IT refers to If-Then (next instruction is conditional)
- ITT refers to If-Then-Then (next 2 instructions are conditional)
- ITE refers to If-Then-Else (next 2 instructions are conditional)
- ITTE refers to If-Then-Then-Else (next 3 instructions are conditional)
- ITTEE refers to If-Then-Then-Else-Else (next 4 instructions are conditional)

Each instruction inside the IT block must specify a condition suffix that is either the same or logical inverse. This means that if you use ITE, the first and second instruction (If-Then) must have the same condition suffix and the third (Else) must have the logical inverse of the first two. Here are some examples from the ARM reference manual which illustrates this logic:

```
ITTE   NE           ; Next 3 instructions are conditional
ANDNE  R0, R0, R1   ; ANDNE does not update condition flags
ADDSNE R2, R2, #1   ; ADDSNE updates condition flags
MOVEQ  R2, R3       ; Conditional move

ITE    GT           ; Next 2 instructions are conditional
ADDGT  R1, R0, #55  ; Conditional addition in case the GT is true
ADDLE  R1, R0, #48  ; Conditional addition in case the GT is not true

ITTEE  EQ           ; Next 4 instructions are conditional
MOVEQ  R0, R1       ; Conditional MOV
ADDEQ  R2, R2, #10  ; Conditional ADD
ANDNE  R3, R3, #1   ; Conditional AND
BNE.W  dloop        ; Branch instruction can only be used in the last instruction of an IT block
```

Wrong syntax:

```
IT     NE           ; Next instruction is conditional     
ADD    R0, R0, R1   ; Syntax error: no condition code used in IT block.
```

Here are the conditional codes and their opposite:


| Condition Code | | Opposite||	
|---|---|---|---|
|Code	|Meaning	|Code|	Meaning|
|EQ	|Equal	|NE	 |Not Equal|
|HS(or CS)	|Unsigned higher or same(or carry set)	|LO(or CC)	 |Unsigned lower(or carry clear)|
|MI|	Negative	|PL|	 Positive or Zero|
|VS|	Signed Overflow	|VC|	 No Signed Overflow|
|HI|	Unsigned Higher	|LS	| Unsigned Lower or Same|
|GE|	Signed Greater Than or Equal	|LT	| Signed Less Than|
|GT|	 Signed Greater Than|	LE	| Signed Less Than or Equal|
|AL(or omitted)	| Always Executed||	There is no opposite to AL|


Let’s try this out with the following example code:

```
.syntax unified    @ this is important!
.text
.global _start

_start:
    .code 32
    add r3, pc, #1   @ increase value of PC by 1 and add it to R3
    bx r3            @ branch + exchange to the address in R3 -> switch to Thumb state because LSB = 1

    .code 16         @ Thumb state
    cmp r0, #10      
    ite eq           @ if R0 is equal 10...
    addeq r1, #2     @ ... then R1 = R1 + 2
    addne r1, #3     @ ... else R1 = R1 + 3
    bkpt
```

.code 32

This example code starts in ARM state. The first instruction adds the address specified in PC plus 1 to R3 and then branches to the address in R3.  This will cause a switch to Thumb state, because the LSB (least significant bit) is 1 and therefore not 4 byte aligned. It’s important to use bx (branch + exchange) for this purpose. After the branch the T (Thumb) flag is set and we are in Thumb state.

.code 16

In Thumb state we first compare R0 with #10, which will set the Negative flag (0 – 10 = – 10). Then we use an If-Then-Else block. This block will skip the ADDEQ instruction because the Z (Zero) flag is not set and will execute the ADDNE instruction because the result was NE (not equal) to 10.

Stepping through this code in GDB will mess up the result, because you would execute both instructions in the ITE block. However running the code in GDB without setting a breakpoint and stepping through each instruction will yield to the correct result setting R1 = 3.

### BRANCHES

Branches (aka Jumps) allow us to jump to another code segment. This is useful when we need to skip (or repeat) blocks of codes or jump to a specific function. Best examples of such a use case are IFs and Loops. So let’s look into the IF case first.

```
.global main

main:
        mov     r1, #2     /* setting up initial variable a */
        mov     r2, #3     /* setting up initial variable b */
        cmp     r1, r2     /* comparing variables to determine which is bigger */
        blt     r1_lower   /* jump to r1_lower in case r2 is bigger (N==1) */
        mov     r0, r1     /* if branching/jumping did not occur, r1 is bigger (or the same) so store r1 into r0 */
        b       end        /* proceed to the end */
r1_lower:
        mov r0, r2         /* We ended up here because r1 was smaller than r2, so move r2 into r0 */
        b end              /* proceed to the end */
end:
        bx lr              /* THE END */
```

The code above simply checks which of the initial numbers is bigger and returns it as an exit code. A C-like pseudo-code would look like this:

```
int main() {
   int max = 0;
   int a = 2;
   int b = 3;
   if(a < b) {
    max = b;
   }
   else {
    max = a;
   }
   return max;
}
```

Now here is how we can use conditional and unconditional branches to create a loop.

```
.global main

main:
        mov     r0, #0     /* setting up initial variable a */
loop:
        cmp     r0, #4     /* checking if a==4 */
        beq     end        /* proceeding to the end if a==4 */
        add     r0, r0, #1 /* increasing a by 1 if the jump to the end did not occur */
        b loop             /* repeating the loop */
end:
        bx lr              /* THE END */
```

A C-like pseudo-code of such a loop would look like this:

```
int main() {
   int a = 0;
   while(a < 4) {
   a= a+1;
   }
   return a;
}
```

### B / BX / BLX

There are three types of branching instructions:

- Branch (B)
  - Simple jump to a function
- Branch link (BL)
  - Saves (PC+4) in LR and jumps to function
- Branch exchange (BX) and Branch link exchange (BLX)
  - Same as B/BL + exchange instruction set (ARM <-> Thumb)
  - Needs a register as first operand: BX/BLX reg

BX/BLX is used to exchange the instruction set from ARM to Thumb.

```
.text
.global _start

_start:
     .code 32         @ ARM mode
     add r2, pc, #1   @ put PC+1 into R2
     bx r2            @ branch + exchange to R2

    .code 16          @ Thumb mode
     mov r0, #1
```

The trick here is to take the current value of the actual PC, increase it by 1, store the result to a register, and branch (+exchange) to that register. We see that the addition (add r2, pc, #1) will simply take the effective PC address (which is the current PC register’s value + 8 -> 0x805C) and add 1 to it (0x805C + 1 = 0x805D). Then, the exchange happens if the Least Significant Bit (LSB) of the address we branch to is 1 (which is the case, because 0x805D = 10000000 01011101), meaning the address is not 4 byte aligned. Branching to such an address won’t cause any misalignment issues. This is how it would look like in GDB (with GEF extension):


![](https://azeria-labs.com/wp-content/uploads/2017/03/branch-thumb-gif.gif)


Please note that the GIF above was created using the older version of [GEF](https://github.com/hugsy/gef) so it’s very likely that you see a slightly different UI and different offsets. Nevertheless, the logic is the same.
Conditional Branches

Branches can also be executed conditionally and used for branching to a function if a specific condition is met. Let’s look at a very simple example of a conditional branch suing BEQ. This piece of assembly does nothing interesting other than moving values into registers and branching to another function if a register is equal to a specified value. 


```
.text
.global _start

_start:
   mov r0, #2
   mov r1, #2
   add r0, r0, r1
   cmp r0, #4
   beq func1
   add r1, #5
   b func2
func1:
   mov r1, r0
   bx  lr
func2:
   mov r0, r1
   bx  lr
```

![](https://azeria-labs.com/wp-content/uploads/2017/03/branch.png)


## 7. Stack and Functions




