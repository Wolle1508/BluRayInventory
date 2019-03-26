class DropdownUtils {
     static renderDropdown() {
          client.get(config.url + '/franchises', function (data, response) {
               var results = data;
               var select = document.getElementById("franchiseDrop");
               for (var i = 0; i < results.length; i++) {
                    let option = document.createElement('option');
                    option.value = results[i].FRANCHISE;
                    option.innerHTML = results[i].FRANCHISE;
                    select.appendChild(option);
               }
               $('#franchiseDrop').selectpicker();
          });
     }
     static renderVarientDropdown() {
          let _select = document.getElementById("varientDropdown");
          let defaultOption = document.createElement('option');
          defaultOption.innerHTML = 'Standart + UHD';
          defaultOption.value = 'both';
          _select.appendChild(defaultOption);

          let standartOption = document.createElement('option');
          standartOption.innerHTML = 'Standart';
          standartOption.value = 'standart';
          _select.appendChild(standartOption);
          let uhdOption = document.createElement('option');
          uhdOption.innerHTML = 'UHD';
          uhdOption.value = 'uhd';
          _select.appendChild(uhdOption);
          $('#varientDropdown').selectpicker();
     }
}