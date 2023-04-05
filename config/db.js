const mongoose = require("mongoose");
// Database connection
if (process.env.DB_URL != '') {

    const DB_URL = process.env.DB_URL;
    const options = {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true,
        autoIndex: false,
        maxPoolSize: 5
    };

    mongoose.Promise = global.Promise; //set mongo up to use promises

    mongoose.connect(DB_URL, options).catch((err) => {
        console.log('*** Can Not Connect to Mongo Server:', DB_URL)
        console.log("mongo connect error",err);
    })

    let db = mongoose.connection;
    module.exports = db;
    db.once('open',async () => {
        try {
            console.log('Connected to mongodb at ' + DB_URL);
                      
        } catch (error) {
            console.log("error while connecting DB",error);
        }

    })
    db.on('error', (error) => {
        console.log("error", error);
    })
} else {
    console.log("Mongo Host URL is not given.");
}
module.exports = mongoose;
