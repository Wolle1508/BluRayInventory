function renderConfigModal() {
     document.getElementById("url").value = config.url;
     var div = document.getElementById("themeDiv");
     div.innerHTML = "";
     var label = document.createElement("label");
     label.className = "switch";
     var input = document.createElement("input");
     input.type = "checkbox";
     input.id = "themeVal";
     if (config.themeConf == "dark") {
          input.checked = "true";
     }
     input.addEventListener("change", function () {
          var oldlink = document.getElementById("theme");
          var newlink = document.createElement("link");
          newlink.setAttribute("rel", "stylesheet");
          newlink.setAttribute("type", "text/css");
          newlink.setAttribute("id", "theme");
          if (input.checked == false) {
               newlink.setAttribute("href", "css/light.css");
          } else {
               newlink.setAttribute("href", "css/dark.css");
          }
          document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
     });
     label.appendChild(input);
     var span = document.createElement("SPAN");
     span.className = "slider round";
     label.appendChild(span);
     div.appendChild(label);
}

function saveSettings() {
     let _inputs = document.getElementById("settingsForm");
     let _url = document.getElementById("url").value;
     let _theme = document.getElementById("themeVal").checked;
     config.url = _url;
     if (_theme == false) {
          config.themeConf = "light";
     } else {
          config.themeConf = "dark";
     }
     fs.writeFile("config.json", JSON.stringify(config), (err) => {
          if (err) throw err;
          AlertUtils.callSuccessAlert("Settings have been saved!");
     })

}