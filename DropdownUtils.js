function renderDropdown() {
  con.query('SELECT DISTINCT FRANCHISE from ' + config.table + ' ORDER BY FRANCHISE ASC', function (error, results, fields) {
    if (error) throw error;
    franchises = results;
    let select = document.createElement('select');
    select.className = "form-control";
    select.id = "franchise"
    let emptyOption = document.createElement('option');
    emptyOption.innerHTML = 'Franchise';
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

function renderVarientDropdown() {
  let _select = document.createElement("select");
  _select.className = "form-control";
  _select.id = "varient";
  let defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Standart + UHD";
  defaultOption.value = "both";
  _select.appendChild(defaultOption);

  let standartOption = document.createElement("option");
  standartOption.innerHTML = "Standart";
  standartOption.value = "standart";
  _select.appendChild(standartOption);
  let uhdOption = document.createElement("option");
  uhdOption.innerHTML = "UHD";
  uhdOption.value = "uhd";
  _select.appendChild(uhdOption);

  document.getElementById("varientDropdown").appendChild(_select);
}