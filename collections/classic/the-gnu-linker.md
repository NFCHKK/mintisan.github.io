[Using LD - The GNU linker](http://www.math.utah.edu/docs/info/ld_toc.html)

ld version 2 . January 1994

*Steve Chamberlain*
*Cygnus Support*

Copyright (C) 1991, 92, 93, 94, 1995 Free Software Foundation, Inc.

Permission is granted to make and distribute verbatim copies of this manual provided the copyright notice and this permission notice are preserved on all copies.

Permission is granted to copy and distribute modified versions of this manual under the conditions for verbatim copying, provided also that the entire resulting derived work is distributed under the terms of a permission notice identical to this one.

Permission is granted to copy and distribute translations of this manual into another language, under the above conditions for modified versions.

[TOC]

## Overview

ld combines a number of object and archive files, relocates their data and ties up symbol references. Usually the last step in compiling a program is to run ld.

ld accepts Linker Command Language files written in a superset of AT&T`s Link Editor Command Language syntax, to provide explicit and total control over the linking process.

This version of ld uses the general purpose BFD libraries to operate on object files. This allows ld to read, combine, and write object files in many different formats--for example, COFF or a.out. Different formats may be linked together to produce any available kind of object file. See section [BFD](), for more information.

Aside from its flexibility, the GNU linker is more helpful than other linkers in providing diagnostic information. Many linkers abandon execution immediately upon encountering an error; whenever possible, ld continues executing, allowing you to identify other errors (or, in some cases, to get an output file in spite of the error).


## Invocation

The GNU linker `ld` is meant to cover a broad range of situations, and to be as compatible as possible with other linkers. As a result, you have many choices to control its behavior.

Here is a summary of the options you can use on the `ld` command line:

```
ld [ -o output ]  objfile...
  [ -Aarchitecture ]  [ -b input-format ]
  [ -Bstatic ]  [ -Bdynamic ]  [ -Bsymbolic ]
  [ -c MRI-commandfile ]  [ -d | -dc | -dp ]  
  [ -defsym symbol=expression ]
  [ -dynamic-linker file ] [ -embedded-relocs ]
  [ -e entry ]  [ -F ]  [ -F format ]
  [ -format input-format ]  [ -g ]  [ -G size ]
  [ -help ]  [ -i ]  [ -larchive ]  [ -Lsearchdir ]
  [ -M ]  [ -Map mapfile ]  [ -m emulation ]
  [ -N | -n ]  [ -noinhibit-exec ]  [ -no-keep-memory ]
  [ -oformat output-format ]  [ -R filename ]
  [ -relax ]  [ -retain-symbols-file filename ]
  [ -r | -Ur ]  [ -rpath dir ] [-rpath-link dir ]
  [ -S ]  [ -s ] [ -soname name ] [ -shared ] 
  [ -sort-common ] [ -stats ] [ -T commandfile ]
  [ -Ttext org ]  [ -Tdata org ]
  [ -Tbss org ]  [ -t ] [ -traditional-format ]
  [ -u symbol]  [-V]  [-v]  [ -verbose]  [ -version ]
  [ -warn-common ] [ -warn-constructors] [ -warn-once ]
  [ -y symbol ]  [ -X ]  [-x ]
  [ -( [ archives ] -) ]
  [ --start-group [ archives ] --end-group ]
  [ -split-by-reloc count ] [ -split-by-file ]
  [ --whole-archive ]
```

This plethora of command-line options may seem intimidating, but in actual practice few of them are used in any particular context. For instance, a frequent use of `ld` is to link standard Unix object files on a standard, supported Unix system. On such a system, to link a file `hello.o`:

```
ld -o output /lib/crt0.o hello.o -lc
```

This tells `ld` to produce a file called output as the result of linking the file `/lib/crt0.o` with `hello.o` and the library `libc.a`, which will come from the standard search directories. (See the discussion of the `-l` option below.)

The command-line options to `ld` may be specified in any order, and may be repeated at will. Repeating most options with a different argument will either have no further effect, or override prior occurrences (those further to the left on the command line) of that option.

The exceptions--which may meaningfully be used more than once--are `-A`, `-b` (or its synonym `-format`), `-defsym`, `-L`, `-l`, `-R`, `-u`, and `-(` (or its synonym `--start-group`)..

The list of object files to be linked together, shown as objfile..., may follow, precede, or be mixed in with command-line options, except that an objfile argument may not be placed between an option and its argument.

Usually the linker is invoked with at least one object file, but you can specify other forms of binary input files using `-l`, `-R`, and the script command language. If no binary input files at all are specified, the linker does not produce any output, and issues the message `No input files`.

If the linker can not recognize the format of an object file, it will assume that it is a linker script. A script specified in this way augments the main linker script used for the link (either the default linker script or the one specified by using `-T`). This feature permits the linker to link against a file which appears to be an object or an archive, but actually merely defines some symbol values, or uses INPUT or GROUP to load other objects. See section [Command Language]().

For options whose names are a single letter, option arguments must either follow the option letter without intervening whitespace, or be given as separate arguments immediately following the option that requires them.

For options whose names are multiple letters, either one dash or two can precede the option name; for example, `--oformat` and `-oformat` are equivalent. Arguments to multiple-letter options must either be separated from the option name by an equals sign, or be given as separate arguments immediately following the option that requires them. For example, `--oformat srec` and `--oformat=srec` are equivalent. Unique abbreviations of the names of multiple-letter options are accepted.

- `-b input-format` : ld may be configured to support more than one kind of object file. If your ld is configured this way, you can use the `-b` option to specify the binary format for input object files that follow this option on the command line. Even when ld is configured to support alternative object formats, you don't usually need to specify this, as ld should be configured to expect as a default input format the most usual format on each machine. input-format is a text string, the name of a particular format supported by the BFD libraries. (You can list the available binary formats with `objdump -i`.) `-format input-format` has the same effect, as does the script command TARGET. See section BFD. You may want to use this option if you are linking files with an unusual binary format. You can also use `-b` to switch formats explicitly (when linking object files of different formats), by including `-b input-format` before each group of object files in a particular format. The default format is taken from the environment variable GNUTARGET. You can also define the input format from a script, using the command TARGET; see section Option Commands.
- `-Bstatic` : Do not link against shared libraries. This is only meaningful on platforms for which shared libraries are supported.
- `-Bdynamic` : Link against dynamic libraries. This is only meaningful on platforms for which shared libraries are supported. This option is normally the default on such platforms.
- `-Bsymbolic` : When creating a shared library, bind references to global symbols to the definition within the shared library, if any. Normally, it is possible for a program linked against a shared library to override the definition within the shared library. This option is only meaningful on ELF platforms which support shared libraries.
- `-c MRI-commandfile` : For compatibility with linkers produced by MRI, ld accepts script files written in an alternate, restricted command language, described in section MRI Compatible Script Files. Introduce MRI script files with the option `-c`; use the `-T` option to run linker scripts written in the general-purpose ld scripting language. If MRI-cmdfile does not exist, ld looks for it in the directories specified by any `-L` options.
- `-d`  `-dc` `-dp` : These three options are equivalent; multiple forms are supported for compatibility with other linkers. They assign space to common symbols even if a relocatable output file is specified (with `-r`). The script command FORCE_COMMON_ALLOCATION has the same effect. See section Option Commands.
- `-defsym symbol=expression` : Create a global symbol in the output file, containing the absolute address given by expression. You may use this option as many times as necessary to define multiple symbols in the command line. A limited form of arithmetic is supported for the expression in this context: you may give a hexadecimal constant or the name of an existing symbol, or use + and - to add or subtract hexadecimal constants or symbols. If you need more elaborate expressions, consider using the linker command language from a script (see section Assignment: Defining Symbols). Note: there should be no white space between symbol, the equals sign ("="), and expression.
- `-embedded-relocs` : This option is only meaningful when linking MIPS embedded PIC code, generated by the -membedded-pic option to the GNU compiler and assembler. It causes the linker to create a table which may be used at runtime to relocate any data which was statically initialized to pointer values. See the code in testsuite/ld-empic for details.
- `-e entry` : Use entry as the explicit symbol for beginning execution of your program, rather than the default entry point. See section The Entry Point, for a discussion of defaults and other ways of specifying the entry point.
- `-F` `-Fformat` : Ignored. Some older linkers used this option throughout a compilation toolchain for specifying object-file format for both input and output object files. The mechanisms ld uses for this purpose (the `-b` or `-format` options for input files, `-oformat` option or the TARGET command in linker scripts for output files, the GNUTARGET environment variable) are more flexible, but ld accepts the `-F` option for compatibility with scripts written to call the old linker.
- `-format input-format` : Synonym for `-b input-format`.
- `-g` : Ignored. Provided for compatibility with other tools.
- `-Gvalue` `-G value` : Set the maximum size of objects to be optimized using the GP register to size under MIPS ECOFF. Ignored for other object file formats.
- `-help` : Print a summary of the command-line options on the standard output and exit.
- `-i` : Perform an incremental link (same as option `-r`).
- `-lar` : Add archive file archive to the list of files to link. This option may be used any number of times. ld will search its path-list for occurrences of libar.a for every archive specified.
- `-Lsearchdir` `-L searchdir` : Add path searchdir to the list of paths that ld will search for archive libraries and ld control scripts. You may use this option any number of times. The directories are searched in the order in which they are specified on the command line. Directories specified on the command line are searched before the default directories. All -L options apply to all -l options, regardless of the order in which the options appear. The paths can also be specified in a link script with the SEARCH_DIR command. Directories specified this way are searched at the point in which the linker script appears in the command line.
- `-M` : Print (to the standard output) a link map--diagnostic information about where symbols are mapped by ld, and information on global common storage allocation.
- `-Map mapfile` : Print to the file mapfile a link map--diagnostic information about where symbols are mapped by ld, and information on global common storage allocation.
- `-memulation` `-m emulation` : Emulate the emulation linker. You can list the available emulations with the `--verbose` or `-V` options. The default depends on how your ld was configured.
- `-N` : Set the text and data sections to be readable and writable. Also, do not page-align the data segment. If the output format supports Unix style magic numbers, mark the output as OMAGIC.
- `-n` : Set the text segment to be read only, and mark the output as NMAGIC if possible.
- `-noinhibit-exec` : Retain the executable output file whenever it is still usable. Normally, the linker will not produce an output file if it encounters errors during the link process; it exits without writing an output file when it issues any error whatsoever.
- `-no-keep-memory` : ld normally optimizes for speed over memory usage by caching the symbol tables of input files in memory. This option tells ld to instead optimize for memory usage, by rereading the symbol tables as necessary. This may be required if ld runs out of memory space while linking a large executable.
- `-o output` : Use output as the name for the program produced by ld; if this option is not specified, the name `a.out` is used by default. The script command OUTPUT can also specify the output file name.
- `-oformat output-format` :ld may be configured to support more than one kind of object file. If your ld is configured this way, you can use the `-oformat` option to specify the binary format for the output object file. Even when ld is configured to support alternative object formats, you don't usually need to specify this, as ld should be configured to produce as a default output format the most usual format on each machine. output-format is a text string, the name of a particular format supported by the BFD libraries. (You can list the available binary formats with `objdump -i`.) The script command OUTPUT_FORMAT can also specify the output format, but this option overrides it. See section BFD.
- `-R filename` : Read symbol names and their addresses from filename, but do not relocate it or include it in the output. This allows your output file to refer symbolically to absolute locations of memory defined in other programs.
- `-relax` : An option with machine dependent effects. On some platforms, the `-relax` option performs global optimizations that become possible when the linker resolves addressing in the program, such as relaxing address modes and synthesizing new instructions in the output object file.
- `-retain-symbols-file filename` : Retain only the symbols listed in the file filename, discarding all others. filename is simply a flat file, with one symbol name per line. This option is especially useful in environments where a large global symbol table is accumulated gradually, to conserve run-time memory. `-retain-symbols-file` does not discard undefined symbols, or symbols needed for relocations. You may only specify `-retain-symbols-file` once in the command line. It overrides `-s` and `-S`.
- `-r` : Generate relocatable output--i.e., generate an output file that can in turn serve as input to ld. This is often called partial linking. As a side effect, in environments that support standard Unix magic numbers, this option also sets the output file's magic number to OMAGIC. If this option is not specified, an absolute file is produced. When linking C++ programs, this option will not resolve references to constructors; to do that, use `-Ur`. This option does the same thing as `-i`.
- `-S` : Omit debugger symbol information (but not all symbols) from the output file.
- `-s` : Omit all symbol information from the output file.
- `-shared` : Create a shared library. This is currently only supported on ELF and SunOS platforms. On SunOS, the linker will automatically create a shared library if the -e option is not used and there are undefined symbols in the link.
- `-sort-common` : Normally, when ld places the global common symbols in the appropriate output sections, it sorts them by size. First come all the one byte symbols, then all the two bytes, then all the four bytes, and then everything else. This is to prevent gaps between symbols due to alignment constraints. This option disables that sorting.
- `-split-by-reloc count` : Trys to creates extra sections in the output file so that no single output section in the file contains more than count relocations. This is useful when generating huge relocatable for downloading into certain real time kernels with the COFF object file format; since COFF cannot represent more than 65535 relocations in a single section. Note that this will fail to work with object file formats which do not support arbitrary sections. The linker will not split up individual input sections for redistribution, so if a single input section contains more than count relocations one output section will contain that many relocations.
- `-split-by-file` : Similar to -split-by-reloc but creates a new output section for each input file.
- `-stats` : Compute and display statistics about the operation of the linker, such as execution time and memory usage.
-Tbss org
-Tdata org
-Ttext org
Use org as the starting address for--respectively--the bss, data, or the text segment of the output file. org must be a single hexadecimal integer; for compatibility with other linkers, you may omit the leading `0x` usually associated with hexadecimal values.
-T commandfile
-Tcommandfile
Read link commands from the file commandfile. These commands replace ld's default link script (rather than adding to it), so commandfile must specify everything necessary to describe the target format. See section Command Language. If commandfile does not exist, ld looks for it in the directories specified by any preceding `-L` options. Multiple `-T` options accumulate.
-t
Print the names of the input files as ld processes them.
-traditional-format
For some targets, the output of ld is different in some ways from the output of some existing linker. This switch requests ld to use the traditional format instead. For example, on SunOS, ld combines duplicate entries in the symbol string table. This can reduce the size of an output file with full debugging information by over 30 percent. Unfortunately, the SunOS dbx program can not read the resulting program (gdb has no trouble). The `-traditional-format` switch tells ld to not combine duplicate entries.
-u symbol
Force symbol to be entered in the output file as an undefined symbol. Doing this may, for example, trigger linking of additional modules from standard libraries. `-u` may be repeated with different option arguments to enter additional undefined symbols.
-Ur
For anything other than C++ programs, this option is equivalent to `-r`: it generates relocatable output--i.e., an output file that can in turn serve as input to ld. When linking C++ programs, `-Ur` does resolve references to constructors, unlike `-r`. It does not work to use `-Ur` on files that were themselves linked with `-Ur`; once the constructor table has been built, it cannot be added to. Use `-Ur` only for the last partial link, and `-r` for the others.
--verbose
Display the version number for ld and list the linker emulations supported. Display which input files can and cannot be opened.
-v
-V
Display the version number for ld. The -V option also lists the supported emulations.
-version
Display the version number for ld and exit.
-warn-common
Warn when a common symbol is combined with another common symbol or with a symbol definition. Unix linkers allow this somewhat sloppy practice, but linkers on some other operating systems do not. This option allows you to find potential problems from combining global symbols. Unfortunately, some C libraries use this practice, so you may get some warnings about symbols in the libraries as well as in your programs. There are three kinds of global symbols, illustrated here by C examples:
`int i = 1;`
A definition, which goes in the initialized data section of the output file.
`extern int i;`
An undefined reference, which does not allocate space. There must be either a definition or a common symbol for the variable somewhere.
`int i;`
A common symbol. If there are only (one or more) common symbols for a variable, it goes in the uninitialized data area of the output file. The linker merges multiple common symbols for the same variable into a single symbol. If they are of different sizes, it picks the largest size. The linker turns a common symbol into a declaration, if there is a definition of the same variable.
The `-warn-common` option can produce five kinds of warnings. Each warning consists of a pair of lines: the first describes the symbol just encountered, and the second describes the previous symbol encountered with the same name. One or both of the two symbols will be a common symbol.
Turning a common symbol into a reference, because there is already a definition for the symbol.
file(section): warning: common of `symbol`
   overridden by definition
file(section): warning: defined here
Turning a common symbol into a reference, because a later definition for the symbol is encountered. This is the same as the previous case, except that the symbols are encountered in a different order.
file(section): warning: definition of `symbol`
   overriding common
file(section): warning: common is here
Merging a common symbol with a previous same-sized common symbol.
file(section): warning: multiple common
   of `symbol`
file(section): warning: previous common is here
Merging a common symbol with a previous larger common symbol.
file(section): warning: common of `symbol`
   overridden by larger common
file(section): warning: larger common is here
Merging a common symbol with a previous smaller common symbol. This is the same as the previous case, except that the symbols are encountered in a different order.
file(section): warning: common of `symbol`
   overriding smaller common
file(section): warning: smaller common is here
-warn-constructors
Warn if any global constructors are used. This is only useful for a few object file formats. For formats like COFF or ELF, the linker can not detect the use of global constructors.
-warn-once
Only warn once for each undefined symbol, rather than once per module which refers to it. For each archive mentioned on the command line, include every object file in the archive in the link, rather than searching the archive for the required object files. This is normally used to turn an archive file into a shared library, forcing every object to be included in the resulting shared library.
-X
Delete all temporary local symbols. For most targets, this is all local symbols whose names begin with `L`.
-x
Delete all local symbols.
-y symbol
Print the name of each linked file in which symbol appears. This option may be given any number of times. On many systems it is necessary to prepend an underscore. This option is useful when you have an undefined symbol in your link but don`t know where the reference is coming from.
-( archives -)
--start-group archives --end-group
The archives should be a list of archive files. They may be either explicit file names, or `-l` options. The specified archives are searched repeatedly until no new undefined references are created. Normally, an archive is searched only once in the order that it is specified on the command line. If a symbol in that archive is needed to resolve an undefined symbol referred to by an object in an archive that appears later on the command line, the linker would not be able to resolve that reference. By grouping the archives, they all be searched repeatedly until all possible references are resolved. Using this option has a significant performance cost. It is best to use it only when there are unavoidable circular references between two or more archives.

