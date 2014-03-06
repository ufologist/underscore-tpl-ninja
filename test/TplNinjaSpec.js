describe('增强underscore模版的容错性', function() {
    var correctTemplate = '<%= foo %>';
    var wrongTemplate = '<% if %>';

    it('重写 _.template', function() {
        expect(_.template.originalTemplate).toBeDefined();
        expect(_.template.setTemplateErrorTip).toBeDefined();
        expect(_.template.setSilenceError).toBeDefined();
    });

    it('编译错误模版不影响后续语句', function() {
        _.template(wrongTemplate);
        expect(true).toBe(true);
    });

    it('执行错误模版不影响后续语句', function() {
        var tpl = _.template(wrongTemplate);
        tpl();
        expect(true).toBe(true);
    });

    it('执行正确模版出错不影响后续语句', function() {
        var tpl = _.template(correctTemplate);
        tpl();
        expect(true).toBe(true);
    });

    it('直接渲染模版出错不影响后续语句', function() {
        var tpl = _.template(correctTemplate, {});
        expect(true).toBe(true);
    });

    it('模版出错后返回默认的模版错误提示', function() {
        var tpl = _.template(correctTemplate, {});
        expect(tpl()).toBe(tpl.toString());
    });

    it('修改默认的模版错误提示', function() {
        var tip = '- error -';
        _.template.setTemplateErrorTip(tip)
        var tpl = _.template(correctTemplate, {});
        expect(tpl()).toBe(tip);
    });

    it('对于不支持 console 的浏览器抛出异常', function() {
        console = null;

        function noConsoleTemplate() {
            return _.template(wrongTemplate);
        }
        expect(noConsoleTemplate).toThrow();
    });

    it('对于不支持 console 的浏览器选择静默异常', function() {
        console = null;
        _.template.setSilenceError(true);

        function silenceErrorTemplate() {
            return _.template(wrongTemplate);
        }
        expect(silenceErrorTemplate).not.toThrow();
    });

    it('使用原本的 _.template 不容忍任何错误', function() {
        function originalTemplate() {
            return _.template.originalTemplate(wrongTemplate);
        }
        expect(originalTemplate).toThrow();
    });
});