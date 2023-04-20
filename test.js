const VtPass = require('./src/index')
const vtpass = new VtPass({ env: 'dev', username: "inedumozey@gmail.com", password: "my08036000347" })

async function checkAllAvailableApi() {
    try {
        const res = await vtpass.allApi.view()
        console.log(res.data)
    }
    catch (err) {
        console.log(err.message);
    }
}

// get the available plans
async function getVariationCodes() {
    try {
        const res = await vtpass.data.getVariationCodes({ serviceID: "mtn-data" })
        console.log(res.data.content.varations)
    }
    catch (err) {
        console.log(err.message);
    }
}

// buy plan
async function buyData() {
    try {
        const res = await vtpass.data.buy({ serviceID: "mtn-data", variation_code_: "mtn-10mb-100" })
        console.log(res.data)
    }
    catch (err) {
        console.log(err.message);
    }
}
buyData()