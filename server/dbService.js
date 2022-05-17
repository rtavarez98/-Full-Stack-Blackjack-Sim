const mysql = require('mysql');
let instance = null;

const con = mysql.createConnection ({
      host: "localhost",
      user: "root",
      password: "",
      database: "blackjackdb"
});

con.connect(function(err) {
    con.query("CREATE TABLE IF NOT EXISTS `accounts` (`id` int(11) NOT NULL AUTO_INCREMENT, `username` varchar(100) NOT NULL, `password` varchar(100) NOT NULL, `wins` int(255) NOT NULL, `losses` int(255) NOT NULL, `ties` int(255) NOT NULL, PRIMARY KEY (`id`) ) ENGINE = InnoDB;")
    //reformat
    if (err) throw err;
    console.log("db " + con.state);
});

class DbService{
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async createNewAcc(username, password, wins, losses, ties){
        try{
            const insertId = await new Promise( function(resolve, reject) {
                const query = "INSERT INTO accounts (username, password, wins, losses, ties) VALUE (?, ?, ?, ?, ?)";

                con.query(query, [username, password, wins, losses, ties], (err, result) => {
                    if (err) reject(new Error(err.message) );
                    resolve(result.insertId);
                });
            });
            return {
                id : insertId,
                username : username,
                password : password,
                wins : wins,
                losses : losses,
                ties : ties
            };
        } catch(err) {
            console.log(err);
        }
    }

    async searchAcc(username, password){
        try{
            const response = await new Promise( function(resolve, reject) {
                const query = "SELECT * FROM accounts WHERE username = ? AND password = ?"
                con.query(query, [username, password], (err, result) => {
                    if (err) reject(new Error(err.message) );
                    if (result.length <= 0) { // account not found
                        console.log("account not found"); // remove maybe
                        return {};
                    }
                    resolve(result);
                });
            });
            return response;
        } catch(err){
            console.log(err);
        }
    }

    async chgPassword(username, oldPassword, newPassword) {
        try{
            const response = await new Promise( function(resolve, reject) {
                const query = "UPDATE accounts SET password = ? WHERE username = ? AND password = ?"
                con.query(query, [newPassword, username, oldPassword], (err, result) => {
                    if (err) reject(new Error(err.message) );
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        }catch(err){
            console.log(err);
        }
    }

    async updateWins(username, password) {
        try{
            const response = await new Promise ( function(resolve, reject) {
                const query = "UPDATE accounts SET wins = wins + 1 WHERE username = ? AND password = ?"
                con.query(query, [username, password], (err, result) => {
                    if (err) reject(new Error(err.message) );
                    resolve(result.affectedRows);
                });
            });
        }catch(err){
            console.log(err);
        }
    }

    async updateLosses(username, password) {
        try{
            const response = await new Promise ( function(resolve, reject) {
                const query = "UPDATE accounts SET losses = losses + 1 WHERE username = ? AND password = ?"
                con.query(query, [username, password], (err, result) => {
                    if (err) reject(new Error(err.message) );
                    resolve(result.affectedRows);
                });
            });
        }catch(err){
            console.log(err);
        }
    }

    async updateTies(username, password) {
        try{
            const response = await new Promise ( function(resolve, reject) {
                const query = "UPDATE accounts SET ties = ties + 1 WHERE username = ? AND password = ?"
                con.query(query, [username, password], (err, result) => {
                    if (err) reject(new Error(err.message) );
                    resolve(result.affectedRows);
                });
            });
        }catch(err){
            console.log(err);
        }
    }

    async getWinsLossesTies(username, password) {
        try{
            const response = await new Promise ( function(resolve, reject) {
                const query = "SELECT wins, losses, ties FROM accounts WHERE username = ? AND password = ?"
                con.query(query, [username, password], (err, result) => {
                    if (err) reject(new Error(err.message) );
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        }catch(err){
            console.log(err);
        }
    }

    async deleteAcc(username, password){
        try{
            const response = await new Promise( function(resolve, reject) {
                const query = "DELETE FROM accounts WHERE username = ? AND password = ?"
                con.query(query, [username, password], (err, result) => {
                    if (err) reject(new Error(err.message) );
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = DbService;

