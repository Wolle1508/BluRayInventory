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