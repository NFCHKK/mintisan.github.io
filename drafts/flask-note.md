# Flask学习笔记(实验楼)


## 安装Flask

安装python和pip
```
brew install python
```

安装flask
```
sudo pip install flask flask-login flask-openid flask-mail sqlalchemy flask-sqlalchemy sqlalchemy-migrate flask-whooshalchemy flask-wtf pytz flask-babel flup
```

新建工程目录
```
$ mkdir -p micblog/app
$ mkdir -p micblog/app/static
$ mkdir -p micblog/app/templates
```

## 编辑文件
/app/__init__.py
```
# 在__init__.py中写入一下代码
from flask import Flask
app = Flask(__name__)
from app import views
```

/app/views.py
```
from app import app
@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"
```

/run.py
```
from app import app
app.run(debug = True, port=9999)
```

## 最终目录结构
```
microblog\
      app\
        static\
        templates\
        __init__.py
        views.py
      run.py
```

## Q & A

```
Traceback (most recent call last):
  File "run.py", line 1, in <module>
    from app import app
  File "/Users/linjinhui/Python/micblog/app/__init__.py", line 1
SyntaxError: Non-ASCII character '\xe5' in file /Users/linjinhui/Python/micblog/app/__init__.py on line 1, but no encoding declared; see http://python.org/dev/peps/pep-0263/ for details
```
此时，我们需要在`__init__.py`文件的第一行加入
```
# coding: utf-8
```

-----------






