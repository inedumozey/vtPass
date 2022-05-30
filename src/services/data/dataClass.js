const getVariationCodes = require("./getVariationCodes");
const buy = require("./buy");
const checkTransaction = require("./checkTransaction");
const randomString = require('../../config/randomString')
const sandboxApi = "https://sandbox.vtpass.com/api";
const liveApi = "https://vtpass.com/api";

class dataClass {
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

    // get verification codes (get request). Gets all variation codes for the serviceID
    getVariationCodes = async function({serviceID}){
        try{
            await this.validateAuth()
            
            // validate
            if(!serviceID) throw Error("serviceID is missing")

            const url = `${await this.url()}/service-variations/?serviceID=${serviceID}`;
            
            // handle buy airtime
            return getVariationCodes(url, this.username, this.password)
        }
        catch(err){
            throw err
        }
    }


    // buy airtime
    buy= async function({request_id=randomString(), variation_code, serviceID, phone}){
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

            let variation_code_ = "";
            if(this.isProd()){
                if(!variation_code) throw Error("variation_code is missing")
                variation_code_ = variation_code
            }else{
                if(variation_code){
                    variation_code_ = variation_code
                }
                else{
                    if(serviceID === 'mtn-data'){
                        variation_code_ = "mtn-10mb-100"
                    }
                    if(serviceID === 'airtel-data'){
                        variation_code_ = "airt-50"
                    }
                    if(serviceID === 'glo-data'){
                        variation_code_ = "glo100"
                    }
                    if(serviceID === 'etisalat-data'){
                        variation_code_ = "eti-100"
                    } 
                }
            }

            const url = `${await this.url()}/pay`;

            // handle buy airtime
            return buy(request_id, serviceID, phone_, variation_code_, url, this.username, this.password)
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

module.exports= dataClass