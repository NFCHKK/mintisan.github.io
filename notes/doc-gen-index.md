# 文档生成工具

[TOC]

程序员在写完代码之后需要撰写`程序的API说明文档`和`程序应用编程文档`。以下的一些系统可以直接更具代码生成可维护的赏心悦目的文档，对程序员来说是再好不过了。对于C/C++程序员来说，API文档可以用**Doxygen**；应用编程文档的选择久多了，因为主要是结构的确定，不需要对语言的支持；更详细的书籍的话，**GitBook**是不错的选择。最后，各种格式的转化是少不了**Pandoc**的。

## [Read the Docs][1]

Read the Docs 托管文档， 让文档可以被搜索和更易查找。您可以导入您使用版本控制系统托管的文档，包括 Mercurial, Git, Subversion, 和 Bazaar。我们支持 webhooks 因此可以在您提交代码时自动构建文档。并且同样也支持版本功能，因此您可以构建来自您代码仓库中某个标签或分支的文档。 查看全部的特性列表 。

## [GitBook][2]
The simplest way to turn an idea into a book.

> 目前有很多的开源书籍在上面，传说台湾大选也用上它了

## [MkDocs][3]

MkDocs is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation. Documentation source files are written in Markdown, and configured with a single YAML configuration file.

> Mkdocs是docker文档中心使用的构建工具

## [Doxygen][4]

Generate documentation from source code, like C/C++

> ST, TI, NXP众多的MCU厂商的芯片文档均用此生成

## [Dexy][5]

Dexy is a free-form literate documentation tool for writing any kind of technical document incorporating code. Dexy helps you write correct documents, and to easily maintain them over time as your code changes.

## [Sphinx][6]

Sphinx is a tool that makes it easy to create intelligent and beautiful documentation, written by Georg Brandl and licensed under the BSD license.

> [Python][7]官网的的在线文档就出自于它。目前同样支持C/C++。


## [Media Wiki][8]

MediaWiki is a free software open source wiki package written in PHP, originally for use on Wikipedia. It is now also used by several other projects of the non-profit Wikimedia Foundation and by many other wikis, including this website, the home of MediaWiki.

> Gerrit的Tutorial文档就寄托于此，可以用来构建个人版的Wiki

## [Easybook][9]

« book publishing as easy as it should be »

## [HelpNDoc][10]

Easy to use yet powerful help authoring environment which can generate various documentation formats from a single source.



## [Dr.Explain][11]

Dr.Explain is a help authoring software to create help files, documentation and on-line manuals in CHM, PDF, RTF & HTML formats automatically.


## [Daux.io][12]

Daux.io is an documentation generator that uses a simple folder structure and Markdown files to create custom documentation on the fly. It helps you create great looking documentation in a developer friendly way.

## [Pandoc][13]

a universal document converter

> 有了pandoc，各种版本之间的转换不再是问题

![Pandoc文档转换对应关系][14]

## [YARD][15]

YARD is a documentation generation tool for the Ruby programming language. It enables the user to generate consistent, usable documentation that can be exported to a number of formats very easily, and also supports extending for custom Ruby constructs such as custom class level definitions. Above is a highlight of the some of YARD's notable features.

> for Ruby

## [phpDocumentor][16]

phpDocumentor 2 is a tool that makes it possible to generate documentation directly from your PHP source code. With this you can provide your consumers with more information regarding the functionality embedded within your source and not just what is usable to them from your user interface.

> for PHP just like Doxygen

## [APIGEN][17]

ApiGen is the tool for creating professional API documentation from PHP source code, similar to phpDocumentor.



## [YUI][18]

YUIDoc is a Node.js application that generates API documentation from comments in source, using a syntax similar to tools like Javadoc and Doxygen. 

## [Javadoc Tool][19]

Javadoc is a tool for generating API documentation in HTML format from doc comments in source code. 


  


  [1]: https://readthedocs.org/
  [2]: https://www.gitbook.io/
  [3]: http://www.mkdocs.org/
  [4]: http://www.stack.nl/~dimitri/doxygen/
  [5]: http://dexy.it/
  [6]: http://sphinx-doc.org/
  [7]: http://docs.python.org/
  [8]: http://www.mediawiki.org/wiki/MediaWiki
  [9]: http://easybook-project.org/
  [10]: http://www.helpndoc.com/
  [11]: http://www.drexplain.com/
  [12]: http://daux.io/
  [13]: http://johnmacfarlane.net/pandoc/
  [14]: http://johnmacfarlane.net/pandoc/diagram.png
  [15]: http://yardoc.org/
  [16]: http://www.phpdoc.org/
  [17]: http://apigen.org/
  [18]: http://yui.github.io/yuidoc/
  [19]: http://www.oracle.com/technetwork/java/javase/documentation/index-jsp-135444.html