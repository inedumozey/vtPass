const axios = require('axios')

async function buy(request_id, serviceID, variation_code, billdersCode, amount, phone, url, username, password){
    try{
        const data = { request_id, serviceID, variation_code, billdersCode, amount, phone }
        
        return await axios.post(url, data, {auth: {username, password}})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = buy;