# underscore-tpl-ninja v0.1.0 2014-03-06
增强 [underscore template][1] 的容错性, 让模版有错误时忍一忍(ninja), 不要随便抛出异常终止了程序的主逻辑.

## _.template 有什么问题?
默认的 _.template 不允许模版有任何错误, 不管是语法错误或模版执行(渲染)时报错, 而且一旦报错就会中断程序后续语句的执行. 模版应该是渲染层面的事情, 即使有问题, 也不应该影响程序的主要(流程)逻辑.

例如这个情况
```javascript
_.template('<% if %>');
// 由于不容错, 编译模版时抛出了异常, 导致程序中断后续语句无法执行
console.log('my heart will go on?');
```

再看这个情况, 就更郁闷了...
```javascript
_.template('<%= foo %>', {});
// 由于不容错, 执行模版时缺失了必要的属性而抛出了异常, 导致程序中断后续语句无法执行
console.log('my heart will go on?');
```

相比起其他模版引擎([artTemplate][2], [juicer][3], [handlebars.js][4]), _.template 在容错性方面那是相当脆弱啊, 难道你是要我每次使用 _.template 时都 try/catch 一把?


## 如何让 _.template 有容乃大
覆盖了 _.template, 在预编译模版和执行错误模版时 try/catch 了异常, 这样就不会中断后续语句的执行了.

由于是覆盖的 _.template, 因此使用方式和原来的保持一致, 用起来没有任何副作用.

除此之外, 还有稍许好处
* 模版出错后仍会得到默认的错误提示信息(可自定义)
* 对于支持 console 的浏览器, 会在控制台输出错误信息
* 对于不支持 console 的浏览器, 默认还是会抛出异常, 中断程序, 因为不能直接选择静默异常而不给任何通知(可配置允许静默异常)
* 如果你愿意, 还是可以使用原本的 _.template


## 使用方法
1. 下载 [underscore.js][5]
2. 下载 [underscore-tpl-ninja.js][6]
3. HTML示例
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>underscore-tpl-ninja</title>
</head>
<body>
    <div id="tpl-ninja"></div>
    <script src="http://underscorejs.org/underscore-min.js"></script>
    <script src="../src/underscore-tpl-ninja.js"></script>
    <script>
    document.getElementById('tpl-ninja').innerHTML = _.template('<p><%= foo1 %></p>', {foo: 'underscore-tpl-ninja'});
    </script>
</body>
</html>
```


## API
```javascript
// 增强后的 _.template, 调用方式和原来一样
_.template('<p><%= foo %></p>', {foo: 'underscore-tpl-ninja'});

// 设置模版出错后给予的提示信息
_.template.setTemplateErrorTip('error tip');

// 设置是否开启静默异常(默认为 false)
_.template.setSilenceError(true);

// 使用原来的 _.template 实现
var _template = _.template.originalTemplate;
var tpl = _template.call(_, '<%= foo %>', {foo: 'underscore-tpl-ninja'});
console.log(tpl);
```


## changelog
[CHANGELOG][7]


## License
MIT


[1]: http://underscorejs.org/#template
[2]: http://aui.github.io/artTemplate/
[3]: http://juicer.name/
[4]: http://handlebarsjs.com/
[5]: http://underscorejs.org/underscore-min.js
[6]: https://raw.github.com/ufologist/underscore-tpl-ninja/master/src/underscore-tpl-ninja.js
[7]: https://github.com/ufologist/underscore-tpl-ninja/blob/master/CHANGELOG.md