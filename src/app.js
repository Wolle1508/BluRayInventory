const sqlite3 = require('sqlite3').verbose();
var $ = require('jquery')(window);
var config = require(process.env.APPDATA + '/bluray/config.json');
const excel = require('node-excel-export');
var fs = require('fs');

//TODO: function to clear main search and main Table
let films;

let db = new sqlite3.Database('./' + config.table + '.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the BluRay database.');
});

function getDBElements() {
	let sql = `SELECT * FROM BLURAY
               ORDER BY FRANCHISE, YEAR, TITLE ASC`;
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		films = rows;
	});
}

window.onload = function() {
	getDBElements();
	renderDropdown();
	renderVarientDropdown();
	document.getElementById('submit').addEventListener('click', function() {
		renderMainTable(calculateSearchCriteria());
		document.getElementById('footer').style.display = 'block';
	});
	document.getElementById('add').addEventListener('click', function() {
		clearInputs(document.getElementById('addInputs'));
	});
	document.getElementById('submitNew').addEventListener('click', function() {
		insertNew();
		clearInputs(document.getElementById('addInputs'));
	});
	document.getElementById('random').addEventListener('click', function() {
		let random = Math.floor(Math.random() * Object.size(films) + 1);
		renderMainTableForRandom(films[random]);
	});
	document.getElementById('durationButton').addEventListener('click', function(e) {
		switchButton(e.srcElement);
	});
	document.getElementById('yearButton').addEventListener('click', function(e) {
		switchButton(e.srcElement);
	});

	document.getElementById('credit').addEventListener('mouseenter', function() {
		document.getElementById('credit').style.textDecoration = 'underline';
		document.getElementById('credit').style.cursor = 'pointer';
	});
	document.getElementById('credit').addEventListener('mouseleave', function() {
		document.getElementById('credit').style.textDecoration = '';
	});
	document.getElementById('exportButton').addEventListener('click', function() {
		document.getElementById('path').value = config.exportPath;
	});

	document.getElementById('settingsButton').addEventListener('click', function() {
		renderConfigModal();
	});

	document.getElementById('saveSettings').addEventListener('click', function() {
		saveSettings();
	});

	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 116) {
			location.reload();
		}
	});
};

function switchButton(src) {
	switch (src.value) {
		case '=':
			src.innerHTML = '<';
			src.value = '<';
			break;
		case '<':
			src.innerHTML = '>';
			src.value = '>';
			break;
		case '>':
			src.innerHTML = '=';
			src.value = '=';
			break;
	}
}

function clearInputs(inputs) {
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].value = '';
		inputs[i].style.backgroundColor = '';
	}
}

Object.size = function(obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
