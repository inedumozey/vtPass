```
    npm @mozeyinedu/vtpass
```

```
    const VtPass = require("@mozeyinedu/vtpass");

    const vtpass = new VtPass({env: 'dev', username: process.env.USERNAME, password: process.env.PASSWORD })

    async function run(){
        try{
            const res = await vtpass.allApi.view()
            console.log(res.data)
        }
        catch(err){
            console.log(err.message);
        }
    }
    run()
```

-- Stay tuned --
