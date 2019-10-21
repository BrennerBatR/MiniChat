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
    window.location.href = "chat.html"
    // let url = sessionStorage.getItem("url");
    // let ra = document.getElementById("username").value;
    // let password = document.getElementById("pass").value;

    // $.ajax({
    //     type: 'POST',
    //     url: url + '/login',
    //     data: {
    //         "ra": ra,
    //         "password": password
    //     },
    //     success: function (data) {

    //         let json = JSON.parse(data);

    //         if (json['user'] === undefined || json['user'] === null) {
    //             let username = document.getElementById("username");
    //             let pass = document.getElementById("pass");
    //             let thisAlert1 = $(username).parent();
    //             let thisAlert2 = $(pass).parent();
    //             $(thisAlert1).addClass('alert-validate');
    //             $(thisAlert2).addClass('alert-validate');
    //             alert(json['msg']);
    //         } else {
    //             sessionStorage.setItem('ra', json["user"]["ra"]);
    //             sessionStorage.setItem('name', json["user"]["name"]);
    //             sessionStorage.setItem('id', json["user"]["id"]);
    //             if (json["user"]["ra"] === "BrennerAdmin" ||json["user"]["ra"] === "rogbrito") {
    //                 window.location.href = "numUser.html";
    //             } else {
    //                 window.location.href = "notas.html";

    //             }
    //         }
    //     },
    //     error: function () {
    //         alert("ERRO ao conectar, se persistir informe o suporte!");
    //     }


    // });

}