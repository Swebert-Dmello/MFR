﻿/*
 * Perform an asynchronous HTTP (Ajax) request.
 */
(function ($, undefined) {

    window.HttpClient = function () {
    }

    HttpClient.prototype = {
        httpPost: function (url, authorization, data, success_callback, fail_callback) {
            return httpPost(url, authorization, data, success_callback, fail_callback);
        },
        httpGet: function (url, authorization, success_callback, fail_callback) {
            return httpGet(url, authorization, success_callback, fail_callback);
        },
    }

    function httpPost(url, authorization, data, success_callback, fail_callback) {
        console.log("request:" + url + data);

        return $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: data,
            dataType: 'json',
            processData: false,
            beforeSend: function (xhr) {
                if (authorization != "") {
                    xhr.setRequestHeader('Authorization', authorization);
                }
                xhr.setRequestHeader('Accept', "application/json");
            },
            complete: function (jqXHR, textStatus) {
                switch (jqXHR.status) {
                    case 201:
                        success_callback(jqXHR, textStatus);
                        break;
                    default:
                        if (fail_callback) {
                            fail_callback(jqXHR, textStatus);
                        }
                        break;
                }
            },
        });
    }

    function httpGet(url, authorization, success_callback, fail_callback) {
        console.log("request:" + url);

        return $.ajax({
            url: url,
            dataType: 'json',
            beforeSend: function (xhr) {
                if (authorization != "") {
                    xhr.setRequestHeader('Authorization', authorization);
                }
                xhr.setRequestHeader('Accept', "application/json");
            },
            success: function (data, textStatus, jqXHR) {
                success_callback(data, textStatus, jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fail_callback) {
                    fail_callback(jqXHR, textStatus);
                }
            },
        });
    }

})(jQuery, undefined);