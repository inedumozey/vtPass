const axios = require('axios')

async function buy(request_id, serviceID, billersCode, variation_code, amount, phone, url, username, password){
    try{
        
        const data = { request_id, serviceID, billersCode, variation_code, amount, phone }
        return await axios.post(url, data, {auth: {username, password}})
            
    }
    catch(err){
        throw err
    }
}

module.exports = buy;