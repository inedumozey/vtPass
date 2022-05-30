const axios = require('axios')

async function subscrib(request_id, serviceID, billersCode, variation_code, subscription_type, amount, phone, quantity, url, username, password){
    try{
        
        const data = { request_id, serviceID, billersCode, variation_code, subscription_type, amount, phone, quantity }
        return await axios.post(url, data, {auth: {username, password}})
    
    }
    catch(err){
        throw err
    }
}

module.exports = subscrib;