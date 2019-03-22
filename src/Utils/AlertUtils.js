function callSuccessAlert(message) {
     document.getElementById("successContent").innerHTML = message;
     $('#successAlert').show('fade');
     setTimeout(function () {
          $('#successAlert').hide('fade');
     }, 3000)
     $('#successDismiss').click(function () {
          $('#successAlert').hide('fade');
     });
}

function callDangerAlert(message) {
     document.getElementById("dangerContent").innerHTML = message;
     $('#dangerAlert').show('fade');
     setTimeout(function () {
          $('#dangerAlert').hide('fade');
     }, 3000)
     $('#dangerDismiss').click(function () {
          $('#dangerAlert').hide('fade');
     });
}