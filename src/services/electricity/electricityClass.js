const verifyMeterNumber = require("./verifyMeterNumber");
const checkTransaction = require("./checkTransaction");
const buy = require("./buy");

const randomString = require('../../config/randomString')
const sandboxApi = "https://sandbox.vtpass.com/api";
const liveApi = "https://vtpass.com/api";

class ElectricityClass {
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

    //verify meter numbers (post request). This allows you to verify the meter number before attempting to make payment
    verifyMeterNumber = async function({billersCode, serviceID, type}){
        try{
            await this.validateAuth()
    
            // validate serviceID
            if(!serviceID) throw Error("serviceID is missing")
            
            let billersCode_ = "";
            if(this.isProd()){
                if(!billersCode) throw Error("billersCode is missing")
               billersCode_ = billersCode
            }else{
                if(type == 'postpaid'){
                    billersCode_ = billersCode ? billersCode : "1010101010101"
                }
                else{
                    billersCode_ = billersCode ? billersCode : "1111111111111"
                }
            }

            if(!type) throw Error("meter type is missing")
            
            const url = `${await this.url()}/merchant-verify`;
            
            // handle buy airtime
            return verifyMeterNumber(billersCode_, serviceID, type, url, this.username, this.password)
        }
        catch(err){
            throw err
        }
    }

     // New Product Purchase (post request). This allows you to recharge a DSTV decoder afresh / change the existing bouquet of a DSTV decoder using its smartcard number (billersCode).
     buy = async function({request_id=randomString(), serviceID, number, type, amount, phone }){
        try{

            await this.validateAuth()
    
            // validate serviceID
            if(!serviceID) throw Error("serviceID is missing")

            let billersCode_ = "";
            if(this.isProd()){
                if(!number) throw Error("billersCode (meter number) is missing")
               billersCode_ = number
            }
            if(type == 'postpaid'){
                billersCode_ = number ? number : "1010101010101"
            }
            else{
                billersCode_ = number ? number : "1111111111111"
            }

            if(!type) throw Error("meter type is missing")

            let amount_ = "";
            if(this.isProd()){
                if(!amount) throw Error("amount is missing")
                amount_ = amount
            }else{
                amount_ = amount ? amount : 900
            }
            
            let phone_ = "";
            if(this.isProd()){
                if(!phone) throw Error("phone number is missing")
                phone_ = phone
            }else{
                phone_ = phone ? phone : "08011111111"
            }

            const url = `${await this.url()}/pay`;
            
            // handle buy airtime
            return buy(request_id, serviceID, billersCode_, type, amount_, phone_, url, this.username, this.password)
        }
        catch(err){
            throw err
        }
    }


    // check transactions
    checkTransaction = async function({request_id}){
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

module.exports= ElectricityClass