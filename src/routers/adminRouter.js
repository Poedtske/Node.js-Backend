const express=require('express');
const debug=require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter=express.Router();


adminRouter.route('/').get((req, res) => {
    const url =
      'mongodb+srv://AdminEhb:Password@backendproject.6ex1nk5.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'BackendProject';
  
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
  
        const db = client.db(dbName);
  
        const response = await db.collection('sessions').insertMany(sessions);
        res.json(response);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();
  });



















































// const sessionData = {
//     "id": 84473,
//     "title": "Secure Programming for the Enterprise",
//     "description": "Est sunt nostrud officia fugiat sunt reprehenderit cupidatat. Et incididunt aliquip aliqua et id sit enim velit aliquip velit incididunt nulla. Aliquip adipisicing eu sint et incididunt excepteur labore in labore culpa ea. Incididunt aute labore aute duis adipisicing officia consequat. Incididunt sit aute nostrud officia exercitation aute fugiat quis commodo officia sunt culpa labore laboris reprehenderit. Commodo eu non reprehenderit. Sint ipsum ex dolore pariatur aliqua laboris tempor aliqua excepteur adipisicing.\nExcepteur ex et veniam adipisicing eu et. Deserunt non laborum proident. Exercitation sint do irure ut eiusmod incididunt non. Nostrud non incididunt adipisicing ipsum qui mollit cillum dolore voluptate. Occaecat officia incididunt in duis.\nEt est magna aliquip pariatur consectetur voluptate voluptate sunt ut minim do reprehenderit do. Ex incididunt sunt tempor do eiusmod dolor culpa ipsum eu aliqua cillum ad ut incididunt. Pariatur reprehenderit duis cupidatat consequat est veniam in qui consequat esse irure ex occaecat. Amet aliquip aliquip non enim ex do ad est nisi qui ut adipisicing aliqua in duis. Adipisicing Lorem ut do deserunt ipsum nulla labore Lorem ullamco.",
//     "startsAt": "8:00",
//     "endsAt": "5:00",
//     "speakers": [
//       {
//         "id": "2bda8276-b7b6-4653-a7c5-1bcc59d11a49",
//         "name": "Jean Ryan"
//       }
//     ],
//     "room": "Europa",
//     "day": "Wednesday",
//     "format": "FullDay Workshop",
//     "track": ".NET",
//     "level": "Intermediate"
//   };
// const con=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:"backend"

//     (async function mysql(){
//         let mysql;
//         try{
//             client=await con.connect(function(err) {
//                 debug("Connected!");})
//             const db=con.db("backend");
            
//             const response= await db.collection('sessions').insertMany(sessions);
//             response.json(response);
        
//         }catch(error){
//             debug(error.stack);
//         }
//         client.close()
//     })
// })

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     createDatabase();
//     createTableSessions();
//     const sql = `INSERT INTO sessions 
//               (title, description, startsAt, endsAt, room, day, format, track, level) 
//               VALUES 
//               (
//               '${sessionData.title}', 
//               '${sessionData.description}', 
//               '${sessionData.startsAt}', 
//               '${sessionData.endsAt}', 
//               '${sessionData.room}', 
//               '${sessionData.day}', 
//               '${sessionData.format}', 
//               '${sessionData.track}', 
//               '${sessionData.level}')`;
//               con.query(sql, function (err, result) {
//                 if (err) throw err;
//                 console.log("Result: " + result);})
    
// });

// function createTableSessions(){
//     let tableName='sessions'
//     // Check if the table already exists
// const checkTableQuery = `SHOW TABLES LIKE '${tableName}'`;
// con.query(checkTableQuery, function (err, result) {
//     if (err) throw err;

//     if (result.length === 0) {
//         // The table doesn't exist, so create it
//         const createTableQuery = `CREATE TABLE ${tableName} (
//             id INT,
//             title VARCHAR(255),
//             description TEXT,
//             startsAt TIME,
//             endsAt TIME,
//             room VARCHAR(255),
//             day VARCHAR(255),
//             format VARCHAR(255),
//             track VARCHAR(255),
//             level VARCHAR(255),
//             PRIMARY KEY (id)
//         )`;

//         con.query(createTableQuery, function (err, result) {
//             if (err) throw err;
//             console.log(`Table '${tableName}' created`);
//             con.end(); // Close the MySQL connection
//         });
//     } else {
//         // The table already exists
//         console.log(`Table '${tableName}' already exists`);
//         con.end(); // Close the MySQL connection
//     }
// });
// }



// function createDatabase(){
// // Check if the "backend" database already exists
// con.query("SHOW DATABASES LIKE 'backend'", function (err, result) {
//     if (err) throw err;

//     if (result.length === 0) {
//         // The "backend" database does not exist, so create it
//         con.query("CREATE DATABASE backend", function (err, result) {
//             if (err) throw err;
//             console.log("Database created");
//         });
//     } else {
//         // The "backend" database already exists
//         console.log("The 'backend' database already exists");
//     }
// });
// }




   
  module.exports=adminRouter;