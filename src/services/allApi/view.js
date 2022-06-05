const axios = require('axios')

async function check( url, username, password){
    try{
        
        return await axios.get(url, {auth: {username, password}})
    }
    catch(err){
        throw err
    }
}

module.exports = check;