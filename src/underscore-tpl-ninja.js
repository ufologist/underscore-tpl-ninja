/**
 * 增强 underscore template 的容错性,
 * 让模版有错误时忍一忍(ninja), 不要随便抛出异常终止了程序的主逻辑.
 *
 * 覆盖了 _.template, 在预编译模版和执行错误模版时都不会中断后续语句的执行.
 * 由于是覆盖了 _.template, 因此使用方式和原来保持一致.
 * 
 * @param {Object} _ 依赖 underscore
 *
 * @author https://github.com/ufologist/underscore-tpl-ninja
 * @version 0.1.0 2014-03-06
 * @license MIT
 */
(function(_) {
    var templateErrorTip = '* tpl error *';
    var silenceError = false;

    // 原有的template实现
    var originalTemplate = _.template;

    function onTemplateError() {
        return templateErrorTip;
    }
    // 重写toString, 提供给只接受模版是字符串的方法, 例如innerHTML
    onTemplateError.toString = function() {
        return templateErrorTip;
    };

    /**
     * 设置模版出错后的提示信息
     * 
     * @param {string} tip 模版出错后的提示信息
     */
    function setTemplateErrorTip(tip) {
        templateErrorTip = tip;
    }
    /**
     * 设置是否静默异常(默认为false).
     * 针对没有console的浏览器, 是否屏蔽所有错误信息, 出错后不影响后续语句的执行
     * 
     * @param {boolean} value
     */
    function setSilenceError(value) {
        silenceError = value
    }

    function handleTemplateException(e) {
        if (typeof console !== 'undefined' && console) {
            console.error(e.toString());
            e.source && console.log(e.source);
        } else if (silenceError != true) { // 对于不支持console的浏览器, 是否需要静默异常
            throw e;
        }
    }

    /**
     * 渲染已经编译的模版
     * 
     * @return {string} 组装了数据的模版
     */
    function renderTpl() {
        var rendered = '';
        var args = Array.prototype.slice.call(arguments);
        var tpl = args.shift();

        try {
            rendered = tpl.apply(null, args);
        } catch (e) {
            rendered = templateErrorTip;
            handleTemplateException(e);
        }
        return rendered;
    }

    // 覆盖 _.template
    // debug template <% debugger; %>
    _.template = function() {
        var tpl;
        var originalTpl;

        try {
            originalTpl = originalTemplate.apply(_, arguments);

            // 如果是将模版编译, 返回的是一个JS方法, 包装一层try/catch增强容错
            if (typeof originalTpl === 'function') {
                tpl = function() {
                    var args = Array.prototype.slice.call(arguments);
                    args.unshift(originalTpl);
                    return renderTpl.apply(null, args);
                };
            } else {
                tpl = originalTpl;
            }
        } catch (e) {
            tpl = onTemplateError;
            handleTemplateException(e);
        }

        return tpl;
    };

    // 辅助方法
    _.template.originalTemplate = originalTemplate;
    _.template.setTemplateErrorTip = setTemplateErrorTip;
    _.template.setSilenceError = setSilenceError;
})(_);