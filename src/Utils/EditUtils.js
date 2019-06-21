function renderEditDialog(row) {
     document.getElementById("editTitle").value = row.TITLE;
     document.getElementById("editDirectors").value = row.DIRECTORS;
     document.getElementById("editDuration").value = row.DURATION;
     document.getElementById("editStudio").value = row.STUDIO;
     document.getElementById("editFranchise").value = row.FRANCHISE;
     document.getElementById("editYear").value = row.YEAR;
     if (row.UHD == 0) {
          document.getElementById("editUhd").checked = false;
     }
     document.getElementById("submitEdit").addEventListener("click", function () {
          updateFilm(row.DISCID);
          $("#editModal").modal("hide");
     });
     $("#editModal").modal("show");
}

function updateFilm(discid) {
     let inputs = document.getElementById("editInputs");
     editedEntry = {};
     for (const input in inputs) {
          if (inputs.hasOwnProperty(input)) {
               const element = inputs[input];
               switch (element.id) {
                    case "editTitle":
                         editedEntry.TITLE = element.value;
                         break;
                    case "editDirectors":
                         editedEntry.DIRECTORS = element.value;
                         break;
                    case "editDuration":
                         editedEntry.DURATION = element.value;
                         break;
                    case "editFranchise":
                         editedEntry.FRANCHISE = element.value;
                         break;
                    case "editYear":
                         editedEntry.YEAR = element.value;
                         break;
                    case "editStudio":
                         editedEntry.STUDIO = element.value;
                         break;
                    case "editUhd":
                         element.checked ? editedEntry.UHD = "1" : editedEntry.UHD = "0";
                         break;
                    default:
                         break;
               }
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