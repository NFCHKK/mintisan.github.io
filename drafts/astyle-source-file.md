# Astyle 使用小结



## 下载安装

进入[下载页面](http://sourceforge.net/projects/astyle/)，将下载的压缩文件中`bin`目录下的`Astyle.exe`解压到`C:\Windows\System32`目录下，这样就可以全局访问`Astyle`命令了。

添加到系统目录前
```
λ astyle
'astyle' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```

添加到系统目录后
```
λ astyle

Cannot convert to multi-byte string, reverting to English
```

## 命令解析

格式化当前文件
```
AStyle.exe --options="C:\Windows\System32\AStyle-C.opt" %f
```

配置文件
```
#预先定义格式化风格 : kr ansi java gnu linux 
--style=ansi

#设置c/cpp默认语法
--mode=c

#制表符等于2个空格，并且在运算符左右加上空格(-p)
--indent=tab=2 -p

#强制转换TAB为空格
--convert-tabs

#switch case的代码也按照标准缩进方式缩进
--indent-switches

#移除括号内外的多余空格
--unpad=paren -U

#大括号和其匹配的前一个对齐
--brackets=break

#格式化前不要备份
--suffix=none

#宏定义续行符缩进格式化
--indent-preprocessor -w

#while switch if for 后面要空一行
#--break-blocks

```


## 工具调用

### Source Insight
1. `Options->Custom Commands`
2. `Options->Menu Assignments`
3. `Options->Key Assignments`

## MDK
1. `Tools->Customize Tools Menu`
2. `AStyle Current File`
3. `AStyle All Files`

### UltraEdit
1. `高级->工具配置`

## Sublime Text
1. SublimeAStyleFormatter


### Visual Studio
1. `工具->外部工具`
2. `--style=ansi $(ItemFileName)$(ItemExt)`


或者
1. `工具->扩展管理器`
2. `工具->选项`


## 参考资料
- [如何在source insight中使用astyle的代码整理功能？](http://blog.csdn.net/armygeneral/article/details/6346515)
- [Astyle自动整理代码格式，修复支持中文文件名和中文路径名，文件夹名可以有空格字符。。。](http://blog.csdn.net/asn_1/article/details/4245897)
- [Source Insight Use AStyle](http://www.programmershare.com/2724583/)
