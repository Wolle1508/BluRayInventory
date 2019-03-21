function insertNew() {
	let inputs = document.getElementById('addInputs');
	let count = 0;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].value == '') {
			inputs[i].style.backgroundColor = '#f8d7da';
		} else {
			count++;
			inputs[i].style.backgroundColor = '';
		}
	}
	if (count == inputs.length - 1) {
		let newEntry = {};
		let queryString =
			'INSERT INTO ' + config.table + ' (DISCID, TITLE,DIRECTORS,DURATION,STUDIO,FRANCHISE,YEAR,UHD) VALUES (';
		let new_id = Object.size(films) + 1;
		queryString += new_id + ',';
		for (var j = 0; j < inputs.length; j++) {
			if (inputs[j].id == 'uhd') {
				if (inputs[j].checked == true) {
					queryString += "'1'";
					newEntry['UHD'] = 'YES';
				} else {
					queryString += "'0'";
					newEntry['UHD'] = 'NO';
				}
			} else {
				if (j == inputs.length - 1) {
					queryString += ",'" + inputs[j].value + "'";
				} else {
					queryString += "'" + inputs[j].value + "',";
				}
				newEntry[inputs[j].id.toUpperCase()] = inputs[j].value;
			}
		}
		queryString += ');';
		console.log(queryString);
		try {
			db.run(queryString, function(err) {
				if (err) {
					console.log(err.message);
				}
				getDBElements();
				$('#myModal').modal('hide');
				renderMainTableForRandom(newEntry);
				renderDropdown();
				callSuccessAlert('Film Added!');
			});
		} catch (e) {
			callDangerAlert(e);
		}
	}
}
