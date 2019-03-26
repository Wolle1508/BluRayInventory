function renderConfigModal() {
     document.getElementById("url").value = config.url;
     document.getElementById("themeConf").value = config.themeConf;
}

function saveSettings() {
     let _inputs = document.getElementById("settingsForm");
     for (const input in _inputs) {
          if (_inputs.hasOwnProperty(input)) {
               config[_inputs[input].id] = _inputs[input].value;
          }
     }

     fs.writeFile("config.json", JSON.stringify(config), (err) => {
          if (err) throw err;
          AlertUtils.callSuccessAlert("Settings have been saved!");
     })

}