function insertNew() { //TODO: NEW Entry in Table
    let inputs = document.getElementById('addInputs');
    let count = 0;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            inputs[i].style.backgroundColor = "#f8d7da";
        } else {
            count++;
            inputs[i].style.backgroundColor = "";
        }
    }
    if (count == inputs.length - 1) {
        let queryString = "INSERT INTO BLUERAY (TITLE,DIRECTORS,DURATION,STUDIO,FRANCHISE,YEAR,UHD) VALUES (";
        for (var j = 0; j < inputs.length; j++) {
            if (inputs[j].id == "uhd") {
                if (inputs[j].checked == true) {
                    queryString += "'YES'";
                } else {
                    queryString += "'NO'";
                }
            } else {
                if (j == inputs.length - 1) {
                    queryString += ",'" + inputs[j].value + "'";
                } else {
                    queryString += "'" + inputs[j].value + "',";
                }
            }
        }
        queryString += ");";
        try {
            con.query(queryString, function (error, results, fields) {
                if (error) throw error;
                callSuccessAlert("Film successfully added!")
            });
        } catch (e) {
            callDangerAlert(e);
        }
    }
}