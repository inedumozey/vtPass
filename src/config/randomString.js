module.exports = ()=>{
    try{
        const str = "abcdefghijklmnopqrstuvwxyz";
            const arr = str.split('');
            const n = 5;
            let string = ''
            for(let i=0; i<=n; i++){
                string += arr[Math.floor(Math.random() * n)];
            }

        const d = new Date();
        
        const year = d.getFullYear();

        const month = (1 + d.getMonth()) < 10 ? "0" + (1 + d.getMonth()) : (1 + d.getMonth());

        const date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

        const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();

        const minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

        return year + month + date + hour + minute + string;
    }
    catch(err){
        console.log(err.message)
    }
}