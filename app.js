var mysql = require('mysql');
var $ = require("jquery")(window);
var config = require(process.env.APPDATA + "/bluray/config.json");


var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

con.connect(function (err) {
  if (err) throw err;
});

//TODO: function to clear main search and main Table
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

  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 116) {
      location.reload();
    }
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
  con.query('SELECT * FROM bluray ORDER BY FRANCHISE, YEAR, TITLE ASC', function (error, results, fields) {
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


Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};