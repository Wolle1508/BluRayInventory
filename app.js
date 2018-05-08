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

//TODO: Refactor

//TODO: Test

let films;

let succesAlert;
let dangerAlert;
let succesAlertContent;
let dangerAlertContent;


window.onload = function () {
  succesAlert = document.getElementById("succesAlert");
  dangerAlert = document.getElementById("dangerAlert");
  succesAlertContent = document.getElementById("succesAlertContent");
  dangerAlertContent = document.getElementById("dangerAlertContent");
  renderDropdown();
  document.getElementById('submit').addEventListener("click", function () {
    let inputs = document.getElementById('inputs');
    document.getElementById('mainTable').innerHTML = "";
    let searchCriteria = {};
    for (var input in inputs) {
      if (inputs.hasOwnProperty(input)) {
        if (inputs[input].type != "button") {
          if (inputs[input].id == "uhd") searchCriteria[inputs[input].id] = inputs[input].checked;
          else if (inputs[input].id == "franchise" && inputs[input].value == "All");
          else if (inputs[input].value != "") searchCriteria[inputs[input].id] = inputs[input].value;
        }
      }
    }
    renderMainTable(searchCriteria);
  });
  con.query('SELECT * FROM blueray ORDER BY FRANCHISE, YEAR, TITLE ASC', function (error, results, fields) {
    if (error) throw error;
    films = results;
  });
  document.getElementById("add").addEventListener("click", function () {
    clearInputs(document.getElementById("addInputs"));
  });
  document.getElementById("submitNew").addEventListener("click", function () {
    insertNew();
  });
  document.getElementById("random").addEventListener("click", function () {
    let random = Math.floor((Math.random() * Object.size(films)) + 1);
    renderMainTableForRandom(films[random]);
  });
}

function clearInputs(inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].style.backgroundColor = "";
  }
}

function renderMainTable(searchCriteria) {
  if (searchCriteria.uhd == false) searchCriteria.uhd = "NO";
  else delete searchCriteria.uhd;
  let searchResults = []; //REVIEW: UHD Only?
  if (Object.size(searchCriteria) == 0) searchResults = films;
  else {
    for (var i = 0; i < films.length; i++) {
      if (filter(searchCriteria, films[i])) searchResults.push(films[i]);
    }
  }
  if (Object.size(searchResults) == 0) {
    dangerAlertContent.innerHTML = "No Results for these search criteria!";
    dangerAlert.style.display = "block";
  } else {
    let table = document.getElementById('mainTable');
    table.class = "table table-striped";
    table.innerHTML = '';
    table.appendChild(renderMainTableHeadRow());
    for (var i = 0; i < searchResults.length; i++) {
      table.appendChild(renderMainTableRow(searchResults[i]));
    }
  }
}

function renderMainTableForRandom(film) {
  let table = document.getElementById('mainTable');
  table.class = "table table-striped";
  table.innerHTML = "";
  table.appendChild(renderMainTableHeadRow());
  table.appendChild(renderMainTableRow(film));
}

function filter(searchCriteria, film) { //TODO: Improve Duration/Year
  let pass = true;
  for (var criteria in searchCriteria) {
    if (searchCriteria.hasOwnProperty(criteria)) {
      if (film[criteria.toUpperCase()].includes(searchCriteria[criteria]) == false) {
        pass = false;
      }
    }
  }
  return pass;
}

function renderMainTableRow(result) {

  let row = document.createElement('tr');
  row.id = result.DISCID;
  let title = document.createElement('td');
  title.innerHTML = result.TITLE;
  title.id = "title" + result.DISCID;
  row.appendChild(title);
  let director = document.createElement('td');
  director.innerHTML = result.DIRECTORS;
  director.id = "director" + result.DISCID;
  row.appendChild(director);
  let duration = document.createElement('td');
  duration.innerHTML = result.DURATION;
  duration.id = "duration" + result.DISCID;
  row.appendChild(duration);
  let studio = document.createElement('td');
  studio.innerHTML = result.STUDIO;
  studio.id = "studio" + result.DISCID;
  row.appendChild(studio);
  let uhd = document.createElement('td');
  if (result.UHD == 'YES') uhd.innerHTML = '&#x2713;';
  else uhd.innerHTML = "X";
  uhd.id = "uhd" + result.DISCID;
  row.appendChild(uhd);
  let franchise = document.createElement('td');
  franchise.innerHTML = result.FRANCHISE;
  franchise.id = "franchise" + result.DISCID;
  row.appendChild(franchise);
  let year = document.createElement('td');
  year.innerHTML = result.YEAR
  year.id = "year" + result.DISCID;
  row.appendChild(year);
  let optionCell = document.createElement('td');
  let optionButton = document.createElement('button');
  optionButton.id = result.DISCID;
  optionButton.innerHTML = 'Edit';
  optionButton.addEventListener("click", function (e) {
    editLine(e.srcElement.id);
  })
  optionButton.className = "btn btn-danger btn-sm";
  optionCell.appendChild(optionButton);
  optionCell.id = "optionCell" + result.DISCID;
  row.appendChild(optionCell);
  return row;
}

function renderMainTableHeadRow() {
  let headRow = document.createElement('tr');
  let title = document.createElement('th');
  title.innerHTML = "Title";
  headRow.appendChild(title);
  let director = document.createElement('th');
  director.innerHTML = "Director(s)";
  headRow.appendChild(director);
  let duration = document.createElement('th');
  duration.innerHTML = "Duration";
  headRow.appendChild(duration);
  let studio = document.createElement('th');
  studio.innerHTML = "Studio";
  headRow.appendChild(studio);
  let uhd = document.createElement('th');
  uhd.innerHTML = "UHD";
  headRow.appendChild(uhd);
  let franchise = document.createElement('th');
  franchise.innerHTML = "Franchise";
  headRow.appendChild(franchise);
  let year = document.createElement('th');
  year.innerHTML = "Year";
  headRow.appendChild(year);
  let option = document.createElement('th');
  option.innerHTML = "Options";
  headRow.appendChild(option);
  return headRow;
}

function renderDropdown() {
  con.query('SELECT DISTINCT FRANCHISE from blueray ORDER BY FRANCHISE ASC', function (error, results, fields) {
    if (error) throw error;
    franchises = results;
    let select = document.createElement('select');
    select.className = "form-control";
    select.id = "franchise"
    let emptyOption = document.createElement('option');
    emptyOption.innerHTML = 'All';
    select.appendChild(emptyOption);
    for (var i = 0; i < results.length; i++) {
      let option = document.createElement('option');
      option.value = results[i].FRANCHISE;
      option.innerHTML = results[i].FRANCHISE;
      select.appendChild(option);
    }
    document.getElementById("dropdown").appendChild(select);
  });
}

function editLine(discid) {
  let entryToEdit;
  for (var i = 0; i < films.length; i++) {
    if (films[i].DISCID == discid) entryToEdit = films[i];
  }
  let row = document.getElementById(discid).childNodes;
  for (var td in row) {
    if (row.hasOwnProperty(td)) {
      if (row[td].id != "optionCell" + discid) {
        let content = row[td].innerHTML;
        row[td].innerHTML = "";
        if (row[td].id == "uhd" + discid) {
          let check = document.createElement("input");
          check.type = "checkbox"
          if (content != "X") check.checked = true;

          row[td].appendChild(check);
        } else {
          let textfield = document.createElement("input");
          textfield.className = "form-control";
          textfield.value = content;
          row[td].appendChild(textfield);
        }
      } else {
        row[td].childNodes[0].style.display = "None"; //TODO: handel update
        let confirmButton = document.createElement("button");
        confirmButton.type = "button";
        confirmButton.innerHTML = "confirm";
        confirmButton.id = "confirm" + discid;
        confirmButton.className = "btn btn-primary btn-sm";
        row[td].appendChild(confirmButton);
      }
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
  console.log(inputs.length);
  console.log(count);
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
    console.log(queryString);
    // try {
    //   con.query(queryString, function(error, results, fields) {
    //     if (error) throw error;
    //     succesAlert.style.display = "block";
    //     succesAlertContent.innerHTML = "New Film successfully added!"
    //   })
    // } catch (e) {
    //   dangerAlert.style.display = "block";
    //   dangerAlertContent.innerHTML = e;
    // }
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