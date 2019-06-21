function renderMainTable(searchCriteria) {
     let searchResults = [];
     if (Object.size(searchCriteria) == 0) searchResults = films;
     else {
          for (var i = 0; i < films.length; i++) {
               if (filter(searchCriteria, films[i])) searchResults.push(films[i]);
          }
     }
     if (Object.size(searchResults) == 0) {
          AlertUtils.callDangerAlert('No Results found!');
     } else {
          searchResults = pushOptionCell(searchResults);
          activateTable(searchResults);
     }
     document.getElementById('footer').style.display = 'block';
     document.getElementById('count').innerHTML = 'Ergebnismenge: ' + searchResults.length;
     document.getElementById('confirmExport').addEventListener('click', function () {
          excelExport(searchResults);
          $('#exportModal').modal('hide');
     });
}

function renderMainTableForRandom(film) {
     var obj = [];
     obj.push(film);
     activateTable(obj);
}


//TODO: Option Cell
function pushOptionCell(films) {
     for (let index = 0; index < films.length; index++) {
          const element = films[index];
     }
     return films;
}

function activateTable(data) {
     $('#mainTable').DataTable({
          searching: false,
          "order": [
               [3, "asc"],
               [4, "asc"]
          ],
          "destroy": true,
          "lengthChange": false,
          data: data,
          columns: [{
                    "title": "Title",
                    "width": "30%",
                    data: 'TITLE'
               },
               {
                    "title": "Director(s)",
                    "width": "20%",
                    data: 'DIRECTORS'
               },
               {
                    "title": "Duration",
                    "width": "15%",
                    data: 'DURATION'
               },
               {
                    "title": "Franchise",
                    "width": "10%",
                    data: 'FRANCHISE'
               },
               {
                    "title": "Year",
                    "width": "5%",
                    data: 'YEAR'
               },
               {
                    "title": "Studio",
                    "width": "5%",
                    data: 'STUDIO'
               },
               {
                    "title": "UHD",
                    data: 'UHD',
                    "width": "5%",
                    "render": function (data) {
                         return (data == true) ? "&#10003;" : "&#x2715;";
                    }
               },
               {
                    "title": "Options",
                    "width": "10%",
                    "render": function (data, type, row, meta) {
                         var test = "<button id=" + row.DISCID + " class=\"btn btn-edit btn-small \">Edit</button>";
                         return test;
                    }
               }
          ]
     });
}