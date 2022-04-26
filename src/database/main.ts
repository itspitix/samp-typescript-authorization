import { Database } from './../helpers/database.enum';
import mysql from 'mysql';

export const Connection = mysql.createConnection({
    host: Database.Host,
    user: Database.Username,
    password: Database.Password,
    database: Database.Name
});

Connection.connect(function(err) {
    if(err) {
        console.log(err);
        return;
    }
    console.log('Connected to the database!'); 
});
