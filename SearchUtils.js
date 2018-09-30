function calculateSearchCriteria() {
    let inputs = document.getElementById('inputs');
    document.getElementById('mainTable').innerHTML = "";
    let searchCriteria = {};
    for (var input in inputs) {
        if (inputs.hasOwnProperty(input)) {
            if (inputs[input].type != "button") {
                if (inputs[input].id == "uhd") searchCriteria[inputs[input].id] = inputs[input].checked;
                else if (inputs[input].id == "franchise" && inputs[input].value == "Franchise");
                else if (inputs[input].value != "") {
                    if (inputs[input].id == "duration") {
                        let conVal = document.getElementById("durationButton").value;
                        searchCriteria[inputs[input].id] = {
                            value: inputs[input].value,
                            condition: conVal
                        }
                    } else if (inputs[input].id == "year") {
                        let conVal = document.getElementById("yearButton").value;
                        searchCriteria[inputs[input].id] = {
                            value: inputs[input].value,
                            condition: conVal
                        }
                    } else {
                        searchCriteria[inputs[input].id] = inputs[input].value;
                    }
                }
            }
        }
    }
    return searchCriteria;
}

function filter(searchCriteria, film) {
    let pass = true;
    for (var criteria in searchCriteria) {
        if (searchCriteria.hasOwnProperty(criteria)) {
            if (criteria == "duration" || criteria == "year") {
                const condition = searchCriteria[criteria].condition;
                if (condition == "=") {
                    if (film[criteria.toUpperCase()] != searchCriteria[criteria].value) pass = false;
                } else if (condition == "<") {
                    if (film[criteria.toUpperCase()] > searchCriteria[criteria].value) pass = false;
                } else if (condition == ">") {
                    if (film[criteria.toUpperCase()] < searchCriteria[criteria].value) pass = false;
                }
            } else if (criteria == "varient") {
                if (searchCriteria[criteria] == "standart") {
                    if (film["UHD"] == "YES") pass = false;
                }
                if (searchCriteria[criteria] == "uhd") {
                    if (film["UHD"] == "NO") pass = false;
                }
            } else {
                if (film[criteria.toUpperCase()].includes(searchCriteria[criteria]) == false) {
                    pass = false;
                }
            }
        }
    }
    return pass;
}