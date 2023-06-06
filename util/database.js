const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

let _db;

exports.MongoConnect = (callback) => {
  mongoClient
    .connect(
      'mongodb+srv://karannewuser:fEmZhME5inEdMBMv@cluster0.yg4zw4p.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then((client) => {
      console.log(" MongoDB Connection Successfull");
      _db = client.db()
      callback();

    })
    .catch((error) => {
      console.log(error)
      throw error;
    });
};

exports.getDb = () => {
  if(_db){
    return _db;
  }
  throw "No Database found"

}
