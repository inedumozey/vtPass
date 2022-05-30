const axios = require('axios')

async function renew(request_id, serviceID, billersCode, subscription_type, amount, phone, url, username, password){
    try{
        
        const data = { request_id, serviceID, billersCode, subscription_type, amount, phone }
        return await axios.post(url, data, {auth: {username, password}})
    }
    catch(err){
        throw err
    }
}

module.exports = renew;