function renderMainTableRow(result) {
  let row = document.createElement('tr');
  row.id = "row" + result.DISCID;
  let title = document.createElement('td');
  title.innerHTML = result.TITLE;
  title.id = "title";
  row.appendChild(title);
  let director = document.createElement('td');
  director.innerHTML = result.DIRECTORS;
  director.id = "directors";
  row.appendChild(director);
  let duration = document.createElement('td');
  duration.innerHTML = result.DURATION;
  duration.id = "duration";
  row.appendChild(duration);
  let studio = document.createElement('td');
  studio.innerHTML = result.STUDIO;
  studio.id = "studio";
  row.appendChild(studio);
  let uhd = document.createElement('td');
  if (result.UHD == 'YES') uhd.innerHTML = '&#x2713;';
  else uhd.innerHTML = "X";
  uhd.id = "uhd";
  row.appendChild(uhd);
  let franchise = document.createElement('td');
  franchise.innerHTML = result.FRANCHISE;
  franchise.id = "franchise";
  row.appendChild(franchise);
  let year = document.createElement('td');
  year.innerHTML = result.YEAR
  year.id = "year";
  row.appendChild(year);
  let optionCell = document.createElement('td');
  let optionButton = document.createElement('button');
  optionButton.id = result.DISCID;
  optionButton.innerHTML = 'Edit';
  optionButton.addEventListener("click", function (e) {
    renderEditRow(e.srcElement.id);
  })
  optionButton.className = "btn btn-danger btn-sm";
  optionCell.id = "optionCell" + result.DISCID;
  optionCell.appendChild(optionButton);
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

function renderMainTableForRandom(film) {
  let table = document.getElementById('mainTable');
  table.class = "table table-striped";
  table.innerHTML = "";
  table.appendChild(renderMainTableHeadRow());
  table.appendChild(renderMainTableRow(film));
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
    callDangerAlert("No Results found!");
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