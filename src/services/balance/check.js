const axios = require('axios')

async function check(request_id, url, username, password){
    try{
        
        const data = {request_id}
        return await axios.post(url, data, {auth: {username, password}})
    }
    catch(err){
        throw err
    }
}

module.exports = check;