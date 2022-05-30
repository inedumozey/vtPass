const axios = require('axios')

async function verifySmartCardNumber(billersCode, serviceID, url, username, password){
    try{
        
        const data = { billersCode, serviceID }
        return await axios.post(url, data, {auth: {username, password}})
    }
    catch(err){
        throw err
    }
}

module.exports = verifySmartCardNumber;