const mongoDB = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email , cart , id) {
    this.username = username, 
    this.email = email , 
    this.cart = cart;   // it is an object like cart = { items :[]}
    this._id = id
  }

  save() {
    const db = getDb();
    return db
      .collection("Users")
      .insertOne(this)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error));
  }
  addToCart(product){
    const db = getDb();

    const cartProductIndex = this.cart.items.findIndex( cp =>  cp.productId.toString() === product._id.toString())  //finding if the product index exist in cart or not 
    
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items]                 //spreading the cart items

    if (cartProductIndex >= 0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1
      updatedCartItems[cartProductIndex].quantity = newQuantity
    }else{
      updatedCartItems.push({ productId : new mongoDB.ObjectId(product._id) , quantity : newQuantity })
    }
    const updatedCart  = { items : updatedCartItems}   //creating product from scratch
    return db.collection('Users')
    .updateOne( {_id  : new mongoDB.ObjectId(this._id)} , { $set  : {cart : updatedCart}}) 
    .then((item) => {
      console.log(item);
    })
    .catch((error) => console.log(error));


  }
  static findById(userId) {
    const db = getDb();
    return db
      .collection("Users")
      .findOne({ _id: new mongoDB.ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((error) => console.log(error));
  }
}

module.exports = User;
