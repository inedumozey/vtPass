const AirtimeClass = require("../services/airtime/airtimeClass")
const TvClass = require("../services/tv/TvClass")
const DataClass = require("../services/data/DataClass")
const ElectricityClass = require("../services/electricity/ElectricityClass")

class Vtpass {
    constructor({environment, env, username="", password="" }){
        this.electricityairtime = new AirtimeClass(environment, env, username, password)
        this.data = new DataClass(environment, env, username, password)
        this.tv = new TvClass(environment, env, username, password)
        this.electricity = new ElectricityClass(environment, env, username, password)
        //this.education = new TvClass(environment, env, username, password)
    }
}

const vtpass = new Vtpass({env: 'prod', username:"inedumozey@gmail.com", password:"my08036000347"})


async function run(){
    try{
        const res = await vtpass.electricity
        console.log(res)
    }
    catch(err){
        console.log(err.message);
    }
}
run()