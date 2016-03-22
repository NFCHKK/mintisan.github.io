
# Markdown格式书写，Word，PDF，HTML，PNG格式输出

[TOC]

## 工具
- [pandoc](http://pandoc.org/)
- [wkhtmltopdf](http://wkhtmltopdf.org/)
- [Python](https://www.python.org/) & [pip](https://pypi.python.org/pypi/pip) | [Anaconda](https://www.continuum.io/)

> 注：
1. 以上工具均为横夸 Windows，Linux 和 Mac OS X 平台，因此在 3 个平台均可搭建环境。
2. Anaconda 安装包含 Python 和 pip，以及一些常用的包，一劳永逸

## 安装

下载 [pandoc](http://pandoc.org/installing.html)，[wkhtmltopdf](http://wkhtmltopdf.org/downloads.html) 和 [Anaconda](https://www.continuum.io/downloads)
安装完后确保将其可执行文件添加到系统环境变量

```
C:\Users\linjinhui\Desktop\pandoc                                                 
λ pandoc --version                                                                
pandoc 1.16.0.2                                                                   
Compiled with texmath 0.8.4.1, highlighting-kate 0.6.1.                           
Syntax highlighting is supported for the following languages:                     
    abc, actionscript, ada, agda, apache, asn1, asp, awk, bash, bibtex, boo, c,   
    changelog, clojure, cmake, coffee, coldfusion, commonlisp, cpp, cs, css,      
    curry, d, diff, djangotemplate, dockerfile, dot, doxygen, doxygenlua, dtd,    
    eiffel, email, erlang, fasm, fortran, fsharp, gcc, glsl, gnuassembler, go,    
    haskell, haxe, html, idris, ini, isocpp, java, javadoc, javascript, json,     
    jsp, julia, kotlin, latex, lex, lilypond, literatecurry, literatehaskell,     
    llvm, lua, m4, makefile, mandoc, markdown, mathematica, matlab, maxima,       
    mediawiki, metafont, mips, modelines, modula2, modula3, monobasic, nasm,      
    noweb, objectivec, objectivecpp, ocaml, octave, opencl, pascal, perl, php,    
    pike, postscript, prolog, pure, python, r, relaxng, relaxngcompact, rest,     
    rhtml, roff, ruby, rust, scala, scheme, sci, sed, sgml, sql, sqlmysql,        
    sqlpostgresql, tcl, tcsh, texinfo, verilog, vhdl, xml, xorg, xslt, xul,       
    yacc, yaml, zsh                                                               
Default user data directory: C:\Users\linjinhui\AppData\Roaming\pandoc            
Copyright (C) 2006-2015 John MacFarlane                                           
Web:  http://pandoc.org                                                           
This is free software; see the source for copying conditions.                     
There is no warranty, not even for merchantability or fitness                     
for a particular purpose.                                                         
                                                                                  
C:\Users\linjinhui\Desktop\pandoc                                                 
λ python --version                                                                
Python 2.7.8 :: Anaconda 2.1.0 (64-bit)                                           
                                                                                  
C:\Users\linjinhui\Desktop\pandoc                                                 
λ pip --version                                                                   
pip 1.5.6 from C:\Anaconda\lib\site-packages (python 2.7)                         
                                                                                  
C:\Users\linjinhui\Desktop\pandoc                                                 
λ wkhtmltopdf --version                                                           
wkhtmltopdf 0.12.3.1 (with patched qt)                                            
                                                                                  
C:\Users\linjinhui\Desktop\pandoc                                                 
λ                                                                                 
                                                                                  
```

## 使用

1. 写 Markdown 文档，以 [setup_linux_driver_enviroment.md](https://github.com/mintisan/mintisan.github.io/blob/master/notes/setup_linux_driver_enviroment.md) 文档为例
2. 将 Markdown 文档装换成 Word：pandoc后面接着的第1个参数为输入源文件，`- o`紧接着目标输出文件，`-c` 紧接着为 `css` 样式文件
```
pandoc setup_linux_driver_enviroment.md -o setup_linux_driver_enviroment.docx -c markdown.css
```
3. 将 Markdown 转成 HTML：
```
pandoc setup_linux_driver_enviroment.md -o setup_linux_driver_enviroment.html -c markdown.css
```
4. 将 HTML 转成 PDF：
```
 wkhtmltopdf setup_linux_driver_enviroment.html setup_linux_driver_enviroment.pdf
```
5. 将 HTML 转成 PNG：
```
 wkhtmltopdf setup_linux_driver_enviroment.html setup_linux_driver_enviroment.png
```

## 美化
1. 参考 参考链接，加入不同的 CSS 样式
2. 修改 CSS 样式，在 `<head>`标签下加入简单的移动端自适应
```
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="HandheldFriendly" content="true">
```

 
## 参考链接

- [Markdown写作进阶：Pandoc入门浅谈](http://www.yangzhiping.com/tech/pandoc.html)
- [Getting started with pandoc](http://pandoc.org/getting-started.html) 
- [Markdown CSS](https://github.com/simonlc/Markdown-CSS)
- [Markdown css theme collection](https://github.com/jasonm23/markdown-css-themes)
- [Pandoc Configuration and Support Files](https://github.com/kjhealy/pandoc-templates)
