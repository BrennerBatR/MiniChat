function Session() {
    if (sessionStorage.getItem("url") === undefined || sessionStorage.getItem("url") === null) {
        sessionStorage.setItem('url', window.location.href);
    }
}


(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.enviar').on('click', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (check) {
            SubmitToApi();
        } else
            return check;

    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);

function SubmitToApi() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("pass").value;
    const url = "http://172.16.103.195";

    $.ajax({
        type: 'POST',
        url: url + '/users/login',
        data: {
            "username": username,
            "password": password
        },
        success: function (json) {

            sessionStorage.setItem('username', json["user"]["username"]);
            sessionStorage.setItem('id', json["user"]["_id"]);
            sessionStorage.setItem('messages', JSON.stringify(json["messages"]));
            window.location.href = "chat.html"

        },
        error: function (jqXHR) {
            switch (jqXHR.status) {
                case 403:
                    // let thisAlert2 = $(pass).parent();
                    // $(thisAlert2).addClass('alert-validate');
                    alert("Senha incorreta!");
                    break;
                case 404:
                    // let thisAlert1 = $(username).parent();
                    // $(thisAlert1).addClass('alert-validate');
                    alert("Usuário não encontrado!");
                    break;
                default:
                    alert("ERRO ao conectar, se persistir informe o suporte!");
                    break;
            }
        }


    });

}