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
  