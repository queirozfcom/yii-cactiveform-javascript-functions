function getAttributeNameFromName(name){
    
    //example: from "TemplateOptionsForm[moreInformation][3][name]" i want to extract "moreInformation"
    
    var result = name.match(/^[^\[]+\[(\w+)\].+$/);
    if(result === null){
        return null;
    }else{
        return result[1];
    }
}

function triggerAjaxValidation(formObj) {

    var delay = 40;

    setTimeout(function() {

        var settings = formObj.data('settings');
        $.each(settings.attributes, function() {
            this.status = 2; // force ajax validation
        });
        formObj.data('settings', settings);

        $.fn.yiiactiveform.validate(formObj, function(data) {
            $.each(settings.attributes, function() {
                $.fn.yiiactiveform.updateInput(this, data, formObj);
            });
            $.fn.yiiactiveform.updateSummary(formObj, data);
        });

    }, delay);
}

function triggerAjaxValidationForAttribute(formObj, attributeName) {
    var delay = 40;

    setTimeout(function() {

        var settings = formObj.data('settings');
        $.each(settings.attributes, function() {

            if (this.name === attributeName) {
                this.status = 2; // force ajax validation
            }
        });
        formObj.data('settings', settings);

        $.fn.yiiactiveform.validate(formObj, function(data) {
            $.each(settings.attributes, function() {
                if (this.name === attributeName) {
                    $.fn.yiiactiveform.updateInput(this, data, formObj);
                }
            });
            $.fn.yiiactiveform.updateSummary(formObj, data);
        });

    }, delay);
}