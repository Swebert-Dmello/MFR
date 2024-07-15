function callAjax(URL, type, parameter, funcSuccess, funcFailure) {
    var d = new Date();
    if (type.toLowerCase() == "get") {
        $.ajax({
            type: type,
            url: URL + (URL.indexOf("?") > 0 ? '&d=' : '?d=') +
                d.getDate() +
                d.getHours() +
                d.getMinutes() +
                d.getMilliseconds(),
            cache: false,
            data: parameter,
            async:true,
            success: funcSuccess,
            error: funcFailure
        });
    } else {
        $.ajax({
            type: type,
            url: URL,
            async: true,
            cache: false,
            data: parameter,
            success: funcSuccess,
            error: funcFailure
        });

    }
}

