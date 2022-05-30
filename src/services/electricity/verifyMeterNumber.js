const axios = require('axios')

async function verifyMeterNumber(billersCode, serviceID, type, url, username, password){
    try{
        
        const data = { billersCode, serviceID, type }
        return await axios.post(url, data, {auth: {username, password}})
    }
    catch(err){
        throw err
    }
}

module.exports = verifyMeterNumber;