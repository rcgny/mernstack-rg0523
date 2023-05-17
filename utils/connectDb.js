import mongoose from 'mongoose';  // This tool will be our ORM manager. Will map our models(schemas) is models folder to DB

const connection = {};

async function connectDb() {   
    if (mongoose.connections.length > 0) {
        // isConnected property is automatically added to the connection object we created above by just using it:  Connection.isConnected  =  ...
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
          console.log('DB - Use previous connection');
          return;
        }
    }
    // to use a new db  conn:
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('DB - New Connection');    
    connection.isConnected = db.connections[0].readyState;
}

export default connectDb;
