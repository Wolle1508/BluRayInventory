function renderEditRow(discid) {
     let entryToEdit;
     for (var i = 0; i < films.length; i++) {
          if (films[i].DISCID == discid) {
               entryToEdit = films[i];
          }
     }
     let row = document.getElementById('row' + discid).childNodes;
     for (var td in row) {
          if (row.hasOwnProperty(td)) {
               if (row[td].id != 'optionCell' + discid) {
                    let content = row[td].innerHTML;
                    row[td].innerHTML = '';
                    if (row[td].id == 'uhd') {
                         if (content != 'X') {
                              row[td].innerHTML =
                                   '<div class="form-check" style="margin-right: 15px; margin-top : 10px;"><label><input type="checkbox" name="check" checked id="uhd"><span class="label-text"></span></label></div>';
                         } else {
                              row[td].innerHTML =
                                   '<div class="form-check" style="margin-right: 15px; margin-top : 10px;"><label><input type="checkbox" name="check" id="uhd"><span class="label-text"></span></label></div>';
                         }
                    } else {
                         let textfield = document.createElement('input');
                         textfield.type = "text";
                         textfield.className = 'form-control';
                         textfield.value = content;
                         row[td].appendChild(textfield);
                    }
               } else {
                    row[td].childNodes[0].style.display = 'none';

                    let confirmButton = document.createElement('button');
                    confirmButton.type = 'button';
                    confirmButton.innerHTML = 'confirm';
                    confirmButton.id = 'confirm' + discid;
                    confirmButton.className = 'btn btn-success btn-sm';
                    confirmButton.style.marginTop = '18px';
                    confirmButton.addEventListener('click', function () {
                         updateFilm(discid);
                    });
                    row[td].appendChild(confirmButton);

                    let cancelButton = document.createElement('button');
                    cancelButton.type = 'button';
                    cancelButton.innerHTML = 'cancel';
                    cancelButton.id = discid;
                    cancelButton.className = 'btn btn-default btn-sm';
                    cancelButton.style.marginTop = '18px';
                    cancelButton.style.marginLeft = '5px';
                    cancelButton.addEventListener('click', function () {
                         cancelRowEdit(row, entryToEdit);
                    });
                    row[td].appendChild(cancelButton);
               }
          }
     }
}

function cancelRowEdit(row, entry) {
     for (let i = 0; i < row.length; i++) {
          if (!row[i].id.includes('option')) {
               if (row[i].id != 'uhd') {
                    let content = row[i].id.toUpperCase();
                    row[i].innerHTML = '';
                    row[i].innerHTML = entry[content];
               } else {
                    if (entry.UHD == 0) {
                         row[i].innerHTML = '';
                         row[i].innerHTML = 'X';
                    } else {
                         row[i].innerHTML = '';
                         row[i].innerHTML = '&#x2713;';
                    }
               }
          } else {
               row[i].childNodes[0].style.display = 'inline';

               row[i].removeChild(row[i].childNodes[1]);
               row[i].removeChild(row[i].childNodes[1]);
          }
     }
}

function updateFilm(discid) {
     let row = document.getElementById("row" + discid);
     editedEntry = {};
     for (var i = 0; i < row.childNodes.length - 1; i++) {
          var input = row.childNodes[i].childNodes[0];
          switch (i) {
               case 0:
                    editedEntry.TITLE = input.value;
                    break;
               case 1:
                    editedEntry.DIRECTORS = input.value;
                    break;
               case 2:
                    editedEntry.DURATION = input.value;
                    break;
               case 3:
                    editedEntry.STUDIO = input.value;
                    break;
               case 4:
                    if (input.childNodes[0].childNodes[0].checked) {
                         editedEntry.UHD = "1";
                    } else {
                         editedEntry.UHD = "0";
                    }
                    break;
               case 5:
                    editedEntry.FRANCHISE = input.value;
                    break;
               case 6:
                    editedEntry.YEAR = input.value;
                    break;
               default:
                    break;
          }
     }
     editedEntry.DISCID = discid;

     args = {
          data: editedEntry,
          headers: {
               'Content-Type': 'application/json'
          }
     }
     client.put(config.url + '/films', args, function (data, response) {
          if (response.statusCode == 200) {
               AlertUtils.callSuccessAlert('Edit Succesfull!');
               renderMainTableForRandom(editedEntry);
               getFilms();
          } else {
               AlertUtils.callDangerAlert(response.statusMessage);
          }
     });
}