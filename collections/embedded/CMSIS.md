
# Cortex Microcontroller Software Interface Standard

This file describes the Cortex Microcontroller Software Interface Standard (CMSIS).

http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm

Version: 1.30 - 30. October 2009

Information in this file, the accompany manuals, and software isCopyright © ARM Ltd.All rights reserved.

Revision History
- Version 1.00: initial release.
- Version 1.01: added __LDREX*x*, __STREX*x*, and __CLREX.
- Version 1.02: added Cortex-M0.
- Version 1.10: second review.
- Version 1.20: third review.
- Version 1.30 PRE-RELEASE: reworked Startup Concept, additional Debug Functionality.
- Version 1.30 2nd PRE-RELEASE: changed folder structure, added doxyGen comments, added Bit definitions.
- Version 1.30: updated Device Support Packages.

## Contents

1. [About](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#1)
2. [Coding Rules and Conventions](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#2)
3. [CMSIS Files](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#3)
4. [Core Peripheral Access Layer](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#4)
5. [CMSIS Example](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#5)

## About

The **Cortex Microcontroller Software Interface Standard (CMSIS)** answers the challenges that are faced when software components are deployed to physical microcontroller devices based on a Cortex-M0 or Cortex-M3 processor. The CMSIS will be also expanded to future Cortex-M processor cores (the term Cortex-M is used to indicate that). The CMSIS is defined in close co-operation with various silicon and software vendors and provides a common approach to interface to peripherals, real-time operating systems, and middleware components.

ARM provides as part of the CMSIS the following software layers that are available for various compiler implementations:

- **Core Peripheral Access Layer**: contains name definitions, address definitions and helper functions to access core registers and peripherals. It defines also a device independent interface for RTOS Kernels that includes debug channel definitions.

These software layers are expanded by Silicon partners with:

- **Device Peripheral Access Layer**: provides definitions for all device peripherals
- **Access Functions for Peripherals (optional)**: provides additional helper functions for peripherals

CMSIS defines for a Cortex-M Microcontroller System:

- A common way to access peripheral registers and a common way to define exception vectors.
- The register names of the **Core Peripherals** and** **the names of the **Core Exception Vectors**.
- An device independent interface for RTOS Kernels including a debug channel.

By using CMSIS compliant software components, the user can easier re-use template code. CMSIS is intended to enable the combination of software components from multiple middleware vendors.

## Coding Rules and Conventions

The following section describes the coding rules and conventions used in the CMSIS implementation. It contains also information about data types and version number information.

### Essentials

- The CMSIS C code conforms to MISRA 2004 rules. In case of MISRA violations, there are disable and enable sequences for PC-LINT inserted.
- ANSI standard data types defined in the ANSI C header file **<stdint.h>** are used.
- #define constants that include expressions must be enclosed by parenthesis.
Variables and parameters have a complete data type.
- All functions in the **Core Peripheral Access Layer** are re-entrant.
- The **Core Peripheral Access Layer** has no blocking code (which means that wait/query loops are done at other software layers).
- For each exception/interrupt there is definition for:
    + an exception/interrupt handler with the postfix **_Handler **(for exceptions) or **_IRQHandler** (for interrupts).
    + a default exception/interrupt handler (weak definition) that contains an endless loop.
    + a #define of the interrupt number with the postfix **_IRQn**.

### Recommendations

The CMSIS recommends the following conventions for identifiers.
- **CAPITAL** names to identify Core Registers, Peripheral Registers, and CPU Instructions.
- **CamelCase** names to identify peripherals access functions and interrupts.
- **PERIPHERAL_** prefix to identify functions that belong to specify peripherals.
- **Doxygen** comments for all functions are included as described under **Function Comments** below.

**Comments*
- *Comments use the ANSI C90 style (*/* comment */*) or C++ style (*// comment*). It is assumed that the programming tools support today consistently the C++ comment style.
- **Function Comments** provide for each function the following information:
    + one-line brief function overview.
    + detailed parameter explanation.
    + detailed information about return values.
    + detailed description of the actual function.

**Doxygen Example:**
```
/** * @brief Enable Interrupt in NVIC Interrupt Controller * @param IRQn interrupt number that specifies the interrupt * @return none. * Enable the specified interrupt in the NVIC Interrupt Controller. * Other settings of the interrupt such as priority are not affected. */
```

### Data Types and IO Type Qualifiers

The **Cortex-M HAL** uses the standard types from the standard ANSI C header file **<stdint.h>**. **IO Type Qualifiers** are used to specify the access to peripheral variables. IO Type Qualifiers are indented to be used for automatic generation of debug information of peripheral registers.







### CMSIS Version Number

File **core_cm3.h** contains the version number of the CMSIS with the following define:

```
#define __CM3_CMSIS_VERSION_MAIN (0x01) /* [31:16] main version */#define __CM3_CMSIS_VERSION_SUB (0x30) /* [15:0] sub version */#define __CM3_CMSIS_VERSION ((__CM3_CMSIS_VERSION_MAIN << 16) | __CM3_CMSIS_VERSION_SUB)
```

File **core_cm0.h** contains the version number of the CMSIS with the following define:

```
#define __CM0_CMSIS_VERSION_MAIN (0x01) /* [31:16] main version */#define __CM0_CMSIS_VERSION_SUB (0x30) /* [15:0] sub version */#define __CM0_CMSIS_VERSION ((__CM0_CMSIS_VERSION_MAIN << 16) | __CM0_CMSIS_VERSION_SUB)
```

### CMSIS Cortex Core

File **core_cm3.h** contains the type of the CMSIS Cortex-M with the following define:
```
#define __CORTEX_M (0x03)
```
File **core_cm0.h** contains the type of the CMSIS Cortex-M with the following define:
```
#define __CORTEX_M (0x00)
```

## CMSIS Files
This section describes the Files provided in context with the CMSIS to access the Cortex-M hardware and peripherals.

File
Provider
Description

*device.h*
Device specific (provided by silicon partner)
Defines the peripherals for the actual device. The file may use several other include files to define the peripherals of the actual device.

core_cm0.h
ARM (for RealView ARMCC, IAR, and GNU GCC)
Defines the core peripherals for the Cortex-M0 CPU and core peripherals.

core_cm3.h
ARM (for RealView ARMCC, IAR, and GNU GCC)
Defines the core peripherals for the Cortex-M3 CPU and core peripherals.

core_cm0.c
ARM (for RealView ARMCC, IAR, and GNU GCC)
Provides helper functions that access core registers.

core_cm3.c
ARM (for RealView ARMCC, IAR, and GNU GCC)
Provides helper functions that access core registers.

startup*_device*
ARM (adapted by compiler partner / silicon partner)
Provides the Cortex-M startup code and the complete (device specific) Interrupt Vector Table

system*_device*
ARM (adapted by silicon partner)
Provides a device specific configuration file for the device. It configures the device initializes typically the oscillator (PLL) that is part of the microcontroller device

### *device.h*

The file ***device.h*** is provided by the silicon vendor and is the **central include file** that the application programmer is using in the C source code. This file contains:

- **Interrupt Number Definition**: provides interrupt numbers (IRQn) for all core and device specific exceptions and interrupts.
- **Configuration for core_cm0.h / core_cm3.h**: reflects the actual configuration of the Cortex-M processor that is part of the actual device. As such the file **core_cm0.h / core_cm3.h** is included that implements access to processor registers and core peripherals.
- **Device Peripheral Access Layer**: provides definitions for all device peripherals. It contains all data structures and the address mapping for the device specific peripherals.
- **Access Functions for Peripherals (optional)**: provides additional helper functions for peripherals that are useful for programming of these peripherals. Access Functions may be provided as inline functions or can be extern references to a device specific library provided by the silicon vendor.

**Interrupt Number Definition**

To access the device specific interrupts the device.h file defines IRQn numbers for the complete device using a enum typedef as shown below:

```
typedef enum IRQn{/****** Cortex-M3 Processor Exceptions/Interrupt Numbers ************************************************/ NonMaskableInt_IRQn = -14, /*!< 2 Non Maskable Interrupt */ HardFault_IRQn = -13, /*!< 3 Cortex-M3 Hard Fault Interrupt */ MemoryManagement_IRQn = -12, /*!< 4 Cortex-M3 Memory Management Interrupt */ BusFault_IRQn = -11, /*!< 5 Cortex-M3 Bus Fault Interrupt */ UsageFault_IRQn = -10, /*!< 6 Cortex-M3 Usage Fault Interrupt */ SVCall_IRQn = -5, /*!< 11 Cortex-M3 SV Call Interrupt */ DebugMonitor_IRQn = -4, /*!< 12 Cortex-M3 Debug Monitor Interrupt */ PendSV_IRQn = -2, /*!< 14 Cortex-M3 Pend SV Interrupt */ SysTick_IRQn = -1, /*!< 15 Cortex-M3 System Tick Interrupt *//****** STM32 specific Interrupt Numbers ****************************************************************/ WWDG_STM_IRQn = 0, /*!< Window WatchDog Interrupt */ PVD_STM_IRQn = 1, /*!< PVD through EXTI Line detection Interrupt */ : : } IRQn_Type;
```

Configuration for core_cm0.h / core_cm3.h

The Cortex-M core configuration options which are defined for each device implementation. Some configuration options are reflected in the CMSIS layer using the #define settings described below.

To access core peripherals file ***device.h*** includes file **core_cm0.h / core_cm3.h**. Several features in **core_cm0.h / core_cm3.h** are configured by the following defines that must be defined before**#include <core_cm0.h>** / **#include <core_cm3.h>** preprocessor command.


#define
File
Value
Description

__NVIC_PRIO_BITS
core_cm0.h
(2)
Number of priority bits implemented in the NVIC (device specific)

__NVIC_PRIO_BITS
core_cm3.h
(2 ... 8)
Number of priority bits implemented in the NVIC (device specific)

__MPU_PRESENT
core_cm0.h, core_cm3.h
(0, 1)
Defines if an MPU is present or not

__Vendor_SysTickConfig
core_cm0.h, core_cm3.h
(1)
When this define is setup to 1, the **SysTickConfig** function in **core_cm3.h** is excluded. In this case the ***device.h*** file must contain a vendor specific implementation of this function.

**Device Peripheral Access Layer**

Each peripheral uses a prefix which consists of **<device abbreviation>_** and **<peripheral name>_** to identify peripheral registers that access this specific peripheral. The intention of this is to avoid name collisions caused due to short names. If more than one peripheral of the same type exists, identifiers have a postfix (digit or letter). For example:
<device abbreviation>_UART_Type: defines the generic register layout for all UART channels in a device.typedef struct{ union { __I uint8_t RBR; /*!< Offset: 0x000 Receiver Buffer Register */ __O uint8_t THR; /*!< Offset: 0x000 Transmit Holding Register */ __IO uint8_t DLL; /*!< Offset: 0x000 Divisor Latch LSB */ uint32_t RESERVED0; }; union { __IO uint8_t DLM; /*!< Offset: 0x004 Divisor Latch MSB */ __IO uint32_t IER; /*!< Offset: 0x004 Interrupt Enable Register */ }; union { __I uint32_t IIR; /*!< Offset: 0x008 Interrupt ID Register */ __O uint8_t FCR; /*!< Offset: 0x008 FIFO Control Register */ }; __IO uint8_t LCR; /*!< Offset: 0x00C Line Control Register */ uint8_t RESERVED1[7]; __I uint8_t LSR; /*!< Offset: 0x014 Line Status Register */ uint8_t RESERVED2[7]; __IO uint8_t SCR; /*!< Offset: 0x01C Scratch Pad Register */ uint8_t RESERVED3[3]; __IO uint32_t ACR; /*!< Offset: 0x020 Autobaud Control Register */ __IO uint8_t ICR; /*!< Offset: 0x024 IrDA Control Register */ uint8_t RESERVED4[3]; __IO uint8_t FDR; /*!< Offset: 0x028 Fractional Divider Register */ uint8_t RESERVED5[7]; __IO uint8_t TER; /*!< Offset: 0x030 Transmit Enable Register */ uint8_t RESERVED6[39]; __I uint8_t FIFOLVL; /*!< Offset: 0x058 FIFO Level Register */} LPC_UART_TypeDef;

<device abbreviation>_UART1: is a pointer to a register structure that refers to a specific UART. For example UART1->DR is the data register of UART1.#define LPC_UART2 ((LPC_UART_TypeDef *) LPC_UART2_BASE )#define LPC_UART3 ((LPC_UART_TypeDef *) LPC_UART3_BASE )

Minimal Requiements
To access the peripheral registers and related function in a device the files ***device.h*** and **core_cm0.h** / **core_cm3.h** defines as a minimum:
The **Register Layout Typedef** for each peripheral that defines all register names. Names that start with RESERVE are used to introduce space into the structure to adjust the addresses of the peripheral registers. For example:typedef struct { __IO uint32_t CTRL; /* SysTick Control and Status Register */ __IO uint32_t LOAD; /* SysTick Reload Value Register */ __IO uint32_t VAL; /* SysTick Current Value Register */ __I uint32_t CALIB; /* SysTick Calibration Register */ } SysTick_Type;

**Base Address** for each peripheral (in case of multiple peripherals that use the same **register layout typedef** multiple base addresses are defined). For example:#define SysTick_BASE (SCS_BASE + 0x0010) /* SysTick Base Address */

**Access Definition** for each peripheral (in case of multiple peripherals that use the same **register layout typedef** multiple access definitions exist, i.e. LPC_UART0, LPC_UART2). For Example:#define SysTick ((SysTick_Type *) SysTick_BASE) /* SysTick access definition */

These definitions allow to access the peripheral registers from user code with simple assignments like:
SysTick->CTRL = 0;
Optional Features
In addition the ***device.h ***file may define:
#define constants that simplify access to the peripheral registers. These constant define bit-positions or other specific patterns are that required for the programming of the peripheral registers. The identifiers used start with **<device abbreviation>_** and **<peripheral name>_**. It is recommended to use CAPITAL letters for such #define constants.
Functions that perform more complex functions with the peripheral (i.e. status query before a sending register is accessed). Again these function start with **<device abbreviation>_** and **<peripheral name>_**.

core_cm0.h and core_cm0.c
File **core_cm0.h** describes the data structures for the Cortex-M0 core peripherals and does the address mapping of this structures. It also provides basic access to the Cortex-M0 core registers and core peripherals with efficient functions (defined as **static inline**).
File **core_cm0.c** defines several helper functions that access processor registers.
Together these files implement the [Core Peripheral Access Layer](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#4) for a Cortex-M0.
core_cm3.h and core_cm3.c
File **core_cm3.h** describes the data structures for the Cortex-M3 core peripherals and does the address mapping of this structures. It also provides basic access to the Cortex-M3 core registers and core peripherals with efficient functions (defined as **static inline**).
File **core_cm3.c** defines several helper functions that access processor registers.
Together these files implement the [Core Peripheral Access Layer](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#4) for a Cortex-M3.
startup_*device*
A template file for **startup_*device*** is provided by ARM for each supported compiler. It is adapted by the silicon vendor to include interrupt vectors for all device specific interrupt handlers. Each interrupt handler is defined as ***weak*** function to an dummy handler. Therefore the interrupt handler can be directly used in application software without any requirements to adapt the **startup_*device*** file.
The following exception names are fixed and define the start of the vector table for a Cortex-M0:
__Vectors DCD __initial_sp ; Top of Stack DCD Reset_Handler ; Reset Handler DCD NMI_Handler ; NMI Handler DCD HardFault_Handler ; Hard Fault Handler DCD 0 ; Reserved DCD 0 ; Reserved DCD 0 ; Reserved DCD 0 ; Reserved DCD 0 ; Reserved DCD 0 ; Reserved DCD 0 ; Reserved DCD SVC_Handler ; SVCall Handler DCD 0 ; Reserved DCD 0 ; Reserved DCD PendSV_Handler ; PendSV Handler DCD SysTick_Handler ; SysTick Handler
The following exception names are fixed and define the start of the vector table for a Cortex-M3:
__Vectors DCD __initial_sp ; Top of Stack DCD Reset_Handler ; Reset Handler DCD NMI_Handler ; NMI Handler DCD HardFault_Handler ; Hard Fault Handler DCD MemManage_Handler ; MPU Fault Handler DCD BusFault_Handler ; Bus Fault Handler DCD UsageFault_Handler ; Usage Fault Handler DCD 0 ; Reserved DCD 0 ; Reserved DCD 0 ; Reserved DCD 0 ; Reserved DCD SVC_Handler ; SVCall Handler DCD DebugMon_Handler ; Debug Monitor Handler DCD 0 ; Reserved DCD PendSV_Handler ; PendSV Handler DCD SysTick_Handler ; SysTick Handler
In the following examples for device specific interrupts are shown:
; External Interrupts DCD WWDG_IRQHandler ; Window Watchdog DCD PVD_IRQHandler ; PVD through EXTI Line detect DCD TAMPER_IRQHandler ; Tamper
Device specific interrupts must have a dummy function that can be overwritten in user code. Below is an example for this dummy function.
Default_Handler PROC EXPORT WWDG_IRQHandler [WEAK] EXPORT PVD_IRQHandler [WEAK] EXPORT TAMPER_IRQHandler [WEAK] : : WWDG_IRQHandler PVD_IRQHandler TAMPER_IRQHandler : : B . ENDP
The user application may simply define an interrupt handler function by using the handler name as shown below.
void WWDG_IRQHandler(void){ : :}
system_*device*.c
A template file for **system_*device*.c** is provided by ARM but adapted by the silicon vendor to match their actual device. As a **minimum requirement** this file must provide a device specific system configuration function and a global variable that contains the system frequency. It configures the device and initializes typically the oscillator (PLL) that is part of the microcontroller device.
The file **system_*****device*****.c** must provide as a minimum requirement the SystemInit function as shown below.
Function Definition
Description

void SystemInit (void)
Setup the microcontroller system. Typically this function configures the oscillator (PLL) that is part of the microcontroller device. For systems with variable clock speed it also updates the variable SystemCoreClock.SystemInit is called from startup*_device* file.

void SystemCoreClockUpdate (void)
Updates the variable SystemCoreClock and must be called whenever the core clock is changed during program execution. SystemCoreClockUpdate() evaluates the clock register settings and calculates the current core clock.

Also part of the file **system_*****device*****.c** is the variable **SystemCoreClock** which contains the current CPU clock speed shown below.
Variable Definition
Description

uint32_t SystemCoreClock
Contains the system core clock (which is the system clock   frequency supplied to the SysTick timer and the processor core clock). This variable can be used by the user application to setup the SysTick timer or configure other parameters. It may also be used by debugger to query the frequency of the debug timer or configure the trace clock speed.SystemCoreClock is initialized with a correct predefined value.The compiler must be configured to avoid the removal of this variable in case that the application program is not using it. It is important for debug systems that the variable is physically present in memory so that it can be examined to configure the debugger.

Note
The above definitions are the minimum requirements for the file **system_*****device*****.c**. This file may export more functions or variables that provide a more flexible configuration of the microcontroller system.

Core Peripheral Access Layer
Cortex-M Core Register Access
The following functions are defined in **core_cm0.h** / **core_cm3.h** and provide access to Cortex-M core registers.
Function Definition
Core
Core Register
Description

void __enable_irq (void)
M0, M3
PRIMASK = 0
Global Interrupt enable (using the instruction **CPSIE i**)

void __disable_irq (void)
M0, M3
PRIMASK = 1
Global Interrupt disable (using the instruction **CPSID i**)

void __set_PRIMASK (uint32_t value)
M0, M3
PRIMASK = value
Assign value to Priority Mask Register (using the instruction **MSR**)

uint32_t __get_PRIMASK (void)
M0, M3
return PRIMASK
Return Priority Mask Register (using the instruction **MRS**)

void __enable_fault_irq (void)
M3
FAULTMASK = 0
Global Fault exception and Interrupt enable (using the instruction **CPSIE f**)

void __disable_fault_irq (void)
M3
FAULTMASK = 1
Global Fault exception and Interrupt disable (using the instruction **CPSID f**)

void __set_FAULTMASK (uint32_t value)
M3
FAULTMASK = value
Assign value to Fault Mask Register (using the instruction **MSR**)

uint32_t __get_FAULTMASK (void)
M3
return FAULTMASK
Return Fault Mask Register (using the instruction **MRS**)

void __set_BASEPRI (uint32_t value)
M3
BASEPRI = value
Set Base Priority (using the instruction **MSR**)

uiuint32_t __get_BASEPRI (void)
M3
return BASEPRI
Return Base Priority (using the instruction **MRS**)

void __set_CONTROL (uint32_t value)
M0, M3
CONTROL = value
Set CONTROL register value (using the instruction **MSR**)

uint32_t __get_CONTROL (void)
M0, M3
return CONTROL
Return Control Register Value (using the instruction **MRS**)

void __set_PSP (uint32_t TopOfProcStack)
M0, M3
PSP = TopOfProcStack
Set Process Stack Pointer value (using the instruction **MSR**)

uint32_t __get_PSP (void)
M0, M3
return PSP
Return Process Stack Pointer (using the instruction **MRS**)

void __set_MSP (uint32_t TopOfMainStack)
M0, M3
MSP = TopOfMainStack
Set Main Stack Pointer (using the instruction **MSR**)

uint32_t __get_MSP (void)
M0, M3
return MSP
Return Main Stack Pointer (using the instruction **MRS**)

Cortex-M Instruction Access
The following functions are defined in **core_cm0.h** / **core_cm3.h**and generate specific Cortex-M instructions. The functions are implemented in the file **core_cm0.c** / **core_cm3.c**.
Name
Core
Generated CPU Instruction
Description

void __NOP (void)
M0, M3
NOP
No Operation

void __WFI (void)
M0, M3
WFI
Wait for Interrupt

void __WFE (void)
M0, M3
WFE
Wait for Event

void __SEV (void)
M0, M3
SEV
Set Event

void __ISB (void)
M0, M3
ISB
Instruction Synchronization Barrier

void __DSB (void)
M0, M3
DSB
Data Synchronization Barrier

void __DMB (void)
M0, M3
DMB
Data Memory Barrier

uint32_t __REV (uint32_t value)
M0, M3
REV
Reverse byte order in integer value.

uint32_t __REV16 (uint16_t value)
M0, M3
REV16
Reverse byte order in unsigned short value.

sint32_t __REVSH (sint16_t value)
M0, M3
REVSH
Reverse byte order in signed short value with sign extension to integer.

uint32_t __RBIT (uint32_t value)
M3
RBIT
Reverse bit order of value

uint8_t __LDREXB (uint8_t *addr)
M3
LDREXB
Load exclusive byte

uint16_t __LDREXH (uint16_t *addr)
M3
LDREXH
Load exclusive half-word

uint32_t __LDREXW (uint32_t *addr)
M3
LDREXW
Load exclusive word

uint32_t __STREXB (uint8_t value, uint8_t *addr)
M3
STREXB
Store exclusive byte

uint32_t __STREXB (uint16_t value, uint16_t *addr)
M3
STREXH
Store exclusive half-word

uint32_t __STREXB (uint32_t value, uint32_t *addr)
M3
STREXW
Store exclusive word

void __CLREX (void)
M3
CLREX
Remove the exclusive lock created by __LDREXB, __LDREXH, or __LDREXW

NVIC Access Functions
The CMSIS provides access to the NVIC via the register interface structure and several helper functions that simplify the setup of the NVIC. The CMSIS HAL uses IRQ numbers (IRQn) to identify the interrupts. The first device interrupt has the IRQn value 0. Therefore negative IRQn values are used for processor core exceptions.
For the IRQn values of core exceptions the file ***device.h*** provides the following enum names.
Core Exception enum Value
Core
IRQn
Description

NonMaskableInt_IRQn
M0, M3
-14
Cortex-M Non Maskable Interrupt

HardFault_IRQn
M0, M3
-13
Cortex-M Hard Fault Interrupt

MemoryManagement_IRQn
M3
-12
Cortex-M Memory Management Interrupt

BusFault_IRQn
M3
-11
Cortex-M Bus Fault Interrupt

UsageFault_IRQn
M3
-10
Cortex-M Usage Fault Interrupt

SVCall_IRQn
M0, M3
-5
Cortex-M SV Call Interrupt

DebugMonitor_IRQn
M3
-4
Cortex-M Debug Monitor Interrupt

PendSV_IRQn
M0, M3
-2
Cortex-M Pend SV Interrupt

SysTick_IRQn
M0, M3
-1
Cortex-M System Tick Interrupt

The following functions simplify the setup of the NVIC. The functions are defined as **static inline**.
Name
Core
Parameter
Description

void NVIC_SetPriorityGrouping (uint32_t PriorityGroup)
M3
Priority Grouping Value
Set the Priority Grouping (Groups . Subgroups)

uint32_t NVIC_GetPriorityGrouping (void)
M3
(void)
Get the Priority Grouping (Groups . Subgroups)

void NVIC_EnableIRQ (IRQn_Type IRQn)
M0, M3
IRQ Number
Enable IRQn

void NVIC_DisableIRQ (IRQn_Type IRQn)
M0, M3
IRQ Number
Disable IRQn

uint32_t NVIC_GetPendingIRQ (IRQn_Type IRQn)
M0, M3
IRQ Number
Return 1 if IRQn is pending else 0

void NVIC_SetPendingIRQ (IRQn_Type IRQn)
M0, M3
IRQ Number
Set IRQn Pending

void NVIC_ClearPendingIRQ (IRQn_Type IRQn)
M0, M3
IRQ Number
Clear IRQn Pending Status

uint32_t NVIC_GetActive (IRQn_Type IRQn)
M3
IRQ Number
Return 1 if IRQn is active else 0

void NVIC_SetPriority (IRQn_Type IRQn, uint32_t priority)
M0, M3
IRQ Number, Priority
Set Priority for IRQn(not threadsafe for Cortex-M0)

uint32_t NVIC_GetPriority (IRQn_Type IRQn)
M0, M3
IRQ Number
Get Priority for IRQn

uint32_t NVIC_EncodePriority (uint32_t PriorityGroup, uint32_t PreemptPriority, uint32_t SubPriority)
M3
IRQ Number, Priority Group, Preemptive Priority, Sub Priority
Encode priority for given group, preemptive and sub priority

NVIC_DecodePriority (uint32_t Priority, uint32_t PriorityGroup, uint32_t* pPreemptPriority, uint32_t* pSubPriority)
M3
IRQ Number, Priority, pointer to Priority Group, pointer to Preemptive Priority, pointer to Sub Priority
Deccode given priority to group, preemptive and sub priority

void NVIC_SystemReset (void)
M0, M3
(void)
Resets the System

Note
The processor exceptions have negative enum values. Device specific interrupts have positive enum values and start with 0. The values are defined in ***device.h*** file.

The values for **PreemptPriority** and **SubPriority** used in functions **NVIC_EncodePriority** and **NVIC_DecodePriority** depend on the available __NVIC_PRIO_BITS implemented in the NVIC.

SysTick Configuration Function
The following function is used to configure the SysTick timer and start the SysTick interrupt.
Name
Parameter
Description

uint32_t SysTickConfig (uint32_t ticks)
ticks is SysTick counter reload value
Setup the SysTick timer and enable the SysTick interrupt. After this call the SysTick timer creates interrupts with the specified time interval. Return: 0 when successful, 1 on failure.

Cortex-M3 ITM Debug Access
The Cortex-M3 incorporates the Instrumented Trace Macrocell (ITM) that provides together with the Serial Viewer Output trace capabilities for the microcontroller system. The ITM has 32 communication channels; two ITM communication channels are used by CMSIS to output the following information:
ITM Channel 0: implements the **ITM_SendChar** function which can be used for printf-style output via the debug interface.
ITM Channel 31: is reserved for the RTOS kernel and can be used for kernel awareness debugging.

Note
The ITM channel 31 is selected for the RTOS kernel since some kernels may use the Privileged level for program execution. ITM channels have 4 groups with 8 channels each, whereby each group can be configured for access rights in the Unprivileged level. The ITM channel 0 may be therefore enabled for the user task whereas ITM channel 31 may be accessible only in Privileged level from the RTOS kernel itself.

The prototype of the **ITM_SendChar** routine is shown in the table below.
Name
Parameter
Description

void uint32_t ITM_SendChar(uint32_t chr)
character to output
The function outputs a character via the ITM channel 0. The function returns when no debugger is connected that has booked the output. It is blocking when a debugger is connected, but the previous character send is not transmitted. Return: the input character 'chr'.

Example for the usage of the ITM Channel 31 for RTOS Kernels:
// check if debugger connected and ITM channel enabled for tracing if ((CoreDebug->DEMCR & CoreDebug_DEMCR_TRCENA) && (ITM->TCR & ITM_TCR_ITMENA) && (ITM->TER & (1UL << 31))) { // transmit trace data while (ITM->PORT31_U32 == 0); ITM->PORT[31].u8 = task_id; // id of next task while (ITM->PORT[31].u32 == 0); ITM->PORT[31].u32 = task_status; // status information }
Cortex-M3 additional Debug Access
CMSIS provides additional debug functions to enlarge the Cortex-M3 Debug Access. Data can be transmitted via a certain global buffer variable towards the target system.
The buffer variable and the prototypes of the additional functions are shown in the table below.
Name
Parameter
Description

extern volatile int ITM_RxBuffer

Buffer to transmit data towards debug system. Value 0x5AA55AA5 indicates that buffer is empty.

int ITM_ReceiveChar (void)
none
The nonblocking functions returns the character stored in ITM_RxBuffer. Return: -1 indicates that no character was received.

int ITM_CheckChar (void)
none
The function checks if a character is available in ITM_RxBuffer. Return: 1 indicates that a character is available, 0 indicates that no character is available.

CMSIS Example
The following section shows a typical example for using the CMSIS layer in user applications. The example is based on a STM32F10x Device.
#include "stm32f10x.h"volatile uint32_t msTicks; /* timeTicks counter */void SysTick_Handler(void) { msTicks++; /* increment timeTicks counter */}__INLINE static void Delay (uint32_t dlyTicks) { uint32_t curTicks = msTicks; while ((msTicks - curTicks) < dlyTicks);}__INLINE static void LED_Config(void) { ; /* Configure the LEDs */}__INLINE static void LED_On (uint32_t led) { ; /* Turn On LED */}__INLINE static void LED_Off (uint32_t led) { ; /* Turn Off LED */}int main (void) { if (SysTick_Config (SystemCoreClock / 1000)) { /* Setup SysTick for 1 msec interrupts */ ; /* Handle Error */ while (1); } LED_Config(); /* configure the LEDs */ while(1) { LED_On (0x100); /* Turn on the LED */ Delay (100); /* delay 100 Msec */ LED_Off (0x100); /* Turn off the LED */ Delay (100); /* delay 100 Msec */ }}

Tags Saved
[

](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#)[

 Archive Page](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#)
[

 Remove Page](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#)
[

 Open Pocket](http://getpocket.com/a)
[

 Settings](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#)

Add Tags
") 6px 6px / 22px no-repeat unset unset unset unset; background-blend-mode: unset; baseline-shift: unset; border: unset unset unset; border-radius: unset; border-collapse: unset; bottom: unset; box-shadow: unset; box-sizing: border-box; break-after: unset; break-before: unset; break-inside: unset; buffered-rendering: unset; caption-side: unset; clear: unset; clip: unset; clip-path: unset; clip-rule: unset; color-interpolation: unset; color-interpolation-filters: unset; color-rendering: unset; column-fill: unset; contain: unset; content: unset; counter-increment: unset; counter-reset: unset; cursor: unset; cx: unset; cy: unset; d: unset; display: block; dominant-baseline: unset; empty-cells: unset; fill: unset; fill-opacity: unset; fill-rule: unset; filter: unset; flex: unset unset unset; flex-flow: unset unset; float: unset; flood-color: unset; flood-opacity: unset; height: unset; image-rendering: unset; isolation: unset; justify-content: unset; left: unset; letter-spacing: unset; lighting-color: unset; line-height: unset; list-style: unset unset unset; margin: unset 0px; marker: unset; mask: unset; mask-type: unset; max-height: unset; max-width: unset; min-height: unset; min-width: unset; mix-blend-mode: unset; motion: unset unset unset; object-fit: unset; object-position: unset; opacity: unset; order: unset; orphans: unset; outline: unset unset unset; outline-offset: unset; overflow-wrap: unset; overflow: unset; padding: 0px 4px 4px; paint-order: unset; perspective: unset; perspective-origin: unset; pointer-events: unset; position: unset; quotes: unset; resize: unset; right: unset; r: unset; rx: unset; ry: unset; shape-image-threshold: unset; shape-margin: unset; shape-outside: unset; shape-rendering: unset; size: unset; speak: unset; stop-color: unset; stop-opacity: unset; stroke: unset; stroke-dasharray: unset; stroke-dashoffset: unset; stroke-linecap: unset; stroke-linejoin: unset; stroke-miterlimit: unset; stroke-opacity: unset; stroke-width: unset; table-layout: unset; tab-size: unset; text-align: unset; text-align-last: unset; text-anchor: unset; text-combine-upright: unset; text-decoration: unset; text-indent: unset; text-overflow: unset; text-shadow: unset; text-size-adjust: unset; text-transform: unset; top: unset; touch-action: unset; transform: unset; transform-origin: unset; transform-style: unset; transition: unset unset unset unset; vector-effect: unset; vertical-align: unset; visibility: unset; x: unset; y: unset; -webkit-appearance: unset; -webkit-app-region: unset; -webkit-background-clip: unset; -webkit-background-origin: unset; border-spacing: unset; -webkit-border-image: unset; -webkit-box-align: unset; -webkit-box-decoration-break: unset; -webkit-box-direction: unset; -webkit-box-flex: unset; -webkit-box-flex-group: unset; -webkit-box-lines: unset; -webkit-box-ordinal-group: unset; -webkit-box-orient: unset; -webkit-box-pack: unset; -webkit-box-reflect: unset; -webkit-clip-path: unset; columns: unset unset; column-gap: unset; column-rule: unset unset unset; column-span: unset; -webkit-highlight: unset; -webkit-hyphenate-character: unset; -webkit-line-break: unset; -webkit-line-clamp: unset; -webkit-margin-collapse: unset unset; -webkit-margin-bottom-collapse: unset; -webkit-margin-top-collapse: unset; -webkit-mask-box-image-outset: unset; -webkit-mask-box-image-repeat: unset; -webkit-mask-box-image-slice: unset; -webkit-mask-box-image-source: unset; -webkit-mask-box-image-width: unset; -webkit-mask: unset unset unset / unset unset unset unset unset; -webkit-mask-composite: unset; -webkit-perspective-origin-x: unset; -webkit-perspective-origin-y: unset; -webkit-print-color-adjust: unset; -webkit-rtl-ordering: unset; -webkit-ruby-position: unset; -webkit-tap-highlight-color: unset; -webkit-text-combine: unset; -webkit-text-emphasis: unset unset; -webkit-text-emphasis-position: unset; -webkit-text-fill-color: unset; -webkit-text-security: unset; -webkit-text-stroke: unset unset; -webkit-transform-origin-x: unset; -webkit-transform-origin-y: unset; -webkit-transform-origin-z: unset; -webkit-user-drag: unset; -webkit-user-modify: unset; -webkit-user-select: unset; white-space: unset; widows: unset; width: 294px; will-change: unset; word-break: unset; word-spacing: unset; word-wrap: unset; z-index: unset; -webkit-border-end-color: unset; -webkit-border-end-style: unset; -webkit-border-end-width: unset; -webkit-border-start-color: unset; -webkit-border-start-style: unset; -webkit-border-start-width: unset; -webkit-border-before-color: unset; -webkit-border-before-style: unset; -webkit-border-before-width: unset; -webkit-border-after-color: unset; -webkit-border-after-style: unset; -webkit-border-after-width: unset; -webkit-margin-end: unset; -webkit-margin-start: unset; -webkit-margin-before: unset; -webkit-margin-after: unset; -webkit-padding-end: unset; -webkit-padding-start: unset; -webkit-padding-before: unset; -webkit-padding-after: unset; -webkit-logical-width: unset; -webkit-logical-height: unset; -webkit-min-logical-width: unset; -webkit-min-logical-height: unset; -webkit-max-logical-width: unset; -webkit-max-logical-height: unset; page: unset; -webkit-font-size-delta: unset; -webkit-text-decorations-in-effect: unset;">arm cortex-m×

MORE ON SOURCE CODE:

[Using Open Source Static Libraries in Xcode 4](http://blog.carbonfive.com/2011/04/04/using-open-source-static-libraries-in-xcode-4/)blog.carbonfive.com

[

Save](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#)

[Practical Makefiles, by example](http://nuclear.mutantstargoat.com/articles/make/)nuclear.mutantstargoat.com

[

Save](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#)

[Arduino Development; There’s a Makefile for That](http://hackaday.com/2015/10/01/arduino-development-theres-a-makefile-for-that/)hackaday.com

[

Save](http://www.vr.ncue.edu.tw/esa/b1011/CMSIS_Core.htm#)
