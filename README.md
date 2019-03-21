# BluRayInventory
A Node.js/Electron Application with a MySQL 5.7 Community Database to manage a Blu-ray Collection.


A little practice project i started to keep my programming game up during a dull semester. Not intended to be taken seriously.
Purely intended to practise my JS Programming and experimenting with Node.js, Electron and now git. 

This branch will use SQLite as its Database, so if you want to use it, you will be needing the scheme as i will not put up my db or sql files for privacy reasons. 

Table-Scheme:
  CREATE TABLE BLURAY 
  (DISCID INT NOT NULL PRIMARY KEY, 
	TITLE VARCHAR(100) NOT NULL, 
	DIRECTORS VARCHAR(100) NOT NULL, 
	DURATION VARCHAR(50) NOT NULL, 
	STUDIO VARCHAR(200) NOT NULL,
	UHD INT NOT NULL,
	FRANCHISE VARCHAR(30) NOT NULL,
	YEAR VARCHAR(5) NOT NULL
  );
