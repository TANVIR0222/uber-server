import 'dotenv/config'
import connectDB from './src/DB/connectDB.js'
import app from './src/app.js'


connectDB().then(() => {
    // 
    app.on('error' , (err) => {
        console.error('server error', err);
        throw err;
    });

    app.listen(process.env.PORT || 8000 , () => {
        console.log(`server is running on port ${process.env.PORT || 8000}`);
    })
})
.catch((err) => console.log("Mongo DB connection failed:", err));
