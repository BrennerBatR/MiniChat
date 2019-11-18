(function($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".criar").on("click", function() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }
    if (check) {
      CreatePassword();
    } else return check;
  });

  $(".validate-form .input100").each(function() {
    $(this).focus(function() {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if (
        $(input)
          .val()
          .trim() == ""
      ) {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);

function CreatePassword() {
  //primeiro login
  // let url = sessionStorage.getItem("url");
  const url = "http://192.168.0.5:3000";
  const username = document.getElementById("username").value;
  const pass = document.getElementById("pass");
  const pass2 = document.getElementById("pass2");

  if (VeifyPasswords(pass, pass2)) {
    const password = pass.value;
    $.ajax({
      type: "POST",
      url: url + "/users",
      data: {
        username,
        password
      },
      success: function(json) {
        console.log(json.msg)
        alert(json["msg"]);
        window.location.href = "index.html";
      },
      error: function(jqXHR, textStatus) {
        alert(jqXHR.status + ": " + jqXHR.responseText);
      }
    });
  } else {
    alert("Senhas não conferem!");
  }
}

/**
 * @return {boolean}
 */
function VeifyPasswords(pass, pass2) {
  if (pass.value !== pass2.value) {
    pass.value = "";
    pass2.value = "";
    pass.focus();
    return false;
  } else {
    return true;
  }
}
