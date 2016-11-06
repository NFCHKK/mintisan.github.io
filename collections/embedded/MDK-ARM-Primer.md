
#MDK-ARM Primer


[Develop Embedded Applications for Cortex-M processor-based devices with µVision®](http://www.keil.com/support/man/docs/gsac/)

------------

[TOC]



This Primer provides an overview of the **Keil MDK-ARM Microcontroller Development Kit** and contains the following chapters:

- [Introduction](http://www.keil.com/support/man/docs/gsac/GSAC_Intro.htm) provides an overview of the development cycle and tools, and presents the default installation folder structure.
- [Create Application](http://www.keil.com/support/man/docs/gsac/GSAC_createApps.htm) describes how to create projects, edit and compile source files, fix syntax errors, and generate executable target programs.
- [Flash Application](http://www.keil.com/support/man/docs/gsac/GSAC_flashApplication.htm) describes how to setup ULINK for Flash programming via the JTAG interface.
- [Debug Application](http://www.keil.com/support/man/docs/gsac/GSAC_debugApplication.htm) describes the µVision debugger as hardware debugger and simulator.
- [Use on-chip Peripherals](http://www.keil.com/support/man/docs/gsac/GSAC_useOCPeripherals.htm) shows how to access the on-chip peripherals with the development tools.
- [Appendix: Migrate RL-ARM to MDK-Professional](http://www.keil.com/support/man/docs/gsac/GSAC_mig_prof.htm) is a guide for porting USB and Flash File System projects to MDK-Professional. The license status is explained.

## Introduction

**MDK-ARM Microcontroller Development Tool Kits** (MDK-ARM) generate embedded applications for many popular ARM-powered devices. The tools allow engineers to write software programs in assembly language or in a high-level language (like C or C++) and to create a complete application that can be programmed into microcontrollers or other memory devices. MDK-ARM tools are designed for the professional software developer, but any level of programmer can use them to get the most out of ARM-powered devices.

The [Getting Started](http://www2.keil.com/docs/default-source/default-document-library/mdk5-getting-started.pdf?sfvrsn=0) user's guide explains how to create applications for ARM Cortex-M microcontrollers. The book starts with the installation of MDK and describes the software components along with the complete workflow from starting a project to debugging on hardware.

The [Microcontroller Development Kit Version 5](http://www.keil.com/mdk5/) web page provides videos that explain the installers for MDK Core and Software Packs, and the usage of the [Run-Time Environment](http://www.keil.com/support/man/docs/uv4/uv4_ca_rtemanager.htm) for installing [Software Components](http://www.keil.com/support/man/docs/uv4/uv4_ca_swComponents.htm) when building a project.

This primer includes explanations about the:

- [Software Development Cycle](http://www.keil.com/support/man/docs/gsac/GSAC_devCycle.htm) describing the development cycle and components.
- [Development Tools](http://www.keil.com/support/man/docs/gsac/GSAC_devTools.htm) describing the major tool features including the µVision IDE and Debugger.

### Software Development Cycle

The software development cycle is roughly the same with µVision as it is with any other development tool:

1. Create a new project, select the target chip from the Device Database, and configure the tool settings.
2. Create source files and write the code in C, C++, or Assembly.
3. Build the application with the project manager.
4. Correct the errors.
5. Test the application.

The block diagram below illustrates the build process and the involved components.

![Development Cycle](http://upload-images.jianshu.io/upload_images/26219-932ca81adfee95e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### µVision Integrated Development Environment (IDE)

The µVision IDE is a window-based software development platform combining a robust editor, project manager, and make facility. µVision supports the MDK-ARM tools including C/C++ compiler, macro assembler, linker, library manager, and object-HEX converter. Use µVision to create source files and organize them into a project that defines the target application. µVision compiles, assembles, and links the application automatically and provides a single focal point for your development efforts.

#### C/C++ Compiler and Macro Assembler

Source files are created with the µVision IDE are passed to the C/C++ compiler or macro assembler. The compiler and assembler process the source files and create relocatable object files.

#### Library Manager

The library manager allows creating a library from the object files created by the compiler and assembler. Libraries have a special format and are ordered collections of object modules. Libraries can be used by the linker at a later time. When the linker processes a library, it links only those object modules that are necessary to create the program.

#### Linker/Locator

The linker/locator creates an absolute ELF/DWARF file using the object modules extracted from libraries and those created by the compiler and assembler. An absolute object file or module contains no relocatable code or data. All code and data reside at fixed memory locations. The absolute ELF/DWARF file can be used:

- To program a Flash ROM or other memory devices.
- With the µVision Debugger for target debugging and simulation.
- With an in-circuit emulator for program testing.

#### µVision Debugger

The µVision Debugger is ideally suited for fast, reliable program debugging. The debugger includes a high-speed Simulator capable of simulating external hardware and most on-chip peripherals. The chip attributes are set automatically when selecting the device from the Device Database.

The µVision Debugger provides several ways to test programs:

- Connected to a [Keil ULINK USB-JTAG adapter](http://www.keil.com/ulink), which allows downloading the program to Flash and debugging the program on ARM-powered devices.
- Connected to the AGDI interface, which allows connecting to and using the µVision Debugger on target systems.

### Development Tools

The Keil MDK-ARM development tools for ARM-powered devices offer numerous features and advantages that help developing embedded applications quickly and successfully.

- [µVision](http://www.keil.com/support/man/docs/gsac/GSAC_uVisionIDE.htm) describes the Integrated Development Environment (IDE) that combines the project manager, source code editor, and program debugger into one single, powerful environment.
- [Compilation Tools](http://www.keil.com/support/man/docs/gsac/GSAC_compTools.htm) includes the compiler, assembler, linker, and utilities.
- [ULINK USB-JTAG Adapter](http://www.keil.com/support/man/docs/gsac/GSAC_ulink.htm) is an interface that connects to the target system (via JTAG or similar debug interface) and allows debugging programs running on the target hardware.

#### µVision

µVision is a window-based software development platform that helps expedite the development process by providing a:

- **Project Manager** to create and maintain projects.
- **Device Database** for selecting a device and configuring the development tools for that particular microcontroller.
- **Make facility** for assembling, compiling, and linking your embedded applications.
- Rich-featured **Source Code Editor**.
- **Template Editor** that is used to insert common text sequences or header blocks.
- **Source Browser** for rapidly exploring code objects, locating, and analyzing data in your application.
- **Function Browser** for quickly navigating between functions in your program.
- **Function Outlining** for controlling the visual scope within a source file.
- Built-in utilities, such as **Find in Files** and functions for commenting and uncommenting source code.
- **Simulator** and **Target Debugger** are fully integrated.
- **Configuration Wizard** providing graphical editing for microcontroller startup-code and configuration files.
- Interface to configure **Software Version Control Systems** and third-party utilities.
- **Flash Programming Utilities** dialog.
- **Dialogs** for tool settings and target configurations.
- **Online Help** that links to microcontroller data sheets and user guides.


#### Compilation Tools

The Keil MDK-ARM Compilation Tools allow writing applications for ARM-powered microcontroller in C or C++, which, once compiled, have the efficiency and speed of an assembly language. The compilation tools include:

- ARM C/C++ Compiler (armcc).
- ARM Macro Assembler (armasm).
- ARM Linker (armLink).
- ARM Utilities (Librarian and FromELF).

The Keil MDK-ARM Compilation Tools translate C/C++ source files into relocatable object modules that contain full symbolic information for debugging with the µVision Debugger.

**ARM C/C++ Compiler (armcc)**

- **ARM and Thumb® generation modes** can be mixed in the same source file. ARM mode allows faster code execution, making it ideal for interrupt handlers. Thumb mode provides the smallest code size.
- **Industry leading code size optimizations** achieves memory cost savings by generating the smallest compiled code size.
- **Industry leading code performance optimizations** reduces power consumption by enabling increased through-put without clock speed increases.
- **Function Attributes for Hardware Support** gives access to ARM hardware features.
- **Embedded Assembler** code can be inserted into C functions. This capability is useful for fast DSP and other signal-processing algorithms. The ARM compiler supports full program optimization even when embedded assembler is used.
- **Function Inlining** to speed-up execution of frequently called functions. Such functions are expanded without the overhead associated with the function call, parameter passing, and return.
- **Parameter Passing in CPU Registers** used automatically by the ARM compiler to pass most function arguments. It can even pass and return small C structs into and from registers.
- **Run-time Library routines** are mostly reentrant and can be invoked from the main program and from interrupts. Special protection schemes for library calls are not needed.
- **IEEE 754 Compliant Single and Double Precision Floating-point** for high accuracy floating-point support.


**ARM Macro Assembler (armasm)**

- **Standard Macro Processor** supports assembler macros to repeat or automate assembler instruction sequences.
- **Conditional Assembler Controls** control the assembler source code to create multiple target applications from the same source file(s).
- **Source Listing with Symbol Reference** file includes an optional cross reference that provides detailed information about the assembled source file.

**ARM Linker (armlink)**

- **Detailed Listing File** that is easy to understand is created by the linker. It contains details like the memory configuration, input modules, memory map, symbol table, and cross reference.
- **Global Code Listing** file that shows symbolic disassembly of the generated code is created by the linker.
- **Static Stack Analysis** for stack requirements at link-time is calculated by the linker.

**ARM Library Manager (armar)**

- **Module Management** library files provide a convenient way to combine and reference a large number of modules that can be used by the linker. Library files can be built with µVision.
- **Variable and Function Reference**; modules from libraries are extracted and added to programs only if required. Modules containing routines that are not invoked by the program are not included in the final output.
- **Security, Speed, and Minimized Disk Space**; Libraries provide a vehicle for distributing large numbers of functions and routines without distributing the original source code.

#### ULINK USB-JTAG Adapter

The [Keil ULINK](http://www.keil.com/ulink) family of USB-JTAG Adapters connect the PC's USB port to the target system (via JTAG or a similar debug interface) and allow debugging embedded programs running on target hardware.

![ULINKPro and ULINK2 Adapter](http://upload-images.jianshu.io/upload_images/26219-68ddc8d9665af8fa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- ULINK adapters enable the developer to:
- Download programs to target hardware.
- Examine the memory and registers.
- Single-step through the program code.
- Insert multiple breakpoints.
- Run programs in real-time.
- Program Flash memory.
- Connect to the target system in JTAG or Serial Wire mode.
- Debug Cortex-M devices on-the-fly.
- Examine trace information from Cortex-M devices.

ULINK*pro* is a debug unit that captures data and trace instructions in real-time via USB. In addition to the features above, ULINK*pro* has the following features:
- Data and Instruction Trace for Cortex-M systems.
- High-Speed Flash download.

For more information refer to [Flash Application](http://www.keil.com/support/man/docs/gsac/GSAC_FlashApplication.HTM) and [Debug Application](http://www.keil.com/support/man/docs/gsac/GSAC_debugApplication.htm).


## Create Application

Follow the steps below to create an application with µVision:

1. [Pack Installer](http://www.keil.com/support/man/docs/uv4/uv4_ca_packinstaller.htm) installs, updates, and removes Software Packs, and can be launched from within µVision or standalone, outside of µVision.
2. [Setup the Project](http://www.keil.com/support/man/docs/uv4/uv4_ca_createprjfile.htm) to define the project file and **select the device.**
3. [Software Components](http://www.keil.com/support/man/docs/uv4/uv4_ca_swcomponents.htm) can be used to create applications with the [Manage Run-Time Environment](http://www.keil.com/support/man/docs/uv4/uv4_ca_rtemanager.htm) dialog.
4. [Set Options for Target](http://www.keil.com/support/man/docs/gsac/GSAC_ToolOpts.htm) explains how to specify relevant parameters for your target.
5. [Add Source File](http://www.keil.com/support/man/docs/uv4/uv4_ca_sourcefiles.htm) to a project
6. [Configure Cortex-M Target](http://www.keil.com/support/man/docs/gsac/GSAC_ConfigCortex.htm) describes how to change the startup-code and how to use the library retarget file for Cortex-M devices. In addition, this is a brief explanation of CMSIS.
7. [Create File Group](http://www.keil.com/support/man/docs/gsac/GSAC_CreateGroup.htm) explains how to structure the code files for a better overview.
8. [Specify Memory Layout](http://www.keil.com/support/man/docs/gsac/GSAC_SpecificMemoryAreas.htm) describes how to change file and group attributes.
9. [Build Project](http://www.keil.com/support/man/docs/gsac/GSAC_BuildProject.htm) describes the build-options.
10. [Tips and Tricks](http://www.keil.com/support/man/docs/uv4/uv4_ca_tipsandtricks.htm) show advanced techniques to build applications.

Detailed information can be found in the chapter [Creating Applications](http://www.keil.com/support/man/docs/uv4/uv4_creating_apps.htm) of the [µVision User's Guide](http://www.keil.com/support/man/docs/uv4/).

### Create Project File

µVision maintains the files that belong to a project in one project file. It takes only a few steps to create a new project file:

1. Select **Project - New Project** from the µVision menu.This opens a standard Windows dialog, which prompts you for the new project file name.![Menu New Project File](http://upload-images.jianshu.io/upload_images/26219-d2e9de759ac10d7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. Create a new folder **Test**.
3. Switch to the new folder and type the project name **MyApp**. µVision automatically adds the extension**.uvproj**.
4. Click **Save**.![Dialog New Project File](http://upload-images.jianshu.io/upload_images/26219-82bf0cc5b7fbf7fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](http://upload-images.jianshu.io/upload_images/26219-5eb421c1e1a99970.gif?imageMogr2/auto-orient/strip) 

**Note**: It is good practice to use a separate folder for each project.


### Set Options for Target

Set target parameters in the dialog **Options for Target - Target**.
![Target Options Button](http://upload-images.jianshu.io/upload_images/26219-2cdefca430b402bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

Open the dialog via the toolbar icon or the menu **Project - Options for Target**.
![Dialog Options for Target](http://upload-images.jianshu.io/upload_images/26219-952ad58af860fecc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

The following options can be set:

![options](http://upload-images.jianshu.io/upload_images/26219-7096e96d28e13f55.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**Note**: **Read/Only Memory Areas** and **Read/Write Memory Areas** are used to create a linker scatter file. In addition, enable the check box **Use Memory Layout from Target Dialog** in the dialog [Linker](http://www.keil.com/support/man/docs/uv4/uv4_dg_adsld.htm).

Related Knowledgebase Articles: [LARM: "No Tools.ini found" reported by Linker](http://www.keil.com/support/docs/3847.htm)

### Configure Cortex-M Target

Writing embedded programs with the MDK-ARM is straightforward. This chapter explains some of the configuration steps required when using Cortex-M devices in embedded applications:

- [Configure Startup Code](http://www.keil.com/support/man/docs/gsac/gsac_startupcodecortex.htm) explains the initializations done before the main function of your application is called. In addition it defines the stack space and memory heap for memory allocation functions.
- [CMSIS](http://www.keil.com/support/man/docs/gsac/gsac_cmsis.htm) explains the usage of the software standard for interfacing peripherals, real-time operating systems, and middleware components.
- [Library Retarget File](http://www.keil.com/support/man/docs/gsac/gsac_retargetcortex.htm) configures the C run-time library for the I/O interfaces of your hardware.
- [Low Level I/O Routines](http://www.keil.com/support/man/docs/gsac/gsac_lowlevelroutinescortex.htm) explains the usage of serial I/O routines in conjunction with the Library Retarget File.

#### Configure Startup Code

Typically, target programs require a startup-code to initialize the CPU to match the configuration of the hardware design. When creating a project, µVision adds the device specific CPU startup-code for most devices to the project.

The startup-code executes immediately upon RESET of the target system. It performs the following operations:

1. Reserves memory and initializes the stack.
2. Reserves memory for the heap.

A more flexible software concept, the Cortex Microcontroller Software Interface Standard - [CMSIS](http://www.keil.com/support/man/docs/gsac/GSAC_cmsis.htm), has been introduced with the Cortex device family.

µVision provides a **Configuration Wizard** that makes it easy to configure the device:

1. Double click the ***startup_xxx.s (Startup)*** file. The file opens in the **Editor Window**. Two tabs are displayed at the bottom of the Editor: **Text Editor** and [Configuration Wizard](http://www.keil.com/support/man/docs/uv4/uv4_ut_configwizard.htm).
![Config Wizard](http://upload-images.jianshu.io/upload_images/26219-6569af5504ef9a67.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. Choose the **Configuration Wizard** tab.
3. Click the **Value** field to change the content.

**Note**: **Startup** files can have a file name matching the device family name.

#### CMSIS

The Cortex Microcontroller Software Interface Standard (CMSIS) provides a single standard across all Cortex-M processor series vendors. It enables code re-use and code sharing across software projects and reduces development time for new embedded applications. A detailed description can be found in the [CMSIS Introduction](http://www.keil.com/cmsis).

CMSIS provides a common approach to interface peripherals, real-time operating systems, and middleware components across all silicon vendor products.

You can make use of the advantages offered through CMSIS and set configuration options by using the provided **system_*family name*.c** and **RTE_Device.h** files.

You can:

1. Define interrupt and exception vectors.
2. Initialize the external bus controller.
3. Configure the CPU clock source.
4. Copy the exception vectors from ROM to RAM for systems with memory remapping.
5. Initialize other low level peripherals.

Some files have [Configuration Wizard](http://www.keil.com/support/man/docs/uv4/uv4_ut_configwizard.htm) annotations and display a GUI-like interface to set options.

1. Open the file in the **Editor Window**. Two tabs are displayed at the bottom: **Text Editor** and **Configuration Wizard**.
![Cortex System File](http://upload-images.jianshu.io/upload_images/26219-686acddbcce22b0b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. Click on a value to change the content.

#### Library Retarget File

Semihosting is not supported by MDK-ARM. Use the retargeting functionality of MDK-ARM instead. To prevent the linker from selecting libraries functions that use semihosting, MDK-ARM includes retarget files that redefine low-level I/O routines.

1. A **RETARGET.C** template file, located in the folder ***..*\ARM\Startup**, implements the functionality required to adapt character I/O functions such as printf() and scanf().
2. Copy the **RETARGET.C** template to the project folder.
Include the copied file to the project.
3. Edit the file and make your changes. You may use the following code as a template and adapt it to your needs.
```
/*----------------------------------------------------------------------------
 * Name:    Retarget.c
 * Purpose: 'Retarget' layer for target-dependent low level functions
 * Note(s):
 *----------------------------------------------------------------------------
 * This file is part of the µVision/ARM development tools.
 * This software may only be used under the terms of a valid, current,
 * end user licence from KEIL for a compatible version of KEIL software
 * development tools. Nothing else gives you the right to use this software.
 *
 * This software is supplied "AS IS" without warranties of any kind.
 *
 * Copyright (c) 2009 Keil - An ARM Company. All rights reserved.
 *----------------------------------------------------------------------------*/

#include <stdio.h>
#include <rt_misc.h>

#pragma import(__use_no_semihosting_swi)


extern int sendchar (int c);
extern int getkey   (void);


struct __FILE { int handle; /* Add whatever you need here */ };
FILE __stdout;
FILE __stdin;


int fputc(int c, FILE *f) {
  return (sendchar(c));
}


int fgetc(FILE *f) {
  return (getkey());
}


int ferror(FILE *f) {
  /* Your implementation of ferror */
  return EOF;
}


void _ttywrch(int c) {
  sendchar(c);
}


void _sys_exit(int return_code) {
label:  goto label;  /* endless loop */
}
```

**Note**: 

- Refer to [Tailoring the C library to a new execution environment](http://www.keil.com/support/man/docs/armlib/armlib_chr1358938921910.htm) for information about library retargeting.
- Refer to [Redefining target-dependent system I/O functions in the C library](http://www.keil.com/support/man/docs/armlib/armlib_chr1358938932518.htm).
- Refer to [Redefining low-level library functions to enable direct use of high-level library functions in the C library](http://www.keil.com/support/man/docs/armlib/armlib_chr1358938931411.htm)
- Refer to [What is semihosting?](http://www.keil.com/support/man/docs/armcc/armcc_pge1358787046598.htm.htm)

Related Knowledgebase Articles:[ARM: Application Builds Without Error, But Does Not Run](http://www.keil.com/support/docs/3614.htm)

#### Low Level I/O Routines

The library retarget file has been added to the project in the previous step. The implementation of getkey() and sendchar() is done in a separate file, **Serial.c**.

Several examples provided with the MDK-ARM include a ready-to-use Serial.c file for various evaluation boards. You can simply re-use such a **Serial.c** in your project.

1. If you want to redirect to a different UART or peripheral, create a new file **Serial.c** and add it to the project.
2. You may use the following code as a template and adapt it to your needs.
```c
/*----------------------------------------------------------------------------
 * Name:    Serial.c
 * Purpose: Low level serial routines
 * Note(s):
 *----------------------------------------------------------------------------
 * This file is part of the µVision/ARM development tools.
 * This software may only be used under the terms of a valid, current,
 * end user licence from KEIL for a compatible version of KEIL software
 * development tools. Nothing else gives you the right to use this software.
 *
 * This software is supplied "AS IS" without warranties of any kind.
 *
 * Copyright (c) 2009 Keil - An ARM Company. All rights reserved.
 *----------------------------------------------------------------------------*/

#include <stm32f10x_cl.h>

/*----------------------------------------------------------------------------
  Initialize UART pins, Baud-rate
 *----------------------------------------------------------------------------*/
void init_serial (void) {
  int i;

  /* Configure UART2 for 115200 baud                                         */
  RCC->APB2ENR |=  1 <<  0;            /* Enable AFIO clock                  */
  RCC->APB2ENR |=  1 <<  5;            /* Enable GPIOD clock                 */
  AFIO->MAPR |= 0x00000008;            /* Configure used Pins                */
  GPIOD->CRL &= 0xF00FFFFF;
  GPIOD->CRL |= 0x04B00000;

  RCC->APB1ENR |= 0x00020000;          /* Enable USART#2 clock               */
  USART2->BRR = 0x0135;                /* Configure 115200 baud,             */
  USART2->CR3 = 0x0000;                /*           8 bit, 1 stop bit,       */
  USART2->CR2 = 0x0000;                /*           no parity                */
  for (i = 0; i < 0x1000; i++) __NOP();/* avoid unwanted output              */
  USART2->CR1 = 0x200C;
}


/*----------------------------------------------------------------------------
  Write character to Serial Port
 *----------------------------------------------------------------------------*/
int sendchar (int c) {

  while (!(USART2->SR & 0x0080));
  USART2->DR = (c & 0x1FF);

  return (c);
}


/*----------------------------------------------------------------------------
  Read character from Serial Port   (blocking read)
 *----------------------------------------------------------------------------*/
int getkey (void) {

  while (!(USART2->SR & 0x0020));
  return (USART2->DR);
}
```

### Create File Group

For an improved overview of the code structure, µVision offers the possibility to group files.

1. Invoke the **Context Menu** of the **Project Window** and choose **Add Group**.
![Context Menu](http://upload-images.jianshu.io/upload_images/26219-865fc5a5f7e4d507.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. A box, **New Group**, is created in the **Project Window**. Enter the new group name.
![New-Group Box](http://upload-images.jianshu.io/upload_images/26219-bef4678c35911aa9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. Create the groups **Source**, **System**, and **Documentation**.
4. Click on **Source Group 1**, press **F2**, and re-name it to **Startup**.
5. Create and add a file, **Abstract.txt**, to the project.
6. Drag and drop the files to the desired group.
7. The screen might look like the screenshot below.
![New-Group Box](http://upload-images.jianshu.io/upload_images/26219-afbaef892ba1cd86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**Note**: Highlight a Group or file and press **DEL**. This removes the object form the Project Window, without deleting the source file physically.


### Specify Memory Layout

Define specific memory areas for source files or groups using the **Options for ... - Properties** dialog. Use this feature to place variables defined in that object into a certain memory area.

1. Invoke the **Context Menu** of an object located in the **Project Window**.
![Context Menu](http://upload-images.jianshu.io/upload_images/26219-45a375884f7cbd73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. The **Memory Assignment** section allocates data types to specific memory areas, which in turn have been defined in the [Project - Options for Target - Target](http://www.keil.com/support/man/docs/gsac/GSAC_ToolOpts.htm) dialog.
![Memory Assignment](http://upload-images.jianshu.io/upload_images/26219-1e717573013610ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**Note**: 

- When RAM is used for **Code / Const** , the **__main** initialization copies the program code and constants to this RAM for execution. The image is stored in the default read/only memory area specified in the dialog [Project - Options for Target - Target](http://www.keil.com/support/man/docs/gsac/GSAC_ToolOpts.htm).
- These settings are used to generate a scatter-loading description file for the linker. Nevertheless, the settings are ignored, if you disable **Use Memory Layout from Target Dialog** in the dialog **Project - Options for Target - Linker**.
- This feature is not available in the **Keil MDK-ARM Evaluation Version**.

### Build Project

Typically, the tool settings defined through the **Options for Target** dialog are all that's needed to build a new application.


1. Translate and link the source files of the application with a click on one of the build-buttons located in the **Build Toolbar**.
![Build buttons](http://upload-images.jianshu.io/upload_images/26219-16c9ad9dfde4d6e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 
2. Errors or warnings are displayed in the **Build Output Window**. Double-click on a message to jump to the line where the incident occurred.
![Build Output Window](http://upload-images.jianshu.io/upload_images/26219-0444eeffd8b38a00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. Correct the errors and warnings, and compile the application again.![Build Output Window](http://upload-images.jianshu.io/upload_images/26219-280c9377078b036f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. Once you have generated your application successfully, you can start debugging.
![Debug](http://upload-images.jianshu.io/upload_images/26219-dcf7e1e03e05e29a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Flash Application

µVision can be configured to program the Flash memory of the target system. The [Flash Menu](http://www.keil.com/support/man/docs/uv4/uv4_ui_flash.htm) includes commands to configure, erase, and program Flash memory. Configure and use Flash programming utilities as describe below:

1. Configure Flash utilities for [Flash Programming](http://www.keil.com/support/man/docs/uv4/uv4_flash_programming.htm).**ULINK** settings are explained in [ULINK Configuration](http://www.keil.com/support/man/docs/uv4/uv4_fl_ulinkconfiguration.htm).
2. [Flash Download](http://www.keil.com/support/man/docs/gsac/GSAC_flashDownload.htm) programs the application to hardware.

Configuration settings are saved in context of the current [Project Target](http://www.keil.com/support/man/docs/uv4/uv4_ca_projtargfilegr.htm).

**See also:** [Flash Algorithms](http://www.keil.com/support/man/docs/uv4/uv4_fl_flash_algorithms.htm) can be created and added to MDK by software developers.

### Flash Download

Once the command interface is configured, you can use the [Flash Menu](http://www.keil.com/support/man/docs/uv4/uv4_ui_flash.htm) commands to **Download** or **Erase**the Flash memory on your target device.

![Download Button](http://upload-images.jianshu.io/upload_images/26219-853134dafb3b0792.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

Click the **Download** button of the **Build Toolbar** or **Flash Menu** to download the program.

![Output Window](http://upload-images.jianshu.io/upload_images/26219-6f4b5d4f84356d95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

The **Build Output Window** informs about the download process. In case of errors, check the configuration settings of the target driver, re-build the application if necessary, and download to Flash again.

## Debug Application

This section describes the µVision **Debug Mode** and the interface for debugging applications.

**Using a Target Debugger**

The options described below configure µVision for using a ULINK adapter:

1. [Select Debug Driver](http://www.keil.com/support/man/docs/gsac/GSAC_selectDebugDriver.htm) describes how to choose the debug adapter in µVision.
2. [Configure Debug Driver](http://www.keil.com/support/man/docs/gsac/GSAC_configDebugDriver.htm) describes how to configure the debug adapter.

### Select Debug Driver

This section describes how to select a **driver** for debugging on hardware. The debug driver connects µVision to a debugger adapter, for example ULINK, which interfaces to the target system. Perform the following steps:

1. Connect the ULINK adapter to the PC and to the target system.
2. Power up the target system.
3. Click the toolbar button **Target Options**.
![Options for Target Button](http://upload-images.jianshu.io/upload_images/26219-7a7552c5d8e7aa13.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 
4. Click the tab **Debug**.![Debugger Options](http://upload-images.jianshu.io/upload_images/26219-04dbc5b82e266d40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- Enable **Use: *Debug Driver*** and choose:**ULINK ARM Debugger** - for connecting to ARM7 or ARM9 devices.
**ULINK Cortex Debugger** - for connecting to Cortex-M devices.

- Enable **Load Application at Startup** - for loading the application into the µVision Debugger whenever a debugging session is started.
- Enable **Run to main()** - for executing the instructions up to the first executable statement of the **main()**function. The instructions are executed upon each RESET.
- Click the button **Settings** to [Configure the Debug Driver](http://www.keil.com/support/man/docs/gsac/GSAC_configDebugDriver.htm).

### Configure Debug Driver

This section shows the dialog **Target Driver Setup**, which configures the debug driver interface. The dialog opens from the menu **Flash - Configure Flash Tools - Debug - Settings**.

![Cortex Target Driver Setup](http://upload-images.jianshu.io/upload_images/26219-aee382bd6954677e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

The following data blocks are completed automatically after the debugging environment has been connected and configured:

- **ULINK USB-JTAG/SW Adapter**: Displays driver, device, and firmware data about the ULINK adapter.
- **JTAG/SW Device Chain**: Displays the target device, or devices, connected to the JTAG/SW interface. ULINK shows the `IDCODE`,`Device Name`, and `IR Length` of all JTAG-compatible targets or Serial-Wire (SW) targets it detects.
This icon, marking the `IDCODE`, identifies the device that is being debugged and assures that the device is working.
- **Debug**
Configures the cache, download, and device reset options applied upon RESET.

[Start debugging](http://www.keil.com/support/man/docs/gsac/GSAC_startDebugging.htm) with the default settings. Usually, **no further configuration is required**.

**Note**: 

- The screen layout and options vary depending on the device and debug driver selected.
- For details, refer to the *User's Guide* of the debug adapter in use, or simply click the **Help** button.

### Start Debugging

µVision provides several ways to debug an application. For example, developers can:

- Select commands from the [Debug Menu](http://www.keil.com/support/man/docs/uv4/uv4_ui_debug.htm) or the **Debug Toolbar**.
- Use the command **Run to Cursor line** from the **Context Menu** of the window [Disassembly Window](http://www.keil.com/support/man/docs/uv4/uv4_db_dbg_disasmwin.htm).
- Enter debugger commands in the [Command Window](http://www.keil.com/support/man/docs/uv4/uv4_db_dbg_outputwin.htm).
- Execute [Debug Functions](http://www.keil.com/support/man/docs/uv4/uv4_debug_functions.htm) from an initialization file.
Use most editor features. For example, correct program errors or use the **Edit - Find** command.

**Start the Debugger**

- **Load Application at Startup** and **Run to main()** determine the debugger behaviour at startup. The options are configured in the dialog [Options for Target — Debug](http://www.keil.com/support/man/docs/gsac/gsac_selectdebugdriver.htm).
- µVision saves and restores the screen layout of the last debugging session.

 
![Start/Stop Debug Session](http://upload-images.jianshu.io/upload_images/26219-57d795de82167643.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
The button **Start/Stop Debug Session** starts or closes a debugging session.

![next instruction](http://upload-images.jianshu.io/upload_images/26219-e580c0755f8e9072.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

The yellow arrow marks the next instruction or high-level statement ready to be executed.

**Execute Commands**


![Reset](http://upload-images.jianshu.io/upload_images/26219-f01366863bcdde7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Reset the CPU with the button **Reset**, the menu **Debug – Reset CPU**, or with the command [RESET](http://www.keil.com/support/man/docs/uv4/uv4_cm_reset.htm)typed into the **Command Window**.
![Halt](http://upload-images.jianshu.io/upload_images/26219-819797ff642c89aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Halt program execution with the button **Stop**, the menu **Debug - Stop**, or press Esc while in the**Command Window**. When program execution is stopped, µVision opens the Editor window displaying the source code.
![Run](http://upload-images.jianshu.io/upload_images/26219-32d317c2a076fe81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Continue program execution with the button **Run**, the menu **Debug - Run**, or type [GO](http://www.keil.com/support/man/docs/uv4/uv4_cm_go.htm) into the **Command Line**.

**Single-Stepping Commands**


![Step](http://upload-images.jianshu.io/upload_images/26219-24364a70e4cee179.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
To execute one instruction use the button **Step**, the menu **Debug - Step**, or type [TSTEP](http://www.keil.com/support/man/docs/uv4/uv4_cm_tstep.htm) into the**Command Window**.
![Step Over](http://upload-images.jianshu.io/upload_images/26219-0eb0662fd8e5422e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
To step over the program and over function calls use the button **Step Over**, the menu **Debug - Step Over**, or enter [PSTEP](http://www.keil.com/support/man/docs/uv4/uv4_cm_pstep.htm) in the **Command Window**.
![Step Out](http://upload-images.jianshu.io/upload_images/26219-3f5ff0b0f8fbdb44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
To step out of the current function use the button **Step Out**, the menu **Debug - Step Out**, or enter [OSTEP](http://www.keil.com/support/man/docs/uv4/uv4_cm_ostep.htm)in the **Command Window**.

## Use on-chip Peripherals

This section describes techniques that help creating programs that use various on-chip peripherals and features of ARM-powered microcontrollers. Use the code examples, specifically tuned for Cortex-M devices, as a template for future programs.

The status of on-chip peripherals can be reviewed with the µVision Debugger using the menu **Peripherals**. The menu items are device specific and get configured dynamically based on information extracted from the[Device Database](http://www.keil.com/dd). Detailed information about the device peripherals and the simulation are provided under the menu **Help - Simulated Peripherals for '*device name*'**.

The following topics are included:

- [Cortex-M Core Peripherals](http://www.keil.com/support/man/docs/gsac/GSAC_periphCortexCore.htm) describes the standardized peripherals and includes code examples.
- [Vendor Peripherals](http://www.keil.com/support/man/docs/gsac/GSAC_vendorPeriph.htm) describes common peripherals provided by vendors and their use with CMSIS.

**Note**: 

- Application Notes are available on [www.keil.com/appnotes](http://www.keil.com/appnotes).
- The applications described in the following sections have been tested with the STM32F107VC device on the Keil MCBSTM32C board.

### Cortex-M Core Peripherals

Cortex-M offers two standard core peripherals, the **Nested Vectored Interrupt Controller (NVIC)** and the**System Tick Timer (SYSTICK Timer)**. Due to the standardization, the code used in applications can be ported between different microcontroller implementations. This section explains the functionality of the two peripherals, how they are configured and used.

- [Nested Vectored Interrupt Controller (NVIC)](http://www.keil.com/support/man/docs/gsac/GSAC_NVIC.htm) describes helper functions, priority grouping, and interrupt numbers. An example is given on how to enable the NVIC and reset the system.
- [System Tick Timer (SYSTICK Timer)](http://www.keil.com/support/man/docs/gsac/GSAC_SYSTICKtimer.htm) describes how to configure this timer.

#### Nested Vectored Interrupt Controller

The Nested Vectored Interrupt Controller (NVIC) offers very fast interrupt handling and provides the vector table as a set of real vectors (addresses).
In addition, the NVIC:

- Saves and restores automatically a set of the CPU registers (R0-R3, R12, PC, PSR, and LR).
- Does a quick entry to the next pending interrupt without a complete pop/push sequence.
- Serves a complete set of 255 (240 external) interrupts.

**Interrupt Numbers**

In CMSIS, interrupts are enumerated from negative to positive numbers:
- Core interrupt numbers rank from [-15 .. -1].
- External interrupts rank from [0 .. n].

Example of an Interrupt Table for an STM32:
```
typedef enum IRQn
{
/****** Cortex -M3 Processor Exceptions Numbers ***********************************************/
   NonMaskableInt_IRQn      = -14,  // 2 Non Maskable Interrupt
   MemoryManagement_IRQn    = -12,  // 4 Memory Management Interrupt
   BusFault_IRQn            = -11,  // 5 Bus Fault Interrupt
   UsageFault_IRQn          = -10,  // 6 Usage Fault Interrupt
   SVCall_IRQn              = -5,   // 11 SV Call Interrupt
   DebugMonitor_IRQn        = -4,   // 12 Debug Monitor Interrupt
   PendSV_IRQn              = -2,   // 14 Pend SV Interrupt
   SysTick_IRQn             = -1,   // 15 System Tick Interrupt

/****** STM32 specific Interrupt Numbers *****************************************************/
   WWDG_IRQn                = 0,    // 16 Window WatchDog Interrupt
   PVD_IRQn                 = 1,    // 17 PVD through EXTI Line detection Interrupt
   TAMPER_IRQn              = 2,    // 18 Tamper Interrupt
   ...
   TIM1_UP_IRQn             = 25,   // n Timer1 Update Interrupt
   ...
} IRQn_Type ;
```

**NVIC functions**

The CMSIS core module **core_cm3.h** provides a set of inlined functions and helper functions.


![CMSIS core module](http://upload-images.jianshu.io/upload_images/26219-1ed4087485427c75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**Example of using NVIC functions**:

```
NVIC_SetPriorityGrouping (3);       // sets PRIGROUP 4.4 (or 4.0 on STM32 )
NVIC_SetPriority (2);               // sets priority value 2 to the IRQ
NVIC_EnableIRQ (TIM1_UP_IRQn);      // enables Timer 1 UP IRQ

void TIM1_UP_IRQn (void)  {
   ...
}
```

**Note**: NVIC functions work only in Privileged Mode, which is the default mode for Cortex-M microcontroller.

**Related Knowledgebase Articles**: [µVISION DEBUGGER: missing interrupt names at NVIC window](http://www.keil.com/support/docs/3816.htm)

#### System Tick Timer

The System Tick Timer (SYSTICK Timer) is a simple 24-bit down counter. The timer can be started and configured with an automatic reload value. If the timer is running and it's IRQ is enabled, it generates periodic interrupts. The System Tick Timer can use the internal clock (FCLK, the free running clock signal on the Cortex-M processor) or the external clock (the STCLK signal on the Cortex-M processor). The System Tick Timer is often used by the RTOS.

When used with CMSIS, the System Tick timer is started and setup with the following function:

```
SysTick_Config (numberOfTicks);
```

The following code can be used as a template for further applications.

```
/******************************************************************************
 * @file:    main.c
 * @purpose: Systick Timer usage with CMSIS for Cortex-M microcontroller
 *
******************************************************************************/
#include "stm32f10x_cl.h"

volatile uint32_t msTicks;                  // Counts 1ms timeTicks

/*-----------------------------------------------------------------------------
  SysTick_Handler
*----------------------------------------------------------------------------*/
void SysTick_Handler (void)  {
  msTicks++;                                // Increment counter
}

/*-----------------------------------------------------------------------------
  MAIN function
*----------------------------------------------------------------------------*/
int main (void)  {

  SystemInit ();                            // Initialize clocks
  SysTick_Config (SystemFrequency/1000);    // Configure the SYSTICK

  while (1)  {
    ...
  }

}
```

### Vendor Peripherals

Chip vendors use a wide variety of on-chip peripherals to distinguish their parts from each other. Device peripherals such as I/O Ports, Timers, PWMs, A/Ds, or D/As can have different functions and performance characteristics. This variety is a challenge for the software developer and makes code reuse difficult. [CMSIS](http://www.onarm.com/) addresses these difficulties by providing a vendor-independent hardware abstraction layer with a common approach to interface peripherals, real-time operating systems, and middleware components across all silicon vendor products.

The code examples in this chapter demonstrate a possible use of peripherals with CMSIS:

- [General Purpose Input/Output](http://www.keil.com/support/man/docs/gsac/GSAC_GPIO.htm) describes the use of standard I/O ports.
- [Serial Interface](http://www.keil.com/support/man/docs/gsac/GSAC_UART.htm) describes the implementation of UART communication.
- [Timer](http://www.keil.com/support/man/docs/gsac/GSAC_TIMER.htm) describes the use of standard timers.
- [Analog Digital Converter](http://www.keil.com/support/man/docs/gsac/GSAC_ADC.htm) describes the use of an ADC.
- [Power Reduction Modes](http://www.keil.com/support/man/docs/gsac/GSAC_PRM.htm) describes the sleep modes for power-saving implementations.

#### General Purpose I/O

Microcontrollers provide a number of I/O ports that can be used in target applications. Pins can be configured as a GPIO. However, some ports or single port pins can have functionalities that could prevent their generic usage.

The steps to configure GPIO ports and pins are, basically, identical on every microcontroller:

- Enable the clock signal for the GPIO.
- Configure the Alternate Function to use a GPIO (usually standard after reset).
- Configure the GPIO pins as input or output.
- Set remaining parameters like speed, pull-up/down.
- Enable the GPIO.
- Read from or write to the GPIO.

For this example the following steps are required:

1. Create a new project.
2. Select the STM32F107VC microcontroller from the Device Database.
3. Include the files:
    * startup_stm32f10x_cl.s
    * system_stm32f10x_cl.c
    * core_cm3.c
    * Serial.c
    * Retarget.c
4. Create and add a new file, **GPIO.c**, to the project.
5. Use the code below as a reference.
```
/*-----------------------------------------------------------------------------
 * Name:    GPIO.c
 * Purpose: Blink a led on GPIOE
 * Notes:
*----------------------------------------------------------------------------*/
#include <stm32f10x_cl.h>

volatile uint32_t msTicks;                      // Counts 1ms timeTicks
/*-----------------------------------------------------------------------------
  SysTick_Handler
*----------------------------------------------------------------------------*/
void SysTick_Handler (void)  {
  msTicks++;                                    // increment Delay()-counter
}

/*-------------------------------------------------------------------------------
  delays number of tick Systicks (happens every 1 ms)
*------------------------------------------------------------------------------*/
__INLINE static void Delay (uint32_t dlyTicks)  {
  uint32_t curTicks;

  curTicks = msTicks;
  while ((msTicks - curTicks) < dlyTicks);
}

/*-------------------------------------------------------------------------------
  configer LED pins
*------------------------------------------------------------------------------*/
__INLINE static void LED_Config (void)  {

  RCC->APB2ENR |=  1 <<  6;                     // Enable GPIOE clock
  GPIOE->CRH    = 0x33333333;                   // Configure the GPIO for LEDs
}

/*-------------------------------------------------------------------------------
  Switch on LEDs
*------------------------------------------------------------------------------*/
__INLINE static void LED_On (uint32_t led) {

  GPIOE->BSRR = (led);                          // Turn On  LED
}


/*-------------------------------------------------------------------------------
  Switch off LEDs
*------------------------------------------------------------------------------*/
__INLINE static void LED_Off (uint32_t led)  {

  GPIOE->BRR  = (led);                          // Turn Off LED
}

/*-----------------------------------------------------------------------------
  MAIN function
*----------------------------------------------------------------------------*/
int main (void)  {

  SystemInit ();                                // Initialize clocks
  SysTick_Config (SystemFrequency/1000);
  LED_Config ();

  while(1)  {
    LED_On (0x100);                             // Turn on the LED.
    Delay (100);                                // Delay  100 Msec
    LED_Off (0x100);                            // Turn off the LED.
    Delay (100);                                // Delay  100 Msec

  }

}
```
6. Build the project.
7. Connect a debug adapter to the PC and to the board.
8. Configure µVision for Flash downloading.
9. Download to Flash and debug the application.

#### Serial Interface

Almost all microcontrollers have a serial interface (UART peripheral). The UART is a very simple device to send data to a PC via a terminal emulation program (Hyperterm, TeraTerm) or to another microcontroller. In general, the driver for a UART contains functions to initialize, send, and receive data.

The steps to initialize an UART are:

- Enable the clock signal for the UART.
- Configure the Alternate Function to use a UART.
- Set the baud rate registers.
- Set the protocol parameters (stop bit, parity).
- Configure FIFO-buffers.
- Enable the UART.
- Read from or write to the UART.

For this example the following steps are required:

1. Create a new project.
2. Select the STM32F107VC microcontroller from the Device Database.
3. Include the files:
    * startup_stm32f10x_cl.s
    * system_stm32f10x_cl.c
    * core_cm3.c
    * Serial.c
    * Retarget.c
4. Create and add a new file, **UART.c**, to the project.
5. Use the code below as a reference.
```
/*----------------------------------------------------------------------------
 * Name:    UART.c
 * Purpose: print a string to UART2
 * Notes:
 *----------------------------------------------------------------------------*/
#include <stdio.h>
#include <stm32f10x_cl.h>

// Import external functions from Serial.c file
extern void init_serial (void);

/*----------------------------------------------------------------------------
  MAIN function
 *----------------------------------------------------------------------------*/
int main (void) {

  SystemInit();
  init_serial();
  printf ("CMSIS Serial Device Example\r\n");

  while (1) {
  }
}
```
6. Build the project.
7. Connect a debug adapter to the PC and to the board.
8. Configure µVision for Flash downloading.
9. Download to Flash and debug the application.

#### Timer

Timers are peripherals that generate periodic events in a microcontroller. A timer can be used as a PWM generator, or a trigger for a motor, or to control an ADC. The main parts of a timer are: a counter-, a reload-, and a match-register.

To generate periodic events, the timer must be configured with a value and a match event or an over-/underflow event. Timers are implemented differently across various microcontrollers.

The general steps to configure a timer are:

- Enable the clock signal for the timer.
- Setup the timer prescaler.
- Setup the timer reload value.
- Configure the timer as up- or down counter.
- Configure the timer match.
- Configure the interrupt.

For this example the following steps are required:

1. Create a new project.
2. Select the STM32F107VC microcontroller from the Device Database.
3. Include the files:
    * startup_stm32f10x_cl.s
    * system_stm32f10x_cl.c
    * core_cm3.c
    * Serial.c
    * Retarget.c
4. Create and add a new file, **Timer.c**, to the project.
5. Use the code below as a reference.
```
/*-----------------------------------------------------------------------------
 * Name:    Timer.c
 * Purpose: Timer example. Prints a sting to UART2
 * Notes:
*----------------------------------------------------------------------------*/
#include <stdio.h>
#include <stm32f10x_cl.h>

volatile unsigned long TimeTick;            // Counts 10ms timeTicks
unsigned char clock_1s;                     // Flag activated each second

extern void init_serial (void);             // Function defined in Serial.c

/******************************************************************************
  Initialise the TIM3 for 1ms @ 72MHz
******************************************************************************/
void TIM3_Init (void)  {

  RCC->APB1ENR |= (1<<1);                   // enable clock for TIM3

  TIM3->PSC = 3;                            // set prescaler
  TIM3->ARR = (18000000UL / 1000UL) - 1UL;  // set auto-reload
  TIM3->CR1 = 0;                            // reset command register 1
  TIM3->CR2 = 0;                            // reset command register 2
  TIM3->DIER = (1<<0);                      // Update interrupt enabled
  TIM3->CR1 |= (1<<0);                      // Enable Timer

  NVIC_EnableIRQ (TIM3_IRQn);               // Enable TIM3 interrupt
}

/*-----------------------------------------------------------------------------
  Timer Counter 3 interrupt service function
  executes each 1ms @ 25 MHz Crystal Clock
*----------------------------------------------------------------------------*/
void TIM3_IRQHandler (void)  {

  if (TIM3->SR & (1<<0))  {                 // UIF interrupt?
    if (TimeTick++ >= 999)  {               // Set clock_1s to 1 every 1 second
      TimeTick    = 0;
      clock_1s = 1;
  }
    TIM3->SR &= ~(1<<0);                    // clear UIF flag
  }
}

/*-----------------------------------------------------------------------------
  MAIN function
*----------------------------------------------------------------------------*/
int main (void)  {

  SystemInit();                             // Initialize system functions
  init_serial();                            // Initialize serial interface
  TIM3_Init();

  while (1)  {                              // Loop forever
    if (clock_1s)  {
      clock_1s = 0;
      printf ("TimeTick\r\n");
    }
  }
}
```
6. Build the project.
7. Connect a debug adapter to the PC and to the board.
8. Configure µVision for Flash downloading.
9. Download to Flash and debug the application.

#### Analog Digital Converter

Analog-to-digital converters bring the analog world to the processor. Some complex ADCs can be triggered through events, such as Timers or DMA-controllers. This section describes the very basic setup that they all have in common.

For this example the following steps are required:

1. Create a new project.
2. Select the STM32F107VC microcontroller from the Device Database.
3. Include the files:
    * startup_stm32f10x_cl.s
    * system_stm32f10x_cl.c
    * core_cm3.c
    * Serial.c
    * Retarget.c
4. Create and add a new file, **adc.c**, to the project.
5. Use the code below as a reference.
```
/*-----------------------------------------------------------------------------
 * Name:    ADC.c
 * Purpose: The signal of the potentiometer is printed.
 * Notes:
*----------------------------------------------------------------------------*/
#include <stdio.h>
#include <stm32f10x_cl.h>

unsigned short AD_last;                    // Last converted value
unsigned char  clock_1s;                   // Flag activated each second

extern void init_serial (void);            // Import function from Serial.c

/*-----------------------------------------------------------------------------
  Function that initializes ADC
*----------------------------------------------------------------------------*/
void ADC_init (void)  {

  RCC->APB2ENR |= (1<<4);                  // enable peripheral clock for GPIOC
  GPIOC->CRL &= ~0x000F0000;               // Configure PC4 as ADC.14 input

  RCC->APB2ENR |= (1<<9);                  // enable peripheral clock for ADC1

  ADC1->SQR1    = 0x00000000;              // Regular channel 1 conversion
  ADC1->SQR2    = 0x00000000;              // Clear register
  ADC1->SQR3    = (14<< 0);                // SQ1 = channel 14
  ADC1->SMPR1   = ( 5<<12);                // sample time channel 14 55,5 cycles
  ADC1->CR1     = (1 <<  8) |              // Scan mode on
                  (1 <<  5) ;              // EOC interrupt enable
  ADC1->CR2     = (1 << 20) |              // Enable external trigger
                  (7 << 17) |              // EXTSEL = SWSTART
                  (1 <<  0) ;              // ADC enable
  ADC1->CR2    |= (1 <<  3);               // Reset calibration
  while (ADC1->CR2 & (1 << 3));            // wait until reset finished

  ADC1->CR2    |= (1 <<  2);               // start calibration
  while (ADC1->CR2 & (1 << 2));            // wait until calibration finished

  NVIC_EnableIRQ (ADC_IRQn);               // enable ADC Interrupt
}

/*-----------------------------------------------------------------------------
  SysTick IRQ: Executed periodically (10ms)
*----------------------------------------------------------------------------*/
void SysTick_Handler (void)  {
static unsigned long ticks;

  if (ticks++ >= 99)  {                    // Set Clock1s to 1 every 1 second
    ticks    = 0;
    clock_1s = 1;
  }

  ADC1->CR2  |= (1 << 22);                 // start SW conversion
}

/*-----------------------------------------------------------------------------
  A/D IRQ: Executed when A/D Conversion is done
*----------------------------------------------------------------------------*/
void ADC1_2_IRQHandler (void)  {
  if (ADC1->SR & (1<<1))  {                // ADC1 EOC interrupt?
    AD_last = (ADC1->DR) & 0xFFF;          // Read Conversion Result

    ADC1->SR &= ~(1<<1);                   // clear EOC interrupt
  }

}

/*-----------------------------------------------------------------------------
  MAIN function
*----------------------------------------------------------------------------*/
int main (void)  {

  SystemInit ();
  SysTick_Config (SystemFrequency/100);    // Generate interrupt each 10 ms

  init_serial();                           // UART#2 Initialization
  ADC_init();                              // ADC Initialization

  while (1)  {                             // Loop forever
    if (clock_1s)  {
      clock_1s = 0;
      printf ("AD value = 0x%03x\n\r", AD_last);
    }
  }
}
```
6. Build the project.
7. Connect a debug adapter to the PC and to the board.
8. Configure µVision for Flash downloading.
9. Download to Flash and debug the application.

#### Power Reduction Modes

Cortex-M devices implement various mechanisms to reduce power consumption. One of the techniques is to switch off or even disable the clock for every peripheral. By disabling the clock, the complete peripheral is disabled.

Cortex-M cores have two sleep modes SLEEP and DEEP SLEEP. The SLEEPDEEP-bit selects the sleep mode. The following instructions handle the low power mode entry:

- WFE: Wait for Event
- WFI: Wait for Interrupt

Whether the SLEEP or DEEP SLEEP mode is used depends on the implementation of the Cortex-M microcontroller.

```
#include <stm32f10x_lib.h>              // STM32F10x Library Definitions
#include "STM32_Init.h"                 // STM32 Initialization

unsigned int ledPosExti = 0;            // led position (from 0..7) for EXTI
unsigned int ledExti    = 0;

void Sleep (void) {
   __wfi();
}

/*---------------------------------------------------------------------------------
  EXTI15..10 Interrupt Handler
 *---------------------------------------------------------------------------------*/
void EXTI15_10_IRQHandler(void)
{
   //wakes up from power down
}


/*---------------------------------------------------------------------------------
  MAIN function
 *---------------------------------------------------------------------------------*/
int main (void) {

   stm32_Init ();                        // STM32 setup
   Sleep();                              // Call the wfi() - wait for interrupt

   while (1);                            // Loop forever
}
```




## Appendix: Migrate RL-ARM to MDK-Professional

**Migrate RL-ARM to MDK-Professional** describes the differences between MDK-Professional and RL-ARM. Projects that might need adaptation are explained below. Licenses can be migrated to reflect the new product structure.

The migration guide includes the following topics:

- [Differences](http://www.keil.com/support/man/docs/gsac/gsac_mig_diffs.htm) describes differences between RL-ARM and MDK-Professional.
- [Migrate FlashFS Projects](http://www.keil.com/support/man/docs/gsac/gsac_mig_flashfs.htm) describes the migration steps for Flash File applications.
- [Migrate USB Projects](http://www.keil.com/support/man/docs/gsac/gsac_mig_usb.htm) describes the migration steps for USB applications.
- [License Status](http://www.keil.com/support/man/docs/gsac/gsac_mig_lic.htm) explains the license status when updating RL-ARM to MDK-Professional.

### Differences

**Differences** lists the differences to be considered when migrating from RL-ARM to MDK-Professional.
- The Middleware Components RL-FlashFS and RL-USB are provided as libraries. No source code is included.
- The RL-FlashFS and RL-USB API functions can be used across supported devices.
- RL-USB supports USB Devices and USB Hosts.

**RL-FlashFS Details**

- Multiple FAT drives can be operated at the same time.
- The Flash File System allows multiple instances of the same driver.
- The file **File_Config.c** has been rewritten and contains macro definitions and no code.
- The function **finit()** accepts an argument to initialize one or all drives.
- The function **funinit()** has been added to shutdown a volume.
- The IOC interface has been added to handle read/write operations on FAT media. The related functions start with **ioc_**.

**RL-USB Details**

- Software abstraction layers have been added to handle the USB Device specific communication.
- USB settings are done in a common file **usb_config.c** using the µVision Configuration Wizard.
- Descriptors and Endpoints are created automatically based on the configuration settings in **usb_config.c**.
- User code should be added into the file **usbd_user_*class*.c**.
- The device initialization code should be added to the function **usbd_*class*_init()** located in the file**usbd_user_*class*.c**.
- Device specific library functions start with **usbd_**.
- Host specific library functions start with **usbh_**.

### Migrate FlashFS Projects

This section describes the migration of Flash File System applications built with RL-ARM to be used with MDK-Professional. Make the following changes to the project:

**Include the library**Include the library from the folder **\ARM\RV31\Lib**.

- **FS_ARM_L.lib** for ARM7 and ARM9 devices.
- **FS_CM3.lib** for Cortex-M devices.

**Replace the configuration file**

1. Rename the original File_Config.c to File_Config_old.c.
2. Copy File_Config.c from the folder **\ARM\RL\FlashFS\Config** to the project folder.
3. Open both files, File_Config.c and File_Config_old.c, with the µVision Configuration Wizard.
4. Transpose the option settings to File_Config.c. For new options refer to the section [Configuration Options](http://www.keil.com/support/man/docs/rlarm/rlarm_fs_config.htm) of **RL-FlashFS**.

**Replace SD/MMC drivers**

1. Delete the original MCI_*device_family*, SDIO_*device_family*, or SPI_*device_family* driver files.
2. Copy the new MCI_*device_family*, SDIO_*device_family*, or SPI_*device_family* driver files from the folder**\ARM\RL\FlashFS\Drivers**.
3. Update the driver instance definition. The first driver instance is *mci0_drv*.
```
#define  __DRV_ID  mci0_drv           // First instance definition of the mci driver
#define  __DRV_ID  mci1_drv           // Second instance definition of the mci driver
```
4. Update the clock definitions to reflect the real clock settings.
```
#define  __MCLK    48000000
#define  __CPUCLK  48000000
```
5. Modify the function **CheckMedia** of the SD Card driver. If the CD (CardDetect) and WP (WriteProtect) digital inputs are connected, then change the code to check the signals from the SD Card socket.
```

static U32 CheckMedia (void)  {       // Read CardDetect and WriteProtect card socket pins
U32 stat = 0;
  if (!(FIO0PIN & 0x04))  {           // Card is inserted (CD=0)
    stat |= M_INSERTED;
  }
  if ((FIO0PIN & 0x20))  {            // Write Protect switch is active (WP=1)
    stat |= M_PROTECTED;
  }
  return (stat);
}
```
6. The function returns **M_INSERTED**, if the signals are not connected.
```
static U32 CheckMedia (void)  {       // CardDetect and WriteProtect pins not connected
  return (M_INSERTED);
}
```

**Replace Flash programming algorithms**

1. Delete the original file **FS_FlashPrg.c** or **FS_SPI_FlashPrg.c**.
2. Copy the new Flash programming algorithm file **FS_FlashPrg.c** or **FS_SPI_FlashPrg.c** from the folder**\ARM\RL\FlashFS\Flash\*device_family***.
3. Update the **SPI driver instance** definition (for SD Card in SPI mode). The first SPI driver instance is *spi0_drv*.
```
#define __SPI spi0_drv                // Default and first SPI driver instance definition
#define __SPI spi1_drv                // Second SPI driver instance definition
```

**Update the code**

1. Replace the function call **finit()** with **finit (NULL)**.
```
finit (NULL); // Before: *finit();*
```

**Note**: Make a backup copy of the original project.


### Migrate USB Projects

This section describes the migration of USB Device applications built with RL-ARM to be used with MDK-Professional. Make the following changes to USB Device projects:

**Include the library**Include the library into the project from the folder **\ARM\RV31\Lib**.

- **USB_ARM_L.lib** for ARM7 and ARM9 devices.
- **USB_CM3.lib** for Cortex-M devices.

**Add the configuration file**

1. Copy the file **usb_config.c** from the folder **\ARM\RL\USB\Config**.
2. Add the file to the project.
3. Open **usb_config.c** with the µVision Configuration Wizard and set the options as defined in **usbcfg.h**. For new options refer to [RL-USB Device Configuration](http://www.keil.com/support/man/docs/rlarm/rlarm_usb_configuration.htm).

**Add the hardware layer driver**

1. Copy the file **usb_*device_family*.c** from the folder **\ARM\RL\USB\Drivers**.
- Add the file to the project.

**Add the user class module**

1. Copy the file **usbd_user_*class*.c** from an example project that matches the device (**\ARM\Boards\*vendor*\*board*\RL\USB\Device\*Class Example***).
2. Add the file to the project.
3. Port the class functionality from **usbuser.c**, or any other user files, to the file **usbd_user_*class*.c**.

**Update the high-level code**

1. Include the files **RTL.h** and **rl_usb.h** into the code.
```
#include <RTL.h>
#include <rl_usb.h>
```
2. Change the function call **USB_Init()** to **usbd_init()**.
```
usbd_init (); // Before: *USB_Init();*
```
3. Change the function call **USB_Connect()** to **usbd_connect()**.
```
usbd_connect (__TRUE); // Before: *USB_Connect (__TRUE);*
```

**Remove files from the project folder**

- *class*.h
- *class*user.c and *class*user.h
- type.h
- usb.h
- usbcfg.h
- usbcore.c and usbcore.h
- usbdesc.c and usbdesc.h
- usbhw.c and usbhw.h
- usbuser.c and usbuser.h

**Note**:

- Make a backup copy of the original project.
- It is not imposed to migrate projects to MDK-Professional. Applications written with RL-ARM are still working.

### License Status

This section describes the license status when updating RL-ARM to MDK-Professional.

Starting with the MDK-ARM version 4.20, MDK-ARM Standard and RL-ARM together make up the **MDK-Professional** Edition. Although the license status has been updated internally to MDK-Professional, the field**Product** of the screen **File - License Manager** shows two entries: MDK-ARM Standard and RL-ARM.

![License Management Screen](http://upload-images.jianshu.io/upload_images/26219-edcf361ffdf46552.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

If the **Support Period** of the two products differ, we recommend:
Extending the Support Period such that both products have the same expiration date.

Optionally, applying for an MDK-ARM Professional license key to replace both entries with one entry.

![MDK-ARM Professional License](http://upload-images.jianshu.io/upload_images/26219-a93a50ca65c15f3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**Note**:

- MDK-Lite, MDK-Basic, and MDK-Standard (without RL-ARM) are not affected.
- Do not install an older version of RL-ARM on top of MDK-Professional. Older versions of RL-ARM will not work properly with MDK-Professional.
- [Product Selector](http://www.keil.com/arm/selector.asp) shows the MDK-ARM product editions and related components.






















