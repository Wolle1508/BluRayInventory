function insertNew() {
     let inputs = document.getElementById('addInputs');

     var newEntry = {};

     for (var i = 0; i < inputs.length; i++) {
          switch (inputs[i].id) {
               case 'title':
                    newEntry.TITLE = inputs[i].value;
                    break;
               case 'directors':
                    newEntry.DIRECTORS = inputs[i].value;
                    break;
               case 'duration':
                    newEntry.DURATION = inputs[i].value;
                    break;
               case 'studio':
                    newEntry.STUDIO = inputs[i].value;
                    break;
               case 'franchise':
                    newEntry.FRANCHISE = inputs[i].value;
                    break;
               case 'year':
                    newEntry.YEAR = inputs[i].value;
                    break;
               case 'uhd':
                    if (inputs[i].checked) {
                         newEntry.UHD = '1';
                    } else {
                         newEntry.UHD = '0';
                    }
                    break;
               default:
                    break;
          }
     }
     var args = {
          data: newEntry,
          headers: {
               'Content-Type': 'application/json'
          }
     };
     client.post('http://resttest.lan/films', args, function (data, response) {
          // parsed response body as js object
          if (response.statusCode == 200) {
               callSuccessAlert('Film added');
               renderMainTableForRandom(newEntry);
               $('#myModal').modal('hide');
          } else {
               callDangerAlert(response.statusMessage);
          }
     });
}