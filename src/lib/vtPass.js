const AirtimeClass = require("../services/airtime/airtimeClass")
const TvClass = require("../services/tv/TvClass")
const DataClass = require("../services/data/DataClass")
const ElectricityClass = require("../services/electricity/ElectricityClass")
const EducationClass = require("../services/education/EducationClass")
const BalanceClass = require("../services/balance/BalanceClass")

class VtPass {
    constructor({environment, env, username="", password="" }){
        this.airtime = new AirtimeClass(environment, env, username, password)
        this.data = new DataClass(environment, env, username, password)
        this.tv = new TvClass(environment, env, username, password)
        this.electricity = new ElectricityClass(environment, env, username, password)
        this.education = new EducationClass(environment, env, username, password)
        this.balance = new BalanceClass(environment, env, username, password)
    }
}

module.exports = VtPass;