let mongoose = require('mongoose');
require('dotenv').config()
//Installing and setting up Mongoose:
const databaseconnect =()=>{
    mongoose.connect(process.env.DB_URI,{ useUnifiedTopology: true ,useNewUrlParser: true,useFindAndModify:false},(err)=>{
        if(err) throw err
        console.log('DB coonected')
    })

}

module.exports=databaseconnect