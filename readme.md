# Projet 7 du parcours Développeur Web Openclassrooms

**Objectif** : créer un réseau social d'entreprise 

## How to run the project 

```
clone https://github.com/TheoKnoep/TheoKnoepflin_7_16122020.git 
```

Run : 

```
npm install
```

### Backend
#### Set up the structure of the database : 
In your MySQL DataBase, import the file the structure of the DB with the file : 

`./backend/groupomania-structure-db.sql` 


#### Configuration of the DataBase in the backend : 
In the file `./backend.config.db-config-EXAMPLE.js` : 

- Fill in your database login details
- Then rename this file as `db-config.js 


#### Starting up the server
Run : 
 
```
cd ./backend/
node server
```

You should get as response : 

> Server is running on port XXX
> Successful connection to the database


### Frontend

Run : 

```
cd ./frontend/
npm run build
```

If you need this project for development purposes, use instead : 

```
npm run serve
```

