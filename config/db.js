const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGODB connected:${connect.connection.host}`.red);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
