# BluRayInventory
A Node.js/Electron Application with a Rest API to manage a Blu-ray Collection.


A little practice project i started to keep my programming game up during a dull semester. Not intended to be taken seriously.
Purely intended to practise my JS Programming and experimenting with Node.js, Electron and now git.

This branch is utilizes a rest-api for communication with a back-end and the database.

I will not put up my db or sql files for privacy reasons.
The database scheme is as follows:

     DISCID INTEGER PRIMARY KEY,
     TITLE VARCHAR(100) NOT NULL,
     DIRECTORS VARCHAR(100) NOT NULL,
     DURATION VARCHAR(50) NOT NULL,
     STUDIO VARCHAR(200) NOT NULL,
     UHD INT NOT NULL,
     FRANCHISE VARCHAR(30) NOT NULL,
     YEAR VARCHAR(5) NOT NULL

This is going to be the main development branch going forward
