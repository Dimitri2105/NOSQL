const mongoDB = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email) {
    (this.username = username), (this.email = email);
  }

  save() {
    const db = getDb();
    return db
      .collections("Users")
      .insertOne(this)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error));
  }
  static findById(userId) {
    const db = getDb();
    return db
      .collections("Users")
      .find({ _id: new mongoDB.ObjectId(userId) })
      .next()
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((error) => console.log(error));
  }
}

module.exports = User;
