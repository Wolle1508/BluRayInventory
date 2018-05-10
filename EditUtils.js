function renderEditRow(discid) {
    let entryToEdit;
    for (var i = 0; i < films.length; i++) {
        if (films[i].DISCID == discid) {
            entryToEdit = films[i];
        }
    }
    let row = document.getElementById("row" + discid).childNodes;
    for (var td in row) {
        if (row.hasOwnProperty(td)) {
            if (row[td].id != "optionCell" + discid) {
                let content = row[td].innerHTML;
                row[td].innerHTML = "";
                if (row[td].id == "uhd") {

                    if (content != "X") {
                        row[td].innerHTML = '<div class="form-check" style="margin-right: 15px; margin-top : 10px;"><label><input type="checkbox" name="check" checked id="uhd"><span class="label-text"></span></label></div>'
                    } else {
                        row[td].innerHTML = '<div class="form-check" style="margin-right: 15px; margin-top : 10px;"><label><input type="checkbox" name="check" id="uhd"><span class="label-text"></span></label></div>'
                    }

                } else {
                    let textfield = document.createElement("input");
                    textfield.className = "form-control";
                    textfield.value = content;
                    row[td].appendChild(textfield);
                }
            } else {
                row[td].childNodes[0].style.display = "none";

                let confirmButton = document.createElement("button");
                confirmButton.type = "button";
                confirmButton.innerHTML = "confirm";
                confirmButton.id = "confirm" + discid;
                confirmButton.className = "btn btn-success btn-sm";
                confirmButton.style.marginTop = "18px";
                confirmButton.addEventListener("click", function () {
                    updateFilm(discid);
                })
                row[td].appendChild(confirmButton);

                let cancelButton = document.createElement("button");
                cancelButton.type = "button";
                cancelButton.innerHTML = "cancel";
                cancelButton.id = discid;
                cancelButton.className = "btn btn-default btn-sm";
                cancelButton.style.marginTop = "18px";
                cancelButton.style.marginLeft = "5px";
                cancelButton.addEventListener("click", function () {
                    cancelRowEdit(row, entryToEdit);
                });
                row[td].appendChild(cancelButton);
            }
        }
    }
}

function cancelRowEdit(row, entry) {
    for (let i = 0; i < row.length; i++) {
        if (!row[i].id.includes("option")) {
            if (row[i].id != "uhd") {
                let content = row[i].id.toUpperCase();
                row[i].innerHTML = "";
                row[i].innerHTML = entry[content];
            } else {
                if (entry.UHD = "NO") {
                    row[i].innerHTML = "";
                    row[i].innerHTML = "X";
                } else {
                    row[i].innerHTML = "";
                    row[i].innerHTML = "&#x2713;"
                }
            }
        } else {
            row[i].childNodes[0].style.display = "inline";

            row[i].removeChild(row[i].childNodes[1]);
            row[i].removeChild(row[i].childNodes[1]);
        }
    }
}

function updateFilm(discid) {
    let entryToEdit;
    let index;
    let row = document.getElementById("row" + discid);
    let updateString = "UPDATE BLUERAY SET ";

    for (var i = 0; i < films.length; i++) {
        if (films[i].DISCID == discid) {
            entryToEdit = films[i];
            index = i;
        }
    }


    for (let i = 0; i < row.childNodes.length; i++) {
        const element = row.childNodes[i];
        if (element.id != "optionCell" + discid) {
            if (element.id != "uhd") {
                if (element.id != "year") {
                    updateString += element.id.toUpperCase() + " = '" + element.childNodes[0].value + "', ";
                    entryToEdit[element.id.toUpperCase()] = element.childNodes[0].value;
                } else {
                    updateString += element.id.toUpperCase() + " = '" + element.childNodes[0].value + "' ";
                    entryToEdit[element.id.toUpperCase()] = element.childNodes[0].value;
                }
            } else {
                let check = element.childNodes[0].childNodes[0].childNodes[0];
                if (check.checked) {
                    updateString += "UHD = 'YES',";
                    entryToEdit["UHD"] = check.checked;
                } else {
                    updateString += "UHD = 'NO',";
                    entryToEdit["UHD"] = check.checked;
                }
            }
        }
    }
    films[index] = entryToEdit;
    updateString += "WHERE DISCID = " + discid;

    try {
        con.query(updateString, function (error, results, fields) {
            if (error) throw error;
            callSuccessAlert("Edit Successfull");
            renderMainTable(calculateSearchCriteria());
        });
    } catch (e) {
        callDangerAlert(e);
    }
}