const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');

let instance = null;
require('dotenv').config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

class DbService{
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

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

