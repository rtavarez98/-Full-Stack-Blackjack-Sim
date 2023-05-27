const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');

let instance = null;
require('dotenv').config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

class DbService{

    /**
    * @returns an instance of the database if it exists else returns a new instance
    */
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    /**
    * Creates a new account in the database with zero wins, losses, and ties
    *
    * @param username - username associated with the new account
    * @param password - password associated with the new account
    */
    async createNewAcc(username, password){
        try{
            await client.connect();
            await client.db("fullstackBlackjack").collection("accounts").insertOne( {
                username : username,
                password : password,
                wins : 0,
                losses : 0,
                ties : 0
            });
            await client.close();
        } catch(err) {
            console.log(err);
        }
    }

    /**
    * Searches for a single account with the correct username and password
    *
    * @param username - username that is searched for
    * @param password - password that is searched for
    * @return result - the account that has the correct username and password
    */
    async searchAcc(username, password){
        try{
           await client.connect();
           const result = await client.db("fullstackBlackjack").collection("accounts").findOne({ username : username, password : password});
           await client.close();
           return result;
        } catch(err){
            console.log(err);
        }
    }

    /**
    * Changes the password to an account with the associated id
    *
    * @param id - identification that is used to search the correct account
    * @param newPassword - new password that is set for the account
    */
    async chgPassword(id, newPassword) {
        try{
            await client.connect();
            await client.db("fullstackBlackjack").collection("accounts").updateOne(
                {_id : new ObjectId(id)},
                {$set:{password : newPassword}}
            );
            await client.close();
        }catch(err){
            console.log(err);
        }
    }

    /**
    * Increments the "wins" value in an account by one
    *
    * @param id - identification that is used to search the correct account
    */
    async updateWins(id) {
        try{
            await client.connect();
            await client.db("fullstackBlackjack").collection("accounts").updateOne(
                {_id : new ObjectId(id)},
                {$inc:{wins : 1}}
            );
            await client.close();
        }catch(err){
            console.log(err);
        }
    }

    /**
    * Increments the "losses" value in an account by one
    *
    * @param id - identification that is used to search the correct account
    */
    async updateLosses(id) {
        try{
            await client.connect();
            await client.db("fullstackBlackjack").collection("accounts").updateOne(
                {_id : new ObjectId(id)},
                {$inc:{losses : 1}}
            );
            await client.close();
        }catch(err){
            console.log(err);
        }
    }

    /**
    * Increments the "ties" value in an account by one
    *
    * @param id - identification that is used to search the correct account
    */
    async updateTies(id) {
        try{
            await client.connect();
            await client.db("fullstackBlackjack").collection("accounts").updateOne(
                {_id : new ObjectId(id)},
                {$inc:{ties : 1}}
            );
            await client.close();
        }catch(err){
            console.log(err);
        }
    }

    /**
    * Retrieves the wins, losses, and ties associated with an account
    *
    * @param id - identification that is used to search the correct account
    * @return result - wins, losses, and ties of the searched account
    */
    async getWinsLossesTies(id) {
        try{
            await client.connect();
            const result = await client.db("fullstackBlackjack").collection("accounts").findOne(
                { _id : id },
                { projection: {_id: 0 , username : 0, password : 0} }
            );
            await client.close();
            return result;
        }catch(err){
            console.log(err);
        }
    }

    /**
    * Deletes an account with the associated id
    *
    * @param id - identification that is used to search the correct account
    */
    async deleteAcc(id){
        try{
            await client.connect();
            await client.db("fullstackBlackjack").collection("accounts").deleteOne( {_id : new ObjectId(id)} );
            await client.close();
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = DbService;

