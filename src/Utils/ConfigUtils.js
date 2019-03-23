function renderConfigModal() {
     document.getElementById("host").value = config.host;
     document.getElementById("user").value = config.user;
     document.getElementById("password").value = config.password;
     document.getElementById("database").value = config.database;
     document.getElementById("table").value = config.table;
}

function saveSettings() {
     let _inputs = document.getElementById("settingsForm");
     for (const input in _inputs) {
          if (_inputs.hasOwnProperty(input)) {
               config[_inputs[input].id] = _inputs[input].value;
          }
     }

     fs.writeFile(process.env.APPDATA + "/bluray/config.json", JSON.stringify(config), (err) => {
          if (err) throw err;
          AlertUtils.callSuccessAlert("Settings have been saved!");

     })

}