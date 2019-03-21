function deleteFilm(discid) {
	let entryToDelete;
	let index;
	for (let i = 0; i < films.length; i++) {
		const element = films[i];
		if (films[i].DISCID == discid) {
			entryToDelete = films[i];
			index = i;
		}
	}
	let confirmDelete = document.getElementById('confirmDelete');
}
