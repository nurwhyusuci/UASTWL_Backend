const mongoose = require("mongoose");

async function connect(){
    try {
        await mongoose.connect(process.env.URI,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connect,
};