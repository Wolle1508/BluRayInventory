var mysql = require('mysql');
var $ = require("jquery")(window);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "bluray",
});

con.connect(function (err) {
  if (err) throw err;
});


let films;


window.onload = function () {
  renderDropdown();
  document.getElementById('submit').addEventListener("click", function () {
    renderMainTable(calculateSearchCriteria());
  });
  document.getElementById("add").addEventListener("click", function () {
    clearInputs(document.getElementById("addInputs"));
  });
  document.getElementById("submitNew").addEventListener("click", function () {
    insertNew();
    clearInputs(document.getElementById("addInputs"));
  });
  document.getElementById("random").addEventListener("click", function () {
    let random = Math.floor((Math.random() * Object.size(films)) + 1);
    renderMainTableForRandom(films[random]);
  });
  document.getElementById("durationButton").addEventListener("click", function (e) {
    switchButton(e.srcElement);
  });
  document.getElementById("yearButton").addEventListener("click", function (e) {
    switchButton(e.srcElement);
  });

  try {
    getDBElements();
  } catch (e) {
    callDangerAlert(e);
  }
}

function switchButton(src) {
  switch (src.value) {
    case "=":
      src.innerHTML = "<";
      src.value = "<";
      break;
    case "<":
      src.innerHTML = ">";
      src.value = ">";
      break;
    case ">":
      src.innerHTML = "=";
      src.value = "=";
      break;
  }
}

function getDBElements() {
  con.query('SELECT * FROM blueray ORDER BY FRANCHISE, YEAR, TITLE ASC', function (error, results, fields) {
    if (error) throw error;
    films = results;
  });
}

function clearInputs(inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].style.backgroundColor = "";
  }
}





function filter(searchCriteria, film) {
  let pass = true;
  for (var criteria in searchCriteria) {
    if (searchCriteria.hasOwnProperty(criteria)) {
      if (criteria == "duration" || criteria == "year") {
        const condition = searchCriteria[criteria].condition;
        if (condition == "=") {
          if (film[criteria.toUpperCase()] != searchCriteria[criteria].value) pass = false;
        } else if (condition == "<") {
          if (film[criteria.toUpperCase()] > searchCriteria[criteria].value) pass = false;
        } else if (condition == ">") {
          if (film[criteria.toUpperCase()] < searchCriteria[criteria].value) pass = false;
        }
      } else {
        if (film[criteria.toUpperCase()].includes(searchCriteria[criteria]) == false) {
          pass = false;
        }
      }
    }
  }
  return pass;
}

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

function insertNew() {
  let inputs = document.getElementById('addInputs');
  let count = 0;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      inputs[i].style.backgroundColor = "#f8d7da";
    } else {
      count++;
      inputs[i].style.backgroundColor = "";
    }
  }
  if (count == inputs.length - 1) {
    let queryString = "INSERT INTO BLUERAY (TITLE,DIRECTORS,DURATION,STUDIO,FRANCHISE,YEAR,UHD) VALUES (";
    for (var j = 0; j < inputs.length; j++) {
      if (inputs[j].id == "uhd") {
        if (inputs[j].checked == true) {
          queryString += "'YES'";
        } else {
          queryString += "'NO'";
        }
      } else {
        if (j == inputs.length - 1) {
          queryString += ",'" + inputs[j].value + "'";
        } else {
          queryString += "'" + inputs[j].value + "',";
        }
      }
    }
    queryString += ");";
    try {
      con.query(queryString, function (error, results, fields) {
        if (error) throw error;
        callSuccessAlert("Film successfully added!")
      });
    } catch (e) {
      callDangerAlert(e);
    }
  }

}

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function calculateSearchCriteria() {
  let inputs = document.getElementById('inputs');
  document.getElementById('mainTable').innerHTML = "";
  let searchCriteria = {};
  for (var input in inputs) {
    if (inputs.hasOwnProperty(input)) {
      if (inputs[input].type != "button") {
        if (inputs[input].id == "uhd") searchCriteria[inputs[input].id] = inputs[input].checked;
        else if (inputs[input].id == "franchise" && inputs[input].value == "All");
        else if (inputs[input].value != "") {
          if (inputs[input].id == "duration") {
            let conVal = document.getElementById("durationButton").value;
            searchCriteria[inputs[input].id] = {
              value: inputs[input].value,
              condition: conVal
            }
          } else if (inputs[input].id == "year") {
            let conVal = document.getElementById("yearButton").value;
            searchCriteria[inputs[input].id] = {
              value: inputs[input].value,
              condition: conVal
            }
          } else {
            searchCriteria[inputs[input].id] = inputs[input].value;
          }
        }
      }
    }
  }

  return searchCriteria;
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