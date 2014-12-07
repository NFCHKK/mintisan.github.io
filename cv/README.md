本简历生成自 Brian Hann的[ markdown-resume-js](https://github.com/c0bra/markdown-resume-js)。

## 准备环境

1. 安装 [Node.js ](http://nodejs.org/)
2. 安装[wkhtmltopdf](http://wkhtmltopdf.org/)


## 生成简历

```
# For usage on the command line
npm install -g markdown-resume

# Generate HTML file
md2resume my-resume-file.md

# Generate PDF file
md2resume --pdf my-resume-file.md
```
