const buy = require("./buy");
const checkTransaction = require("./checkTransaction");
const randomString = require('../../config/randomString')
const sandboxApi = "https://sandbox.vtpass.com/api";
const liveApi = "https://vtpass.com/api";

class AirtimeClass {
    constructor(environment, env, username, password){
        this.environment = environment;
        this.env = env;
        this.username = username;
        this.password = password
    }

    // validate auth
    validateAuth=async function(){
        try{
            if(!this.username) throw Error("username is empty");
            if(!this.password) throw Error("password is empty");
        }
        catch(err){
            throw err
        }
    }
    
    isProd = function(){
        return this.environment =="prod" || this.environment == "production" || this.env =="prod" || this.env == "production"
    }

    // get url api
    url = async function(){
        try{
            return this.isProd()? `${liveApi}` : `${sandboxApi}`;
        }
        catch(err){
            throw err
        }
    }

    // buy airtime
    buy= async function({request_id=randomString(), serviceID, phone, amount}){
        try{

            await this.validateAuth();
            // validate serviceID
            if(!serviceID) throw Error("serviceID is missing");
            
            // validate phone number
            let phone_ = "";
            if(this.isProd()){
                if(!phone) throw Error("phone number is missing")
                phone_ = phone
            }else{
                phone_ = phone ? phone : "08011111111"
            }

            // validate amount
            let amount_ = "";
            if(this.isProd()){
                if(!amount) throw Error("amount is missing")
                amount_ = amount
            }else{
                amount_ = amount ? amount : 50
            }

            const url = `${await this.url()}/pay`;

            // handle buy airtime
            return buy(request_id, serviceID, phone_, amount_, url, this.username, this.password)
        }
        catch(err){
            throw err
        }
    }

    //check transactions
    checkTransaction= async function({request_id}){
        try{
            await this.validateAuth()

            // validate
            if(!request_id) throw Error("request_id is missing")

            const url = `${await this.url()}/requery`;
            
            // handle buy airtime
            return checkTransaction(request_id, url, this.username, this.password)
        }
        catch(err){
            throw err
        }
    }
}




module.exports= AirtimeClass